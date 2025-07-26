<?php
// Простой тест OpenCart
echo "<h1>Тест OpenCart</h1>";

// Подключаем конфигурацию
require_once('config.php');

echo "<p>✅ Config загружен</p>";
echo "<p>📁 DIR_APPLICATION: " . DIR_APPLICATION . "</p>";
echo "<p>🌐 HTTP_SERVER: " . HTTP_SERVER . "</p>";

// Проверяем подключение к базе данных
try {
    $mysqli = new mysqli(DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT);
    if ($mysqli->connect_error) {
        echo "<p>❌ Ошибка подключения к БД: " . $mysqli->connect_error . "</p>";
    } else {
        echo "<p>✅ База данных подключена</p>";
        
        // Проверяем настройки темы
        $result = $mysqli->query("SELECT `key`, value FROM oc_setting WHERE `key` IN ('config_template', 'config_theme') AND store_id=0");
        echo "<h3>Настройки темы:</h3>";
        while ($row = $result->fetch_assoc()) {
            echo "<p>" . $row['key'] . ": " . $row['value'] . "</p>";
        }
        
        // Проверяем количество товаров
        $result = $mysqli->query("SELECT COUNT(*) as count FROM oc_product");
        $row = $result->fetch_assoc();
        echo "<p>📦 Товаров в базе: " . $row['count'] . "</p>";
    }
    $mysqli->close();
} catch (Exception $e) {
    echo "<p>❌ Ошибка: " . $e->getMessage() . "</p>";
}

echo "<p>🔗 <a href='http://localhost/flowers_belka/'>Перейти на сайт</a></p>";
?>
