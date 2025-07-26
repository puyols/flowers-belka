<?php
// Создание точной карты URL для сохранения структуры действующего сайта
header('Content-Type: application/json; charset=utf-8');

// Анализ sitemap действующего сайта
$sitemap_content = file_get_contents('https://flowers-belka.ru/sitemap.xml');

// Парсим XML
$xml = simplexml_load_string($sitemap_content);

$url_mapping = [];
$categories = [];
$products = [];

foreach ($xml->url as $url_entry) {
    $url = (string)$url_entry->loc;
    $title = isset($url_entry->image->title) ? (string)$url_entry->image->title : '';
    
    // Извлекаем путь после домена
    $path = parse_url($url, PHP_URL_PATH);
    
    // Определяем тип страницы по URL
    if (preg_match('/\/(bukety_tsvetov|rozy|tulpany|tsvety_v_korobke|sukhotsvety|noviygod|8marta|piony|podpiska_na_cvety)\/([^\/]+)$/', $path, $matches)) {
        // Это товар
        $category_slug = $matches[1];
        $product_slug = $matches[2];
        
        $products[] = [
            'original_url' => $path,
            'category' => $category_slug,
            'slug' => $product_slug,
            'title' => $title,
            'new_url' => "/product/{$product_slug}",
            'type' => 'product'
        ];
        
        // Добавляем категорию если еще не добавлена
        if (!isset($categories[$category_slug])) {
            $categories[$category_slug] = [
                'original_url' => "/{$category_slug}/",
                'slug' => $category_slug,
                'new_url' => "/category/{$category_slug}",
                'type' => 'category'
            ];
        }
    } 
    elseif (preg_match('/\/(bukety_tsvetov|rozy|tulpany|tsvety_v_korobke|sukhotsvety|noviygod|8marta|piony|podpiska_na_cvety|dostavka_moscow1)\/$/', $path, $matches)) {
        // Это категория
        $category_slug = $matches[1];
        $categories[$category_slug] = [
            'original_url' => $path,
            'slug' => $category_slug,
            'new_url' => "/category/{$category_slug}",
            'type' => 'category'
        ];
    }
    elseif (preg_match('/\/(o_nas|dostavka|pravila_i_usloviya)$/', $path, $matches)) {
        // Информационные страницы
        $page_slug = $matches[1];
        $url_mapping[] = [
            'original_url' => $path,
            'slug' => $page_slug,
            'new_url' => "/info/{$page_slug}",
            'type' => 'info'
        ];
    }
    elseif (preg_match('/\/novosti\//', $path)) {
        // Блог/новости
        $url_mapping[] = [
            'original_url' => $path,
            'new_url' => '/blog',
            'type' => 'blog'
        ];
    }
}

// Объединяем все маршруты
$all_routes = array_merge(
    array_values($categories),
    $products,
    $url_mapping
);

// Добавляем основные страницы
$main_pages = [
    ['original_url' => '/', 'new_url' => '/', 'type' => 'home'],
    ['original_url' => '/index.php?route=product/category&path=232', 'new_url' => '/category/dostavka_moscow1', 'type' => 'category'],
    ['original_url' => '/index.php?route=product/category&path=231', 'new_url' => '/category/bukety_tsvetov', 'type' => 'category'],
];

$all_routes = array_merge($all_routes, $main_pages);

// Создаем файл маппинга
$mapping_data = [
    'total_routes' => count($all_routes),
    'categories' => array_values($categories),
    'products' => $products,
    'info_pages' => array_filter($url_mapping, function($item) { return $item['type'] === 'info'; }),
    'all_routes' => $all_routes,
    'redirects' => [
        // Старые URL -> новые URL для редиректов
        '/bukety_tsvetov/' => '/category/bukety_tsvetov',
        '/rozy/' => '/category/rozy',
        '/tulpany/' => '/category/tulpany',
        '/tsvety_v_korobke/' => '/category/tsvety_v_korobke',
        '/sukhotsvety/' => '/category/sukhotsvety',
        '/noviygod/' => '/category/noviygod',
        '/8marta/' => '/category/8marta',
        '/piony/' => '/category/piony',
        '/podpiska_na_cvety/' => '/category/podpiska_na_cvety',
        '/o_nas' => '/info/o_nas',
        '/dostavka' => '/info/dostavka',
        '/pravila_i_usloviya' => '/info/pravila_i_usloviya'
    ]
];

// Сохраняем в файл
file_put_contents('C:/xampp/htdocs/flowers_belka_new/public/url_mapping.json', json_encode($mapping_data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

echo "✅ URL маппинг создан!\n";
echo "📊 Статистика:\n";
echo "   - Всего маршрутов: " . count($all_routes) . "\n";
echo "   - Категорий: " . count($categories) . "\n";
echo "   - Товаров: " . count($products) . "\n";
echo "   - Инфо страниц: " . count(array_filter($url_mapping, function($item) { return $item['type'] === 'info'; })) . "\n";
echo "📁 Сохранено в public/url_mapping.json\n";

?>
