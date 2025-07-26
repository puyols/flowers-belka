USE flowers_belka_new;
SELECT setting_id, store_id, code, `key`, value FROM oc_setting WHERE `key` IN ('config_template', 'config_theme') AND store_id=0;
