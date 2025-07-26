-- Настройки MySQL для импорта больших файлов
SET GLOBAL max_allowed_packet = 1073741824; -- 1GB
SET GLOBAL wait_timeout = 28800; -- 8 часов  
SET GLOBAL interactive_timeout = 28800; -- 8 часов
SET GLOBAL net_read_timeout = 600; -- 10 минут
SET GLOBAL net_write_timeout = 600; -- 10 минут

-- Показать текущие настройки
SHOW VARIABLES LIKE 'max_allowed_packet';
SHOW VARIABLES LIKE 'wait_timeout';
SHOW VARIABLES LIKE 'interactive_timeout';
