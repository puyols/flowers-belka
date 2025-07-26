<?php
/**
 * Скрипт для проверки корректности миграции OpenCart
 */

echo "<h1>🔍 Проверка миграции flowers-belka.ru</h1>";

// Проверка файлов и папок
echo "<h2>📁 Проверка файловой структуры:</h2>";

$required_files = [
    'index.php' => 'Главный файл сайта',
    'config.php' => 'Конфигурация сайта',
    'admin/config.php' => 'Конфигурация админки',
    '.htaccess' => 'Настройки сервера'
];

$required_dirs = [
    'admin' => 'Админ-панель',
    'catalog' => 'Фронтенд сайта',
    'system' => 'Ядро OpenCart',
    'image' => 'Изображения',
    'storage' => 'Хранилище данных',
    'storage/cache' => 'Кэш',
    'storage/logs' => 'Логи'
];

foreach ($required_files as $file => $desc) {
    if (file_exists($file)) {
        echo "✅ $desc: <code>$file</code><br>";
    } else {
        echo "❌ $desc: <code>$file</code> - НЕ НАЙДЕН<br>";
    }
}

foreach ($required_dirs as $dir => $desc) {
    if (is_dir($dir)) {
        echo "✅ $desc: <code>$dir/</code><br>";
    } else {
        echo "❌ $desc: <code>$dir/</code> - НЕ НАЙДЕНА<br>";
    }
}

// Проверка конфигурации
echo "<h2>⚙️ Проверка конфигурации:</h2>";

if (file_exists('config.php')) {
    include_once('config.php');
    
    echo "🔗 HTTP_SERVER: " . (defined('HTTP_SERVER') ? HTTP_SERVER : 'НЕ ОПРЕДЕЛЕН') . "<br>";
    echo "🗄️ База данных: " . (defined('DB_DATABASE') ? DB_DATABASE : 'НЕ ОПРЕДЕЛЕНА') . "<br>";
    echo "📂 DIR_APPLICATION: " . (defined('DIR_APPLICATION') ? DIR_APPLICATION : 'НЕ ОПРЕДЕЛЕН') . "<br>";
    echo "🖼️ DIR_IMAGE: " . (defined('DIR_IMAGE') ? DIR_IMAGE : 'НЕ ОПРЕДЕЛЕН') . "<br>";
}

// Проверка подключения к базе данных
echo "<h2>🗄️ Проверка базы данных:</h2>";

if (defined('DB_HOSTNAME') && defined('DB_USERNAME') && defined('DB_DATABASE')) {
    try {
        $pdo = new PDO(
            "mysql:host=" . DB_HOSTNAME . ";dbname=" . DB_DATABASE . ";charset=utf8",
            DB_USERNAME,
            DB_PASSWORD
        );
        
        echo "✅ Подключение к базе данных успешно<br>";
        
        // Проверяем основные таблицы
        $tables = ['oc_product', 'oc_category', 'oc_setting', 'oc_user'];
        foreach ($tables as $table) {
            $stmt = $pdo->query("SELECT COUNT(*) FROM $table");
            $count = $stmt->fetchColumn();
            echo "📊 Таблица $table: $count записей<br>";
        }
        
        // Проверяем настройки сайта
        $stmt = $pdo->prepare("SELECT `key`, value FROM oc_setting WHERE `key` IN ('config_name', 'config_url', 'config_theme') AND store_id = 0");
        $stmt->execute();
        
        echo "<h3>🔧 Настройки сайта:</h3>";
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            echo "• {$row['key']}: {$row['value']}<br>";
        }
        
    } catch (PDOException $e) {
        echo "❌ Ошибка подключения к базе данных: " . $e->getMessage() . "<br>";
        echo "💡 Убедитесь, что база данных создана и импортирована<br>";
    }
} else {
    echo "❌ Конфигурация базы данных не найдена<br>";
}

// Проверка изображений
echo "<h2>🖼️ Проверка изображений:</h2>";

if (is_dir('image/catalog')) {
    $images = glob('image/catalog/*.{jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF}', GLOB_BRACE);
    echo "✅ Найдено изображений товаров: " . count($images) . "<br>";
    
    if (count($images) > 0) {
        echo "📸 Примеры изображений:<br>";
        for ($i = 0; $i < min(5, count($images)); $i++) {
            $img = basename($images[$i]);
            echo "• $img<br>";
        }
    }
} else {
    echo "❌ Папка image/catalog не найдена<br>";
}

// Проверка прав доступа
echo "<h2>🔐 Проверка прав доступа:</h2>";

$writable_dirs = ['storage/cache', 'storage/logs', 'storage/session', 'image'];
foreach ($writable_dirs as $dir) {
    if (is_dir($dir) && is_writable($dir)) {
        echo "✅ $dir - доступна для записи<br>";
    } else {
        echo "⚠️ $dir - НЕ доступна для записи (может потребоваться настройка прав)<br>";
    }
}

echo "<h2>🎉 Результат проверки:</h2>";
echo "<p><strong>Если все пункты отмечены ✅, миграция выполнена успешно!</strong></p>";
echo "<p>Для завершения настройки:</p>";
echo "<ol>";
echo "<li>Импортируйте базу данных: <code>mysql -u root flowers_belka_new &lt; localhost.sql</code></li>";
echo "<li>Выполните обновление настроек: <code>mysql -u root flowers_belka_new &lt; update_settings.sql</code></li>";
echo "<li>Откройте сайт: <a href='http://localhost/flowers_belka/' target='_blank'>http://localhost/flowers_belka/</a></li>";
echo "<li>Откройте админку: <a href='http://localhost/flowers_belka/admin/' target='_blank'>http://localhost/flowers_belka/admin/</a></li>";
echo "</ol>";
?>