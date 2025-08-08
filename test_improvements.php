<?php
// Тест всех улучшений API
header('Content-Type: text/html; charset=utf-8');

echo "<h1>🧪 Тестирование улучшений Flowers Belka</h1>";

// Подключение конфигурации
require_once('config.php');

echo "<h2>📋 Конфигурация:</h2>";
echo "<ul>";
echo "<li><strong>База данных:</strong> " . DB_DATABASE . "</li>";
echo "<li><strong>Хост:</strong> " . DB_HOSTNAME . "</li>";
echo "<li><strong>Префикс:</strong> " . DB_PREFIX . "</li>";
echo "</ul>";

// Тест подключения к базе данных
echo "<h2>🔗 Тест подключения к БД:</h2>";
try {
    $pdo = new PDO(
        'mysql:host=' . DB_HOSTNAME . ';dbname=' . DB_DATABASE . ';charset=utf8',
        DB_USERNAME,
        DB_PASSWORD,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    echo "<p style='color: green;'>✅ Подключение к базе данных успешно!</p>";
    
    // Проверяем количество товаров
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM " . DB_PREFIX . "product WHERE status = 1");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "<p>📦 Активных товаров в базе: <strong>" . $result['count'] . "</strong></p>";
    
} catch (PDOException $e) {
    echo "<p style='color: red;'>❌ Ошибка подключения: " . $e->getMessage() . "</p>";
    exit;
}

echo "<h2>🔧 Тестирование API endpoints:</h2>";

// Функция для тестирования API
function testAPI($endpoint, $description) {
    $url = "http://localhost:8080/api_products.php?" . $endpoint;
    echo "<h3>$description</h3>";
    echo "<p><strong>URL:</strong> <code>$endpoint</code></p>";
    
    $context = stream_context_create([
        'http' => [
            'timeout' => 5,
            'method' => 'GET',
        ]
    ]);
    
    $result = @file_get_contents($url, false, $context);
    
    if ($result === false) {
        echo "<p style='color: red;'>❌ Ошибка запроса</p>";
        return;
    }
    
    $data = json_decode($result, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo "<p style='color: red;'>❌ Ошибка JSON: " . json_last_error_msg() . "</p>";
        echo "<pre>" . htmlspecialchars(substr($result, 0, 500)) . "</pre>";
        return;
    }
    
    if (isset($data['success']) && $data['success']) {
        echo "<p style='color: green;'>✅ Успешно</p>";
        
        // Показываем краткую информацию о результате
        if (isset($data['products'])) {
            echo "<p>📦 Товаров получено: " . count($data['products']) . "</p>";
            if (isset($data['pagination'])) {
                echo "<p>📄 Страниц всего: " . $data['pagination']['pages'] . "</p>";
            }
        } elseif (isset($data['categories'])) {
            echo "<p>📂 Категорий получено: " . count($data['categories']) . "</p>";
        } elseif (isset($data['stats'])) {
            echo "<p>📊 Статистика получена:</p>";
            echo "<ul>";
            foreach ($data['stats'] as $key => $value) {
                if (is_array($value)) {
                    echo "<li><strong>$key:</strong> " . count($value) . " элементов</li>";
                } else {
                    echo "<li><strong>$key:</strong> $value</li>";
                }
            }
            echo "</ul>";
        } elseif (isset($data['results'])) {
            echo "<p>🔍 Результатов поиска: " . count($data['results']) . "</p>";
        } elseif (isset($data['price_range'])) {
            echo "<p>💰 Диапазон цен: " . $data['price_range']['min'] . " - " . $data['price_range']['max'] . " руб.</p>";
        }
    } else {
        echo "<p style='color: red;'>❌ Ошибка API: " . ($data['error'] ?? 'Неизвестная ошибка') . "</p>";
    }
    
    echo "<hr>";
}

// Тестируем все новые endpoints
testAPI("action=products&limit=5", "📦 Получение товаров (базовый)");
testAPI("action=products&page=1&limit=3&sort=price_asc", "📦 Товары с пагинацией и сортировкой");
testAPI("action=products&min_price=1000&max_price=5000", "📦 Товары с фильтром по цене");
testAPI("action=categories", "📂 Получение категорий");
testAPI("action=search&q=роза&limit=3", "🔍 Поиск товаров");
testAPI("action=stats", "📊 Статистика магазина");
testAPI("action=price_range", "💰 Диапазон цен");
testAPI("action=product&id=1", "🌸 Конкретный товар");

echo "<h2>🎯 Результаты тестирования:</h2>";
echo "<p>Если все тесты прошли успешно (✅), то API работает корректно!</p>";
echo "<p><strong>Следующий шаг:</strong> Тестирование Next.js фронтенда</p>";

echo "<h2>🔗 Полезные ссылки:</h2>";
echo "<ul>";
echo "<li><a href='test_api_advanced.html' target='_blank'>Расширенный тест API</a></li>";
echo "<li><a href='test_api.html' target='_blank'>Базовый тест API</a></li>";
echo "<li><a href='test_db_connection.php' target='_blank'>Тест подключения к БД</a></li>";
echo "</ul>";
?>
