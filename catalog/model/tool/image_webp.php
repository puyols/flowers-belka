<?php

/**
 * Расширенная модель для работы с изображениями с поддержкой WebP
 */
class ModelToolImageWebp extends Model {
    
    /**
     * Создает оптимизированное изображение с поддержкой WebP
     */
    public function resize($filename, $width, $height, $size_name = 'medium') {
        if (!is_file(DIR_IMAGE . $filename) || substr(str_replace('\\', '/', realpath(DIR_IMAGE . $filename)), 0, strlen(DIR_IMAGE)) != str_replace('\\', '/', DIR_IMAGE)) {
            return $this->getPlaceholder($width, $height);
        }

        $extension = pathinfo($filename, PATHINFO_EXTENSION);
        $image_old = $filename;
        
        // Получаем базовое имя файла без расширения
        $base_filename = pathinfo($filename, PATHINFO_FILENAME);
        $directory = dirname($filename);
        
        // Проверяем, есть ли оптимизированная WebP версия
        $webp_path = $directory . '/' . $base_filename . '_' . $size_name . '.webp';
        $jpeg_path = $directory . '/' . $base_filename . '_' . $size_name . '.jpg';
        
        // Если есть оптимизированные версии, используем их
        if (file_exists(DIR_IMAGE . $webp_path)) {
            return $this->getImageUrl($webp_path);
        } elseif (file_exists(DIR_IMAGE . $jpeg_path)) {
            return $this->getImageUrl($jpeg_path);
        }
        
        // Если оптимизированных версий нет, используем стандартную модель
        $this->load->model('tool/image');
        return $this->model_tool_image->resize($filename, $width, $height);
    }
    
    /**
     * Создает адаптивное изображение с WebP и fallback
     */
    public function createResponsiveImage($filename, $alt = '', $class = '', $lazy = true) {
        if (!$filename || !is_file(DIR_IMAGE . $filename)) {
            $filename = 'placeholder.png';
        }
        
        $base_filename = pathinfo($filename, PATHINFO_FILENAME);
        $directory = dirname($filename);
        
        $sizes = ['thumbnail', 'medium', 'large'];
        $webp_sources = [];
        $jpeg_sources = [];
        $default_image = '';
        
        foreach ($sizes as $size) {
            $webp_path = $directory . '/' . $base_filename . '_' . $size . '.webp';
            $jpeg_path = $directory . '/' . $base_filename . '_' . $size . '.jpg';
            
            if (file_exists(DIR_IMAGE . $webp_path)) {
                $webp_sources[] = $this->getImageUrl($webp_path);
            }
            
            if (file_exists(DIR_IMAGE . $jpeg_path)) {
                $jpeg_sources[] = $this->getImageUrl($jpeg_path);
                if ($size === 'medium' && !$default_image) {
                    $default_image = $this->getImageUrl($jpeg_path);
                }
            }
        }
        
        // Если нет оптимизированных версий, используем оригинал
        if (!$default_image) {
            $default_image = $this->getImageUrl($filename);
        }
        
        $html = '<picture class="' . htmlspecialchars($class) . '">';
        
        // Добавляем WebP источники
        if (!empty($webp_sources)) {
            $html .= '<source srcset="' . implode(', ', $webp_sources) . '" type="image/webp">';
        }
        
        // Добавляем JPEG источники
        if (!empty($jpeg_sources)) {
            $html .= '<source srcset="' . implode(', ', $jpeg_sources) . '" type="image/jpeg">';
        }
        
        // Fallback изображение
        $img_attributes = [
            'src="' . htmlspecialchars($default_image) . '"',
            'alt="' . htmlspecialchars($alt) . '"'
        ];
        
        if ($lazy) {
            $img_attributes[] = 'loading="lazy"';
        }
        
        if ($class) {
            $img_attributes[] = 'class="' . htmlspecialchars($class) . '"';
        }
        
        $html .= '<img ' . implode(' ', $img_attributes) . '>';
        $html .= '</picture>';
        
        return $html;
    }
    
    /**
     * Получает оптимальный путь к изображению
     */
    public function getOptimalImage($filename, $size = 'medium') {
        if (!$filename || !is_file(DIR_IMAGE . $filename)) {
            return $this->getPlaceholder(300, 250);
        }
        
        $base_filename = pathinfo($filename, PATHINFO_FILENAME);
        $directory = dirname($filename);
        
        // Проверяем поддержку WebP в браузере
        $supports_webp = $this->supportsWebP();
        
        if ($supports_webp) {
            $webp_path = $directory . '/' . $base_filename . '_' . $size . '.webp';
            if (file_exists(DIR_IMAGE . $webp_path)) {
                return $this->getImageUrl($webp_path);
            }
        }
        
        // Fallback на JPEG
        $jpeg_path = $directory . '/' . $base_filename . '_' . $size . '.jpg';
        if (file_exists(DIR_IMAGE . $jpeg_path)) {
            return $this->getImageUrl($jpeg_path);
        }
        
        // Если оптимизированных версий нет, используем оригинал
        return $this->getImageUrl($filename);
    }
    
    /**
     * Проверяет поддержку WebP в браузере
     */
    private function supportsWebP() {
        return isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'image/webp') !== false;
    }
    
    /**
     * Получает URL изображения
     */
    private function getImageUrl($path) {
        if ($this->request->server['HTTPS']) {
            return HTTPS_CATALOG . 'image/' . $path;
        } else {
            return HTTP_CATALOG . 'image/' . $path;
        }
    }
    
    /**
     * Возвращает placeholder изображение
     */
    private function getPlaceholder($width, $height) {
        $this->load->model('tool/image');
        return $this->model_tool_image->resize('placeholder.png', $width, $height);
    }
    
    /**
     * Получает информацию об изображении для JSON
     */
    public function getImageInfo($filename, $sizes = ['thumbnail', 'medium', 'large']) {
        if (!$filename || !is_file(DIR_IMAGE . $filename)) {
            return null;
        }
        
        $base_filename = pathinfo($filename, PATHINFO_FILENAME);
        $directory = dirname($filename);
        
        $info = [
            'original' => $this->getImageUrl($filename),
            'sizes' => []
        ];
        
        foreach ($sizes as $size) {
            $webp_path = $directory . '/' . $base_filename . '_' . $size . '.webp';
            $jpeg_path = $directory . '/' . $base_filename . '_' . $size . '.jpg';
            
            $size_info = [];
            
            if (file_exists(DIR_IMAGE . $webp_path)) {
                $size_info['webp'] = $this->getImageUrl($webp_path);
            }
            
            if (file_exists(DIR_IMAGE . $jpeg_path)) {
                $size_info['jpeg'] = $this->getImageUrl($jpeg_path);
            }
            
            if (!empty($size_info)) {
                $info['sizes'][$size] = $size_info;
            }
        }
        
        return $info;
    }
    
    /**
     * Создает srcset для адаптивных изображений
     */
    public function createSrcSet($filename, $format = 'webp') {
        if (!$filename || !is_file(DIR_IMAGE . $filename)) {
            return '';
        }
        
        $base_filename = pathinfo($filename, PATHINFO_FILENAME);
        $directory = dirname($filename);
        
        $srcset = [];
        $sizes = [
            'thumbnail' => '300w',
            'medium' => '600w',
            'large' => '1200w'
        ];
        
        foreach ($sizes as $size => $descriptor) {
            $image_path = $directory . '/' . $base_filename . '_' . $size . '.' . $format;
            
            if (file_exists(DIR_IMAGE . $image_path)) {
                $srcset[] = $this->getImageUrl($image_path) . ' ' . $descriptor;
            }
        }
        
        return implode(', ', $srcset);
    }
    
    /**
     * Генерирует полный HTML для адаптивного изображения с lazy loading
     */
    public function generateResponsiveHTML($filename, $alt = '', $class = '', $sizes = '(max-width: 768px) 100vw, 50vw') {
        if (!$filename || !is_file(DIR_IMAGE . $filename)) {
            $filename = 'placeholder.png';
        }
        
        $webp_srcset = $this->createSrcSet($filename, 'webp');
        $jpeg_srcset = $this->createSrcSet($filename, 'jpg');
        $default_image = $this->getOptimalImage($filename, 'medium');
        
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
        $html .= '<img src="' . htmlspecialchars($default_image) . '" alt="' . htmlspecialchars($alt) . '" loading="lazy">';
        $html .= '</picture>';
        
        return $html;
    }
}
