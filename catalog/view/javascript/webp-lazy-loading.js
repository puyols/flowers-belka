/**
 * Система ленивой загрузки изображений с поддержкой WebP
 */

(function() {
    'use strict';
    
    // Проверяем поддержку WebP
    function supportsWebP() {
        return new Promise(function(resolve) {
            var webP = new Image();
            webP.onload = webP.onerror = function() {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }
    
    // Intersection Observer для lazy loading
    var imageObserver;
    
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var img = entry.target;
                        loadImage(img);
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
        }
    }
    
    // Загрузка изображения
    function loadImage(img) {
        // Если это picture элемент, обрабатываем его
        var picture = img.closest('picture');
        if (picture) {
            loadPictureElement(picture);
        } else {
            loadSingleImage(img);
        }
    }
    
    // Загрузка picture элемента
    function loadPictureElement(picture) {
        var sources = picture.querySelectorAll('source');
        var img = picture.querySelector('img');
        
        if (!img) return;
        
        // Загружаем srcset для всех source элементов
        sources.forEach(function(source) {
            if (source.dataset.srcset) {
                source.srcset = source.dataset.srcset;
                source.removeAttribute('data-srcset');
            }
        });
        
        // Загружаем основное изображение
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
        
        // Добавляем класс загруженного изображения
        img.classList.add('loaded');
        picture.classList.add('loaded');
    }
    
    // Загрузка одиночного изображения
    function loadSingleImage(img) {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
        
        if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
        }
        
        img.classList.add('loaded');
    }
    
    // Обработка изображений без Intersection Observer (fallback)
    function fallbackLazyLoading() {
        var images = document.querySelectorAll('img[data-src], picture img[data-src]');
        
        function checkImages() {
            images.forEach(function(img) {
                if (isInViewport(img)) {
                    loadImage(img);
                }
            });
        }
        
        function isInViewport(element) {
            var rect = element.getBoundingClientRect();
            return (
                rect.bottom >= 0 &&
                rect.right >= 0 &&
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.left <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Проверяем при скролле и ресайзе
        window.addEventListener('scroll', checkImages);
        window.addEventListener('resize', checkImages);
        
        // Первоначальная проверка
        checkImages();
    }
    
    // Создание адаптивного изображения
    function createResponsiveImage(imageData, alt, className, lazy) {
        alt = alt || '';
        className = className || '';
        lazy = lazy !== false;
        
        if (!imageData || !imageData.sizes) {
            return '<img src="' + (imageData ? imageData.original : '/image/placeholder.png') + '" alt="' + alt + '" class="' + className + '">';
        }
        
        var html = '<picture class="' + className + '">';
        
        // WebP источники
        var webpSrcset = [];
        var jpegSrcset = [];
        
        Object.keys(imageData.sizes).forEach(function(size) {
            var sizeData = imageData.sizes[size];
            var width = size === 'thumbnail' ? '300w' : (size === 'medium' ? '600w' : '1200w');
            
            if (sizeData.webp) {
                webpSrcset.push(sizeData.webp + ' ' + width);
            }
            
            if (sizeData.jpeg) {
                jpegSrcset.push(sizeData.jpeg + ' ' + width);
            }
        });
        
        // Добавляем WebP источник
        if (webpSrcset.length > 0) {
            var webpAttr = lazy ? 'data-srcset' : 'srcset';
            html += '<source ' + webpAttr + '="' + webpSrcset.join(', ') + '" type="image/webp">';
        }
        
        // Добавляем JPEG источник
        if (jpegSrcset.length > 0) {
            var jpegAttr = lazy ? 'data-srcset' : 'srcset';
            html += '<source ' + jpegAttr + '="' + jpegSrcset.join(', ') + '" type="image/jpeg">';
        }
        
        // Fallback изображение
        var fallbackSrc = imageData.sizes.medium ? 
            (imageData.sizes.medium.jpeg || imageData.sizes.medium.webp) : 
            imageData.original;
        
        var srcAttr = lazy ? 'data-src' : 'src';
        var placeholderSrc = lazy ? '/image/placeholder.png' : fallbackSrc;
        
        html += '<img ' + (lazy ? 'src="' + placeholderSrc + '" ' + srcAttr + '="' + fallbackSrc + '"' : 'src="' + fallbackSrc + '"') + 
                ' alt="' + alt + '" loading="lazy">';
        
        html += '</picture>';
        
        return html;
    }
    
    // Оптимизация изображений для текущего браузера
    function optimizeImageForBrowser(imageData) {
        if (!imageData || !imageData.sizes) {
            return imageData;
        }
        
        return supportsWebP().then(function(webpSupported) {
            var optimized = {
                original: imageData.original,
                sizes: {}
            };
            
            Object.keys(imageData.sizes).forEach(function(size) {
                var sizeData = imageData.sizes[size];
                
                if (webpSupported && sizeData.webp) {
                    optimized.sizes[size] = sizeData.webp;
                } else if (sizeData.jpeg) {
                    optimized.sizes[size] = sizeData.jpeg;
                } else {
                    optimized.sizes[size] = imageData.original;
                }
            });
            
            return optimized;
        });
    }
    
    // Предзагрузка критических изображений
    function preloadCriticalImages() {
        var criticalImages = document.querySelectorAll('img[data-critical="true"], picture img[data-critical="true"]');
        
        criticalImages.forEach(function(img) {
            loadImage(img);
        });
    }
    
    // Инициализация
    function init() {
        // Проверяем поддержку WebP
        supportsWebP().then(function(webpSupported) {
            document.documentElement.classList.add(webpSupported ? 'webp' : 'no-webp');
        });
        
        // Инициализируем lazy loading
        initLazyLoading();
        
        // Предзагружаем критические изображения
        preloadCriticalImages();
        
        // Обрабатываем существующие изображения
        if (imageObserver) {
            var lazyImages = document.querySelectorAll('img[data-src], picture img[data-src]');
            lazyImages.forEach(function(img) {
                imageObserver.observe(img);
            });
        } else {
            // Fallback для старых браузеров
            fallbackLazyLoading();
        }
    }
    
    // Экспортируем функции для использования
    window.WebPLazyLoading = {
        init: init,
        loadImage: loadImage,
        createResponsiveImage: createResponsiveImage,
        optimizeImageForBrowser: optimizeImageForBrowser,
        supportsWebP: supportsWebP
    };
    
    // Автоматическая инициализация при загрузке DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Обработка динамически добавленных изображений
    if (window.MutationObserver) {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        var lazyImages = node.querySelectorAll ? 
                            node.querySelectorAll('img[data-src], picture img[data-src]') : [];
                        
                        if (node.matches && node.matches('img[data-src]')) {
                            lazyImages = [node];
                        }
                        
                        lazyImages.forEach(function(img) {
                            if (imageObserver) {
                                imageObserver.observe(img);
                            } else {
                                // Проверяем, видимо ли изображение
                                setTimeout(function() {
                                    if (isInViewport(img)) {
                                        loadImage(img);
                                    }
                                }, 100);
                            }
                        });
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
})();
