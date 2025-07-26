<?php
/**
 * Полный экспорт товаров из OpenCart для Next.js сайта
 * Выгружает: названия, цены, описания, изображения, категории
 */

// Подключаем конфигурацию OpenCart
require_once('config.php');

try {
    // Подключение к базе данных
    $mysqli = new mysqli(DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT);
    
    if ($mysqli->connect_error) {
        throw new Exception("Ошибка подключения к БД: " . $mysqli->connect_error);
    }
    
    $mysqli->set_charset("utf8");
    echo "✅ Подключение к базе данных установлено\n";

    // Экспорт товаров с полной информацией
    echo "📦 Экспортируем товары...\n";
    
    // Сначала проверим, какие таблицы существуют
    $tables_check = $mysqli->query("SHOW TABLES");
    $existing_tables = [];
    while ($row = $tables_check->fetch_array()) {
        $existing_tables[] = $row[0];
    }

    echo "Найденные таблицы: " . implode(', ', $existing_tables) . "\n";

    // Упрощенный запрос для начала
    $products_query = "
        SELECT
            p.product_id,
            COALESCE(pd.name, p.model, CONCAT('Товар #', p.product_id)) as name,
            COALESCE(pd.description, '') as description,
            COALESCE(pd.meta_description, '') as meta_description,
            p.model,
            p.sku,
            p.price,
            p.image,
            p.quantity,
            p.status,
            p.sort_order,
            p.date_added,
            p.date_modified,
            COALESCE(p.viewed, 0) as viewed
        FROM oc_product p
        LEFT JOIN oc_product_description pd ON (p.product_id = pd.product_id AND pd.language_id = 1)
        WHERE p.status = 1
        ORDER BY p.sort_order, p.product_id
        LIMIT 50
    ";
    
    $result = $mysqli->query($products_query);

    if (!$result) {
        throw new Exception("Ошибка выполнения запроса: " . $mysqli->error);
    }

    $products = [];

    while ($row = $result->fetch_assoc()) {
        // Получаем дополнительные изображения
        $additional_images = [];
        $images_query = "SELECT image FROM oc_product_image WHERE product_id = " . $row['product_id'] . " ORDER BY sort_order";
        $images_result = $mysqli->query($images_query);
        if ($images_result) {
            while ($img_row = $images_result->fetch_assoc()) {
                if (!empty($img_row['image'])) {
                    $additional_images[] = $img_row['image'];
                }
            }
        }

        // Формируем slug из названия
        $slug = strtolower(preg_replace('/[^a-zA-Z0-9а-яё\s]/u', '', $row['name']));
        $slug = preg_replace('/\s+/', '-', $slug);
        $slug = trim($slug, '-') ?: 'product-' . $row['product_id'];

        // Формируем массив изображений
        $all_images = [];
        if (!empty($row['image'])) {
            $all_images[] = '/images/products/' . basename($row['image']);
        }
        foreach ($additional_images as $img) {
            $all_images[] = '/images/products/' . basename($img);
        }

        // Если нет изображений, добавляем placeholder
        if (empty($all_images)) {
            $all_images[] = '/images/placeholder.jpg';
        }

        $products[] = [
            'id' => (int)$row['product_id'],
            'name' => $row['name'],
            'slug' => $slug,
            'price' => (float)$row['price'],
            'images' => $all_images,
            'description' => $row['description'],
            'shortDescription' => $row['meta_description'],
            'category' => 'Букеты', // Временно
            'model' => $row['model'],
            'sku' => $row['sku'],
            'quantity' => (int)$row['quantity'],
            'inStock' => (int)$row['quantity'] > 0,
            'isHit' => (int)$row['viewed'] > 50,
            'sortOrder' => (int)$row['sort_order'],
            'dateAdded' => $row['date_added']
        ];
    }
    
    echo "Найдено товаров: " . count($products) . "\n";
    
    // Экспорт категорий (упрощенный)
    echo "📁 Экспортируем категории...\n";

    $categories_query = "
        SELECT
            c.category_id,
            COALESCE(cd.name, CONCAT('Категория #', c.category_id)) as name,
            COALESCE(cd.description, '') as description,
            c.parent_id,
            c.sort_order,
            c.status
        FROM oc_category c
        LEFT JOIN oc_category_description cd ON (c.category_id = cd.category_id AND cd.language_id = 1)
        WHERE c.status = 1
        ORDER BY c.sort_order, c.category_id
    ";

    $result = $mysqli->query($categories_query);
    $categories = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $slug = strtolower(preg_replace('/[^a-zA-Z0-9а-яё\s]/u', '', $row['name']));
            $slug = preg_replace('/\s+/', '-', $slug);
            $slug = trim($slug, '-') ?: 'category-' . $row['category_id'];

            $categories[] = [
                'id' => (int)$row['category_id'],
                'name' => $row['name'],
                'slug' => $slug,
                'description' => $row['description'],
                'parentId' => (int)$row['parent_id'],
                'sortOrder' => (int)$row['sort_order']
            ];
        }
    }

    echo "Найдено категорий: " . count($categories) . "\n";
    
    // Формируем итоговые данные
    $export_data = [
        'products' => $products,
        'categories' => $categories,
        'exportDate' => date('Y-m-d H:i:s'),
        'totalProducts' => count($products),
        'totalCategories' => count($categories)
    ];
    
    $mysqli->close();
    
    // Сохраняем в JSON файл
    $json_data = json_encode($export_data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    file_put_contents('opencart_products_export.json', $json_data);
    
    echo "\n🎉 Экспорт завершен успешно!\n";
    echo "📄 Данные сохранены в: opencart_products_export.json\n";
    echo "📊 Статистика:\n";
    echo "   - Товаров: " . count($products) . "\n";
    echo "   - Категорий: " . count($categories) . "\n";
    echo "   - Размер файла: " . round(filesize('opencart_products_export.json') / 1024, 2) . " KB\n";
    
} catch (Exception $e) {
    echo "❌ Ошибка: " . $e->getMessage() . "\n";
}
?>
