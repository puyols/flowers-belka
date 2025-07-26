<?php
/**
 * Скрипт для массовой конвертации существующих изображений в WebP формат
 * Использование: php convert_images.php
 */

// Определяем пути
define('DIR_OPENCART', dirname(__FILE__) . '/../');
define('DIR_IMAGE', DIR_OPENCART . 'image/');

// Подключаем конфигурацию OpenCart
if (file_exists('../config.php')) {
    require_once('../config.php');
} else {
    // Определяем константы вручную если config.php не найден
    if (!defined('DIR_IMAGE')) {
        define('DIR_IMAGE', dirname(__FILE__) . '/../image/');
    }
}

require_once('../includes/ImageOptimizer.php');

class ImageConverter {
    
    private $optimizer;
    private $processed = 0;
    private $errors = 0;
    private $skipped = 0;
    private $total_original_size = 0;
    private $total_optimized_size = 0;
    
    public function __construct() {
        $this->optimizer = new ImageOptimizer();
    }
    
    /**
     * Конвертирует все изображения в указанной директории
     */
    public function convertDirectory($directory = null) {
        if (!$directory) {
            $directory = DIR_IMAGE . 'catalog';
        }
        
        echo "Начинаем конвертацию изображений в директории: $directory\n";
        echo "=====================================\n\n";
        
        $this->processDirectory($directory);
        
        echo "\n=====================================\n";
        echo "Конвертация завершена!\n";
        echo "Обработано файлов: {$this->processed}\n";
        echo "Пропущено файлов: {$this->skipped}\n";
        echo "Ошибок: {$this->errors}\n";
        
        if ($this->total_original_size > 0) {
            $savings = $this->total_original_size - $this->total_optimized_size;
            $percent = round(($savings / $this->total_original_size) * 100, 2);
            
            echo "Исходный размер: " . ImageOptimizer::formatFileSize($this->total_original_size) . "\n";
            echo "Оптимизированный размер: " . ImageOptimizer::formatFileSize($this->total_optimized_size) . "\n";
            echo "Экономия: " . ImageOptimizer::formatFileSize($savings) . " ($percent%)\n";
        }
    }
    
    /**
     * Рекурсивно обрабатывает директорию
     */
    private function processDirectory($directory) {
        $files = scandir($directory);
        
        foreach ($files as $file) {
            if ($file === '.' || $file === '..') {
                continue;
            }
            
            $fullPath = $directory . '/' . $file;
            
            if (is_dir($fullPath)) {
                // Рекурсивно обрабатываем поддиректории
                $this->processDirectory($fullPath);
            } elseif (is_file($fullPath)) {
                $this->processFile($fullPath);
            }
        }
    }
    
    /**
     * Обрабатывает отдельный файл
     */
    private function processFile($filePath) {
        $extension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
        $filename = pathinfo($filePath, PATHINFO_FILENAME);
        $directory = dirname($filePath);
        
        // Обрабатываем только изображения
        if (!in_array($extension, ['jpg', 'jpeg', 'png', 'gif'])) {
            return;
        }
        
        // Проверяем, не обработан ли уже этот файл
        $webpPath = $directory . '/' . $filename . '_medium.webp';
        if (file_exists($webpPath)) {
            echo "Пропускаем (уже обработан): " . basename($filePath) . "\n";
            $this->skipped++;
            return;
        }
        
        echo "Обрабатываем: " . basename($filePath) . " ... ";
        
        try {
            $originalSize = filesize($filePath);
            $this->total_original_size += $originalSize;
            
            // Оптимизируем изображение
            $results = $this->optimizer->optimizeImage($filePath, $directory, $filename);
            
            if (!empty($results)) {
                $optimizedSize = 0;
                $createdFiles = [];
                
                foreach ($results as $size => $formats) {
                    if (isset($formats['webp']) && file_exists($formats['webp'])) {
                        $webpSize = filesize($formats['webp']);
                        $optimizedSize += $webpSize;
                        $createdFiles[] = $size . ' WebP (' . ImageOptimizer::formatFileSize($webpSize) . ')';
                    }
                    
                    if (isset($formats['jpeg']) && file_exists($formats['jpeg'])) {
                        $jpegSize = filesize($formats['jpeg']);
                        $optimizedSize += $jpegSize;
                        $createdFiles[] = $size . ' JPEG (' . ImageOptimizer::formatFileSize($jpegSize) . ')';
                    }
                }
                
                $this->total_optimized_size += $optimizedSize;
                
                echo "✓ Создано: " . implode(', ', $createdFiles) . "\n";
                echo "   Исходный размер: " . ImageOptimizer::formatFileSize($originalSize) . 
                     " → Оптимизированный: " . ImageOptimizer::formatFileSize($optimizedSize);
                
                if ($originalSize > 0) {
                    $savings = $originalSize - $optimizedSize;
                    $percent = round(($savings / $originalSize) * 100, 2);
                    echo " (экономия: $percent%)";
                }
                echo "\n\n";
                
                $this->processed++;
            } else {
                echo "✗ Не удалось создать оптимизированные версии\n";
                $this->errors++;
            }
            
        } catch (Exception $e) {
            echo "✗ Ошибка: " . $e->getMessage() . "\n";
            $this->errors++;
        }
    }
    
    /**
     * Конвертирует только определенные файлы
     */
    public function convertSpecificFiles($files) {
        echo "Конвертируем указанные файлы:\n";
        echo "=====================================\n\n";
        
        foreach ($files as $file) {
            if (file_exists($file)) {
                $this->processFile($file);
            } else {
                echo "Файл не найден: $file\n";
                $this->errors++;
            }
        }
        
        echo "\n=====================================\n";
        echo "Конвертация завершена!\n";
        echo "Обработано файлов: {$this->processed}\n";
        echo "Ошибок: {$this->errors}\n";
    }
    
    /**
     * Показывает статистику по изображениям
     */
    public function showStatistics($directory = null) {
        if (!$directory) {
            $directory = DIR_IMAGE . 'catalog';
        }
        
        echo "Анализ изображений в директории: $directory\n";
        echo "=====================================\n\n";
        
        $stats = $this->analyzeDirectory($directory);
        
        echo "Всего изображений: {$stats['total']}\n";
        echo "JPG/JPEG: {$stats['jpg']}\n";
        echo "PNG: {$stats['png']}\n";
        echo "GIF: {$stats['gif']}\n";
        echo "WebP: {$stats['webp']}\n";
        echo "Уже оптимизированных: {$stats['optimized']}\n";
        echo "Требуют оптимизации: {$stats['need_optimization']}\n";
        echo "Общий размер: " . ImageOptimizer::formatFileSize($stats['total_size']) . "\n";
    }
    
    /**
     * Анализирует директорию и возвращает статистику
     */
    private function analyzeDirectory($directory) {
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
        
        $this->analyzeDirectoryRecursive($directory, $stats);
        
        return $stats;
    }
    
    /**
     * Рекурсивно анализирует директорию
     */
    private function analyzeDirectoryRecursive($directory, &$stats) {
        $files = scandir($directory);
        
        foreach ($files as $file) {
            if ($file === '.' || $file === '..') {
                continue;
            }
            
            $fullPath = $directory . '/' . $file;
            
            if (is_dir($fullPath)) {
                $this->analyzeDirectoryRecursive($fullPath, $stats);
            } elseif (is_file($fullPath)) {
                $extension = strtolower(pathinfo($fullPath, PATHINFO_EXTENSION));
                $filename = pathinfo($fullPath, PATHINFO_FILENAME);
                $dir = dirname($fullPath);
                
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
                    
                    // Проверяем, есть ли оптимизированная версия
                    $webpPath = $dir . '/' . $filename . '_medium.webp';
                    if (file_exists($webpPath)) {
                        $stats['optimized']++;
                    } elseif (in_array($extension, ['jpg', 'jpeg', 'png', 'gif'])) {
                        $stats['need_optimization']++;
                    }
                }
            }
        }
    }
}

// Обработка аргументов командной строки
if (php_sapi_name() !== 'cli') {
    die('Этот скрипт должен запускаться из командной строки');
}

$converter = new ImageConverter();

if (isset($argv[1])) {
    switch ($argv[1]) {
        case 'stats':
            $directory = isset($argv[2]) ? $argv[2] : null;
            $converter->showStatistics($directory);
            break;
            
        case 'convert':
            $directory = isset($argv[2]) ? $argv[2] : null;
            $converter->convertDirectory($directory);
            break;
            
        case 'file':
            if (isset($argv[2])) {
                $converter->convertSpecificFiles(array_slice($argv, 2));
            } else {
                echo "Укажите файлы для конвертации\n";
            }
            break;
            
        default:
            echo "Неизвестная команда: {$argv[1]}\n";
            echo "Доступные команды:\n";
            echo "  stats [директория] - показать статистику\n";
            echo "  convert [директория] - конвертировать все изображения\n";
            echo "  file <файл1> [файл2] ... - конвертировать указанные файлы\n";
            break;
    }
} else {
    echo "Скрипт конвертации изображений в WebP формат\n";
    echo "==========================================\n\n";
    echo "Использование:\n";
    echo "  php convert_images.php stats [директория] - показать статистику\n";
    echo "  php convert_images.php convert [директория] - конвертировать все изображения\n";
    echo "  php convert_images.php file <файл1> [файл2] ... - конвертировать указанные файлы\n\n";
    echo "Если директория не указана, используется image/catalog\n";
}
