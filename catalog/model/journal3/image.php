<?php

use Journal3\Opencart\Model;
use Journal3\Utils\Arr;
use Journal3\Utils\Img;
use Journal3\Utils\Str;

class ModelJournal3Image extends Model {

	public function __construct($registry) {
		parent::__construct($registry);
		$this->load->model('tool/image');
	}

	public function transparent($width, $height) {
		static $imgs = [];

		$width  = (int) $width ?: 1;
		$height = (int) $height ?: 1;
		$key    = "{$width}x{$height}";

		if ( ! isset( $imgs[ $key ] ) ) {
			// REF: http://stackoverflow.com/questions/9370847/php-create-image-with-imagepng-and-convert-with-base64-encode-in-a-single-file
			ob_start();

			$img = imagecreatetruecolor( $width, $height );

			imagesavealpha( $img, true );
			imagetruecolortopalette( $img, false, 1 );

			$color = imagecolorallocatealpha( $img, 0, 0, 0, 127 );

			imagefill( $img, 0, 0, $color );
			imagepng( $img, null, 9 );
			imagedestroy( $img );

			$data = ob_get_contents();

			ob_end_clean();

			$imgs[ $key ] = 'data:image/png;base64,' . base64_encode( $data );
		}

		return $imgs[ $key ];
	}

	private function isNumeric($value) {
		return is_numeric($value) && $value > 0;
	}

	public function dimensions($filename) {
		if ($filename && is_file(DIR_IMAGE . $filename)) {
			list($width, $height) = @getimagesize(DIR_IMAGE . $filename);

			if (!$width || !$height) {
				trigger_error('Image <b>' . DIR_IMAGE . $filename . '</b> is invalid!');
			}
		} else {
			$width = null;
			$height = null;
		}

		return array($width, $height);
	}

	public function resize($filename, $width = null, $height = null, $resize_type = '') {
		if (is_array($filename)) {
			$filename = Arr::get($filename, $this->config->get('config_language_id'));
		}

		// Interstore remote image
		if (Str::endsWith($filename, '.http')) {
			return trim(file_get_contents(DIR_IMAGE . $filename));
		}

		// svg image
		if (Str::endsWith($filename, '.svg')) {
			return $this->model_tool_image->resize($filename, $width, $height, $resize_type);
		}

		// external image
		if (Str::startsWith($filename, 'http://') || Str::startsWith($filename, 'https://')) {
			return $filename;
		}

		if (!$filename || !is_file(DIR_IMAGE . $filename)) {
			$filename = 'placeholder.png';
		}

		// Попытка использовать оптимизированную версию
		$optimized_image = $this->getOptimizedImage($filename, $width, $height);
		if ($optimized_image) {
			return $optimized_image;
		}

		list($width_orig, $height_orig) = $this->dimensions($filename);

		if (!$this->isNumeric($width) && !$this->isNumeric($height)) {
			return $this->model_tool_image->resize($filename, $width_orig, $height_orig);
		}

		$ratio_orig = (float)$width_orig / $height_orig;

		if ($this->isNumeric($width) && $this->isNumeric($height)) {
			if ($resize_type === 'fill' || $resize_type === 'crop') {
				$ratio = (float)$width / $height;

				if ($ratio > $ratio_orig) {
					$resize_type = 'w';
				} else if ($ratio < $ratio_orig) {
					$resize_type = 'h';
				} else {
					$resize_type = '';
				}
			} else {
				$ratio = (float)$width / $height;

				if ($ratio > $ratio_orig) {
					$resize_type = 'h';
				} else if ($ratio < $ratio_orig) {
					$resize_type = 'w';
				} else {
					$resize_type = '';
				}
			}
		} else if ($this->isNumeric($width)) {
			$height = $width / $ratio_orig;
		} else {
			$width = $height * $ratio_orig;
		}

		return $this->model_tool_image->resize($filename, $width, $height, $resize_type);
	}

	/**
	 * Получает оптимизированную версию изображения (WebP если доступно)
	 */
	private function getOptimizedImage($filename, $width, $height) {
		$base_filename = pathinfo($filename, PATHINFO_FILENAME);
		$directory = dirname($filename);

		// Определяем размер на основе ширины
		$size = 'medium';
		if ($width <= 300) {
			$size = 'thumbnail';
		} elseif ($width >= 1000) {
			$size = 'large';
		}

		// Проверяем поддержку WebP в браузере
		$supports_webp = isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'image/webp') !== false;

		if ($supports_webp) {
			$webp_path = $directory . '/' . $base_filename . '_' . $size . '.webp';
			if (file_exists(DIR_IMAGE . $webp_path)) {
				return $this->getImageUrl($webp_path);
			}
		}

		// Fallback на JPEG
		$jpeg_path = $directory . '/' . $base_filename . '_' . $size . '.jpg';
		if (file_exists(DIR_IMAGE . $jpeg_path)) {
			return $this->getImageUrl($jpeg_path);
		}

		return null; // Возвращаем null если оптимизированных версий нет
	}

	/**
	 * Получает URL изображения
	 */
	private function getImageUrl($path) {
		if ($this->request->server['HTTPS']) {
			return HTTPS_CATALOG . 'image/' . $path;
		} else {
			return HTTP_CATALOG . 'image/' . $path;
		}
	}

	/**
	 * Создает адаптивное изображение с WebP поддержкой
	 */
	public function createResponsiveImage($filename, $alt = '', $class = '', $lazy = true) {
		if (!$filename || !is_file(DIR_IMAGE . $filename)) {
			$filename = 'placeholder.png';
		}

		$base_filename = pathinfo($filename, PATHINFO_FILENAME);
		$directory = dirname($filename);

		$sizes = ['thumbnail', 'medium', 'large'];
		$webp_sources = [];
		$jpeg_sources = [];
		$default_image = '';

		foreach ($sizes as $size) {
			$webp_path = $directory . '/' . $base_filename . '_' . $size . '.webp';
			$jpeg_path = $directory . '/' . $base_filename . '_' . $size . '.jpg';

			if (file_exists(DIR_IMAGE . $webp_path)) {
				$webp_sources[] = $this->getImageUrl($webp_path);
			}

			if (file_exists(DIR_IMAGE . $jpeg_path)) {
				$jpeg_sources[] = $this->getImageUrl($jpeg_path);
				if ($size === 'medium' && !$default_image) {
					$default_image = $this->getImageUrl($jpeg_path);
				}
			}
		}

		// Если нет оптимизированных версий, используем оригинал
		if (!$default_image) {
			$default_image = $this->getImageUrl($filename);
		}

		$html = '<picture';
		if ($class) {
			$html .= ' class="' . htmlspecialchars($class) . '"';
		}
		$html .= '>';

		// Добавляем WebP источники
		if (!empty($webp_sources)) {
			$html .= '<source srcset="' . implode(', ', $webp_sources) . '" type="image/webp">';
		}

		// Добавляем JPEG источники
		if (!empty($jpeg_sources)) {
			$html .= '<source srcset="' . implode(', ', $jpeg_sources) . '" type="image/jpeg">';
		}

		// Fallback изображение
		$img_attributes = [
			'src="' . htmlspecialchars($default_image) . '"',
			'alt="' . htmlspecialchars($alt) . '"'
		];

		if ($lazy) {
			$img_attributes[] = 'loading="lazy"';
		}

		$html .= '<img ' . implode(' ', $img_attributes) . '>';
		$html .= '</picture>';

		return $html;
	}

}
