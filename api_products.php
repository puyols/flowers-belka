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
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Action not found']);
}

function getProducts($pdo) {
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
        WHERE p.status = 1 AND pd.language_id = 1 AND cd.language_id = 1
        ORDER BY p.product_id DESC
        LIMIT 50
    ";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(['products' => $products]);
}

function getCategories($pdo) {
    $sql = "
        SELECT 
            c.category_id,
            cd.name,
            cd.description,
            c.parent_id,
            c.status
        FROM " . DB_PREFIX . "category c
        LEFT JOIN " . DB_PREFIX . "category_description cd ON c.category_id = cd.category_id
        WHERE c.status = 1 AND cd.language_id = 1
        ORDER BY c.sort_order, cd.name
    ";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(['categories' => $categories]);
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
?>
