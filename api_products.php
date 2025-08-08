<?php
// API для получения данных товаров для Next.js фронтенда
// Файл: api_products.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3001');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Обработка preflight запросов
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Подключение к базе данных
require_once('config.php');

try {
    $pdo = new PDO(
        'mysql:host=' . DB_HOSTNAME . ';dbname=' . DB_DATABASE . ';charset=utf8',
        DB_USERNAME,
        DB_PASSWORD,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$action = $_GET['action'] ?? 'products';

switch ($action) {
    case 'products':
        getProducts($pdo);
        break;
    case 'categories':
        getCategories($pdo);
        break;
    case 'product':
        getProduct($pdo, $_GET['id'] ?? 0);
        break;
    case 'search':
        searchProducts($pdo);
        break;
    case 'stats':
        getStats($pdo);
        break;
    case 'price_range':
        getPriceRange($pdo);
        break;
    default:
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'error' => 'Action not found',
            'available_actions' => ['products', 'categories', 'product', 'search', 'stats', 'price_range']
        ], JSON_UNESCAPED_UNICODE);
}

function getProducts($pdo) {
    try {
        // Параметры запроса
        $page = max(1, intval($_GET['page'] ?? 1));
        $limit = min(100, max(1, intval($_GET['limit'] ?? 20)));
        $offset = ($page - 1) * $limit;

        $search = $_GET['search'] ?? '';
        $category_id = intval($_GET['category_id'] ?? 0);
        $min_price = floatval($_GET['min_price'] ?? 0);
        $max_price = floatval($_GET['max_price'] ?? 0);
        $sort = $_GET['sort'] ?? 'date_desc';

        // Базовый SQL
        $sql = "
            SELECT
                p.product_id,
                pd.name,
                pd.description,
                p.model,
                p.price,
                p.image,
                p.status,
                p.quantity,
                cd.name as category_name,
                ptc.category_id,
                p.date_added
            FROM " . DB_PREFIX . "product p
            LEFT JOIN " . DB_PREFIX . "product_description pd ON p.product_id = pd.product_id
            LEFT JOIN " . DB_PREFIX . "product_to_category ptc ON p.product_id = ptc.product_id
            LEFT JOIN " . DB_PREFIX . "category_description cd ON ptc.category_id = cd.category_id
            WHERE p.status = 1 AND pd.language_id = 1
        ";

        $params = [];

        // Поиск по названию
        if (!empty($search)) {
            $sql .= " AND pd.name LIKE ?";
            $params[] = '%' . $search . '%';
        }

        // Фильтр по категории
        if ($category_id > 0) {
            $sql .= " AND ptc.category_id = ?";
            $params[] = $category_id;
        }

        // Фильтр по цене
        if ($min_price > 0) {
            $sql .= " AND p.price >= ?";
            $params[] = $min_price;
        }

        if ($max_price > 0) {
            $sql .= " AND p.price <= ?";
            $params[] = $max_price;
        }

        // Сортировка
        switch ($sort) {
            case 'price_asc':
                $sql .= " ORDER BY p.price ASC";
                break;
            case 'price_desc':
                $sql .= " ORDER BY p.price DESC";
                break;
            case 'name_asc':
                $sql .= " ORDER BY pd.name ASC";
                break;
            case 'name_desc':
                $sql .= " ORDER BY pd.name DESC";
                break;
            case 'date_asc':
                $sql .= " ORDER BY p.date_added ASC";
                break;
            default:
                $sql .= " ORDER BY p.date_added DESC";
        }

        // Подсчет общего количества для пагинации
        $countSql = str_replace(
            "SELECT p.product_id, pd.name, pd.description, p.model, p.price, p.image, p.status, p.quantity, cd.name as category_name, ptc.category_id, p.date_added",
            "SELECT COUNT(DISTINCT p.product_id) as total",
            $sql
        );

        $countStmt = $pdo->prepare($countSql);
        $countStmt->execute($params);
        $totalCount = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];

        // Добавляем LIMIT и OFFSET
        $sql .= " LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Обработка изображений
        foreach ($products as &$product) {
            if (!empty($product['image'])) {
                $product['image_url'] = 'http://localhost:8080/image/' . $product['image'];
                $product['image_thumb'] = 'http://localhost:8080/image/cache/' . pathinfo($product['image'], PATHINFO_DIRNAME) . '/' . pathinfo($product['image'], PATHINFO_FILENAME) . '-228x228' . '.' . pathinfo($product['image'], PATHINFO_EXTENSION);
            } else {
                $product['image_url'] = null;
                $product['image_thumb'] = null;
            }
        }

        $response = [
            'success' => true,
            'products' => $products,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => intval($totalCount),
                'pages' => ceil($totalCount / $limit)
            ],
            'filters' => [
                'search' => $search,
                'category_id' => $category_id,
                'min_price' => $min_price,
                'max_price' => $max_price,
                'sort' => $sort
            ]
        ];

        echo json_encode($response, JSON_UNESCAPED_UNICODE);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Ошибка при получении товаров',
            'message' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

function getCategories($pdo) {
    try {
        $sql = "
            SELECT
                c.category_id,
                cd.name,
                cd.description,
                c.parent_id,
                c.status,
                c.sort_order,
                c.image,
                (SELECT COUNT(*) FROM " . DB_PREFIX . "product_to_category ptc
                 JOIN " . DB_PREFIX . "product p ON ptc.product_id = p.product_id
                 WHERE ptc.category_id = c.category_id AND p.status = 1) as product_count
            FROM " . DB_PREFIX . "category c
            LEFT JOIN " . DB_PREFIX . "category_description cd ON c.category_id = cd.category_id
            WHERE c.status = 1 AND cd.language_id = 1
            ORDER BY c.sort_order, cd.name
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Обработка изображений категорий
        foreach ($categories as &$category) {
            if (!empty($category['image'])) {
                $category['image_url'] = 'http://localhost:8080/image/' . $category['image'];
            } else {
                $category['image_url'] = null;
            }
        }

        echo json_encode([
            'success' => true,
            'categories' => $categories
        ], JSON_UNESCAPED_UNICODE);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Ошибка при получении категорий',
            'message' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

function getProduct($pdo, $productId) {
    $sql = "
        SELECT 
            p.product_id,
            pd.name,
            pd.description,
            p.model,
            p.price,
            p.image,
            p.status,
            p.quantity,
            cd.name as category_name
        FROM " . DB_PREFIX . "product p
        LEFT JOIN " . DB_PREFIX . "product_description pd ON p.product_id = pd.product_id
        LEFT JOIN " . DB_PREFIX . "product_to_category ptc ON p.product_id = ptc.product_id
        LEFT JOIN " . DB_PREFIX . "category_description cd ON ptc.category_id = cd.category_id
        WHERE p.product_id = ? AND p.status = 1 AND pd.language_id = 1 AND cd.language_id = 1
    ";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$productId]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($product) {
        echo json_encode(['product' => $product]);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Product not found']);
    }
}
// Поиск товаров (упрощенная версия getProducts для быстрого поиска)
function searchProducts($pdo) {
    try {
        $query = $_GET['q'] ?? '';
        $limit = min(20, max(1, intval($_GET['limit'] ?? 10)));

        if (empty($query)) {
            echo json_encode([
                'success' => false,
                'error' => 'Поисковый запрос не может быть пустым'
            ], JSON_UNESCAPED_UNICODE);
            return;
        }

        $sql = "
            SELECT
                p.product_id,
                pd.name,
                p.price,
                p.image,
                cd.name as category_name
            FROM " . DB_PREFIX . "product p
            LEFT JOIN " . DB_PREFIX . "product_description pd ON p.product_id = pd.product_id
            LEFT JOIN " . DB_PREFIX . "product_to_category ptc ON p.product_id = ptc.product_id
            LEFT JOIN " . DB_PREFIX . "category_description cd ON ptc.category_id = cd.category_id
            WHERE p.status = 1 AND pd.language_id = 1
            AND (pd.name LIKE ? OR pd.description LIKE ?)
            ORDER BY pd.name ASC
            LIMIT ?
        ";

        $searchTerm = '%' . $query . '%';
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$searchTerm, $searchTerm, $limit]);
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Обработка изображений
        foreach ($products as &$product) {
            if (!empty($product['image'])) {
                $product['image_url'] = 'http://localhost:8080/image/' . $product['image'];
            } else {
                $product['image_url'] = null;
            }
        }

        echo json_encode([
            'success' => true,
            'query' => $query,
            'results' => $products,
            'count' => count($products)
        ], JSON_UNESCAPED_UNICODE);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Ошибка поиска',
            'message' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

// Получение статистики магазина
function getStats($pdo) {
    try {
        $stats = [];

        // Общее количество товаров
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM " . DB_PREFIX . "product WHERE status = 1");
        $stats['total_products'] = $stmt->fetch(PDO::FETCH_ASSOC)['count'];

        // Количество категорий
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM " . DB_PREFIX . "category WHERE status = 1");
        $stats['total_categories'] = $stmt->fetch(PDO::FETCH_ASSOC)['count'];

        // Средняя цена
        $stmt = $pdo->query("SELECT AVG(price) as avg_price FROM " . DB_PREFIX . "product WHERE status = 1 AND price > 0");
        $stats['average_price'] = round($stmt->fetch(PDO::FETCH_ASSOC)['avg_price'], 2);

        // Самые популярные категории (по количеству товаров)
        $sql = "
            SELECT
                cd.name,
                COUNT(ptc.product_id) as product_count
            FROM " . DB_PREFIX . "category_description cd
            JOIN " . DB_PREFIX . "product_to_category ptc ON cd.category_id = ptc.category_id
            JOIN " . DB_PREFIX . "product p ON ptc.product_id = p.product_id
            WHERE cd.language_id = 1 AND p.status = 1
            GROUP BY cd.category_id, cd.name
            ORDER BY product_count DESC
            LIMIT 5
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $stats['top_categories'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'stats' => $stats
        ], JSON_UNESCAPED_UNICODE);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Ошибка получения статистики',
            'message' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

// Получение диапазона цен для фильтров
function getPriceRange($pdo) {
    try {
        $category_id = intval($_GET['category_id'] ?? 0);

        $sql = "
            SELECT
                MIN(p.price) as min_price,
                MAX(p.price) as max_price
            FROM " . DB_PREFIX . "product p
        ";

        $params = [];

        if ($category_id > 0) {
            $sql .= " JOIN " . DB_PREFIX . "product_to_category ptc ON p.product_id = ptc.product_id";
            $sql .= " WHERE p.status = 1 AND p.price > 0 AND ptc.category_id = ?";
            $params[] = $category_id;
        } else {
            $sql .= " WHERE p.status = 1 AND p.price > 0";
        }

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'price_range' => [
                'min' => floatval($result['min_price']),
                'max' => floatval($result['max_price'])
            ],
            'category_id' => $category_id
        ], JSON_UNESCAPED_UNICODE);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Ошибка получения диапазона цен',
            'message' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}
?>
