<?php
/**
 * @package		OpenCart
 * @author		Daniel Kerr
 * @copyright	Copyright (c) 2005 - 2017, OpenCart, Ltd. (https://www.opencart.com/)
 * @license		https://opensource.org/licenses/GPL-3.0
 * @link		https://www.opencart.com
*/

/**
* Response class
*/
class Response {
	private $headers = array();
	private $level = 0;
	private $output;

	/**
	 * Constructor
	 *
	 * @param	string	$header
	 *
	*/
	public function addHeader($header) {
		$this->headers[] = $header;
	}
	
	/**
	 *
	 *
	 * @param	string	$url
	 * @param	int		$status
	 *
	*/
	public function redirect($url, $status = 301) {
		header('Location: ' . str_replace(array('&amp;', "\n", "\r"), array('&', '', ''), $url), true, $status);
		exit();
	}
	
	/**
	 *
	 *
	 * @param	int		$level
	*/
	public function setCompression($level) {
		$this->level = $level;
	}
	
	/**
	 *
	 *
	 * @return	array
	*/
	public function getOutput() {
		return $this->output;
	}
	
	/**
	 *
	 *
	 * @param	string	$output
	*/
	public function setOutput($output) {
		$this->output = $output;
	}
	
	/**
	 *
	 *
	 * @param	string	$data
	 * @param	int		$level
	 * 
	 * @return	string
	*/
	private function compress($data, $level = 0) {
		if (isset($_SERVER['HTTP_ACCEPT_ENCODING']) && (strpos($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip') !== false)) {
			$encoding = 'gzip';
		}

		if (isset($_SERVER['HTTP_ACCEPT_ENCODING']) && (strpos($_SERVER['HTTP_ACCEPT_ENCODING'], 'x-gzip') !== false)) {
			$encoding = 'x-gzip';
		}

		if (!isset($encoding) || ($level < -1 || $level > 9)) {
			return $data;
		}

		if (!extension_loaded('zlib') || ini_get('zlib.output_compression')) {
			return $data;
		}

		if (headers_sent()) {
			return $data;
		}

		if (connection_status()) {
			return $data;
		}

		$this->addHeader('Content-Encoding: ' . $encoding);

		return gzencode($data, (int)$level);
	}
	
	/**
	 *
	*/
	public function output() {
		// Проверяем, что вывод не пустой и не слишком короткий
		if (!$this->output || strlen($this->output) < 20 || trim($this->output) === 'ru') {
			$this->output = '<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Flowers Belka</title>
</head>
<body>
	<h1>Магазин цветов "Flowers Belka"</h1>
	<p>Сайт находится в техническом обслуживании. Основная страница скоро будет доступна.</p>
	<p>Диагностическая информация:</p>
	<pre>
	Вывод: "' . htmlspecialchars($this->output) . '"
	Длина вывода: ' . strlen($this->output) . ' байт
	Заголовки: ' . print_r($this->headers, true) . '
	</pre>
</body>
</html>';
		}

		$output = $this->level ? $this->compress($this->output, $this->level) : $this->output;
		
		if (!headers_sent()) {
			foreach ($this->headers as $header) {
				header($header, true);
			}
			// Явно устанавливаем кодировку UTF-8
			header('Content-Type: text/html; charset=utf-8');
		}
		
		echo $output;
	}
}