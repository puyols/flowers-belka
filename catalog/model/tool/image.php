<?php
class ModelToolImage extends Model {
	public function resize($filename, $width, $height) {
		if (!is_file(DIR_IMAGE . $filename) || substr(str_replace('\\', '/', realpath(DIR_IMAGE . $filename)), 0, strlen(DIR_IMAGE)) != str_replace('\\', '/', DIR_IMAGE)) {
			return;
		}

		// Проверяем наличие оптимизированной версии
		$optimized_url = $this->getOptimizedImage($filename, $width, $height);
		if ($optimized_url) {
			return $optimized_url;
		}

		$extension = pathinfo($filename, PATHINFO_EXTENSION);

		$image_old = $filename;
		$image_new = 'cache/' . utf8_substr($filename, 0, utf8_strrpos($filename, '.')) . '-' . (int)$width . 'x' . (int)$height . '.' . $extension;

		if (!is_file(DIR_IMAGE . $image_new) || (filemtime(DIR_IMAGE . $image_old) > filemtime(DIR_IMAGE . $image_new))) {
			list($width_orig, $height_orig, $image_type) = getimagesize(DIR_IMAGE . $image_old);
				 
			if (!in_array($image_type, array(IMAGETYPE_PNG, IMAGETYPE_JPEG, IMAGETYPE_GIF))) { 
				return DIR_IMAGE . $image_old;
			}
						
			$path = '';

			$directories = explode('/', dirname($image_new));

			foreach ($directories as $directory) {
				$path = $path . '/' . $directory;

				if (!is_dir(DIR_IMAGE . $path)) {
					@mkdir(DIR_IMAGE . $path, 0777);
				}
			}

			if ($width_orig != $width || $height_orig != $height) {
				$image = new Image(DIR_IMAGE . $image_old);
				$image->resize($width, $height);
				$image->save(DIR_IMAGE . $image_new);
			} else {
				copy(DIR_IMAGE . $image_old, DIR_IMAGE . $image_new);
			}
		}
		
		$image_new = str_replace(' ', '%20', $image_new);  // fix bug when attach image on email (gmail.com). it is automatic changing space " " to +
		
		if ($this->request->server['HTTPS']) {
			return $this->config->get('config_ssl') . 'image/' . $image_new;
		} else {
			return $this->config->get('config_url') . 'image/' . $image_new;
		}
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
		$path = str_replace(' ', '%20', $path);

		if ($this->request->server['HTTPS']) {
			return $this->config->get('config_ssl') . 'image/' . $path;
		} else {
			return $this->config->get('config_url') . 'image/' . $path;
		}
	}
}
