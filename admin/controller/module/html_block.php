<?php
class ControllerModuleHtmlBlock extends Controller {
	
	private $error = array(); 
	
	public function index() {
		
		$this->document->addStyle('view/stylesheet/html_block.css');
		
		$this->load->language('module/html_block');

		$this->document->setTitle(strip_tags($this->language->get('heading_title')));
		
		$this->load->model('extension/module');
				
		if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
			
			if (!isset($this->request->get['module_id'])) {
				
				$this->model_extension_module->addModule('html_block', $this->request->post);
				
				$modules = $this->model_extension_module->getModulesByCode('html_block');
				
				$ids = array();
				
				foreach ($modules as  $module) {
					$ids[] = $module['module_id'];
				}
				
				$this->request->get['module_id'] = max($ids);
				
			} else {
				$this->model_extension_module->editModule($this->request->get['module_id'], $this->request->post);
			}
			
			$this->clearCache();
			
			// save #CSS-style
			$this->saveStyle();
			
			$this->session->data['success'] = $this->language->get('text_success');
			
			if (isset($this->request->get['apply'])) {
				$url = $this->url->link('module/html_block', 'token=' . $this->session->data['token'] . '&module_id=' . $this->request->get['module_id'], 'SSL');
			} else {
				$url = $this->url->link('extension/module', 'token=' . $this->session->data['token'], 'SSL');
			}
			
			$this->response->redirect($url);
		}
				
		$data['heading_title'] = $this->language->get('heading_title');

		$data['text_edit'] = $this->language->get('text_edit');
		$data['text_required'] = $this->language->get('text_required');
		$data['text_preview'] = $this->language->get('text_preview');
		$data['text_enabled'] = $this->language->get('text_enabled');
		$data['text_disabled'] = $this->language->get('text_disabled');
		$data['text_none'] = $this->language->get('text_none');
		$data['text_php_help'] = $this->language->get('text_php_help');
		$data['text_php_help_editor'] = $this->language->get('text_php_help_editor');
		$data['text_tokens'] = $this->language->get('text_tokens');
		$data['text_replace_title'] = $this->language->get('text_replace_title');
		$data['text_replace_content'] = $this->language->get('text_replace_content');
		$data['text_enabled_editor'] = $this->language->get('text_enabled_editor');
		$data['text_disable_editor'] = $this->language->get('text_disable_editor');
		$data['text_confirm_remove'] = $this->language->get('text_confirm_remove');
		$data['text_confirm_remove_theme'] = $this->language->get('text_confirm_remove_theme');
		$data['text_help_machine_name'] = $this->language->get('text_help_machine_name');
		$data['text_title_shop'] = $this->language->get('text_title_shop');
		$data['text_token_config_name'] = $this->language->get('text_token_config_name');
		$data['text_token_config_title'] = $this->language->get('text_token_config_title');
		$data['text_token_config_owner'] = $this->language->get('text_token_config_owner');
		$data['text_token_config_address'] = $this->language->get('text_token_config_address');
		$data['text_token_config_email'] = $this->language->get('text_token_config_email');
		$data['text_token_config_telephone'] = $this->language->get('text_token_config_telephone');
		$data['text_token_config_fax'] = $this->language->get('text_token_config_fax');
		$data['text_title_customer'] = $this->language->get('text_title_customer');
		$data['text_token_customer_firstname']	= $this->language->get('text_token_customer_firstname');
		$data['text_token_customer_lastname'] = $this->language->get('text_token_customer_lastname');
		$data['text_token_customer_email'] = $this->language->get('text_token_customer_email');
		$data['text_token_customer_telephone']	= $this->language->get('text_token_customer_telephone');
		$data['text_token_customer_fax'] = $this->language->get('text_token_customer_fax');
		$data['text_token_customer_reward'] = $this->language->get('text_token_customer_reward');
		$data['text_title_over'] = $this->language->get('text_title_over');
		$data['text_token_currency_code'] = $this->language->get('text_token_currency_code');
		$data['text_token_currency_title'] = $this->language->get('text_token_currency_title');
		$data['text_token_language_code'] = $this->language->get('text_token_language_code');
		$data['text_token_language_name'] = $this->language->get('text_token_language_name');
		$data['text_token_block'] = $this->language->get('text_token_block');
		$data['text_help_tokens_customer'] = $this->language->get('text_help_tokens_customer');
		$data['text_default_template'] = $this->language->get('text_default_template');
		$data['text_select_all'] = $this->language->get('text_select_all');
		$data['text_unselect_all'] = $this->language->get('text_unselect_all');
		
		$data['entry_html_block'] = $this->language->get('entry_html_block');
		$data['entry_name'] = $this->language->get('entry_name');
		$data['entry_status'] = $this->language->get('entry_status');
		$data['entry_php'] = $this->language->get('entry_php');
		$data['entry_cache'] = $this->language->get('entry_cache');
		$data['entry_store'] = $this->language->get('entry_store');
		$data['entry_manufacturer'] = $this->language->get('entry_manufacturer');
		$data['entry_category'] = $this->language->get('entry_category');
		$data['entry_information'] = $this->language->get('entry_information');
		$data['entry_product'] = $this->language->get('entry_product');
		$data['entry_customer_group'] = $this->language->get('entry_customer_group');
		$data['entry_theme'] = $this->language->get('entry_theme');
		$data['entry_use_theme'] = $this->language->get('entry_use_theme');
		$data['entry_style'] = $this->language->get('entry_style');
		$data['entry_title'] = $this->language->get('entry_title');
		$data['entry_content'] = $this->language->get('entry_content');
		
		$data['help_block_title'] = $this->language->get('help_block_title');
		$data['help_theme_title'] = $this->language->get('help_theme_title');
		$data['help_cache'] = $this->language->get('help_cache');
		$data['help_use_theme'] = $this->language->get('help_use_theme');
		
		$data['column_token'] = $this->language->get('column_token');
		$data['column_value'] = $this->language->get('column_value');
		
		$data['button_save'] = $this->language->get('button_save');
		$data['button_apply'] = $this->language->get('button_apply');
		$data['button_cancel'] = $this->language->get('button_cancel');
		$data['button_clear_cache'] = $this->language->get('button_clear_cache');
		$data['button_live_view'] = $this->language->get('button_live_view');
		
		$data['tab_general'] = $this->language->get('tab_general');
		$data['tab_data'] = $this->language->get('tab_data');
		$data['tab_filter'] = $this->language->get('tab_filter');
		
		$data['token'] = $this->session->data['token'];
		
		if (isset($this->session->data['success'])) {
			$data['success'] = $this->session->data['success'];
		
			unset($this->session->data['success']);
		} else {
			$data['success'] = '';
		}
		
 		if (isset($this->error['warning'])) {
			$data['error_warning'] = $this->error['warning'];
			
			unset($this->error['warning']);
		} else {
			$data['error_warning'] = '';
		}
		
		$data['error'] = $this->error;
		
  		$data['breadcrumbs'] = array();

   		$data['breadcrumbs'][] = array(
       		'text'      => $this->language->get('text_home'),
			'href'      => $this->url->link('common/home', 'token=' . $this->session->data['token'], 'SSL')
   		);

   		$data['breadcrumbs'][] = array(
       		'text'      => $this->language->get('text_module'),
			'href'      => $this->url->link('extension/module', 'token=' . $this->session->data['token'], 'SSL')
   		);
		
   		$data['breadcrumbs'][] = array(
       		'text'      => strip_tags($this->language->get('heading_title')),
			'href'      => $this->url->link('module/html_block', 'token=' . $this->session->data['token'], 'SSL')
   		);
		
		if (!isset($this->request->get['module_id'])) {
			$data['action'] = $this->url->link('module/html_block', 'token=' . $this->session->data['token'], 'SSL');
		} else {
			$data['action'] = $this->url->link('module/html_block', 'token=' . $this->session->data['token'] . '&module_id=' . $this->request->get['module_id'], 'SSL');
		}
		
		$data['cancel'] = $this->url->link('extension/module', 'token=' . $this->session->data['token'], 'SSL');
		
		if (isset($this->request->get['module_id'])) {
			$data['clear_cache'] = $this->url->link('module/html_block/clear_cache', 'token=' . $this->session->data['token'] . '&module_id=' . $this->request->get['module_id'], 'SSL');
		}
		
		if ($this->request->server['REQUEST_METHOD'] == 'POST') {
			$data['module_info'] = $this->request->post;
		} elseif (isset($this->request->get['module_id'])) {
			$data['module_info'] = $this->model_extension_module->getModule($this->request->get['module_id']);
		} else {
			$data['module_info'] = array();
		}
		
		if (!empty($data['module_info']['filter_product'])) {
			
			$this->load->model('catalog/product');
					
			$filter_product = $data['module_info']['filter_product'];
			
			$data['module_info']['filter_product'] = array();

			foreach ($filter_product as $product_id) {
				
				$product_info = $this->model_catalog_product->getProduct($product_id);
	
				if ($product_info) {
					$data['module_info']['filter_product'][] = array(
						'product_id' => $product_info['product_id'],
						'name'       => $product_info['name']
					);
				}
			}
			
		}
		
		if (!empty($data['module_info']['filter_information'])) {
			
			$this->load->model('module/html_block');
			
			$filter_information = $data['module_info']['filter_information'];
			
			$data['module_info']['filter_information'] = array();

			foreach ($filter_information as $information_id) {
				
				$information_info = $this->model_module_html_block->getInformation($information_id);
				
				if ($information_info) {
					$data['module_info']['filter_information'][] = array(
						'information_id'	=> $information_info['information_id'],
						'name'				=> $information_info['title']
					);
				}
			}
			
		}
		
		$this->load->model('localisation/language');
		
		$data['languages'] = $this->model_localisation_language->getLanguages();
		
		$this->load->model('setting/store');
		
		$data['stores'] = array();
		$data['stores'][] = array(
			'store_id' => 0,
			'name'	   => $this->config->get('config_name')
		);
		
		$data['stores'] = array_merge($data['stores'], $this->model_setting_store->getStores());
		
		$this->load->model('catalog/manufacturer');
		
		$results = $this->model_catalog_manufacturer->getManufacturers();

		foreach ($results as $result) {
			$data['manufacturers'][] = array(
				'manufacturer_id'	=> $result['manufacturer_id'],
				'name'				=> $result['name']
			);
		}
		
		$this->load->model('catalog/category');
		
		$filter = array(
			'sort' => 'name'
		);
		
		$results = $this->model_catalog_category->getCategories($filter);

		foreach ($results as $result) {
			$data['categories'][] = array(
				'category_id'	=> $result['category_id'],
				'name'			=> $result['name']
			);
		}
		
		$this->load->model('sale/customer_group');
		
		$results = $this->model_sale_customer_group->getCustomerGroups();

		foreach ($results as $result) {
			$data['customer_groups'][] = array(
				'customer_group_id' => $result['customer_group_id'],
				'name'              => $result['name'] . (($result['customer_group_id'] == $this->config->get('config_customer_group_id')) ? $this->language->get('text_default') : ''),
			);
		}
		
		$data['header'] = $this->load->controller('common/header');
		$data['column_left'] = $this->load->controller('common/column_left');
		$data['footer'] = $this->load->controller('common/footer');

		$this->response->setOutput($this->load->view('module/html_block.tpl', $data));
	}
	
	public function clear_cache() {
		
		if (isset($this->request->server['HTTP_REFERER']) && strpos($this->request->server['HTTP_REFERER'], 'module/html_block')) {
			
			$this->clearCache();
			
			$this->load->language('module/html_block');
			$this->session->data['success'] = $this->language->get('text_success_clear_cache');
		}
		
		$this->response->redirect($this->url->link('module/html_block', 'token=' . $this->session->data['token'] . '&module_id=' . $this->request->get['module_id'], 'SSL'));
	}
	
	private function clearCache() {
		
		$files = glob(DIR_CACHE . 'cache.html_block');
			
		if ($files) {
			foreach ($files as $file) {
				if (file_exists($file)) {
					
					unlink($file);
					clearstatcache();
				}
			}
		}
	}
	
	private function saveStyle() {
		
		$reset = empty($this->request->post['css_change']);
		
		if ($reset) {
			
			$css = "";
			
			$modules = $this->model_extension_module->getModulesByCode('html_block');
			
			foreach ($modules as  $module) {
				
				if ($module['setting']) {
					$setting = unserialize($module['setting']);
				} else {
					$setting = array();
				}
				
				if (!empty($setting['style']) && !empty($setting['css'])) {
					$css .= "/* BLOCK #" . $module['module_id'] . " */\r\n";
					$css .= trim($setting['css']);
					$css .= "\r\n";
				}
				
			}
			
			file_put_contents(DIR_CATALOG . 'view/theme/' . $this->config->get('config_template') . '/stylesheet/html_block.css', $css);
		}
	}
	
	private function validate() {
		
		if (!$this->user->hasPermission('modify', 'module/html_block')) {
			$this->error['warning'] = $this->language->get('error_permission');
		} else {
			
			if ((utf8_strlen($this->request->post['name']) < 3) || (utf8_strlen($this->request->post['name']) > 64)) {
				$this->error['name'] = $this->language->get('error_name');
			}
			
			$file_name = DIR_CATALOG . 'view/theme/' . $this->config->get('config_template') . '/stylesheet/html_block.css';
			
			if (!file_exists($file_name) || !is_file($file_name)) {
				@file_put_contents(DIR_CATALOG . 'view/theme/' . $this->config->get('config_template') . '/stylesheet/html_block.css', '');
			}
			
			if (!file_exists($file_name) || !is_file($file_name)) {
				$this->error['warning'] = sprintf($this->language->get('error_file_not_found'), $file_name);
			} elseif (!is_writable($file_name)) {
				$this->error['warning'] = sprintf($this->language->get('error_writable'), $file_name);
			}
		}
		
		return !$this->error;
	}
	
	// Information autocomplete
	
	public function autocomplete() {
		
		$json = array();

		if (isset($this->request->get['filter_name'])) {
		
			$this->load->model('module/html_block');

			$filter_data = array(
				'filter_title'	=> $this->request->get['filter_name'],
				'start'			=> 0,
				'limit'			=> 5
			);

			$results = $this->model_module_html_block->getInformations($filter_data);

			foreach ($results as $result) {
				$json[] = array(
					'information_id' => $result['information_id'],
					'name'            => strip_tags(html_entity_decode($result['title'], ENT_QUOTES, 'UTF-8'))
				);
			}
		}

		$sort_order = array();

		foreach ($json as $key => $value) {
			$sort_order[$key] = $value['name'];
		}

		array_multisort($sort_order, SORT_ASC, $json);

		$this->response->addHeader('Content-Type: application/json');
		$this->response->setOutput(json_encode($json));
		
	}
}
?>