<?php  
class ControllerModuleHtmlBlock extends Controller {
	
	static private $_depth = 0;
	static private $_depth_limit = 7;
	
	public function __construct($registry) {
		
		parent::__construct($registry);
		
		require_once 'html_block.token.php';
		app::registry()->create($registry);
	}
	
	public function index($block) {
		
		if (empty($block['status'])) {
			return;
		}
		
		if (isset($block['depth'])) {
			self::$_depth = $block['depth'];
		} else {
			self::$_depth = 0;
		}
		
		if (self::$_depth > self::$_depth_limit) return;
		
		$data['message'] = $message = '';
		
		// Filter store
		if (!empty($block['filter_store']) && !in_array($this->config->get('config_store_id'), $block['filter_store'])) {
			return;
		}
		
		if ($this->customer->isLogged()) {
			$customer_group_id = (int)$this->customer->getGroupId();
		} else {
			$customer_group_id = (int)$this->config->get('config_customer_group_id');
		}
					
		// Filter customer group
		if (!empty($block['filter_customer_group']) && !in_array($customer_group_id, $block['filter_customer_group'])) {
			return;
		}
		
		if (isset($this->request->get['route'])) {
			$route = (string)$this->request->get['route'];
		} else {
			$route = 'common/home';
		}
		
		// Filter manufacturer
		if ($route == 'product/manufacturer' && isset($this->request->get['manufacturer_id'])) {
			
			if (!empty($block['filter_manufacturer']) && !in_array($this->request->get['manufacturer_id'], $block['filter_manufacturer'])) {
				return;
			}
			
		}
		
		// Filter product
		if ($route == 'product/product' && isset($this->request->get['product_id'])) {
			
			if (!empty($block['filter_product']) && !in_array($this->request->get['product_id'], $block['filter_product'])) {
				return;
			}
			
		}
		
		// Filter category
		if ($route == 'product/category' && isset($this->request->get['path'])) {
			
			$path = explode('_', (string)$this->request->get['path']);
			$category_id = end($path);
			
			if (!empty($block['filter_category']) && !in_array($category_id, $block['filter_category'])) {
				return;
			}

		}
		
		// Filter information
		if ($route == 'information/information' && isset($this->request->get['information_id'])) {
			
			if (!empty($block['filter_information']) && !in_array($this->request->get['information_id'], $block['filter_information'])) {
				return;
			}
			
		}
		
		if (isset($block['style']) && !empty($block['css'])) {
			
			if (file_exists(DIR_APPLICATION .  'view/theme/' . $this->config->get('config_template') . '/stylesheet/html_block.css')) {
				$file_name = $this->config->get('config_template') . '/template/module/html_block.tpl';
			} else {
				$file_name = 'default/template/module/html_block.tpl';
			}
			
			$this->document->addStyle(DIR_APPLICATION .  'view/theme/' . $file_name);
		}
		
		$key = md5(http_build_query($block));
		
		if (!isset($block['use_cache']) || !$message = $this->cache->get('html_block.content.' . (int)$this->config->get('config_language_id') . '.' . $key)) {
			
			$message = $this->_render($block);
			
			if (isset($block['use_cache'])) {
				$this->cache->set('html_block.content.' . (int)$this->config->get('config_language_id') . '.' . $key, $message);
			}
		}
		
		$data['message'] = $message;
		
		if (file_exists(DIR_TEMPLATE . $this->config->get('config_template') . '/template/module/html_block.tpl')) {
			$template = $this->config->get('config_template') . '/template/module/html_block.tpl';
		} else {
			$template = 'default/template/module/html_block.tpl';
		}
		
		return $this->load->view($template, $data);
	}
	
	static public function getDepth() {
		return self::$_depth;
	}
	
	public function preview() {
		
		if (!isset($this->request->get['key']) || $this->request->get['key'] != 'dmkapd8qweuqiweqjwkeh123123123') {
			exit('access denied');
		}
		
		if ($this->_isAdmin()) {
			$block = $this->session->data['post'] = $this->request->post;
		} elseif (isset($this->session->data['post']))  {
			$block = $this->session->data['post'];
		} else {
			$block = array();
		}
		
		/*$key = key($post);*/
		
		/*if (strpos($key, 'html_block_') === 0 && count($post[$key])) {*/
			
			$this->load->language('module/html_block');
			
			$data['title'] = $this->language->get('heading_title');
			
			/*$block = $post[$key];*/
			
			if (isset($block['style']) && !empty($block['css'])) {
				$data['css'] = $block['css'];
			}
			
			foreach (array('style', 'stylesheet', 'common', 'front', 'styles', 'css') as $name) {
				
				$file_name = 'view/theme/' . $this->config->get('config_template') . '/stylesheet/' . $name . '.css';
				
				if (file_exists(DIR_APPLICATION . $file_name) && is_file(DIR_APPLICATION . $file_name)) {
					$this->document->addStyle('/catalog/' . $file_name);
				}
			}
			
			$data['styles'] = $this->document->getStyles();
			
			$language_id = key($block['content']);
			
			$data['message'] = $this->_render($block, $language_id);
			
			
			
			//$this->template = $this->config->get('config_template') . '/template/module/html_block_preview.tpl';
			
			//$this->render();
			
			
			
			
			//$html = $this->output;
			
			$html = $this->load->view($this->config->get('config_template') . '/template/module/html_block_preview.tpl', $data);
			
		/*} else {
			$html = 'ERROR!';
		}*/
		
		$this->response->setOutput($html);
	}
	
	private function _isAdmin() {
		return (isset($this->request->server['HTTP_REFERER']) && strpos($this->request->server['HTTP_REFERER'], '/admin/index.php?route=module/html_block') !== FALSE);
	}
	
	private function _render($block, $language_id = FALSE) {
		
		$message = '';
		
		if (!is_numeric($language_id)) {
			$language_id = $this->config->get('config_language_id');
		}
		
		$content = $block['content'][$language_id];
		
		if (isset($block['theme']) && !empty($block['template'])) {
			
			$parser = TokenParser::getInstance($block['template']);
			
			$tokenTitle = new Token();
			$tokenTitle->setReplace($block['title'][$language_id]);
			$parser->AddToken('[title]', $tokenTitle);
			
			$tokenContent = new Token();
			$tokenContent->setReplace($content);
			$parser->AddToken('[content]', $tokenContent);
			
			$content = $parser->replace();
		}
		
		$content = TokenParser::getInstance($content)->replace();
		
		$message = html_entity_decode($content, ENT_QUOTES, 'UTF-8');
		
		if (isset($block['use_php']) && preg_match('|<\?php.+?\?>|isu', $message)) {
			
			ob_start();
			@eval('?>' . $message);
			$message = ob_get_contents();
			ob_end_clean();
			
		}
		
		return $message;
	}
}
?>