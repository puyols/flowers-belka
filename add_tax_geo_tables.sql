-- Добавление таблиц для налогов и географии
USE flowers_belka_new;

-- Таблица налоговых правил
CREATE TABLE IF NOT EXISTS `oc_tax_rule` (
  `tax_rule_id` int(11) NOT NULL AUTO_INCREMENT,
  `tax_class_id` int(11) NOT NULL,
  `tax_rate_id` int(11) NOT NULL,
  `based` varchar(10) NOT NULL,
  `priority` int(5) NOT NULL DEFAULT '1',
  PRIMARY KEY (`tax_rule_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Таблица налоговых ставок
CREATE TABLE IF NOT EXISTS `oc_tax_rate` (
  `tax_rate_id` int(11) NOT NULL AUTO_INCREMENT,
  `geo_zone_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(32) NOT NULL,
  `rate` decimal(15,4) NOT NULL DEFAULT '0.0000',
  `type` char(1) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`tax_rate_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Связь налоговых ставок с группами клиентов
CREATE TABLE IF NOT EXISTS `oc_tax_rate_to_customer_group` (
  `tax_rate_id` int(11) NOT NULL,
  `customer_group_id` int(11) NOT NULL,
  PRIMARY KEY (`tax_rate_id`,`customer_group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Таблица налоговых классов
CREATE TABLE IF NOT EXISTS `oc_tax_class` (
  `tax_class_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL,
  `description` varchar(255) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`tax_class_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Географические зоны
CREATE TABLE IF NOT EXISTS `oc_geo_zone` (
  `geo_zone_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `description` varchar(255) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`geo_zone_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Связь зон с географией
CREATE TABLE IF NOT EXISTS `oc_zone_to_geo_zone` (
  `zone_to_geo_zone_id` int(11) NOT NULL AUTO_INCREMENT,
  `country_id` int(11) NOT NULL,
  `zone_id` int(11) NOT NULL DEFAULT '0',
  `geo_zone_id` int(11) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`zone_to_geo_zone_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Таблица стран
CREATE TABLE IF NOT EXISTS `oc_country` (
  `country_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `iso_code_2` varchar(2) NOT NULL,
  `iso_code_3` varchar(3) NOT NULL,
  `address_format` text NOT NULL,
  `postcode_required` tinyint(1) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`country_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Таблица зон/регионов
CREATE TABLE IF NOT EXISTS `oc_zone` (
  `zone_id` int(11) NOT NULL AUTO_INCREMENT,
  `country_id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `code` varchar(32) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`zone_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Таблица статусов товаров
CREATE TABLE IF NOT EXISTS `oc_stock_status` (
  `stock_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `language_id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`stock_status_id`,`language_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Таблица классов веса
CREATE TABLE IF NOT EXISTS `oc_weight_class` (
  `weight_class_id` int(11) NOT NULL AUTO_INCREMENT,
  `value` decimal(15,8) NOT NULL DEFAULT '0.00000000',
  PRIMARY KEY (`weight_class_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Описания классов веса
CREATE TABLE IF NOT EXISTS `oc_weight_class_description` (
  `weight_class_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `title` varchar(32) NOT NULL,
  `unit` varchar(4) NOT NULL,
  PRIMARY KEY (`weight_class_id`,`language_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Таблица классов длины
CREATE TABLE IF NOT EXISTS `oc_length_class` (
  `length_class_id` int(11) NOT NULL AUTO_INCREMENT,
  `value` decimal(15,8) NOT NULL DEFAULT '0.00000000',
  PRIMARY KEY (`length_class_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Описания классов длины
CREATE TABLE IF NOT EXISTS `oc_length_class_description` (
  `length_class_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `title` varchar(32) NOT NULL,
  `unit` varchar(4) NOT NULL,
  PRIMARY KEY (`length_class_id`,`language_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Базовые данные
INSERT IGNORE INTO `oc_country` VALUES 
(176, 'Russia', 'RU', 'RUS', '', 1, 1),
(222, 'United States', 'US', 'USA', '', 1, 1);

INSERT IGNORE INTO `oc_zone` VALUES 
(2761, 176, 'Moscow', 'MOW', 1),
(2762, 176, 'Saint Petersburg', 'SPE', 1);

INSERT IGNORE INTO `oc_geo_zone` VALUES 
(1, 'Russia', 'Russian Federation', NOW(), NOW());

INSERT IGNORE INTO `oc_zone_to_geo_zone` VALUES 
(1, 176, 0, 1, NOW(), NOW());

INSERT IGNORE INTO `oc_tax_class` VALUES 
(1, 'Taxable Goods', 'Taxed goods', NOW(), NOW()),
(2, 'Non-Taxable', 'Non-taxed goods', NOW(), NOW());

INSERT IGNORE INTO `oc_tax_rate` VALUES 
(1, 1, 'VAT (20%)', 20.0000, 'P', NOW(), NOW());

INSERT IGNORE INTO `oc_tax_rate_to_customer_group` VALUES 
(1, 1);

INSERT IGNORE INTO `oc_tax_rule` VALUES 
(1, 1, 1, 'shipping', 1);

INSERT IGNORE INTO `oc_stock_status` VALUES 
(1, 1, 'In Stock'),
(1, 2, 'В наличии'),
(2, 1, 'Out Of Stock'),
(2, 2, 'Нет в наличии');

INSERT IGNORE INTO `oc_weight_class` VALUES 
(1, 1.00000000),
(2, 1000.00000000);

INSERT IGNORE INTO `oc_weight_class_description` VALUES 
(1, 1, 'Kilogram', 'kg'),
(1, 2, 'Килограмм', 'кг'),
(2, 1, 'Gram', 'g'),
(2, 2, 'Грамм', 'г');

INSERT IGNORE INTO `oc_length_class` VALUES 
(1, 1.00000000),
(2, 10.00000000),
(3, 100.00000000);

INSERT IGNORE INTO `oc_length_class_description` VALUES 
(1, 1, 'Centimeter', 'cm'),
(1, 2, 'Сантиметр', 'см'),
(2, 1, 'Millimeter', 'mm'),
(2, 2, 'Миллиметр', 'мм'),
(3, 1, 'Meter', 'm'),
(3, 2, 'Метр', 'м');