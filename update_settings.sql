-- Обновление настроек OpenCart после миграции
USE flowers_belka_new;

-- Обновляем URL сайта в настройках
UPDATE oc_setting SET value = 'http://localhost/flowers_belka/' 
WHERE `key` = 'config_url' AND store_id = 0;

UPDATE oc_setting SET value = 'http://localhost/flowers_belka/' 
WHERE `key` = 'config_ssl' AND store_id = 0;

-- Обновляем URL админки
UPDATE oc_setting SET value = 'http://localhost/flowers_belka/admin/' 
WHERE `key` = 'config_admin' AND store_id = 0;

-- Обновляем название сайта (если нужно)
UPDATE oc_setting SET value = 'Belka Flowers - Локальная копия' 
WHERE `key` = 'config_name' AND store_id = 0;

-- Обновляем пути к изображениям (если используются абсолютные пути)
UPDATE oc_setting SET value = 'C:/Users/puyols/Downloads/flowers_belka/image/' 
WHERE `key` = 'config_image' AND store_id = 0;

-- Проверяем настройки темы Journal3 (если используется)
UPDATE oc_setting SET value = 'journal3' 
WHERE `key` = 'config_theme' AND store_id = 0;

-- Очищаем кэш модификаций
DELETE FROM oc_modification WHERE code LIKE '%cache%';

-- Показываем обновленные настройки
SELECT `key`, value FROM oc_setting 
WHERE `key` IN ('config_url', 'config_ssl', 'config_name', 'config_theme', 'config_admin') 
AND store_id = 0;