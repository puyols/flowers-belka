<?php
class ControllerCommonHome extends Controller {
	public function index() {
		// Получаем информацию о текущем городе
		$this->load->controller('common/city_manager');
		$city_manager = new ControllerCommonCityManager($this->registry);
		$current_city = $city_manager->getCurrentCity();
		$current_city_key = $city_manager->getCurrentCityKey();

		// Устанавливаем мета-теги с учетом города
		$base_title = $this->config->get('config_meta_title');
		$base_description = $this->config->get('config_meta_description');

		// Добавляем топоним к заголовку и описанию
		$city_title = $base_title . ' ' . $current_city['title_suffix'];
		$city_description = $base_description . ' ' . $current_city['description_suffix'];

		$this->document->setTitle($city_title);
		$this->document->setDescription($city_description);
		$this->document->setKeywords($this->config->get('config_meta_keyword'));

		if (isset($this->request->get['route'])) {
			$this->document->addLink($this->config->get('config_url'), 'canonical');
		}

		// Передаем информацию о городе в шаблон
		$data['current_city'] = $current_city;
		$data['current_city_key'] = $current_city_key;

		$data['column_left'] = $this->load->controller('common/column_left');
		$data['column_right'] = $this->load->controller('common/column_right');
		$data['content_top'] = $this->load->controller('common/content_top');
		$data['content_bottom'] = $this->load->controller('common/content_bottom');
		$data['footer'] = $this->load->controller('common/footer');
		$data['header'] = $this->load->controller('common/header');

		$this->response->setOutput($this->load->view('common/home', $data));
	}
}
