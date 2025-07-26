<?php
// Version
define('VERSION', '3.0.3.6');

// Настройка буферизации вывода
ob_start();

// Configuration
if (is_file('config.php')) {
	require_once('config.php');
}

// Install
if (!defined('DIR_APPLICATION')) {
	header('Location: install/index.php');
	exit;
}

// Startup
require_once(DIR_SYSTEM . 'startup.php');

start('catalog');

// Отправляем буфер на вывод
ob_end_flush();