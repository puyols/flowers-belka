<?php

/**
 * Инициализация WebP расширения для Twig
 */

class TwigWebpInit {
    
    private static $initialized = false;
    
    public static function init($registry) {
        if (self::$initialized) {
            return;
        }
        
        // Подключаем WebP расширение
        require_once(DIR_SYSTEM . 'library/template/WebpImageExtension.php');
        
        // Получаем Twig environment
        $template = $registry->get('template');
        
        if (isset($template->twig)) {
            $twig = $template->twig;
            
            // Проверяем, не добавлено ли уже расширение
            if (!$twig->hasExtension('WebpImageExtension')) {
                $webp_extension = new WebpImageExtension($registry);
                $twig->addExtension($webp_extension);
            }
        }
        
        self::$initialized = true;
    }
}
