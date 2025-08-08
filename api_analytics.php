<?php
// Настройки CORS
header('Access-Control-Allow-Origin: http://localhost:3001');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Подключение к базе данных
require_once 'config.php';

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOSTNAME . ";dbname=" . DB_DATABASE . ";charset=utf8mb4",
        DB_USERNAME,
        DB_PASSWORD,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database connection failed: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Получаем действие
$action = $_GET['action'] ?? '';

// Маршрутизация
switch ($action) {
    case 'dashboard':
        getDashboardData($pdo);
        break;
    case 'sales_report':
        getSalesReport($pdo);
        break;
    case 'orders_report':
        getOrdersReport($pdo);
        break;
    case 'products_report':
        getProductsReport($pdo);
        break;
    case 'customers_report':
        getCustomersReport($pdo);
        break;
    case 'performance_metrics':
        getPerformanceMetrics($pdo);
        break;
    case 'log_event':
        logAnalyticsEvent($pdo);
        break;
    case 'system_health':
        getSystemHealth($pdo);
        break;
    case 'real_time_stats':
        getRealTimeStats($pdo);
        break;
    case 'export_report':
        exportReport($pdo);
        break;
    default:
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'error' => 'Action not found',
            'available_actions' => [
                'dashboard', 'sales_report', 'orders_report', 'products_report',
                'customers_report', 'performance_metrics', 'log_event',
                'system_health', 'real_time_stats', 'export_report'
            ]
        ], JSON_UNESCAPED_UNICODE);
}

// ===== ФУНКЦИИ АНАЛИТИКИ =====

// Данные для главного дашборда
function getDashboardData($pdo) {
    try {
        $period = $_GET['period'] ?? '30'; // дни
        $date_from = date('Y-m-d', strtotime("-{$period} days"));
        $date_to = date('Y-m-d');
        
        $dashboard = [];
        
        // Общая статистика
        $dashboard['summary'] = getSummaryStats($pdo, $date_from, $date_to);
        
        // Продажи по дням
        $dashboard['sales_chart'] = getSalesChart($pdo, $date_from, $date_to);
        
        // Топ товары
        $dashboard['top_products'] = getTopProducts($pdo, $date_from, $date_to);
        
        // Последние заказы
        $dashboard['recent_orders'] = getRecentOrders($pdo, 10);
        
        // Статистика по категориям
        $dashboard['categories_stats'] = getCategoriesStats($pdo, $date_from, $date_to);
        
        // Конверсия
        $dashboard['conversion'] = getConversionStats($pdo, $date_from, $date_to);
        
        echo json_encode([
            'success' => true,
            'dashboard' => $dashboard,
            'period' => $period,
            'date_range' => ['from' => $date_from, 'to' => $date_to]
        ], JSON_UNESCAPED_UNICODE);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

// Общая статистика
function getSummaryStats($pdo, $date_from, $date_to) {
    // Продажи за период
    $stmt = $pdo->prepare("
        SELECT 
            COUNT(*) as total_orders,
            SUM(total) as total_revenue,
            AVG(total) as avg_order_value,
            COUNT(DISTINCT customer_id) as unique_customers
        FROM " . DB_PREFIX . "order 
        WHERE order_status_id > 0 
        AND DATE(date_added) BETWEEN ? AND ?
    ");
    $stmt->execute([$date_from, $date_to]);
    $current = $stmt->fetch();
    
    // Сравнение с предыдущим периодом
    $prev_date_from = date('Y-m-d', strtotime($date_from . " -" . (strtotime($date_to) - strtotime($date_from)) / 86400 . " days"));
    $prev_date_to = date('Y-m-d', strtotime($date_from . " -1 day"));
    
    $stmt->execute([$prev_date_from, $prev_date_to]);
    $previous = $stmt->fetch();
    
    // Расчет изменений
    $changes = [];
    foreach (['total_orders', 'total_revenue', 'avg_order_value', 'unique_customers'] as $metric) {
        $current_val = floatval($current[$metric] ?? 0);
        $prev_val = floatval($previous[$metric] ?? 0);
        
        if ($prev_val > 0) {
            $changes[$metric] = round((($current_val - $prev_val) / $prev_val) * 100, 2);
        } else {
            $changes[$metric] = $current_val > 0 ? 100 : 0;
        }
    }
    
    return [
        'current' => $current,
        'previous' => $previous,
        'changes' => $changes
    ];
}

// График продаж
function getSalesChart($pdo, $date_from, $date_to) {
    $stmt = $pdo->prepare("
        SELECT 
            DATE(date_added) as date,
            COUNT(*) as orders_count,
            SUM(total) as revenue,
            COUNT(DISTINCT customer_id) as customers_count
        FROM " . DB_PREFIX . "order 
        WHERE order_status_id > 0 
        AND DATE(date_added) BETWEEN ? AND ?
        GROUP BY DATE(date_added)
        ORDER BY date
    ");
    $stmt->execute([$date_from, $date_to]);
    
    return $stmt->fetchAll();
}

// Топ товары
function getTopProducts($pdo, $date_from, $date_to, $limit = 10) {
    $stmt = $pdo->prepare("
        SELECT 
            op.product_id,
            op.name,
            SUM(op.quantity) as total_quantity,
            SUM(op.total) as total_revenue,
            COUNT(DISTINCT op.order_id) as orders_count,
            AVG(op.price) as avg_price
        FROM " . DB_PREFIX . "order_product op
        JOIN " . DB_PREFIX . "order o ON op.order_id = o.order_id
        WHERE o.order_status_id > 0 
        AND DATE(o.date_added) BETWEEN ? AND ?
        GROUP BY op.product_id, op.name
        ORDER BY total_revenue DESC
        LIMIT ?
    ");
    $stmt->execute([$date_from, $date_to, $limit]);
    
    return $stmt->fetchAll();
}

// Последние заказы
function getRecentOrders($pdo, $limit = 10) {
    $stmt = $pdo->prepare("
        SELECT 
            order_id,
            firstname,
            lastname,
            email,
            telephone,
            total,
            order_status_id,
            date_added
        FROM " . DB_PREFIX . "order 
        ORDER BY date_added DESC
        LIMIT ?
    ");
    $stmt->execute([$limit]);
    
    return $stmt->fetchAll();
}

// Статистика по категориям
function getCategoriesStats($pdo, $date_from, $date_to) {
    $stmt = $pdo->prepare("
        SELECT 
            cd.name as category_name,
            COUNT(DISTINCT op.order_id) as orders_count,
            SUM(op.quantity) as total_quantity,
            SUM(op.total) as total_revenue
        FROM " . DB_PREFIX . "order_product op
        JOIN " . DB_PREFIX . "order o ON op.order_id = o.order_id
        JOIN " . DB_PREFIX . "product p ON op.product_id = p.product_id
        JOIN " . DB_PREFIX . "product_to_category ptc ON p.product_id = ptc.product_id
        JOIN " . DB_PREFIX . "category_description cd ON ptc.category_id = cd.category_id
        WHERE o.order_status_id > 0 
        AND DATE(o.date_added) BETWEEN ? AND ?
        AND cd.language_id = 1
        GROUP BY cd.category_id, cd.name
        ORDER BY total_revenue DESC
    ");
    $stmt->execute([$date_from, $date_to]);
    
    return $stmt->fetchAll();
}

// Статистика конверсии
function getConversionStats($pdo, $date_from, $date_to) {
    // Получаем данные из логов аналитики (если есть)
    try {
        $stmt = $pdo->prepare("
            SELECT 
                COUNT(CASE WHEN event_type = 'page_view' THEN 1 END) as page_views,
                COUNT(CASE WHEN event_type = 'product_view' THEN 1 END) as product_views,
                COUNT(CASE WHEN event_type = 'add_to_cart' THEN 1 END) as add_to_cart,
                COUNT(CASE WHEN event_type = 'checkout_start' THEN 1 END) as checkout_starts,
                COUNT(CASE WHEN event_type = 'purchase' THEN 1 END) as purchases
            FROM " . DB_PREFIX . "analytics_events 
            WHERE DATE(created_at) BETWEEN ? AND ?
        ");
        $stmt->execute([$date_from, $date_to]);
        $events = $stmt->fetch();
        
        // Расчет конверсии
        $conversion = [];
        if ($events['page_views'] > 0) {
            $conversion['product_view_rate'] = round(($events['product_views'] / $events['page_views']) * 100, 2);
            $conversion['cart_rate'] = round(($events['add_to_cart'] / $events['page_views']) * 100, 2);
            $conversion['checkout_rate'] = round(($events['checkout_starts'] / $events['page_views']) * 100, 2);
            $conversion['purchase_rate'] = round(($events['purchases'] / $events['page_views']) * 100, 2);
        }
        
        return array_merge($events, $conversion);
        
    } catch (Exception $e) {
        // Если таблицы аналитики нет, возвращаем базовые данные
        $stmt = $pdo->prepare("
            SELECT COUNT(*) as purchases
            FROM " . DB_PREFIX . "order 
            WHERE order_status_id > 0 
            AND DATE(date_added) BETWEEN ? AND ?
        ");
        $stmt->execute([$date_from, $date_to]);
        
        return $stmt->fetch();
    }
}

// Отчет по продажам
function getSalesReport($pdo) {
    try {
        $period = $_GET['period'] ?? 'month';
        $date_from = $_GET['date_from'] ?? date('Y-m-01');
        $date_to = $_GET['date_to'] ?? date('Y-m-d');
        
        $group_by = '';
        $date_format = '';
        
        switch ($period) {
            case 'day':
                $group_by = 'DATE(date_added)';
                $date_format = '%Y-%m-%d';
                break;
            case 'week':
                $group_by = 'YEARWEEK(date_added)';
                $date_format = '%Y-W%u';
                break;
            case 'month':
                $group_by = 'DATE_FORMAT(date_added, "%Y-%m")';
                $date_format = '%Y-%m';
                break;
            case 'year':
                $group_by = 'YEAR(date_added)';
                $date_format = '%Y';
                break;
        }
        
        $stmt = $pdo->prepare("
            SELECT 
                DATE_FORMAT(date_added, ?) as period,
                COUNT(*) as orders_count,
                SUM(total) as total_revenue,
                AVG(total) as avg_order_value,
                MIN(total) as min_order_value,
                MAX(total) as max_order_value,
                COUNT(DISTINCT customer_id) as unique_customers
            FROM " . DB_PREFIX . "order 
            WHERE order_status_id > 0 
            AND DATE(date_added) BETWEEN ? AND ?
            GROUP BY {$group_by}
            ORDER BY period
        ");
        $stmt->execute([$date_format, $date_from, $date_to]);
        
        echo json_encode([
            'success' => true,
            'report' => $stmt->fetchAll(),
            'period' => $period,
            'date_range' => ['from' => $date_from, 'to' => $date_to]
        ], JSON_UNESCAPED_UNICODE);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

// Отчет по заказам
function getOrdersReport($pdo) {
    try {
        $status = $_GET['status'] ?? 'all';
        $date_from = $_GET['date_from'] ?? date('Y-m-01');
        $date_to = $_GET['date_to'] ?? date('Y-m-d');
        $limit = intval($_GET['limit'] ?? 100);
        $offset = intval($_GET['offset'] ?? 0);
        
        $where_status = '';
        if ($status !== 'all') {
            $where_status = " AND o.order_status_id = " . intval($status);
        }
        
        // Получаем заказы
        $stmt = $pdo->prepare("
            SELECT 
                o.order_id,
                o.firstname,
                o.lastname,
                o.email,
                o.telephone,
                o.total,
                o.order_status_id,
                os.name as status_name,
                o.date_added,
                o.date_modified,
                COUNT(op.product_id) as items_count
            FROM " . DB_PREFIX . "order o
            LEFT JOIN " . DB_PREFIX . "order_status os ON o.order_status_id = os.order_status_id
            LEFT JOIN " . DB_PREFIX . "order_product op ON o.order_id = op.order_id
            WHERE DATE(o.date_added) BETWEEN ? AND ?
            {$where_status}
            AND os.language_id = 1
            GROUP BY o.order_id
            ORDER BY o.date_added DESC
            LIMIT ? OFFSET ?
        ");
        $stmt->execute([$date_from, $date_to, $limit, $offset]);
        $orders = $stmt->fetchAll();
        
        // Получаем общее количество
        $stmt = $pdo->prepare("
            SELECT COUNT(*) as total
            FROM " . DB_PREFIX . "order o
            WHERE DATE(o.date_added) BETWEEN ? AND ?
            {$where_status}
        ");
        $stmt->execute([$date_from, $date_to]);
        $total = $stmt->fetch()['total'];
        
        echo json_encode([
            'success' => true,
            'orders' => $orders,
            'pagination' => [
                'total' => $total,
                'limit' => $limit,
                'offset' => $offset,
                'pages' => ceil($total / $limit)
            ]
        ], JSON_UNESCAPED_UNICODE);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

// Логирование событий аналитики
function logAnalyticsEvent($pdo) {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            $input = $_POST;
        }
        
        $event_type = $input['event_type'] ?? '';
        $event_data = $input['event_data'] ?? [];
        $user_id = intval($input['user_id'] ?? 0);
        $session_id = $input['session_id'] ?? '';
        $ip_address = $_SERVER['REMOTE_ADDR'] ?? '';
        $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';
        
        if (empty($event_type)) {
            throw new Exception('Event type is required');
        }
        
        // Создаем таблицу если не существует
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS " . DB_PREFIX . "analytics_events (
                id INT AUTO_INCREMENT PRIMARY KEY,
                event_type VARCHAR(100) NOT NULL,
                event_data JSON,
                user_id INT DEFAULT 0,
                session_id VARCHAR(255),
                ip_address VARCHAR(45),
                user_agent TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_event_type (event_type),
                INDEX idx_user_id (user_id),
                INDEX idx_session_id (session_id),
                INDEX idx_created_at (created_at)
            )
        ");
        
        $stmt = $pdo->prepare("
            INSERT INTO " . DB_PREFIX . "analytics_events 
            (event_type, event_data, user_id, session_id, ip_address, user_agent) 
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $event_type,
            json_encode($event_data, JSON_UNESCAPED_UNICODE),
            $user_id,
            $session_id,
            $ip_address,
            $user_agent
        ]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Event logged successfully',
            'event_id' => $pdo->lastInsertId()
        ], JSON_UNESCAPED_UNICODE);
        
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

// Мониторинг системы
function getSystemHealth($pdo) {
    try {
        $health = [];
        
        // Проверка базы данных
        $start_time = microtime(true);
        $stmt = $pdo->query("SELECT 1");
        $db_response_time = round((microtime(true) - $start_time) * 1000, 2);
        
        $health['database'] = [
            'status' => 'healthy',
            'response_time_ms' => $db_response_time
        ];
        
        // Проверка дискового пространства
        $disk_free = disk_free_space('.');
        $disk_total = disk_total_space('.');
        $disk_usage = round((($disk_total - $disk_free) / $disk_total) * 100, 2);
        
        $health['disk'] = [
            'usage_percent' => $disk_usage,
            'free_space_gb' => round($disk_free / 1024 / 1024 / 1024, 2),
            'total_space_gb' => round($disk_total / 1024 / 1024 / 1024, 2),
            'status' => $disk_usage > 90 ? 'warning' : 'healthy'
        ];
        
        // Проверка памяти
        $memory_usage = memory_get_usage(true);
        $memory_peak = memory_get_peak_usage(true);
        $memory_limit = ini_get('memory_limit');
        
        $health['memory'] = [
            'current_mb' => round($memory_usage / 1024 / 1024, 2),
            'peak_mb' => round($memory_peak / 1024 / 1024, 2),
            'limit' => $memory_limit,
            'status' => 'healthy'
        ];
        
        // Проверка логов ошибок
        $error_log_file = ini_get('error_log');
        if ($error_log_file && file_exists($error_log_file)) {
            $error_log_size = filesize($error_log_file);
            $health['error_log'] = [
                'size_mb' => round($error_log_size / 1024 / 1024, 2),
                'status' => $error_log_size > 100 * 1024 * 1024 ? 'warning' : 'healthy'
            ];
        }
        
        // Общий статус
        $overall_status = 'healthy';
        foreach ($health as $component) {
            if (isset($component['status']) && $component['status'] === 'warning') {
                $overall_status = 'warning';
                break;
            }
        }
        
        echo json_encode([
            'success' => true,
            'health' => $health,
            'overall_status' => $overall_status,
            'timestamp' => date('Y-m-d H:i:s')
        ], JSON_UNESCAPED_UNICODE);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage(),
            'overall_status' => 'error'
        ], JSON_UNESCAPED_UNICODE);
    }
}

// Статистика в реальном времени
function getRealTimeStats($pdo) {
    try {
        $stats = [];
        
        // Заказы за последние 24 часа
        $stmt = $pdo->prepare("
            SELECT 
                COUNT(*) as orders_24h,
                SUM(total) as revenue_24h
            FROM " . DB_PREFIX . "order 
            WHERE order_status_id > 0 
            AND date_added >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
        ");
        $stmt->execute();
        $stats['last_24h'] = $stmt->fetch();
        
        // Заказы за последний час
        $stmt = $pdo->prepare("
            SELECT 
                COUNT(*) as orders_1h,
                SUM(total) as revenue_1h
            FROM " . DB_PREFIX . "order 
            WHERE order_status_id > 0 
            AND date_added >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
        ");
        $stmt->execute();
        $stats['last_1h'] = $stmt->fetch();
        
        // Активные сессии (примерная оценка)
        try {
            $stmt = $pdo->prepare("
                SELECT COUNT(DISTINCT session_id) as active_sessions
                FROM " . DB_PREFIX . "analytics_events 
                WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 MINUTE)
            ");
            $stmt->execute();
            $stats['active_sessions'] = $stmt->fetch()['active_sessions'];
        } catch (Exception $e) {
            $stats['active_sessions'] = 0;
        }
        
        // Последние заказы
        $stats['recent_orders'] = getRecentOrders($pdo, 5);
        
        echo json_encode([
            'success' => true,
            'stats' => $stats,
            'timestamp' => date('Y-m-d H:i:s')
        ], JSON_UNESCAPED_UNICODE);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}
?>
