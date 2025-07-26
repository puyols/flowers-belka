<?php
namespace Template;
final class Twig {
	private $data = array();

	public function set($key, $value) {
		$this->data[$key] = $value;
	}
	
	public function render($filename, $code = '') {
		if (!$code) {
			$file = DIR_TEMPLATE . $filename . '.twig';

			if (is_file($file)) {
				$code = file_get_contents($file);
			} else {
				throw new \Exception('Error: Could not load template ' . $file . '!');
				exit();
			}
		}

		// Проверка и использование простого шаблонизатора в случае проблем с Twig
		if (!class_exists('\\Twig\\Environment') && !class_exists('\\Twig_Environment')) {
			return $this->renderSimpleTemplate($code);
		}

		// Автозагрузчик для Twig через Composer
		if (is_file(DIR_STORAGE . 'vendor/autoload.php')) {
			require_once(DIR_STORAGE . 'vendor/autoload.php');
		}

		// Инициализируем Twig с правильными настройками
		try {
			// Используем только новую версию Twig
			$loader = new \Twig\Loader\ArrayLoader(array($filename . '.twig' => $code));
			$twig = new \Twig\Environment($loader, array(
				'cache' => DIR_CACHE,
				'debug' => true, // Включаем режим отладки
				'auto_reload' => true, // Автоматическая перезагрузка шаблонов
				'charset' => 'utf-8' // Явно указываем кодировку
			));
			
			// Добавляем глобальные переменные
			foreach ($this->data as $key => $value) {
				$twig->addGlobal($key, $value);
			}
			
			$result = $twig->render($filename . '.twig');
			
			// Проверяем результат
			if (!$result || trim($result) === 'ru' || strlen(trim($result)) < 20) {
				trigger_error('Warning: Empty or short output from Twig render: ' . $result);
				return $this->getFallbackTemplate();
			}
			
			return $result;
		} catch (\Exception $e) {
			// В случае ошибки используем простой шаблонизатор
			trigger_error('Error: ' . $e->getMessage() . ' in ' . $e->getFile() . ' on line ' . $e->getLine());
			$result = $this->renderSimpleTemplate($code);
			
			// Проверяем результат упрощенного шаблонизатора
			if (!$result || trim($result) === 'ru' || strlen(trim($result)) < 20) {
				return $this->getFallbackTemplate();
			}
			
			return $result;
		}
	}

	/**
	 * Простой шаблонизатор для случаев когда Twig недоступен
	 */
	private function renderSimpleTemplate($code) {
		// Заменяем базовые конструкции Twig
		foreach ($this->data as $key => $value) {
			$code = str_replace('{{ ' . $key . ' }}', $value, $code);
		}

		// Обработка условий - только простые условия
		$code = preg_replace_callback('/{%\s*if\s+(.+?)\s*%}(.*?){%\s*endif\s*%}/is', function($matches) {
			$condition = $matches[1];
			$content = $matches[2];
			
			// Заменяем переменные в условии на их значения
			foreach ($this->data as $key => $value) {
				if (is_scalar($value)) {
					$condition = str_replace($key, "'" . $value . "'", $condition);
				}
			}
			
			// Пытаемся выполнить условие
			try {
				if (@eval("return " . $condition . ";")) {
					return $content;
				}
			} catch (\Exception $e) {
				return ''; // В случае ошибки ничего не выводим
			}
			
			return '';
		}, $code);
		
		return $code;
	}
	
	/**
	 * Резервный шаблон на случай ошибок
	 */
	private function getFallbackTemplate() {
		return '<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Flowers Belka</title>
	<style>
		body { font-family: Arial, sans-serif; margin: 50px; }
		.container { max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
		h1 { color: #4a4a4a; }
		.error-info { background-color: #f8f8f8; padding: 15px; border-left: 5px solid #e74c3c; }
		.actions { margin-top: 20px; }
		.btn { display: inline-block; padding: 10px 15px; background-color: #3498db; color: white; text-decoration: none; border-radius: 3px; }
	</style>
</head>
<body>
	<div class="container">
		<h1>Магазин цветов "Flowers Belka"</h1>
		<p>Сайт находится в техническом обслуживании. Основная страница скоро будет доступна.</p>
		<div class="error-info">
			<p><strong>Диагностическая информация:</strong></p>
			<p>Произошла ошибка при отображении шаблона. Команда технической поддержки уже работает над решением проблемы.</p>
		</div>
		<div class="actions">
			<a href="javascript:location.reload()" class="btn">Обновить страницу</a>
		</div>
	</div>
</body>
</html>';
	}
}
