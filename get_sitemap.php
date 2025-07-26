<?php
// Получение полной структуры сайта из OpenCart
header('Content-Type: application/json; charset=utf-8');

require_once('C:/xampp/htdocs/flowers_belka/config.php');

try {
    $mysqli = new mysqli(DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT);
    $mysqli->set_charset("utf8");
    
    if ($mysqli->connect_error) {
        die(json_encode(['error' => 'Ошибка подключения к БД: ' . $mysqli->connect_error]));
    }

    $sitemap = [];

    echo "🗺️ Создаем sitemap сайта...\n\n";

    // 1. Главная страница
    $sitemap[] = [
        'url' => '/',
        'title' => 'Главная страница',
        'type' => 'home',
        'priority' => 1.0
    ];

    // 2. Категории товаров
    echo "📂 Получаем категории...\n";
    $categories_query = "
        SELECT 
            c.category_id,
            COALESCE(cd.name, 'Без названия') as name,
            COALESCE(cd.description, '') as description,
            c.parent_id,
            c.sort_order
        FROM oc_category c
        LEFT JOIN oc_category_description cd ON (c.category_id = cd.category_id AND cd.language_id = 1)
        WHERE c.status = 1
        ORDER BY c.sort_order, cd.name
    ";
    
    $result = $mysqli->query($categories_query);
    while ($row = $result->fetch_assoc()) {
        $slug = generateSlug($row['name']);
        $sitemap[] = [
            'url' => "/category/{$slug}",
            'title' => $row['name'],
            'type' => 'category',
            'id' => $row['category_id'],
            'description' => $row['description'],
            'priority' => 0.8
        ];
    }
    echo "Найдено категорий: " . $result->num_rows . "\n";

    // 3. Товары
    echo "🛍️ Получаем товары...\n";
    $products_query = "
        SELECT 
            p.product_id,
            COALESCE(pd.name, p.model) as name,
            COALESCE(pd.description, '') as description,
            COALESCE(pd.meta_title, '') as meta_title,
            COALESCE(pd.meta_description, '') as meta_description,
            p.price,
            p.image,
            p.status
        FROM oc_product p
        LEFT JOIN oc_product_description pd ON (p.product_id = pd.product_id AND pd.language_id = 1)
        WHERE p.status = 1
        ORDER BY p.sort_order, pd.name
        LIMIT 50
    ";
    
    $result = $mysqli->query($products_query);
    while ($row = $result->fetch_assoc()) {
        $slug = generateSlug($row['name']);
        $sitemap[] = [
            'url' => "/product/{$slug}",
            'title' => $row['name'],
            'type' => 'product',
            'id' => $row['product_id'],
            'description' => $row['description'],
            'meta_title' => $row['meta_title'],
            'meta_description' => $row['meta_description'],
            'price' => $row['price'],
            'image' => $row['image'],
            'priority' => 0.6
        ];
    }
    echo "Найдено товаров: " . $result->num_rows . "\n";

    // 4. Информационные страницы
    echo "📄 Получаем информационные страницы...\n";
    $pages_query = "
        SELECT 
            i.information_id,
            COALESCE(id.title, 'Без названия') as title,
            COALESCE(id.description, '') as description,
            COALESCE(id.meta_title, '') as meta_title,
            COALESCE(id.meta_description, '') as meta_description,
            i.sort_order
        FROM oc_information i
        LEFT JOIN oc_information_description id ON (i.information_id = id.information_id AND id.language_id = 1)
        WHERE i.status = 1
        ORDER BY i.sort_order, id.title
    ";
    
    $result = $mysqli->query($pages_query);
    while ($row = $result->fetch_assoc()) {
        $slug = generateSlug($row['title']);
        $sitemap[] = [
            'url' => "/info/{$slug}",
            'title' => $row['title'],
            'type' => 'page',
            'id' => $row['information_id'],
            'description' => $row['description'],
            'meta_title' => $row['meta_title'],
            'meta_description' => $row['meta_description'],
            'priority' => 0.5
        ];
    }
    echo "Найдено страниц: " . $result->num_rows . "\n";

    // 5. Служебные страницы
    $service_pages = [
        ['url' => '/catalog', 'title' => 'Каталог товаров', 'type' => 'catalog', 'priority' => 0.9],
        ['url' => '/search', 'title' => 'Поиск', 'type' => 'search', 'priority' => 0.4],
        ['url' => '/cart', 'title' => 'Корзина', 'type' => 'cart', 'priority' => 0.3],
        ['url' => '/checkout', 'title' => 'Оформление заказа', 'type' => 'checkout', 'priority' => 0.3],
        ['url' => '/account', 'title' => 'Личный кабинет', 'type' => 'account', 'priority' => 0.4],
        ['url' => '/contact', 'title' => 'Контакты', 'type' => 'contact', 'priority' => 0.7],
    ];

    foreach ($service_pages as $page) {
        $sitemap[] = $page;
    }

    $mysqli->close();

    // Сохраняем sitemap
    $json_data = json_encode($sitemap, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    file_put_contents('C:/xampp/htdocs/flowers_belka_new/public/sitemap.json', $json_data);
    
    echo "\n✅ Sitemap создан!\n";
    echo "📁 Сохранен в public/sitemap.json\n";
    echo "📊 Всего страниц: " . count($sitemap) . "\n\n";
    
    // Группировка по типам
    $types = [];
    foreach ($sitemap as $page) {
        $types[$page['type']] = ($types[$page['type']] ?? 0) + 1;
    }
    
    echo "📋 Структура сайта:\n";
    foreach ($types as $type => $count) {
        echo "   - " . ucfirst($type) . ": $count\n";
    }
    
} catch (Exception $e) {
    echo "❌ Ошибка: " . $e->getMessage() . "\n";
}

function generateSlug($text) {
    // Транслитерация русских букв
    $transliteration = [
        'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd',
        'е' => 'e', 'ё' => 'yo', 'ж' => 'zh', 'з' => 'z', 'и' => 'i',
        'й' => 'y', 'к' => 'k', 'л' => 'l', 'м' => 'm', 'н' => 'n',
        'о' => 'o', 'п' => 'p', 'р' => 'r', 'с' => 's', 'т' => 't',
        'у' => 'u', 'ф' => 'f', 'х' => 'h', 'ц' => 'ts', 'ч' => 'ch',
        'ш' => 'sh', 'щ' => 'sch', 'ъ' => '', 'ы' => 'y', 'ь' => '',
        'э' => 'e', 'ю' => 'yu', 'я' => 'ya'
    ];
    
    $text = mb_strtolower($text, 'UTF-8');
    $text = strtr($text, $transliteration);
    $text = preg_replace('/[^a-z0-9\s-]/', '', $text);
    $text = preg_replace('/[\s-]+/', '-', $text);
    $text = trim($text, '-');
    
    return $text;
}
?>
