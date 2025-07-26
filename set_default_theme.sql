USE flowers_belka_new;

-- Устанавливаем тему default
UPDATE oc_setting SET value = 'default' WHERE `key` = 'config_template' AND store_id = 0;
UPDATE oc_setting SET value = 'default' WHERE `key` = 'config_theme' AND store_id = 0;

-- Проверяем результат
SELECT setting_id, store_id, code, `key`, value FROM oc_setting WHERE `key` IN ('config_template', 'config_theme') AND store_id=0;
