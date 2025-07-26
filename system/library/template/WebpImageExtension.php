<?php

/**
 * Twig расширение для работы с оптимизированными изображениями
 */

// Совместимость с разными версиями Twig
if (class_exists('Twig\Extension\AbstractExtension')) {
    class WebpImageExtension extends \Twig\Extension\AbstractExtension {
        use WebpImageExtensionTrait;
    }
} elseif (class_exists('Twig_Extension')) {
    class WebpImageExtension extends \Twig_Extension {
        use WebpImageExtensionTrait;
    }
} else {
    // Fallback для очень старых версий
    class WebpImageExtension {
        use WebpImageExtensionTrait;
    }
}

trait WebpImageExtensionTrait {
    
    private $registry;
    
    public function __construct($registry) {
        $this->registry = $registry;
    }
    
    public function getFunctions() {
        // Совместимость с разными версиями Twig
        if (class_exists('Twig\TwigFunction')) {
            return [
                new \Twig\TwigFunction('webp_image', [$this, 'webpImage'], ['is_safe' => ['html']]),
                new \Twig\TwigFunction('optimal_image', [$this, 'optimalImage']),
                new \Twig\TwigFunction('responsive_image', [$this, 'responsiveImage'], ['is_safe' => ['html']]),
                new \Twig\TwigFunction('image_data', [$this, 'imageData']),
                new \Twig\TwigFunction('is_image_optimized', [$this, 'isImageOptimized']),
            ];
        } else {
            return [
                new \Twig_SimpleFunction('webp_image', [$this, 'webpImage'], ['is_safe' => ['html']]),
                new \Twig_SimpleFunction('optimal_image', [$this, 'optimalImage']),
                new \Twig_SimpleFunction('responsive_image', [$this, 'responsiveImage'], ['is_safe' => ['html']]),
                new \Twig_SimpleFunction('image_data', [$this, 'imageData']),
                new \Twig_SimpleFunction('is_image_optimized', [$this, 'isImageOptimized']),
            ];
        }
    }

    public function getName() {
        return 'webp_image_extension';
    }
    
    /**
     * Создает адаптивное изображение с WebP поддержкой
     */
    public function responsiveImage($filename, $alt = '', $class = '', $lazy = true, $sizes = '(max-width: 768px) 100vw, 50vw') {
        if (!$filename) {
            $filename = 'placeholder.png';
        }
        
        // Определяем базовые пути
        $base_filename = pathinfo($filename, PATHINFO_FILENAME);
        $directory = dirname($filename);
        
        // Проверяем протокол
        $request = $this->registry->get('request');
        $protocol = $request->server['HTTPS'] ? 'https://' : 'http://';
        $base_url = $protocol . $request->server['HTTP_HOST'] . '/image/';
        
        // Создаем srcset для разных размеров
        $webp_srcset = $this->createSrcSet($base_url, $directory, $base_filename, 'webp');
        $jpeg_srcset = $this->createSrcSet($base_url, $directory, $base_filename, 'jpg');
        
        // Определяем fallback изображение
        $fallback = $this->getFallbackImage($base_url, $directory, $base_filename, $filename);
        
        $html = '<picture';
        if ($class) {
            $html .= ' class="' . htmlspecialchars($class) . '"';
        }
        $html .= '>';
        
        // WebP источник
        if ($webp_srcset) {
            $html .= '<source srcset="' . htmlspecialchars($webp_srcset) . '" sizes="' . htmlspecialchars($sizes) . '" type="image/webp">';
        }
        
        // JPEG источник
        if ($jpeg_srcset) {
            $html .= '<source srcset="' . htmlspecialchars($jpeg_srcset) . '" sizes="' . htmlspecialchars($sizes) . '" type="image/jpeg">';
        }
        
        // Fallback изображение
        $img_attrs = [
            'src="' . htmlspecialchars($fallback) . '"',
            'alt="' . htmlspecialchars($alt) . '"'
        ];
        
        if ($lazy) {
            $img_attrs[] = 'loading="lazy"';
        }
        
        $html .= '<img ' . implode(' ', $img_attrs) . '>';
        $html .= '</picture>';
        
        return $html;
    }
    
    /**
     * Получает оптимальное изображение для конкретного размера
     */
    public function optimalImage($filename, $size = 'medium') {
        if (!$filename) {
            return $this->getPlaceholderUrl();
        }
        
        $base_filename = pathinfo($filename, PATHINFO_FILENAME);
        $directory = dirname($filename);
        
        $request = $this->registry->get('request');
        $protocol = $request->server['HTTPS'] ? 'https://' : 'http://';
        $base_url = $protocol . $request->server['HTTP_HOST'] . '/image/';
        
        // Проверяем поддержку WebP
        $supports_webp = isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'image/webp') !== false;
        
        if ($supports_webp) {
            $webp_path = $directory . '/' . $base_filename . '_' . $size . '.webp';
            $full_path = DIR_IMAGE . $webp_path;
            
            if (file_exists($full_path)) {
                return $base_url . $webp_path;
            }
        }
        
        // Fallback на JPEG
        $jpeg_path = $directory . '/' . $base_filename . '_' . $size . '.jpg';
        $full_path = DIR_IMAGE . $jpeg_path;
        
        if (file_exists($full_path)) {
            return $base_url . $jpeg_path;
        }
        
        // Используем оригинал
        return $base_url . $filename;
    }
    
    /**
     * Создает простое WebP изображение
     */
    public function webpImage($filename, $alt = '', $class = '', $size = 'medium', $lazy = true) {
        $optimal_url = $this->optimalImage($filename, $size);
        
        $attrs = [
            'src="' . htmlspecialchars($optimal_url) . '"',
            'alt="' . htmlspecialchars($alt) . '"'
        ];
        
        if ($class) {
            $attrs[] = 'class="' . htmlspecialchars($class) . '"';
        }
        
        if ($lazy) {
            $attrs[] = 'loading="lazy"';
        }
        
        return '<img ' . implode(' ', $attrs) . '>';
    }
    
    /**
     * Проверяет, оптимизировано ли изображение
     */
    public function isImageOptimized($filename) {
        if (!$filename) {
            return false;
        }
        
        $base_filename = pathinfo($filename, PATHINFO_FILENAME);
        $directory = dirname($filename);
        
        $webp_path = DIR_IMAGE . $directory . '/' . $base_filename . '_medium.webp';
        
        return file_exists($webp_path);
    }
    
    /**
     * Создает JSON данные для JavaScript
     */
    public function imageData($filename, $sizes = ['thumbnail', 'medium', 'large']) {
        if (!$filename) {
            return null;
        }
        
        $base_filename = pathinfo($filename, PATHINFO_FILENAME);
        $directory = dirname($filename);
        
        $request = $this->registry->get('request');
        $protocol = $request->server['HTTPS'] ? 'https://' : 'http://';
        $base_url = $protocol . $request->server['HTTP_HOST'] . '/image/';
        
        $data = [
            'original' => $base_url . $filename,
            'sizes' => []
        ];
        
        foreach ($sizes as $size) {
            $size_data = [];
            
            // WebP версия
            $webp_path = $directory . '/' . $base_filename . '_' . $size . '.webp';
            $full_path = DIR_IMAGE . $webp_path;
            
            if (file_exists($full_path)) {
                $size_data['webp'] = $base_url . $webp_path;
            }
            
            // JPEG версия
            $jpeg_path = $directory . '/' . $base_filename . '_' . $size . '.jpg';
            $full_path = DIR_IMAGE . $jpeg_path;
            
            if (file_exists($full_path)) {
                $size_data['jpeg'] = $base_url . $jpeg_path;
            }
            
            if (!empty($size_data)) {
                $data['sizes'][$size] = $size_data;
            }
        }
        
        return json_encode($data);
    }
    
    /**
     * Создает srcset для указанного формата
     */
    private function createSrcSet($base_url, $directory, $base_filename, $format) {
        $srcset = [];
        $sizes = [
            'thumbnail' => '300w',
            'medium' => '600w', 
            'large' => '1200w'
        ];
        
        foreach ($sizes as $size => $descriptor) {
            $image_path = $directory . '/' . $base_filename . '_' . $size . '.' . $format;
            $full_path = DIR_IMAGE . $image_path;
            
            if (file_exists($full_path)) {
                $srcset[] = $base_url . $image_path . ' ' . $descriptor;
            }
        }
        
        return implode(', ', $srcset);
    }
    
    /**
     * Получает fallback изображение
     */
    private function getFallbackImage($base_url, $directory, $base_filename, $original_filename) {
        // Сначала пробуем medium JPEG
        $medium_jpeg = $directory . '/' . $base_filename . '_medium.jpg';
        $full_path = DIR_IMAGE . $medium_jpeg;
        
        if (file_exists($full_path)) {
            return $base_url . $medium_jpeg;
        }
        
        // Затем пробуем medium WebP
        $medium_webp = $directory . '/' . $base_filename . '_medium.webp';
        $full_path = DIR_IMAGE . $medium_webp;
        
        if (file_exists($full_path)) {
            return $base_url . $medium_webp;
        }
        
        // В крайнем случае используем оригинал
        return $base_url . $original_filename;
    }
    
    /**
     * Получает URL placeholder изображения
     */
    private function getPlaceholderUrl() {
        $request = $this->registry->get('request');
        $protocol = $request->server['HTTPS'] ? 'https://' : 'http://';
        return $protocol . $request->server['HTTP_HOST'] . '/image/placeholder.png';
    }
}
