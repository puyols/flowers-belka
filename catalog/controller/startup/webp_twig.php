<?php

/**
 * Startup контроллер для инициализации WebP Twig расширения
 */

class ControllerStartupWebpTwig extends Controller {
    
    public function index() {
        // Инициализируем WebP расширение для Twig
        if (defined('JOURNAL3_ACTIVE')) {
            $this->initWebpExtension();
        }
    }
    
    private function initWebpExtension() {
        // Подключаем WebP расширение
        require_once(DIR_SYSTEM . 'library/template/WebpImageExtension.php');
        
        // Получаем Twig environment
        $template = $this->registry->get('template');
        
        if (isset($template->twig)) {
            $twig = $template->twig;
            
            // Проверяем, не добавлено ли уже расширение
            $hasExtension = false;
            
            try {
                if (method_exists($twig, 'hasExtension')) {
                    $hasExtension = $twig->hasExtension('WebpImageExtension');
                } else {
                    // Для старых версий Twig
                    $hasExtension = $twig->hasExtension('webp_image_extension');
                }
            } catch (Exception $e) {
                $hasExtension = false;
            }
            
            if (!$hasExtension) {
                try {
                    $webp_extension = new WebpImageExtension($this->registry);
                    $twig->addExtension($webp_extension);
                } catch (Exception $e) {
                    // Логируем ошибку, но не прерываем выполнение
                    error_log('WebP Twig Extension Error: ' . $e->getMessage());
                }
            }
        }
    }
}
