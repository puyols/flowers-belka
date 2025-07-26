<?php
class ControllerCommonCityManager extends Controller {
	
	public function setCity() {
		$json = array();
		
		if (isset($this->request->post['city'])) {
			$city = $this->request->post['city'];
			
			// Проверяем, что город существует в нашем списке
			$cities = $this->getCities();
			
			if (isset($cities[$city])) {
				$this->session->data['selected_city'] = $city;
				$json['success'] = true;
				$json['city'] = $cities[$city];
			} else {
				$json['error'] = 'Город не найден';
			}
		} else {
			$json['error'] = 'Город не указан';
		}
		
		$this->response->addHeader('Content-Type: application/json');
		$this->response->setOutput(json_encode($json));
	}
	
	public function getCurrentCity() {
		// Получаем текущий выбранный город или устанавливаем по умолчанию
		if (isset($this->session->data['selected_city'])) {
			$current_city = $this->session->data['selected_city'];
		} else {
			$current_city = 'putilkovo'; // По умолчанию Путилково
			$this->session->data['selected_city'] = $current_city;
		}
		
		$cities = $this->getCities();
		return isset($cities[$current_city]) ? $cities[$current_city] : $cities['putilkovo'];
	}
	
	public function getCurrentCityKey() {
		if (isset($this->session->data['selected_city'])) {
			return $this->session->data['selected_city'];
		} else {
			$this->session->data['selected_city'] = 'putilkovo';
			return 'putilkovo';
		}
	}
	
	public function getCities() {
		return array(
			'putilkovo' => array(
				'name' => 'Путилково',
				'name_genitive' => 'Путилково', // в Путилково
				'name_locative' => 'Путилково', // в Путилково
				'title_suffix' => 'в Путилково',
				'description_suffix' => 'с доставкой в Путилково',
				'delivery_time' => '1-2 часа',
				'delivery_cost' => 'от 300 рублей',
				'free_delivery' => 'от 2500 рублей',
				'phone' => '+7 (495) 123-45-67',
				'email' => 'putilkovo@flowers-belka.ru',
				'is_default' => true
			),
			'moscow' => array(
				'name' => 'Москва',
				'name_genitive' => 'Москвы', // из Москвы
				'name_locative' => 'Москве', // в Москве
				'title_suffix' => 'в Москве',
				'description_suffix' => 'с доставкой по Москве',
				'delivery_time' => '2-4 часа',
				'delivery_cost' => 'от 500 рублей',
				'free_delivery' => 'от 3000 рублей',
				'phone' => '+7 (495) 123-45-67',
				'email' => 'moscow@flowers-belka.ru',
				'is_default' => false
			),
			'himki' => array(
				'name' => 'Химки',
				'name_genitive' => 'Химок', // из Химок
				'name_locative' => 'Химках', // в Химках
				'title_suffix' => 'в Химках',
				'description_suffix' => 'с доставкой в Химки',
				'delivery_time' => '3-5 часов',
				'delivery_cost' => '700 рублей',
				'free_delivery' => 'от 4000 рублей',
				'phone' => '+7 (495) 123-45-67',
				'email' => 'himki@flowers-belka.ru',
				'is_default' => false
			),
			'kurkino' => array(
				'name' => 'Куркино',
				'name_genitive' => 'Куркино', // из Куркино
				'name_locative' => 'Куркино', // в Куркино
				'title_suffix' => 'в Куркино',
				'description_suffix' => 'с доставкой в Куркино',
				'delivery_time' => '2-4 часа',
				'delivery_cost' => '600 рублей',
				'free_delivery' => 'от 3500 рублей',
				'phone' => '+7 (495) 123-45-67',
				'email' => 'kurkino@flowers-belka.ru',
				'is_default' => false
			),
			'mitino' => array(
				'name' => 'Митино',
				'name_genitive' => 'Митино', // из Митино
				'name_locative' => 'Митино', // в Митино
				'title_suffix' => 'в Митино',
				'description_suffix' => 'с доставкой в Митино',
				'delivery_time' => '2-3 часа',
				'delivery_cost' => '550 рублей',
				'free_delivery' => 'от 3200 рублей',
				'phone' => '+7 (495) 123-45-67',
				'email' => 'mitino@flowers-belka.ru',
				'is_default' => false
			),
			'tushino' => array(
				'name' => 'Тушино',
				'name_genitive' => 'Тушино', // из Тушино
				'name_locative' => 'Тушино', // в Тушино
				'title_suffix' => 'в Тушино',
				'description_suffix' => 'с доставкой в Тушино',
				'delivery_time' => '2-3 часа',
				'delivery_cost' => '550 рублей',
				'free_delivery' => 'от 3200 рублей',
				'phone' => '+7 (495) 123-45-67',
				'email' => 'tushino@flowers-belka.ru',
				'is_default' => false
			),
			'krasnogorsk' => array(
				'name' => 'Красногорск',
				'name_genitive' => 'Красногорска', // из Красногорска
				'name_locative' => 'Красногорске', // в Красногорске
				'title_suffix' => 'в Красногорске',
				'description_suffix' => 'с доставкой в Красногорск',
				'delivery_time' => '3-5 часов',
				'delivery_cost' => '800 рублей',
				'free_delivery' => 'от 4500 рублей',
				'phone' => '+7 (495) 123-45-67',
				'email' => 'krasnogorsk@flowers-belka.ru',
				'is_default' => false
			)
		);
	}
}
