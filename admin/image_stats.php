<?php
/**
 * Веб-интерфейс для анализа и конвертации изображений
 */

// Определяем пути
define('DIR_OPENCART', dirname(__FILE__) . '/../');
define('DIR_IMAGE', DIR_OPENCART . 'image/');

// Подключаем конфигурацию OpenCart
if (file_exists('../config.php')) {
    require_once('../config.php');
}

require_once('../includes/ImageOptimizer.php');

// Простая аутентификация (в продакшене нужна более серьезная защита)
session_start();
$password = 'admin123'; // Измените пароль!

if (isset($_POST['password']) && $_POST['password'] === $password) {
    $_SESSION['authenticated'] = true;
}

if (!isset($_SESSION['authenticated']) || !$_SESSION['authenticated']) {
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <title>Оптимизация изображений - Вход</title>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; max-width: 400px; margin: 100px auto; padding: 20px; }
            input[type="password"], input[type="submit"] { width: 100%; padding: 10px; margin: 10px 0; }
            .form-group { margin: 15px 0; }
        </style>
    </head>
    <body>
        <h2>Вход в систему оптимизации изображений</h2>
        <form method="post">
            <div class="form-group">
                <label>Пароль:</label>
                <input type="password" name="password" required>
            </div>
            <input type="submit" value="Войти">
        </form>
    </body>
    </html>
    <?php
    exit;
}

// Обработка действий
$action = isset($_GET['action']) ? $_GET['action'] : 'stats';

?>
<!DOCTYPE html>
<html>
<head>
    <title>Оптимизация изображений</title>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { background: #f8f9fa; padding: 20px; margin-bottom: 20px; border-radius: 5px; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0; }
        .stat-card { background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 5px; text-align: center; }
        .stat-number { font-size: 2em; font-weight: bold; color: #007bff; }
        .stat-label { color: #666; margin-top: 5px; }
        .actions { margin: 20px 0; }
        .btn { display: inline-block; padding: 10px 20px; margin: 5px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; border: none; cursor: pointer; }
        .btn:hover { background: #0056b3; }
        .btn-success { background: #28a745; }
        .btn-warning { background: #ffc107; color: #212529; }
        .btn-danger { background: #dc3545; }
        .progress { background: #f8f9fa; border-radius: 5px; overflow: hidden; margin: 10px 0; }
        .progress-bar { background: #007bff; height: 20px; transition: width 0.3s; }
        .log { background: #f8f9fa; padding: 15px; border-radius: 5px; font-family: monospace; white-space: pre-wrap; max-height: 400px; overflow-y: auto; }
        .file-list { max-height: 300px; overflow-y: auto; border: 1px solid #ddd; padding: 10px; }
        .file-item { padding: 5px; border-bottom: 1px solid #eee; }
        .file-item:last-child { border-bottom: none; }
        .optimized { color: #28a745; }
        .not-optimized { color: #dc3545; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Система оптимизации изображений</h1>
        <p>Анализ и конвертация изображений в WebP формат для ускорения загрузки сайта</p>
    </div>

    <div class="actions">
        <a href="?action=stats" class="btn">📊 Статистика</a>
        <a href="?action=list" class="btn btn-warning">📋 Список файлов</a>
        <a href="?action=convert" class="btn btn-success">🔄 Конвертировать все</a>
        <a href="?action=logout" class="btn btn-danger">🚪 Выход</a>
    </div>

    <?php
    if ($action === 'logout') {
        session_destroy();
        header('Location: ' . $_SERVER['PHP_SELF']);
        exit;
    }

    if ($action === 'stats') {
        echo "<h2>📊 Статистика изображений</h2>";
        
        $stats = analyzeDirectory(DIR_IMAGE . 'catalog');
        
        echo '<div class="stats">';
        echo '<div class="stat-card"><div class="stat-number">' . $stats['total'] . '</div><div class="stat-label">Всего изображений</div></div>';
        echo '<div class="stat-card"><div class="stat-number">' . $stats['jpg'] . '</div><div class="stat-label">JPG/JPEG</div></div>';
        echo '<div class="stat-card"><div class="stat-number">' . $stats['png'] . '</div><div class="stat-label">PNG</div></div>';
        echo '<div class="stat-card"><div class="stat-number">' . $stats['webp'] . '</div><div class="stat-label">WebP</div></div>';
        echo '<div class="stat-card"><div class="stat-number">' . $stats['optimized'] . '</div><div class="stat-label">Оптимизированных</div></div>';
        echo '<div class="stat-card"><div class="stat-number">' . $stats['need_optimization'] . '</div><div class="stat-label">Требуют оптимизации</div></div>';
        echo '</div>';
        
        echo '<p><strong>Общий размер:</strong> ' . formatFileSize($stats['total_size']) . '</p>';
        
        if ($stats['need_optimization'] > 0) {
            $percent = round(($stats['need_optimization'] / $stats['total']) * 100, 1);
            echo '<div class="progress">';
            echo '<div class="progress-bar" style="width: ' . (100 - $percent) . '%"></div>';
            echo '</div>';
            echo '<p>Оптимизировано: ' . round(100 - $percent, 1) . '%</p>';
        }
    }

    if ($action === 'list') {
        echo "<h2>📋 Список изображений</h2>";
        
        $files = getImageFiles(DIR_IMAGE . 'catalog');
        
        echo '<div class="file-list">';
        foreach ($files as $file) {
            $relative_path = str_replace(DIR_IMAGE, '', $file);
            $is_optimized = isImageOptimized($file);
            $class = $is_optimized ? 'optimized' : 'not-optimized';
            $status = $is_optimized ? '✅ Оптимизировано' : '❌ Требует оптимизации';
            
            echo '<div class="file-item">';
            echo '<span class="' . $class . '">' . $status . '</span> ';
            echo '<strong>' . basename($file) . '</strong><br>';
            echo '<small>' . $relative_path . ' (' . formatFileSize(filesize($file)) . ')</small>';
            echo '</div>';
        }
        echo '</div>';
        
        echo '<p>Найдено файлов: ' . count($files) . '</p>';
    }

    if ($action === 'convert') {
        echo "<h2>🔄 Конвертация изображений</h2>";
        
        if (isset($_POST['start_conversion'])) {
            echo '<div class="log" id="conversion-log">';
            echo "Начинаем конвертацию...\n";
            
            $optimizer = new ImageOptimizer();
            $files = getImageFiles(DIR_IMAGE . 'catalog');
            $processed = 0;
            $errors = 0;
            
            foreach ($files as $file) {
                if (isImageOptimized($file)) {
                    echo "Пропускаем (уже обработан): " . basename($file) . "\n";
                    continue;
                }
                
                echo "Обрабатываем: " . basename($file) . " ... ";
                
                try {
                    $directory = dirname($file);
                    $filename = pathinfo($file, PATHINFO_FILENAME);
                    
                    $results = $optimizer->optimizeImage($file, $directory, $filename);
                    
                    if (!empty($results)) {
                        $created_files = [];
                        foreach ($results as $size => $formats) {
                            if (isset($formats['webp']) && file_exists($formats['webp'])) {
                                $created_files[] = $size . ' WebP';
                            }
                        }
                        echo "✅ Создано: " . implode(', ', $created_files) . "\n";
                        $processed++;
                    } else {
                        echo "❌ Ошибка создания\n";
                        $errors++;
                    }
                } catch (Exception $e) {
                    echo "❌ Ошибка: " . $e->getMessage() . "\n";
                    $errors++;
                }
                
                // Принудительно отправляем вывод
                if (ob_get_level()) {
                    ob_flush();
                }
                flush();
            }
            
            echo "\n=== Конвертация завершена ===\n";
            echo "Обработано: $processed\n";
            echo "Ошибок: $errors\n";
            echo '</div>';
        } else {
            $files_to_convert = array_filter(getImageFiles(DIR_IMAGE . 'catalog'), function($file) {
                return !isImageOptimized($file);
            });
            
            echo '<p>Найдено <strong>' . count($files_to_convert) . '</strong> изображений для конвертации.</p>';
            
            if (count($files_to_convert) > 0) {
                echo '<form method="post">';
                echo '<button type="submit" name="start_conversion" class="btn btn-success">🚀 Начать конвертацию</button>';
                echo '</form>';
            } else {
                echo '<p class="optimized">✅ Все изображения уже оптимизированы!</p>';
            }
        }
    }
    ?>

</body>
</html>

<?php

function analyzeDirectory($directory) {
    $stats = [
        'total' => 0,
        'jpg' => 0,
        'png' => 0,
        'gif' => 0,
        'webp' => 0,
        'optimized' => 0,
        'need_optimization' => 0,
        'total_size' => 0
    ];
    
    analyzeDirectoryRecursive($directory, $stats);
    
    return $stats;
}

function analyzeDirectoryRecursive($directory, &$stats) {
    if (!is_dir($directory)) {
        return;
    }
    
    $files = scandir($directory);
    
    foreach ($files as $file) {
        if ($file === '.' || $file === '..') {
            continue;
        }
        
        $fullPath = $directory . '/' . $file;
        
        if (is_dir($fullPath)) {
            analyzeDirectoryRecursive($fullPath, $stats);
        } elseif (is_file($fullPath)) {
            $extension = strtolower(pathinfo($fullPath, PATHINFO_EXTENSION));
            
            if (in_array($extension, ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
                $stats['total']++;
                $stats['total_size'] += filesize($fullPath);
                
                switch ($extension) {
                    case 'jpg':
                    case 'jpeg':
                        $stats['jpg']++;
                        break;
                    case 'png':
                        $stats['png']++;
                        break;
                    case 'gif':
                        $stats['gif']++;
                        break;
                    case 'webp':
                        $stats['webp']++;
                        break;
                }
                
                if (isImageOptimized($fullPath)) {
                    $stats['optimized']++;
                } elseif (in_array($extension, ['jpg', 'jpeg', 'png', 'gif'])) {
                    $stats['need_optimization']++;
                }
            }
        }
    }
}

function getImageFiles($directory) {
    $files = [];
    getImageFilesRecursive($directory, $files);
    return $files;
}

function getImageFilesRecursive($directory, &$files) {
    if (!is_dir($directory)) {
        return;
    }
    
    $dir_files = scandir($directory);
    
    foreach ($dir_files as $file) {
        if ($file === '.' || $file === '..') {
            continue;
        }
        
        $fullPath = $directory . '/' . $file;
        
        if (is_dir($fullPath)) {
            getImageFilesRecursive($fullPath, $files);
        } elseif (is_file($fullPath)) {
            $extension = strtolower(pathinfo($fullPath, PATHINFO_EXTENSION));
            
            if (in_array($extension, ['jpg', 'jpeg', 'png', 'gif'])) {
                $files[] = $fullPath;
            }
        }
    }
}

function isImageOptimized($filePath) {
    $filename = pathinfo($filePath, PATHINFO_FILENAME);
    $directory = dirname($filePath);
    
    $webpPath = $directory . '/' . $filename . '_medium.webp';
    
    return file_exists($webpPath);
}

function formatFileSize($bytes) {
    $units = ['B', 'KB', 'MB', 'GB'];
    $bytes = max($bytes, 0);
    $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
    $pow = min($pow, count($units) - 1);
    
    $bytes /= pow(1024, $pow);
    
    return round($bytes, 2) . ' ' . $units[$pow];
}
?>
