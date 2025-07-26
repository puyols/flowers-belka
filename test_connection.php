<?php
// Тест подключения к MySQL
echo "<h2>Тест подключения к базе данных</h2>";

$host = 'localhost';
$username = 'root';
$password = '';
$port = '3306';

echo "<p>Попытка подключения к MySQL...</p>";

try {
    $connection = new mysqli($host, $username, $password, '', $port);
    
    if ($connection->connect_error) {
        echo "<p style='color: red;'>Ошибка подключения: " . $connection->connect_error . "</p>";
        echo "<p><strong>Проверьте:</strong></p>";
        echo "<ul>";
        echo "<li>Запущен ли MySQL в XAMPP Control Panel</li>";
        echo "<li>Правильность настроек подключения</li>";
        echo "<li>Доступность порта 3306</li>";
        echo "</ul>";
    } else {
        echo "<p style='color: green;'>✓ Подключение к MySQL успешно!</p>";
        
        // Проверяем существование базы данных
        $db_name = 'flowers_belka_new';
        $result = $connection->query("SHOW DATABASES LIKE '$db_name'");
        
        if ($result->num_rows > 0) {
            echo "<p style='color: green;'>✓ База данных '$db_name' существует</p>";
        } else {
            echo "<p style='color: orange;'>⚠ База данных '$db_name' не найдена</p>";
            echo "<p>Создаю базу данных...</p>";
            
            if ($connection->query("CREATE DATABASE $db_name CHARACTER SET utf8 COLLATE utf8_general_ci")) {
                echo "<p style='color: green;'>✓ База данных '$db_name' создана успешно!</p>";
            } else {
                echo "<p style='color: red;'>Ошибка создания базы данных: " . $connection->error . "</p>";
            }
        }
        
        $connection->close();
    }
} catch (Exception $e) {
    echo "<p style='color: red;'>Исключение: " . $e->getMessage() . "</p>";
}

echo "<hr>";
echo "<p><a href='http://localhost/flowers_belka'>← Вернуться к сайту</a></p>";
echo "<p><a href='http://localhost/phpmyadmin'>Открыть phpMyAdmin</a></p>";
?>