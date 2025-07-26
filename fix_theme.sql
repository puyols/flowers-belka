-- Исправление темы для OpenCart
USE flowers_belka_new;

-- Удаляем старые настройки темы если есть
DELETE FROM oc_setting WHERE `key` = 'config_template' AND store_id = 0;
DELETE FROM oc_setting WHERE `key` = 'config_theme' AND store_id = 0;

-- Устанавливаем тему default
INSERT INTO oc_setting (store_id, code, `key`, value, serialized) VALUES 
(0, 'config', 'config_template', 'default', 0),
(0, 'config', 'config_theme', 'default', 0);

-- Проверяем результат
SELECT store_id, code, `key`, value FROM oc_setting WHERE `key` LIKE '%template%' OR `key` LIKE '%theme%';
