<?php
// Тест подключения к базе данных
// Файл: test_db_connection.php

header('Content-Type: text/html; charset=utf-8');

echo "<h1>🔍 Тест подключения к базе данных OpenCart</h1>";

// Подключение конфигурации
require_once('config.php');

echo "<h2>📋 Конфигурация базы данных:</h2>";
echo "<ul>";
echo "<li><strong>Хост:</strong> " . DB_HOSTNAME . "</li>";
echo "<li><strong>База данных:</strong> " . DB_DATABASE . "</li>";
echo "<li><strong>Пользователь:</strong> " . DB_USERNAME . "</li>";
echo "<li><strong>Префикс таблиц:</strong> " . DB_PREFIX . "</li>";
echo "</ul>";

echo "<h2>🔗 Тест подключения:</h2>";

try {
    $pdo = new PDO(
        'mysql:host=' . DB_HOSTNAME . ';dbname=' . DB_DATABASE . ';charset=utf8',
        DB_USERNAME,
        DB_PASSWORD,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    
    echo "<p style='color: green;'>✅ <strong>Подключение успешно!</strong></p>";
    
    // Проверяем существование основных таблиц
    echo "<h2>📊 Проверка таблиц:</h2>";
    
    $tables = [
        DB_PREFIX . 'product' => 'Товары',
        DB_PREFIX . 'product_description' => 'Описания товаров',
        DB_PREFIX . 'category' => 'Категории',
        DB_PREFIX . 'category_description' => 'Описания категорий',
        DB_PREFIX . 'product_to_category' => 'Связи товар-категория'
    ];
    
    echo "<ul>";
    foreach ($tables as $table => $description) {
        try {
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM `$table`");
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            echo "<li style='color: green;'>✅ <strong>$description</strong> ($table): " . $result['count'] . " записей</li>";
        } catch (PDOException $e) {
            echo "<li style='color: red;'>❌ <strong>$description</strong> ($table): Таблица не найдена</li>";
        }
    }
    echo "</ul>";
    
    // Проверяем несколько товаров
    echo "<h2>🌸 Примеры товаров:</h2>";
    try {
        $sql = "
            SELECT 
                p.product_id,
                pd.name,
                p.price,
                p.status
            FROM " . DB_PREFIX . "product p
            LEFT JOIN " . DB_PREFIX . "product_description pd ON p.product_id = pd.product_id
            WHERE pd.language_id = 1
            ORDER BY p.product_id DESC
            LIMIT 5
        ";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        if (count($products) > 0) {
            echo "<table border='1' style='border-collapse: collapse; width: 100%;'>";
            echo "<tr><th>ID</th><th>Название</th><th>Цена</th><th>Статус</th></tr>";
            foreach ($products as $product) {
                $status = $product['status'] ? 'Активен' : 'Неактивен';
                echo "<tr>";
                echo "<td>" . $product['product_id'] . "</td>";
                echo "<td>" . htmlspecialchars($product['name']) . "</td>";
                echo "<td>" . $product['price'] . " руб.</td>";
                echo "<td>" . $status . "</td>";
                echo "</tr>";
            }
            echo "</table>";
        } else {
            echo "<p style='color: orange;'>⚠️ Товары не найдены</p>";
        }
        
    } catch (PDOException $e) {
        echo "<p style='color: red;'>❌ Ошибка при получении товаров: " . $e->getMessage() . "</p>";
    }
    
} catch (PDOException $e) {
    echo "<p style='color: red;'>❌ <strong>Ошибка подключения:</strong> " . $e->getMessage() . "</p>";
    echo "<h3>💡 Возможные решения:</h3>";
    echo "<ul>";
    echo "<li>Убедитесь, что MySQL сервер запущен</li>";
    echo "<li>Проверьте правильность настроек в config.php</li>";
    echo "<li>Убедитесь, что база данных '" . DB_DATABASE . "' существует</li>";
    echo "<li>Проверьте права доступа пользователя '" . DB_USERNAME . "'</li>";
    echo "</ul>";
}

echo "<hr>";
echo "<p><a href='api_products.php?action=products'>🔗 Тест API товаров</a> | ";
echo "<a href='api_products.php?action=categories'>🔗 Тест API категорий</a> | ";
echo "<a href='test_api.html'>🔗 Интерактивный тест API</a></p>";
?>
