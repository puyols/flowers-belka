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
    case 'cart_add':
        addToCart($pdo);
        break;
    case 'cart_get':
        getCart($pdo);
        break;
    case 'cart_update':
        updateCart($pdo);
        break;
    case 'cart_remove':
        removeFromCart($pdo);
        break;
    case 'cart_clear':
        clearCart($pdo);
        break;
    case 'order_create':
        createOrder($pdo);
        break;
    case 'order_get':
        getOrder($pdo);
        break;
    case 'delivery_calculate':
        calculateDelivery($pdo);
        break;
    default:
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'error' => 'Action not found',
            'available_actions' => [
                'products', 'categories', 'product', 'search', 'stats', 'price_range',
                'cart_add', 'cart_get', 'cart_update', 'cart_remove', 'cart_clear',
                'order_create', 'order_get', 'delivery_calculate'
            ]
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

// ===== ФУНКЦИИ КОРЗИНЫ =====

// Добавление товара в корзину
function addToCart($pdo) {
    try {
        // Получаем данные из POST запроса
        $input = json_decode(file_get_contents('php://input'), true);

        if (!$input) {
            $input = $_POST;
        }

        $product_id = intval($input['product_id'] ?? 0);
        $quantity = intval($input['quantity'] ?? 1);
        $session_id = $input['session_id'] ?? session_id();

        if ($product_id <= 0) {
            throw new Exception('Некорректный ID товара');
        }

        if ($quantity <= 0) {
            throw new Exception('Количество должно быть больше 0');
        }

        // Проверяем существование товара
        $stmt = $pdo->prepare("
            SELECT p.product_id, pd.name, p.price, p.quantity as stock, p.status
            FROM " . DB_PREFIX . "product p
            LEFT JOIN " . DB_PREFIX . "product_description pd ON p.product_id = pd.product_id
            WHERE p.product_id = ? AND p.status = 1 AND pd.language_id = 1
        ");
        $stmt->execute([$product_id]);
        $product = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$product) {
            throw new Exception('Товар не найден или недоступен');
        }

        if ($product['stock'] < $quantity) {
            throw new Exception('Недостаточно товара на складе');
        }

        // Проверяем, есть ли товар уже в корзине
        $stmt = $pdo->prepare("
            SELECT cart_id, quantity
            FROM " . DB_PREFIX . "cart
            WHERE api_id = ? AND product_id = ?
        ");
        $stmt->execute([$session_id, $product_id]);
        $existing = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($existing) {
            // Обновляем количество
            $new_quantity = $existing['quantity'] + $quantity;
            $stmt = $pdo->prepare("
                UPDATE " . DB_PREFIX . "cart
                SET quantity = ?, date_added = NOW()
                WHERE cart_id = ?
            ");
            $stmt->execute([$new_quantity, $existing['cart_id']]);
        } else {
            // Добавляем новый товар
            $stmt = $pdo->prepare("
                INSERT INTO " . DB_PREFIX . "cart
                (api_id, product_id, quantity, date_added)
                VALUES (?, ?, ?, NOW())
            ");
            $stmt->execute([$session_id, $product_id, $quantity]);
        }

        // Получаем обновленную корзину
        $cart_data = getCartData($pdo, $session_id);

        echo json_encode([
            'success' => true,
            'message' => 'Товар добавлен в корзину',
            'cart' => $cart_data
        ], JSON_UNESCAPED_UNICODE);

    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

// Получение корзины
function getCart($pdo) {
    try {
        $session_id = $_GET['session_id'] ?? session_id();
        $cart_data = getCartData($pdo, $session_id);

        echo json_encode([
            'success' => true,
            'cart' => $cart_data
        ], JSON_UNESCAPED_UNICODE);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

// Обновление количества товара в корзине
function updateCart($pdo) {
    try {
        $input = json_decode(file_get_contents('php://input'), true);

        if (!$input) {
            $input = $_POST;
        }

        $cart_id = intval($input['cart_id'] ?? 0);
        $quantity = intval($input['quantity'] ?? 1);
        $session_id = $input['session_id'] ?? session_id();

        if ($cart_id <= 0) {
            throw new Exception('Некорректный ID записи корзины');
        }

        if ($quantity <= 0) {
            // Удаляем товар из корзины
            $stmt = $pdo->prepare("
                DELETE FROM " . DB_PREFIX . "cart
                WHERE cart_id = ? AND api_id = ?
            ");
            $stmt->execute([$cart_id, $session_id]);
        } else {
            // Обновляем количество
            $stmt = $pdo->prepare("
                UPDATE " . DB_PREFIX . "cart
                SET quantity = ?, date_added = NOW()
                WHERE cart_id = ? AND api_id = ?
            ");
            $stmt->execute([$quantity, $cart_id, $session_id]);
        }

        $cart_data = getCartData($pdo, $session_id);

        echo json_encode([
            'success' => true,
            'message' => 'Корзина обновлена',
            'cart' => $cart_data
        ], JSON_UNESCAPED_UNICODE);

    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

// Удаление товара из корзины
function removeFromCart($pdo) {
    try {
        $cart_id = intval($_GET['cart_id'] ?? 0);
        $session_id = $_GET['session_id'] ?? session_id();

        if ($cart_id <= 0) {
            throw new Exception('Некорректный ID записи корзины');
        }

        $stmt = $pdo->prepare("
            DELETE FROM " . DB_PREFIX . "cart
            WHERE cart_id = ? AND api_id = ?
        ");
        $stmt->execute([$cart_id, $session_id]);

        $cart_data = getCartData($pdo, $session_id);

        echo json_encode([
            'success' => true,
            'message' => 'Товар удален из корзины',
            'cart' => $cart_data
        ], JSON_UNESCAPED_UNICODE);

    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

// Очистка корзины
function clearCart($pdo) {
    try {
        $session_id = $_GET['session_id'] ?? session_id();

        $stmt = $pdo->prepare("
            DELETE FROM " . DB_PREFIX . "cart
            WHERE api_id = ?
        ");
        $stmt->execute([$session_id]);

        echo json_encode([
            'success' => true,
            'message' => 'Корзина очищена',
            'cart' => [
                'items' => [],
                'total_items' => 0,
                'total_price' => 0,
                'subtotal' => 0,
                'delivery' => 0,
                'session_id' => $session_id
            ]
        ], JSON_UNESCAPED_UNICODE);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

// Вспомогательная функция для получения данных корзины
function getCartData($pdo, $session_id) {
    $stmt = $pdo->prepare("
        SELECT
            c.cart_id,
            c.product_id,
            c.quantity,
            p.price,
            p.image,
            pd.name,
            cd.name as category_name
        FROM " . DB_PREFIX . "cart c
        LEFT JOIN " . DB_PREFIX . "product p ON c.product_id = p.product_id
        LEFT JOIN " . DB_PREFIX . "product_description pd ON p.product_id = pd.product_id
        LEFT JOIN " . DB_PREFIX . "product_to_category ptc ON p.product_id = ptc.product_id
        LEFT JOIN " . DB_PREFIX . "category_description cd ON ptc.category_id = cd.category_id
        WHERE c.api_id = ? AND p.status = 1 AND pd.language_id = 1
        ORDER BY c.date_added DESC
    ");
    $stmt->execute([$session_id]);
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Обрабатываем изображения и подсчитываем итоги
    $total_items = 0;
    $subtotal = 0;

    foreach ($items as &$item) {
        if (!empty($item['image'])) {
            $item['image_url'] = 'http://localhost:8080/image/' . $item['image'];
        } else {
            $item['image_url'] = null;
        }

        $item['total_price'] = $item['price'] * $item['quantity'];
        $total_items += $item['quantity'];
        $subtotal += $item['total_price'];
    }

    // Расчет доставки (базовая логика)
    $delivery_cost = calculateDeliveryCost($subtotal);
    $total_price = $subtotal + $delivery_cost;

    return [
        'items' => $items,
        'total_items' => $total_items,
        'subtotal' => $subtotal,
        'delivery' => $delivery_cost,
        'total_price' => $total_price,
        'session_id' => $session_id
    ];
}

// Расчет стоимости доставки
function calculateDeliveryCost($subtotal) {
    // Бесплатная доставка от 5000 рублей
    if ($subtotal >= 5000) {
        return 0;
    }

    // Стандартная доставка 500 рублей
    return 500;
}

// ===== ФУНКЦИИ ЗАКАЗОВ =====

// Создание заказа
function createOrder($pdo) {
    try {
        $input = json_decode(file_get_contents('php://input'), true);

        if (!$input) {
            throw new Exception('Некорректные данные заказа');
        }

        $session_id = $input['session_id'] ?? session_id();
        $customer_data = $input['customer'] ?? [];
        $delivery_data = $input['delivery'] ?? [];
        $payment_method = $input['payment_method'] ?? 'cash';
        $comment = $input['comment'] ?? '';

        // Валидация обязательных полей
        $required_fields = ['firstname', 'telephone'];
        foreach ($required_fields as $field) {
            if (empty($customer_data[$field])) {
                throw new Exception("Поле '{$field}' обязательно для заполнения");
            }
        }

        // Получаем корзину
        $cart_data = getCartData($pdo, $session_id);

        if (empty($cart_data['items'])) {
            throw new Exception('Корзина пуста');
        }

        // Начинаем транзакцию
        $pdo->beginTransaction();

        try {
            // Создаем заказ
            $order_status_id = 1; // Pending
            $currency_code = 'RUB';
            $currency_value = 1.0;

            $stmt = $pdo->prepare("
                INSERT INTO " . DB_PREFIX . "order
                (invoice_no, invoice_prefix, store_id, store_name, store_url, customer_id,
                 customer_group_id, firstname, lastname, email, telephone,
                 payment_firstname, payment_lastname, payment_address_1, payment_city,
                 payment_postcode, payment_country, payment_zone, payment_method,
                 shipping_firstname, shipping_lastname, shipping_address_1, shipping_city,
                 shipping_postcode, shipping_country, shipping_zone, shipping_method,
                 comment, total, order_status_id, language_id, currency_code,
                 currency_value, date_added, date_modified)
                VALUES
                (0, 'INV-', 0, 'Flowers Belka', 'http://localhost:8080', 0,
                 1, ?, ?, ?, ?,
                 ?, ?, ?, ?,
                 ?, 'Россия', 'Московская область', ?,
                 ?, ?, ?, ?,
                 ?, 'Россия', 'Московская область', 'Курьерская доставка',
                 ?, ?, ?, 1, ?,
                 ?, NOW(), NOW())
            ");

            $stmt->execute([
                $customer_data['firstname'],
                $customer_data['lastname'] ?? '',
                $customer_data['email'] ?? '',
                $customer_data['telephone'],
                $customer_data['firstname'],
                $customer_data['lastname'] ?? '',
                $delivery_data['address'] ?? '',
                $delivery_data['city'] ?? 'Путилково',
                $delivery_data['postcode'] ?? '',
                $payment_method,
                $customer_data['firstname'],
                $customer_data['lastname'] ?? '',
                $delivery_data['address'] ?? '',
                $delivery_data['city'] ?? 'Путилково',
                $delivery_data['postcode'] ?? '',
                $comment,
                $cart_data['total_price'],
                $order_status_id,
                $currency_code,
                $currency_value
            ]);

            $order_id = $pdo->lastInsertId();

            // Обновляем номер инвойса
            $stmt = $pdo->prepare("
                UPDATE " . DB_PREFIX . "order
                SET invoice_no = ?
                WHERE order_id = ?
            ");
            $stmt->execute([$order_id, $order_id]);

            // Добавляем товары заказа
            foreach ($cart_data['items'] as $item) {
                $stmt = $pdo->prepare("
                    INSERT INTO " . DB_PREFIX . "order_product
                    (order_id, product_id, name, model, quantity, price, total)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                ");
                $stmt->execute([
                    $order_id,
                    $item['product_id'],
                    $item['name'],
                    'MODEL-' . $item['product_id'],
                    $item['quantity'],
                    $item['price'],
                    $item['total_price']
                ]);
            }

            // Добавляем итоги заказа
            $order_totals = [
                ['code' => 'sub_total', 'title' => 'Промежуточный итог', 'value' => $cart_data['subtotal'], 'sort_order' => 1],
                ['code' => 'shipping', 'title' => 'Доставка', 'value' => $cart_data['delivery'], 'sort_order' => 2],
                ['code' => 'total', 'title' => 'Итого', 'value' => $cart_data['total_price'], 'sort_order' => 3]
            ];

            foreach ($order_totals as $total) {
                $stmt = $pdo->prepare("
                    INSERT INTO " . DB_PREFIX . "order_total
                    (order_id, code, title, value, sort_order)
                    VALUES (?, ?, ?, ?, ?)
                ");
                $stmt->execute([
                    $order_id,
                    $total['code'],
                    $total['title'],
                    $total['value'],
                    $total['sort_order']
                ]);
            }

            // Добавляем историю заказа
            $stmt = $pdo->prepare("
                INSERT INTO " . DB_PREFIX . "order_history
                (order_id, order_status_id, notify, comment, date_added)
                VALUES (?, ?, 0, 'Заказ создан', NOW())
            ");
            $stmt->execute([$order_id, $order_status_id]);

            // Очищаем корзину
            $stmt = $pdo->prepare("
                DELETE FROM " . DB_PREFIX . "cart
                WHERE api_id = ?
            ");
            $stmt->execute([$session_id]);

            // Подтверждаем транзакцию
            $pdo->commit();

            // Отправляем уведомления о заказе
            try {
                sendOrderNotifications($order_id, 'confirmation', $customer_data, $cart_data);
            } catch (Exception $e) {
                // Ошибки уведомлений не должны прерывать создание заказа
                error_log("Failed to send order notifications: " . $e->getMessage());
            }

            echo json_encode([
                'success' => true,
                'message' => 'Заказ успешно создан',
                'order_id' => $order_id,
                'order' => [
                    'id' => $order_id,
                    'total' => $cart_data['total_price'],
                    'status' => 'pending',
                    'items_count' => $cart_data['total_items']
                ]
            ], JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            $pdo->rollBack();
            throw $e;
        }

    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

// Получение информации о заказе
function getOrder($pdo) {
    try {
        $order_id = intval($_GET['order_id'] ?? 0);

        if ($order_id <= 0) {
            throw new Exception('Некорректный ID заказа');
        }

        // Получаем основную информацию о заказе
        $stmt = $pdo->prepare("
            SELECT
                o.*,
                os.name as status_name
            FROM " . DB_PREFIX . "order o
            LEFT JOIN " . DB_PREFIX . "order_status os ON o.order_status_id = os.order_status_id
            WHERE o.order_id = ? AND os.language_id = 1
        ");
        $stmt->execute([$order_id]);
        $order = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$order) {
            throw new Exception('Заказ не найден');
        }

        // Получаем товары заказа
        $stmt = $pdo->prepare("
            SELECT * FROM " . DB_PREFIX . "order_product
            WHERE order_id = ?
        ");
        $stmt->execute([$order_id]);
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Получаем итоги заказа
        $stmt = $pdo->prepare("
            SELECT * FROM " . DB_PREFIX . "order_total
            WHERE order_id = ?
            ORDER BY sort_order
        ");
        $stmt->execute([$order_id]);
        $totals = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Получаем историю заказа
        $stmt = $pdo->prepare("
            SELECT
                oh.*,
                os.name as status_name
            FROM " . DB_PREFIX . "order_history oh
            LEFT JOIN " . DB_PREFIX . "order_status os ON oh.order_status_id = os.order_status_id
            WHERE oh.order_id = ? AND os.language_id = 1
            ORDER BY oh.date_added DESC
        ");
        $stmt->execute([$order_id]);
        $history = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'order' => [
                'info' => $order,
                'products' => $products,
                'totals' => $totals,
                'history' => $history
            ]
        ], JSON_UNESCAPED_UNICODE);

    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

// Расчет стоимости доставки
function calculateDelivery($pdo) {
    try {
        $subtotal = floatval($_GET['subtotal'] ?? 0);
        $city = $_GET['city'] ?? 'Путилково';
        $address = $_GET['address'] ?? '';

        $delivery_cost = calculateDeliveryCost($subtotal);

        // Дополнительная логика расчета в зависимости от города
        $delivery_zones = [
            'Путилково' => 0,
            'Красногорск' => 200,
            'Москва' => 300,
            'Московская область' => 500
        ];

        $zone_cost = $delivery_zones[$city] ?? $delivery_zones['Московская область'];

        // Если есть базовая стоимость доставки, добавляем зональную
        if ($delivery_cost > 0) {
            $delivery_cost += $zone_cost;
        }

        echo json_encode([
            'success' => true,
            'delivery' => [
                'cost' => $delivery_cost,
                'free_from' => 5000,
                'zone' => $city,
                'zone_cost' => $zone_cost,
                'estimated_time' => $delivery_cost == 0 ? 'Бесплатная доставка' : 'В течение дня'
            ]
        ], JSON_UNESCAPED_UNICODE);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

// ===== ФУНКЦИИ УВЕДОМЛЕНИЙ =====

function sendOrderNotifications($order_id, $type, $customer_data, $cart_data) {
    // Отправляем уведомления через API уведомлений
    $notifications_api = 'http://localhost:8080/api_notifications.php?action=order_notifications';

    $data = [
        'order_id' => $order_id,
        'type' => $type,
        'customer' => $customer_data,
        'cart' => $cart_data
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $notifications_api);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http_code !== 200) {
        throw new Exception("Failed to send notifications: HTTP $http_code");
    }

    $result = json_decode($response, true);
    if (!$result || !$result['success']) {
        throw new Exception("Notification API error: " . ($result['error'] ?? 'Unknown error'));
    }

    return $result;
}
?>
