<?php
class ControllerCommonCity extends Controller {
	public function index() {
		$this->load->language('common/city');

		$data['heading_title'] = $this->language->get('heading_title');

		if (isset($this->request->get['city'])) {
			$city = $this->request->get['city'];
		} else {
			$city = '';
		}

		// Определяем информацию о городе
		$cities = array(
			'moscow' => array(
				'name' => 'Москва',
				'title' => 'Доставка цветов в Москве',
				'description' => 'Быстрая доставка цветов и букетов по Москве. Свежие цветы, профессиональная упаковка, доставка в день заказа.',
				'delivery_time' => '2-4 часа',
				'delivery_cost' => 'от 500 рублей',
				'free_delivery' => 'от 3000 рублей',
				'phone' => '+7 (495) 123-45-67',
				'email' => 'moscow@flowers-belka.ru'
			),
			'himki' => array(
				'name' => 'Химки',
				'title' => 'Доставка цветов в Химках',
				'description' => 'Быстрая доставка цветов и букетов в Химки. Свежие цветы, профессиональная упаковка, доставка в день заказа.',
				'delivery_time' => '3-5 часов',
				'delivery_cost' => '700 рублей',
				'free_delivery' => 'от 4000 рублей',
				'phone' => '+7 (495) 123-45-67',
				'email' => 'himki@flowers-belka.ru'
			),
			'kurkino' => array(
				'name' => 'Куркино',
				'title' => 'Доставка цветов в Куркино',
				'description' => 'Быстрая доставка цветов и букетов в район Куркино. Свежие цветы, профессиональная упаковка, доставка в день заказа.',
				'delivery_time' => '2-4 часа',
				'delivery_cost' => '600 рублей',
				'free_delivery' => 'от 3500 рублей',
				'phone' => '+7 (495) 123-45-67',
				'email' => 'kurkino@flowers-belka.ru'
			),
			'mitino' => array(
				'name' => 'Митино',
				'title' => 'Доставка цветов в Митино',
				'description' => 'Быстрая доставка цветов и букетов в район Митино. Свежие цветы, профессиональная упаковка, доставка в день заказа.',
				'delivery_time' => '2-3 часа',
				'delivery_cost' => '550 рублей',
				'free_delivery' => 'от 3200 рублей',
				'phone' => '+7 (495) 123-45-67',
				'email' => 'mitino@flowers-belka.ru'
			),
			'tushino' => array(
				'name' => 'Тушино',
				'title' => 'Доставка цветов в Тушино',
				'description' => 'Быстрая доставка цветов и букетов в район Тушино. Свежие цветы, профессиональная упаковка, доставка в день заказа.',
				'delivery_time' => '2-3 часа',
				'delivery_cost' => '550 рублей',
				'free_delivery' => 'от 3200 рублей',
				'phone' => '+7 (495) 123-45-67',
				'email' => 'tushino@flowers-belka.ru'
			),
			'krasnogorsk' => array(
				'name' => 'Красногорск',
				'title' => 'Доставка цветов в Красногорск',
				'description' => 'Быстрая доставка цветов и букетов в Красногорск. Свежие цветы, профессиональная упаковка, доставка в день заказа.',
				'delivery_time' => '3-5 часов',
				'delivery_cost' => '800 рублей',
				'free_delivery' => 'от 4500 рублей',
				'phone' => '+7 (495) 123-45-67',
				'email' => 'krasnogorsk@flowers-belka.ru'
			)
		);

		if (isset($cities[$city])) {
			$city_info = $cities[$city];
			
			$data['city_name'] = $city_info['name'];
			$data['city_title'] = $city_info['title'];
			$data['city_description'] = $city_info['description'];
			$data['delivery_time'] = $city_info['delivery_time'];
			$data['delivery_cost'] = $city_info['delivery_cost'];
			$data['free_delivery'] = $city_info['free_delivery'];
			$data['phone'] = $city_info['phone'];
			$data['email'] = $city_info['email'];

			// Устанавливаем мета-теги
			$this->document->setTitle($city_info['title'] . ' | Flowers Belka');
			$this->document->setDescription($city_info['description']);

			$data['breadcrumbs'] = array();

			$data['breadcrumbs'][] = array(
				'text' => $this->language->get('text_home'),
				'href' => $this->url->link('common/home')
			);

			$data['breadcrumbs'][] = array(
				'text' => $city_info['name'],
				'href' => $this->url->link('common/city', 'city=' . $city)
			);

			$data['column_left'] = $this->load->controller('common/column_left');
			$data['column_right'] = $this->load->controller('common/column_right');
			$data['content_top'] = $this->load->controller('common/content_top');
			$data['content_bottom'] = $this->load->controller('common/content_bottom');
			$data['footer'] = $this->load->controller('common/footer');
			$data['header'] = $this->load->controller('common/header');

			$this->response->setOutput($this->load->view('common/city', $data));
		} else {
			// Если город не найден, перенаправляем на главную
			$this->response->redirect($this->url->link('common/home'));
		}
	}
}
