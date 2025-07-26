-- Добавление финальных таблиц OpenCart
USE flowers_belka_new;

-- Таблица событий
CREATE TABLE IF NOT EXISTS `oc_event` (
  `event_id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(128) NOT NULL,
  `trigger` text NOT NULL,
  `action` text NOT NULL,
  `status` tinyint(1) NOT NULL,
  `sort_order` int(3) NOT NULL,
  PRIMARY KEY (`event_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Таблица расширений
CREATE TABLE IF NOT EXISTS `oc_extension` (
  `extension_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `code` varchar(128) NOT NULL,
  PRIMARY KEY (`extension_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Таблица модификаций
CREATE TABLE IF NOT EXISTS `oc_modification` (
  `modification_id` int(11) NOT NULL AUTO_INCREMENT,
  `extension_install_id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `code` varchar(64) NOT NULL,
  `author` varchar(64) NOT NULL,
  `version` varchar(32) NOT NULL,
  `link` varchar(255) NOT NULL,
  `xml` mediumtext NOT NULL,
  `status` tinyint(1) NOT NULL,
  `date_added` datetime NOT NULL,
  PRIMARY KEY (`modification_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Таблица информационных страниц
CREATE TABLE IF NOT EXISTS `oc_information` (
  `information_id` int(11) NOT NULL AUTO_INCREMENT,
  `bottom` int(1) NOT NULL DEFAULT '0',
  `sort_order` int(3) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`information_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Описания информационных страниц
CREATE TABLE IF NOT EXISTS `oc_information_description` (
  `information_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `title` varchar(64) NOT NULL,
  `description` mediumtext NOT NULL,
  `meta_title` varchar(255) NOT NULL,
  `meta_description` varchar(255) NOT NULL,
  `meta_keyword` varchar(255) NOT NULL,
  PRIMARY KEY (`information_id`,`language_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Таблица макетов
CREATE TABLE IF NOT EXISTS `oc_layout` (
  `layout_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`layout_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Таблица маршрутов макетов
CREATE TABLE IF NOT EXISTS `oc_layout_route` (
  `layout_route_id` int(11) NOT NULL AUTO_INCREMENT,
  `layout_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `route` varchar(255) NOT NULL,
  PRIMARY KEY (`layout_route_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Таблица модулей макетов
CREATE TABLE IF NOT EXISTS `oc_layout_module` (
  `layout_module_id` int(11) NOT NULL AUTO_INCREMENT,
  `layout_id` int(11) NOT NULL,
  `code` varchar(64) NOT NULL,
  `position` varchar(14) NOT NULL,
  `sort_order` int(3) NOT NULL,
  PRIMARY KEY (`layout_module_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Таблица модулей
CREATE TABLE IF NOT EXISTS `oc_module` (
  `module_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `code` varchar(32) NOT NULL,
  `setting` text NOT NULL,
  PRIMARY KEY (`module_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Таблица URL алиасов
CREATE TABLE IF NOT EXISTS `oc_seo_url` (
  `seo_url_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `query` varchar(255) NOT NULL,
  `keyword` varchar(255) NOT NULL,
  PRIMARY KEY (`seo_url_id`),
  KEY `query` (`query`),
  KEY `keyword` (`keyword`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Базовые данные
INSERT IGNORE INTO `oc_layout` VALUES 
(1, 'Home'),
(2, 'Product'),
(3, 'Category'),
(4, 'Default');

INSERT IGNORE INTO `oc_layout_route` VALUES 
(1, 1, 0, 'common/home'),
(2, 2, 0, 'product/product'),
(3, 3, 0, 'product/category'),
(4, 4, 0, '');

INSERT IGNORE INTO `oc_information` VALUES 
(1, 1, 1, 1),
(2, 1, 2, 1),
(3, 1, 3, 1),
(4, 1, 4, 1);

INSERT IGNORE INTO `oc_information_description` VALUES 
(1, 1, 'About Us', '<p>About us information</p>', 'About Us', 'About us page', 'about'),
(1, 2, 'О нас', '<p>Информация о нас</p>', 'О нас', 'Страница о нас', 'о нас'),
(2, 1, 'Delivery Information', '<p>Delivery information</p>', 'Delivery', 'Delivery info', 'delivery'),
(2, 2, 'Информация о доставке', '<p>Информация о доставке</p>', 'Доставка', 'Информация о доставке', 'доставка'),
(3, 1, 'Privacy Policy', '<p>Privacy policy</p>', 'Privacy Policy', 'Privacy policy', 'privacy'),
(3, 2, 'Политика конфиденциальности', '<p>Политика конфиденциальности</p>', 'Конфиденциальность', 'Политика конфиденциальности', 'конфиденциальность'),
(4, 1, 'Terms & Conditions', '<p>Terms and conditions</p>', 'Terms', 'Terms and conditions', 'terms'),
(4, 2, 'Условия использования', '<p>Условия использования</p>', 'Условия', 'Условия использования', 'условия');

-- Обновляем настройки
INSERT IGNORE INTO `oc_setting` VALUES 
(31, 0, 'config', 'config_layout_id', '4', 0),
(32, 0, 'config', 'config_theme', 'default', 0),
(33, 0, 'config', 'config_image_category_width', '80', 0),
(34, 0, 'config', 'config_image_category_height', '80', 0),
(35, 0, 'config', 'config_image_thumb_width', '228', 0),
(36, 0, 'config', 'config_image_thumb_height', '228', 0),
(37, 0, 'config', 'config_image_popup_width', '500', 0),
(38, 0, 'config', 'config_image_popup_height', '500', 0),
(39, 0, 'config', 'config_image_product_width', '228', 0),
(40, 0, 'config', 'config_image_product_height', '228', 0);