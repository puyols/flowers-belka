<?php

/**
 * Инициализация WebP изображений для Twig
 */

// Подключаем расширение Twig для WebP изображений
if (class_exists('Twig\Environment') || class_exists('Twig_Environment')) {
    // Регистрируем автозагрузчик для нашего расширения
    spl_autoload_register(function ($class) {
        if ($class === 'WebpImageExtension') {
            require_once(DIR_SYSTEM . 'library/template/WebpImageExtension.php');
        }
    });
}

// Добавляем глобальные функции для использования в PHP
if (!function_exists('webp_image')) {
    function webp_image($filename, $alt = '', $class = '', $size = 'medium', $lazy = true) {
        static $helper = null;
        
        if ($helper === null) {
            require_once(DIR_OPENCART . 'includes/ImageHelper.php');
            $helper = new ImageHelper();
        }
        
        return $helper::simpleImage($filename, $alt, $class, $size, $lazy);
    }
}

if (!function_exists('responsive_image')) {
    function responsive_image($filename, $alt = '', $class = '', $lazy = true, $sizes = '(max-width: 768px) 100vw, 50vw') {
        static $helper = null;
        
        if ($helper === null) {
            require_once(DIR_OPENCART . 'includes/ImageHelper.php');
            $helper = new ImageHelper();
        }
        
        return $helper::responsiveImage($filename, $alt, $class, $lazy, $sizes);
    }
}

if (!function_exists('optimal_image')) {
    function optimal_image($filename, $size = 'medium') {
        static $helper = null;
        
        if ($helper === null) {
            require_once(DIR_OPENCART . 'includes/ImageHelper.php');
            $helper = new ImageHelper();
        }
        
        return $helper::getOptimalImage($filename, $size);
    }
}

if (!function_exists('is_image_optimized')) {
    function is_image_optimized($filename) {
        static $helper = null;
        
        if ($helper === null) {
            require_once(DIR_OPENCART . 'includes/ImageHelper.php');
            $helper = new ImageHelper();
        }
        
        return $helper::isOptimized($filename);
    }
}
