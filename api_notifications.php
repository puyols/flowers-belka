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
    case 'send_email':
        sendEmailNotification($pdo);
        break;
    case 'send_sms':
        sendSMSNotification($pdo);
        break;
    case 'send_push':
        sendPushNotification($pdo);
        break;
    case 'order_notifications':
        sendOrderNotifications($pdo);
        break;
    case 'subscribe_push':
        subscribePushNotification($pdo);
        break;
    case 'get_notifications':
        getNotifications($pdo);
        break;
    case 'mark_read':
        markNotificationRead($pdo);
        break;
    case 'test_email':
        testEmailConfiguration($pdo);
        break;
    default:
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'error' => 'Action not found',
            'available_actions' => [
                'send_email', 'send_sms', 'send_push', 'order_notifications',
                'subscribe_push', 'get_notifications', 'mark_read', 'test_email'
            ]
        ], JSON_UNESCAPED_UNICODE);
}

// ===== ФУНКЦИИ EMAIL УВЕДОМЛЕНИЙ =====

function sendEmailNotification($pdo) {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            $input = $_POST;
        }
        
        $to = $input['to'] ?? '';
        $subject = $input['subject'] ?? '';
        $message = $input['message'] ?? '';
        $template = $input['template'] ?? 'default';
        $data = $input['data'] ?? [];
        
        if (empty($to) || empty($subject) || empty($message)) {
            throw new Exception('Поля to, subject и message обязательны');
        }
        
        // Загружаем шаблон email
        $html_message = loadEmailTemplate($template, $data, $message);
        
        // Отправляем email
        $result = sendEmail($to, $subject, $html_message, $message);
        
        // Сохраняем в лог
        logNotification($pdo, 'email', $to, $subject, $message, $result);
        
        echo json_encode([
            'success' => $result,
            'message' => $result ? 'Email отправлен успешно' : 'Ошибка отправки email'
        ], JSON_UNESCAPED_UNICODE);
        
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

function sendEmail($to, $subject, $html_message, $text_message) {
    // Настройки SMTP (можно вынести в конфиг)
    $smtp_host = 'smtp.gmail.com';
    $smtp_port = 587;
    $smtp_username = 'your-email@gmail.com'; // Замените на ваш email
    $smtp_password = 'your-app-password';    // Замените на ваш пароль приложения
    $from_email = 'noreply@flowers-belka.ru';
    $from_name = 'Flowers Belka';
    
    // Заголовки email
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . $from_name . ' <' . $from_email . '>',
        'Reply-To: ' . $from_email,
        'X-Mailer: PHP/' . phpversion()
    ];
    
    // Для простоты используем встроенную функцию mail()
    // В продакшене лучше использовать PHPMailer или SwiftMailer
    return mail($to, $subject, $html_message, implode("\r\n", $headers));
}

function loadEmailTemplate($template, $data, $default_message) {
    $templates = [
        'order_confirmation' => '
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #f8f9fa; padding: 20px; text-align: center;">
                    <h1 style="color: #28a745; margin: 0;">Flowers Belka</h1>
                    <p style="margin: 5px 0 0 0; color: #6c757d;">Доставка цветов в Путилково</p>
                </div>
                <div style="padding: 30px 20px;">
                    <h2 style="color: #333;">Заказ подтвержден!</h2>
                    <p>Спасибо за ваш заказ <strong>#' . ($data['order_id'] ?? 'N/A') . '</strong></p>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Детали заказа:</h3>
                        <p><strong>Сумма:</strong> ' . ($data['total'] ?? 'N/A') . ' ₽</p>
                        <p><strong>Адрес доставки:</strong> ' . ($data['address'] ?? 'N/A') . '</p>
                        <p><strong>Телефон:</strong> ' . ($data['phone'] ?? 'N/A') . '</p>
                    </div>
                    <p>Мы свяжемся с вами в ближайшее время для подтверждения заказа.</p>
                </div>
                <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 14px;">
                    <p>С уважением, команда Flowers Belka</p>
                    <p>Телефон: +7 (999) 123-45-67 | Email: info@flowers-belka.ru</p>
                </div>
            </div>
        ',
        'order_status' => '
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #f8f9fa; padding: 20px; text-align: center;">
                    <h1 style="color: #28a745; margin: 0;">Flowers Belka</h1>
                </div>
                <div style="padding: 30px 20px;">
                    <h2 style="color: #333;">Статус заказа изменен</h2>
                    <p>Заказ <strong>#' . ($data['order_id'] ?? 'N/A') . '</strong></p>
                    <p><strong>Новый статус:</strong> ' . ($data['status'] ?? 'N/A') . '</p>
                    <p>' . $default_message . '</p>
                </div>
            </div>
        ',
        'default' => '
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #f8f9fa; padding: 20px; text-align: center;">
                    <h1 style="color: #28a745; margin: 0;">Flowers Belka</h1>
                </div>
                <div style="padding: 30px 20px;">
                    ' . $default_message . '
                </div>
            </div>
        '
    ];
    
    return $templates[$template] ?? $templates['default'];
}

// ===== ФУНКЦИИ SMS УВЕДОМЛЕНИЙ =====

function sendSMSNotification($pdo) {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $phone = $input['phone'] ?? '';
        $message = $input['message'] ?? '';
        
        if (empty($phone) || empty($message)) {
            throw new Exception('Поля phone и message обязательны');
        }
        
        // Отправляем SMS (заглушка - в продакшене интегрировать с SMS провайдером)
        $result = sendSMS($phone, $message);
        
        // Сохраняем в лог
        logNotification($pdo, 'sms', $phone, 'SMS', $message, $result);
        
        echo json_encode([
            'success' => $result,
            'message' => $result ? 'SMS отправлено успешно' : 'Ошибка отправки SMS'
        ], JSON_UNESCAPED_UNICODE);
        
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

function sendSMS($phone, $message) {
    // Заглушка для SMS отправки
    // В продакшене интегрировать с SMS.ru, SMSC.ru или другим провайдером
    
    // Пример интеграции с SMS.ru:
    /*
    $api_id = 'your-sms-api-id';
    $url = 'https://sms.ru/sms/send';
    $data = [
        'api_id' => $api_id,
        'to' => $phone,
        'msg' => $message,
        'json' => 1
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    
    $result = json_decode($response, true);
    return $result['status'] === 'OK';
    */
    
    // Для демонстрации возвращаем true
    return true;
}

// ===== ФУНКЦИИ PUSH УВЕДОМЛЕНИЙ =====

function sendPushNotification($pdo) {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $subscription = $input['subscription'] ?? '';
        $title = $input['title'] ?? '';
        $body = $input['body'] ?? '';
        $icon = $input['icon'] ?? '/icon-192x192.png';
        $url = $input['url'] ?? '/';
        
        if (empty($subscription) || empty($title) || empty($body)) {
            throw new Exception('Поля subscription, title и body обязательны');
        }
        
        // Отправляем push уведомление
        $result = sendPush($subscription, $title, $body, $icon, $url);
        
        // Сохраняем в лог
        logNotification($pdo, 'push', $subscription, $title, $body, $result);
        
        echo json_encode([
            'success' => $result,
            'message' => $result ? 'Push уведомление отправлено' : 'Ошибка отправки push'
        ], JSON_UNESCAPED_UNICODE);
        
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

function sendPush($subscription, $title, $body, $icon, $url) {
    // Заглушка для push уведомлений
    // В продакшене использовать Web Push Protocol с VAPID ключами
    
    // Пример с использованием библиотеки web-push:
    /*
    require_once 'vendor/autoload.php';
    
    use Minishlink\WebPush\WebPush;
    use Minishlink\WebPush\Subscription;
    
    $auth = [
        'VAPID' => [
            'subject' => 'mailto:admin@flowers-belka.ru',
            'publicKey' => 'your-vapid-public-key',
            'privateKey' => 'your-vapid-private-key',
        ],
    ];
    
    $webPush = new WebPush($auth);
    
    $payload = json_encode([
        'title' => $title,
        'body' => $body,
        'icon' => $icon,
        'url' => $url
    ]);
    
    $subscription = Subscription::create(json_decode($subscription, true));
    $report = $webPush->sendOneNotification($subscription, $payload);
    
    return $report->isSuccess();
    */
    
    // Для демонстрации возвращаем true
    return true;
}

// ===== КОМПЛЕКСНЫЕ УВЕДОМЛЕНИЯ О ЗАКАЗАХ =====

function sendOrderNotifications($pdo) {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $order_id = intval($input['order_id'] ?? 0);
        $type = $input['type'] ?? 'confirmation'; // confirmation, status_change, delivery
        
        if ($order_id <= 0) {
            throw new Exception('Некорректный ID заказа');
        }
        
        // Получаем информацию о заказе
        $stmt = $pdo->prepare("
            SELECT o.*, 
                   COALESCE(o.email, '') as customer_email,
                   COALESCE(o.telephone, '') as customer_phone
            FROM " . DB_PREFIX . "order o
            WHERE o.order_id = ?
        ");
        $stmt->execute([$order_id]);
        $order = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$order) {
            throw new Exception('Заказ не найден');
        }
        
        $results = [];
        
        // Email уведомление
        if (!empty($order['customer_email'])) {
            $email_data = [
                'order_id' => $order_id,
                'total' => number_format($order['total'], 0, '.', ' '),
                'address' => $order['shipping_address_1'],
                'phone' => $order['customer_phone']
            ];
            
            $subject = '';
            $template = '';
            
            switch ($type) {
                case 'confirmation':
                    $subject = "Заказ #{$order_id} подтвержден - Flowers Belka";
                    $template = 'order_confirmation';
                    break;
                case 'status_change':
                    $subject = "Статус заказа #{$order_id} изменен - Flowers Belka";
                    $template = 'order_status';
                    $email_data['status'] = $input['status'] ?? 'Обновлен';
                    break;
                case 'delivery':
                    $subject = "Заказ #{$order_id} передан в доставку - Flowers Belka";
                    $template = 'order_status';
                    $email_data['status'] = 'Передан в доставку';
                    break;
            }
            
            $html_message = loadEmailTemplate($template, $email_data, '');
            $email_result = sendEmail($order['customer_email'], $subject, $html_message, '');
            $results['email'] = $email_result;
        }
        
        // SMS уведомление
        if (!empty($order['customer_phone'])) {
            $sms_message = '';
            
            switch ($type) {
                case 'confirmation':
                    $sms_message = "Flowers Belka: Ваш заказ #{$order_id} подтвержден. Сумма: {$order['total']} руб. Спасибо за заказ!";
                    break;
                case 'delivery':
                    $sms_message = "Flowers Belka: Заказ #{$order_id} передан курьеру. Ожидайте доставку в течение дня.";
                    break;
            }
            
            if ($sms_message) {
                $sms_result = sendSMS($order['customer_phone'], $sms_message);
                $results['sms'] = $sms_result;
            }
        }
        
        echo json_encode([
            'success' => true,
            'message' => 'Уведомления отправлены',
            'results' => $results
        ], JSON_UNESCAPED_UNICODE);
        
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====

function logNotification($pdo, $type, $recipient, $subject, $message, $success) {
    try {
        $stmt = $pdo->prepare("
            INSERT INTO " . DB_PREFIX . "notification_log 
            (type, recipient, subject, message, success, created_at) 
            VALUES (?, ?, ?, ?, ?, NOW())
        ");
        $stmt->execute([$type, $recipient, $subject, $message, $success ? 1 : 0]);
    } catch (Exception $e) {
        // Логирование не должно прерывать основной процесс
        error_log("Failed to log notification: " . $e->getMessage());
    }
}

function testEmailConfiguration($pdo) {
    try {
        $test_email = $_GET['email'] ?? 'test@example.com';
        
        $subject = 'Тест email конфигурации - Flowers Belka';
        $message = 'Это тестовое сообщение для проверки настроек email.';
        $html_message = loadEmailTemplate('default', [], $message);
        
        $result = sendEmail($test_email, $subject, $html_message, $message);
        
        echo json_encode([
            'success' => $result,
            'message' => $result ? 'Тестовый email отправлен успешно' : 'Ошибка отправки тестового email'
        ], JSON_UNESCAPED_UNICODE);
        
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

function subscribePushNotification($pdo) {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $subscription = $input['subscription'] ?? '';
        $user_id = $input['user_id'] ?? 0;
        
        if (empty($subscription)) {
            throw new Exception('Subscription данные обязательны');
        }
        
        // Сохраняем подписку в базе данных
        $stmt = $pdo->prepare("
            INSERT INTO " . DB_PREFIX . "push_subscriptions 
            (user_id, subscription_data, created_at) 
            VALUES (?, ?, NOW())
            ON DUPLICATE KEY UPDATE 
            subscription_data = VALUES(subscription_data),
            updated_at = NOW()
        ");
        $stmt->execute([$user_id, $subscription]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Push подписка сохранена'
        ], JSON_UNESCAPED_UNICODE);
        
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

function getNotifications($pdo) {
    try {
        $user_id = intval($_GET['user_id'] ?? 0);
        $limit = intval($_GET['limit'] ?? 20);
        $offset = intval($_GET['offset'] ?? 0);
        
        $stmt = $pdo->prepare("
            SELECT * FROM " . DB_PREFIX . "notification_log 
            WHERE (user_id = ? OR user_id = 0)
            ORDER BY created_at DESC 
            LIMIT ? OFFSET ?
        ");
        $stmt->execute([$user_id, $limit, $offset]);
        $notifications = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'notifications' => $notifications
        ], JSON_UNESCAPED_UNICODE);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

function markNotificationRead($pdo) {
    try {
        $notification_id = intval($_GET['id'] ?? 0);
        
        if ($notification_id <= 0) {
            throw new Exception('Некорректный ID уведомления');
        }
        
        $stmt = $pdo->prepare("
            UPDATE " . DB_PREFIX . "notification_log 
            SET read_at = NOW() 
            WHERE id = ?
        ");
        $stmt->execute([$notification_id]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Уведомление отмечено как прочитанное'
        ], JSON_UNESCAPED_UNICODE);
        
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}
?>
