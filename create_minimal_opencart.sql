-- Минимальная структура OpenCart для flowers_belka
USE flowers_belka_new;

-- Таблица переводов
CREATE TABLE IF NOT EXISTS `oc_translation` (
  `translation_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` int(11) NOT NULL DEFAULT '0',
  `language_id` int(11) NOT NULL DEFAULT '0',
  `route` varchar(64) NOT NULL DEFAULT '',
  `key` varchar(64) NOT NULL DEFAULT '',
  `value` text NOT NULL,
  `date_added` datetime NOT NULL,
  PRIMARY KEY (`translation_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Таблица настроек
CREATE TABLE IF NOT EXISTS `oc_setting` (
  `setting_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` int(11) NOT NULL DEFAULT '0',
  `code` varchar(128) NOT NULL,
  `key` varchar(128) NOT NULL,
  `value` text NOT NULL,
  `serialized` tinyint(1) NOT NULL,
  PRIMARY KEY (`setting_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Таблица магазинов
CREATE TABLE IF NOT EXISTS `oc_store` (
  `store_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `url` varchar(255) NOT NULL,
  `ssl` varchar(255) NOT NULL,
  PRIMARY KEY (`store_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Таблица языков
CREATE TABLE IF NOT EXISTS `oc_language` (
  `language_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `code` varchar(5) NOT NULL,
  `locale` varchar(255) NOT NULL,
  `image` varchar(64) NOT NULL,
  `directory` varchar(32) NOT NULL,
  `sort_order` int(3) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`language_id`),
  KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Таблица валют
CREATE TABLE IF NOT EXISTS `oc_currency` (
  `currency_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL,
  `code` varchar(3) NOT NULL,
  `symbol_left` varchar(12) NOT NULL,
  `symbol_right` varchar(12) NOT NULL,
  `decimal_place` char(1) NOT NULL,
  `value` double(15,8) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`currency_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Базовые данные
INSERT IGNORE INTO `oc_store` VALUES (0, 'Flowers Belka', 'http://localhost/flowers_belka/', '');

INSERT IGNORE INTO `oc_language` VALUES 
(1, 'English', 'en-gb', 'en_US.UTF-8,en_US,en-gb,english', 'gb.png', 'english', 1, 1),
(2, 'Русский', 'ru-ru', 'ru_RU.UTF-8,ru_RU,ru,russian', 'ru.png', 'russian', 2, 1);

INSERT IGNORE INTO `oc_currency` VALUES 
(1, 'Рубль', 'RUB', '', ' руб.', '2', 1.00000000, 1, NOW()),
(2, 'Dollar', 'USD', '$', '', '2', 0.01200000, 1, NOW());

-- Основные настройки
INSERT IGNORE INTO `oc_setting` VALUES 
(1, 0, 'config', 'config_name', 'Flowers Belka', 0),
(2, 0, 'config', 'config_owner', 'Flowers Belka', 0),
(3, 0, 'config', 'config_address', 'Россия', 0),
(4, 0, 'config', 'config_email', 'admin@flowers-belka.ru', 0),
(5, 0, 'config', 'config_telephone', '+7 (000) 000-00-00', 0),
(6, 0, 'config', 'config_meta_title', 'Flowers Belka - Цветы и букеты', 0),
(7, 0, 'config', 'config_meta_description', 'Интернет-магазин цветов Flowers Belka', 0),
(8, 0, 'config', 'config_template', 'default', 0),
(9, 0, 'config', 'config_country_id', '176', 0),
(10, 0, 'config', 'config_zone_id', '2761', 0),
(11, 0, 'config', 'config_language', 'ru-ru', 0),
(12, 0, 'config', 'config_admin_language', 'ru-ru', 0),
(13, 0, 'config', 'config_currency', 'RUB', 0),
(14, 0, 'config', 'config_currency_auto', '1', 0),
(15, 0, 'config', 'config_length_class_id', '1', 0),
(16, 0, 'config', 'config_weight_class_id', '1', 0),
(17, 0, 'config', 'config_product_count', '1', 0),
(18, 0, 'config', 'config_review_status', '1', 0),
(19, 0, 'config', 'config_review_guest', '1', 0),
(20, 0, 'config', 'config_voucher_min', '1', 0),
(21, 0, 'config', 'config_voucher_max', '1000', 0),
(22, 0, 'config', 'config_tax', '1', 0),
(23, 0, 'config', 'config_tax_default', 'shipping', 0),
(24, 0, 'config', 'config_tax_customer', 'shipping', 0),
(25, 0, 'config', 'config_customer_online', '1', 0),
(26, 0, 'config', 'config_customer_activity', '1', 0),
(27, 0, 'config', 'config_customer_search', '1', 0),
(28, 0, 'config', 'config_customer_group_id', '1', 0),
(29, 0, 'config', 'config_customer_group_display', 'a:1:{i:0;s:1:"1";}', 1),
(30, 0, 'config', 'config_customer_price', '0', 0);