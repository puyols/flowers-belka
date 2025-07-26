<?php
// Скрипт для импорта базы данных
echo "<h2>Импорт базы данных flowers_belka</h2>";

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'flowers_belka_new';

try {
    $connection = new mysqli($host, $username, $password, $database);
    
    if ($connection->connect_error) {
        die("Ошибка подключения: " . $connection->connect_error);
    }
    
    echo "<p>✓ Подключение к базе данных успешно</p>";
    
    // Читаем SQL файл
    $sql_file = 'full_db.sql';
    if (!file_exists($sql_file)) {
        die("Файл $sql_file не найден");
    }
    
    $sql_content = file_get_contents($sql_file);
    
    // Заменяем старое имя базы данных на новое
    $sql_content = str_replace('87_8720b1bd0', 'flowers_belka_new', $sql_content);
    $sql_content = str_replace('USE `87_8720b1bd0`;', 'USE `flowers_belka_new`;', $sql_content);
    
    echo "<p>Импортирую данные...</p>";
    
    // Выполняем SQL команды
    if ($connection->multi_query($sql_content)) {
        do {
            // Получаем результат каждого запроса
            if ($result = $connection->store_result()) {
                $result->free();
            }
        } while ($connection->next_result());
        
        echo "<p style='color: green;'>✓ База данных импортирована успешно!</p>";
    } else {
        echo "<p style='color: red;'>Ошибка импорта: " . $connection->error . "</p>";
    }
    
    $connection->close();
    
} catch (Exception $e) {
    echo "<p style='color: red;'>Ошибка: " . $e->getMessage() . "</p>";
}

echo "<hr>";
echo "<p><a href='http://localhost/flowers_belka'>Открыть сайт</a></p>";
echo "<p><a href='http://localhost/flowers_belka/admin'>Открыть админку</a></p>";
?>