<?php
// Экспорт данных из OpenCart для миграции на React сайт
header('Content-Type: application/json; charset=utf-8');

// Подключаем конфигурацию OpenCart
require_once('C:/xampp/htdocs/flowers_belka/config.php');

try {
    $mysqli = new mysqli(DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT);
    $mysqli->set_charset("utf8");
    
    if ($mysqli->connect_error) {
        die(json_encode(['error' => 'Ошибка подключения к БД: ' . $mysqli->connect_error]));
    }

    $data = [];

    // 1. Экспорт категорий
    echo "Экспортируем категории...\n";
    $categories_query = "
        SELECT 
            c.category_id,
            cd.name,
            cd.description,
            cd.meta_title,
            cd.meta_description,
            c.image,
            c.parent_id,
            c.sort_order,
            c.status
        FROM oc_category c
        LEFT JOIN oc_category_description cd ON c.category_id = cd.category_id
        WHERE cd.language_id = 1 AND c.status = 1
        ORDER BY c.sort_order, cd.name
    ";
    
    $result = $mysqli->query($categories_query);
    $categories = [];
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row;
    }
    $data['categories'] = $categories;
    echo "Найдено категорий: " . count($categories) . "\n";

    // 2. Экспорт товаров
    echo "Экспортируем товары...\n";
    $products_query = "
        SELECT 
            p.product_id,
            pd.name,
            pd.description,
            pd.meta_title,
            pd.meta_description,
            p.model,
            p.sku,
            p.price,
            p.image,
            p.quantity,
            p.status,
            p.sort_order,
            p.date_added,
            p.date_modified
        FROM oc_product p
        LEFT JOIN oc_product_description pd ON p.product_id = pd.product_id
        WHERE pd.language_id = 1 AND p.status = 1
        ORDER BY p.sort_order, pd.name
        LIMIT 50
    ";
    
    $result = $mysqli->query($products_query);
    $products = [];
    while ($row = $result->fetch_assoc()) {
        // Получаем категории товара
        $cat_query = "
            SELECT c.category_id, cd.name as category_name
            FROM oc_product_to_category pc
            LEFT JOIN oc_category c ON pc.category_id = c.category_id
            LEFT JOIN oc_category_description cd ON c.category_id = cd.category_id
            WHERE pc.product_id = " . $row['product_id'] . " AND cd.language_id = 1
        ";
        $cat_result = $mysqli->query($cat_query);
        $product_categories = [];
        while ($cat_row = $cat_result->fetch_assoc()) {
            $product_categories[] = $cat_row;
        }
        $row['categories'] = $product_categories;
        
        // Получаем дополнительные изображения
        $img_query = "
            SELECT image
            FROM oc_product_image
            WHERE product_id = " . $row['product_id'] . "
            ORDER BY sort_order
        ";
        $img_result = $mysqli->query($img_query);
        $images = [];
        while ($img_row = $img_result->fetch_assoc()) {
            $images[] = $img_row['image'];
        }
        $row['additional_images'] = $images;
        
        $products[] = $row;
    }
    $data['products'] = $products;
    echo "Найдено товаров: " . count($products) . "\n";

    // 3. Экспорт информационных страниц
    echo "Экспортируем страницы...\n";
    $pages_query = "
        SELECT 
            i.information_id,
            id.title,
            id.description,
            id.meta_title,
            id.meta_description,
            i.sort_order,
            i.status
        FROM oc_information i
        LEFT JOIN oc_information_description id ON i.information_id = id.information_id
        WHERE id.language_id = 1 AND i.status = 1
        ORDER BY i.sort_order, id.title
    ";
    
    $result = $mysqli->query($pages_query);
    $pages = [];
    while ($row = $result->fetch_assoc()) {
        $pages[] = $row;
    }
    $data['pages'] = $pages;
    echo "Найдено страниц: " . count($pages) . "\n";

    // 4. Экспорт настроек магазина
    echo "Экспортируем настройки...\n";
    $settings_query = "
        SELECT `key`, value
        FROM oc_setting
        WHERE store_id = 0 AND code = 'config'
        AND `key` IN ('config_name', 'config_title', 'config_meta_title', 'config_meta_description', 'config_address', 'config_telephone', 'config_email')
    ";
    
    $result = $mysqli->query($settings_query);
    $settings = [];
    while ($row = $result->fetch_assoc()) {
        $settings[$row['key']] = $row['value'];
    }
    $data['settings'] = $settings;

    $mysqli->close();

    // Сохраняем в файл
    $json_data = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    file_put_contents('exported_data.json', $json_data);
    
    echo "\n✅ Экспорт завершен!\n";
    echo "📁 Данные сохранены в exported_data.json\n";
    echo "📊 Статистика:\n";
    echo "   - Категорий: " . count($categories) . "\n";
    echo "   - Товаров: " . count($products) . "\n";
    echo "   - Страниц: " . count($pages) . "\n";
    
} catch (Exception $e) {
    echo "❌ Ошибка: " . $e->getMessage() . "\n";
}
?>
