<?php
class ControllerProductTags extends Controller {
	public function index() {
		$this->load->language('product/tags');

		$this->load->model('catalog/tags');

		$this->load->model('catalog/product');

		$this->load->model('catalog/category');

		$this->load->model('tool/image');

		if (isset($this->request->get['filter'])) {
			$filter = $this->request->get['filter'];
		} else {
			$filter = '';
		}

		if (isset($this->request->get['sort'])) {
			$sort = $this->request->get['sort'];
		} else {
			$sort = 'p.sort_order';
		}

		if (isset($this->request->get['order'])) {
			$order = $this->request->get['order'];
		} else {
			$order = 'ASC';
		}

		if (isset($this->request->get['page'])) {
			$page = $this->request->get['page'];
		} else {
			$page = 1;
		}

		if (isset($this->request->get['limit'])) {
			$limit = $this->request->get['limit'];
		} else {
			$limit = $this->config->get('theme_' . $this->config->get('config_theme') . '_product_limit');
		}

		$data['breadcrumbs'] = array();

		$data['breadcrumbs'][] = array(
			'text' => $this->language->get('text_home'),
			'href' => $this->url->link('common/home','',true)
		);

		if (isset($this->request->get['tag_id'])) {
			$tag_id = (int)$this->request->get['tag_id'];
		} else {
			$tag_id = 0;
		}

		$data['tag_id'] = $tag_id;

		$tag_info = $this->model_catalog_tags->getTag($tag_id);

		if (isset($tag_info['category_id'])){ 
			if ($tag_info['category_id'] != 0 && $tag_info['category_id'] != ''){
				$pth = array();
				$i = 0;
				$category_id = $tag_info['category_id'];
				while ($i == 0) {
					$pth[] = $category_id;
					$category = $this->model_catalog_category->getCategory($category_id);
					$category_id = $category['parent_id'];
					if ($category_id == 0) $i = 1;
				}
				$pth = array_reverse($pth);
				$pth = implode('_', $pth);

				if ((!isset($this->request->get['path'])) || (isset($this->request->get['path']) && $this->request->get['path'] != $pth)){
					$this->response->redirect($this->url->link('error/not_found', '', true));
				}

				if (isset($this->request->get['path'])){
					if (array_search('path', array_keys($this->request->get)) > array_search('tag_id', array_keys($this->request->get))){
						$this->response->redirect($this->url->link('error/not_found', '', true));
					}
				}
			}
		}

		if ($tag_info) {
			$this->document->setTitle($tag_info['meta_title']);
			$this->document->setDescription($tag_info['meta_description']);
			$this->document->setKeywords($tag_info['meta_keyword']);

			$params = 'tag_id=' . $tag_info['tag_id'];
			$href = $this->url->link('product/tags', 'tag_id=' . $tag_info['tag_id'], true);

	        if ($tag_info['category_id']){
            	$path = $tag_info['category_id'];
            	$flag = false;
            	$tid = $tag_info['category_id'];
            	while (!$flag) {
            		$c = $this->model_catalog_category->getCategory($tid);
                    if ($c['parent_id']){
                        $path = $c['parent_id']."_".$path;
                        $tid = $c['parent_id'];
                    }
                    else{
                    	$flag = true;
                    }
            	}
                $href = $this->url->link('product/tags', 'path='.$path.'&tag_id=' . $tag_info['tag_id'], true);
                $params = 'path='.$path.'&tag_id=' . $tag_info['tag_id'];
            }

	        $this->document->addLink($this->url->link('product/tags', $params, true), 'canonical');

			$data['heading_title'] = $tag_info['name'];

			$data['text_compare'] = sprintf($this->language->get('text_compare'), (isset($this->session->data['compare']) ? count($this->session->data['compare']) : 0));

			if (isset($this->request->get['path'])){ 
				$path = '';
				$parts = explode('_', (string)$this->request->get['path']);

				foreach ($parts as $path_id) {
					if (!$path) {
						$path = $path_id;
					} else {
						$path .= '_' . $path_id;
					}
					
					$category_info = $this->model_catalog_category->getCategory($path_id);

					if ($category_info) {
						$data['breadcrumbs'][] = array(
							'text' => $category_info['name'],
							'href' => $this->url->link('product/category', 'path=' . $path, true)
						);
					}
				}
			}

			$data['breadcrumbs'][] = array(
				'text' => $tag_info['name'],
				'href' => $this->url->link('product/tags', $params, true)
			);
			$data['description_top'] = "";
			$data['description_bottom'] = "";
			$data['adt'] = "";
			$data['adb'] = "";
			if ($this->config->get('newtags_etopd') == '1'){
				$data['description_top'] = html_entity_decode($tag_info['description_top'], ENT_QUOTES, 'UTF-8');
				$data['adt'] = html_entity_decode($tag_info['description_top'], ENT_QUOTES, 'UTF-8');
			}
			if ($this->config->get('newtags_ebottomd') == '1'){
				$data['description_bottom'] = html_entity_decode($tag_info['description_bottom'], ENT_QUOTES, 'UTF-8');
				$data['adb'] = html_entity_decode($tag_info['description_bottom'], ENT_QUOTES, 'UTF-8');
			}

			if ($page > 1 && $this->config->get('newtags_only') == 1){
				$data['description_top'] = "";
				$data['description_bottom'] = "";
			}

			$data['only'] = $this->config->get('newtags_only');

			if ($tag_info['h1'] != '')
				$data['heading_title'] = $tag_info['h1'];

			$data['compare'] = $this->url->link('product/compare','', true);

			$url = '';

			if (isset($this->request->get['filter'])) {
				$url .= '&filter=' . $this->request->get['filter'];
			}

			if (isset($this->request->get['sort'])) {
				$url .= '&sort=' . $this->request->get['sort'];
			}

			if (isset($this->request->get['order'])) {
				$url .= '&order=' . $this->request->get['order'];
			}

			if (isset($this->request->get['limit'])) {
				$url .= '&limit=' . $this->request->get['limit'];
			}

			$data['products'] = array();

			$filter_data = array(
				'filter_tag_id' => $tag_id,
				'filter_filter'      => $filter,
				'sort'               => $sort,
				'order'              => $order,
				'start'              => ($page - 1) * $limit,
				'limit'              => $limit
			);

			$product_total = $this->model_catalog_product->getTotalProducts($filter_data );

			$results = $this->model_catalog_product->getProducts($filter_data );

			foreach ($results as $result) {
				if ($result['image']) {
					$image = $this->model_tool_image->resize($result['image'], $this->config->get('theme_' . $this->config->get('config_theme') . '_image_product_width'), $this->config->get('theme_' . $this->config->get('config_theme') . '_image_product_height'));
				} else {
					$image = $this->model_tool_image->resize('placeholder.png', $this->config->get('theme_' . $this->config->get('config_theme') . '_image_product_width'), $this->config->get('theme_' . $this->config->get('config_theme') . '_image_product_height'));
				}

				if (($this->config->get('config_customer_price') && $this->customer->isLogged()) || !$this->config->get('config_customer_price')) {
					$price = $this->currency->format($this->tax->calculate($result['price'], $result['tax_class_id'], $this->config->get('config_tax')), $this->session->data['currency']);
				} else {
					$price = false;
				}

				if ((float)$result['special']) {
					$special = $this->currency->format($this->tax->calculate($result['special'], $result['tax_class_id'], $this->config->get('config_tax')), $this->session->data['currency']);
				} else {
					$special = false;
				}

				if ($this->config->get('config_tax')) {
					$tax = $this->currency->format((float)$result['special'] ? $result['special'] : $result['price'], $this->session->data['currency']);
				} else {
					$tax = false;
				}

				if ($this->config->get('config_review_status')) {
					$rating = (int)$result['rating'];
				} else {
					$rating = false;
				}

				$data['products'][] = array(
					'product_id'  => $result['product_id'],
					'thumb'       => $image,
					'name'        => $result['name'],
					'description' => utf8_substr(trim(strip_tags(html_entity_decode($result['description'], ENT_QUOTES, 'UTF-8'))), 0, $this->config->get('theme_' . $this->config->get('config_theme') . '_product_description_length')) . '..',
					'price'       => $price,
					'special'     => $special,
					'tax'         => $tax,
					'minimum'     => $result['minimum'] > 0 ? $result['minimum'] : 1,
					'rating'      => $result['rating'],
					'can_buy'	  => true,
					'href'        => $this->url->link('product/product', 'product_id=' . $result['product_id'] . $url, true)
				);
			}

			$data['tags'] = array();
			$data['taglist_related'] = $this->config->get('newtags_taglist_related');
            if ($data['taglist_related'] != '3') {
				$tags = $this->model_catalog_tags->getRelatedTags($tag_id, $data['taglist_related'], $this->config->get('newtags_taglist_qty'));

				if ($tags) {
					$data['taglist_title'] = $this->config->get('newtags_taglist_title');
                    $data['taglist_type'] = $this->config->get('newtags_taglist_type');
                    $data['taglist_loc'] = $this->config->get('newtags_taglist_loc');
                    $data['taglist_qty'] = $this->config->get('newtags_taglist_qty');
                    $data['color_text'] = $this->config->get('newtags_color_text');
                    $data['color_htext'] = $this->config->get('newtags_color_htext');
                    $data['color_border'] = $this->config->get('newtags_color_border');
                    $data['color_hborder'] = $this->config->get('newtags_color_hborder');
                    $data['color_bg'] = $this->config->get('newtags_color_bg');
                    $data['color_hbg'] = $this->config->get('newtags_color_hbg');
                    $data['color_arrow'] = $this->config->get('newtags_color_arrow');
                    $data['color_harrow'] = $this->config->get('newtags_color_harrow');
                    $data['color_expand'] = $this->config->get('newtags_color_expand');
                    $data['color_hexpand'] = $this->config->get('newtags_color_hexpand');
                    $data['color_hide'] = $this->config->get('newtags_color_hide');
                    $data['color_hhide'] = $this->config->get('newtags_color_hhide');
                    $data['border_rad'] = $this->config->get('newtags_border_rad');
                    $data['seotags_custom_css'] = html_entity_decode($this->config->get('newtags_custom_css'));
		
					if ($data['taglist_type'] == '3' || $data['taglist_type'] == '4') {
	                    $this->document->addStyle('catalog/view/javascript/jquery/slick/slick.css');
	                    $this->document->addScript('catalog/view/javascript/jquery/slick/slick.min.js');
	                    $this->document->addScript('catalog/view/javascript/seotags.js');
                    }
                    if ($data['taglist_type'] != '1') {
                    	$this->document->addStyle('catalog/view/theme/default/stylesheet/seotags.css');
                    }

				    foreach ($tags as $tag) { 
				        $href = $this->url->link('product/tags', 'tag_id=' . $tag['tag_id'], true);
				        if ($tag['category_id']){
					        $path = $tag['category_id'];
			            	$flag = false;
			            	$tid = $tag['category_id'];
			            	while (!$flag) {
			            		$c = $this->model_catalog_category->getCategory($tid);
			                    if ($c['parent_id']){
			                        $path = $c['parent_id']."_".$path;
			                        $tid = $c['parent_id'];
			                    }
			                    else{
			                    	$flag = true;
			                    }
			            	}
			            	$href = $this->url->link('product/tags', 'path='.$path.'&tag_id=' . $tag['tag_id'], true);
			            }
				        $data['tags'][] = array(
				            'name'  => $tag['name'].($this->config->get('newtags_count') ? ' ('.$tag['kol'].')' : ''),
				            'href' => $href
				        );
				    }
				}
			}

			$url = '';

			if (isset($this->request->get['filter'])) {
				$url .= '&filter=' . $this->request->get['filter'];
			}

			if (isset($this->request->get['limit'])) {
				$url .= '&limit=' . $this->request->get['limit'];
			}

			$data['sorts'] = array();

			$data['sorts'][] = array(
				'text'  => $this->language->get('text_default'),
				'value' => 'p.sort_order-ASC',
				'href'  => $this->url->link('product/tags', $params . '&sort=p.sort_order&order=ASC' . $url, true)
			);

			$data['sorts'][] = array(
				'text'  => $this->language->get('text_name_asc'),
				'value' => 'pd.name-ASC',
				'href'  => $this->url->link('product/tags', $params . '&sort=pd.name&order=ASC' . $url, true)
			);

			$data['sorts'][] = array(
				'text'  => $this->language->get('text_name_desc'),
				'value' => 'pd.name-DESC',
				'href'  => $this->url->link('product/tags', $params . '&sort=pd.name&order=DESC' . $url, true)
			);

			$data['sorts'][] = array(
				'text'  => $this->language->get('text_price_asc'),
				'value' => 'p.price-ASC',
				'href'  => $this->url->link('product/tags', $params . '&sort=p.price&order=ASC' . $url, true)
			);

			$data['sorts'][] = array(
				'text'  => $this->language->get('text_price_desc'),
				'value' => 'p.price-DESC',
				'href'  => $this->url->link('product/tags', $params . '&sort=p.price&order=DESC' . $url, true)
			);

			if ($this->config->get('config_review_status')) {
				$data['sorts'][] = array(
					'text'  => $this->language->get('text_rating_desc'),
					'value' => 'rating-DESC',
					'href'  => $this->url->link('product/tags', $params . '&sort=rating&order=DESC' . $url, true)
				);

				$data['sorts'][] = array(
					'text'  => $this->language->get('text_rating_asc'),
					'value' => 'rating-ASC',
					'href'  => $this->url->link('product/tags', $params . '&sort=rating&order=ASC' . $url, true)
				);
			}

			$data['sorts'][] = array(
				'text'  => $this->language->get('text_model_asc'),
				'value' => 'p.model-ASC',
				'href'  => $this->url->link('product/tags', $params . '&sort=p.model&order=ASC' . $url, true)
			);

			$data['sorts'][] = array(
				'text'  => $this->language->get('text_model_desc'),
				'value' => 'p.model-DESC',
				'href'  => $this->url->link('product/tags', $params . '&sort=p.model&order=DESC' . $url, true)
			);

			$url = '';

			if (isset($this->request->get['filter'])) {
				$url .= '&filter=' . $this->request->get['filter'];
			}

			if (isset($this->request->get['sort'])) {
				$url .= '&sort=' . $this->request->get['sort'];
			}

			if (isset($this->request->get['order'])) {
				$url .= '&order=' . $this->request->get['order'];
			}

			$data['limits'] = array();

			$limits = array_unique(array($this->config->get('theme_' . $this->config->get('config_theme') . '_product_limit'), 25, 50, 75, 100));

			sort($limits);

			foreach($limits as $value) {
				$data['limits'][] = array(
					'text'  => $value,
					'value' => $value,
					'href'  => $this->url->link('product/tags', $params . $url . '&limit=' . $value, true)
				);
			}

			$url = '';

			if (isset($this->request->get['filter'])) {
				$url .= '&filter=' . $this->request->get['filter'];
			}

			if (isset($this->request->get['sort'])) {
				$url .= '&sort=' . $this->request->get['sort'];
			}

			if (isset($this->request->get['order'])) {
				$url .= '&order=' . $this->request->get['order'];
			}

			if (isset($this->request->get['limit'])) {
				$url .= '&limit=' . $this->request->get['limit'];
			}

			$pagination = new Pagination();
			$pagination->total = $product_total;
			$pagination->page = $page;
			$pagination->limit = $limit;
			$pagination->url = $this->url->link('product/tags', $params . $url . '&page={page}', true);

			$data['pagination'] = $pagination->render();

			$data['results'] = sprintf($this->language->get('text_pagination'), ($product_total) ? (($page - 1) * $limit) + 1 : 0, ((($page - 1) * $limit) > ($product_total - $limit)) ? $product_total : ((($page - 1) * $limit) + $limit), $product_total, ceil($product_total / $limit));

			$data['sort'] = $sort;
			$data['order'] = $order;
			$data['limit'] = $limit;
			$data['page'] = $page;
			$data['countp'] = ceil($product_total / $limit);

			$data['continue'] = $this->url->link('common/home','', true);

			$data['column_left'] = $this->load->controller('common/column_left');
			$data['column_right'] = $this->load->controller('common/column_right');
			$data['content_top'] = $this->load->controller('common/content_top');
			$data['content_bottom'] = $this->load->controller('common/content_bottom');
			$data['footer'] = $this->load->controller('common/footer');
			$data['header'] = $this->load->controller('common/header');

			$this->response->setOutput($this->load->view('product/special', $data));
		} else {
			$url = '';

			if (isset($this->request->get['path'])) {
				$url .= '&path=' . $this->request->get['path'];
			}

			if (isset($this->request->get['filter'])) {
				$url .= '&filter=' . $this->request->get['filter'];
			}

			if (isset($this->request->get['sort'])) {
				$url .= '&sort=' . $this->request->get['sort'];
			}

			if (isset($this->request->get['order'])) {
				$url .= '&order=' . $this->request->get['order'];
			}

			if (isset($this->request->get['page'])) {
				$url .= '&page=' . $this->request->get['page'];
			}

			if (isset($this->request->get['limit'])) {
				$url .= '&limit=' . $this->request->get['limit'];
			}

			$this->document->setTitle($this->language->get('text_error'));

			$data['heading_title'] = $this->language->get('text_error');

			$data['text_error'] = $this->language->get('text_error');

			$data['button_continue'] = $this->language->get('button_continue');

			$data['continue'] = $this->url->link('common/home','', true);

			$this->response->addHeader($this->request->server['SERVER_PROTOCOL'] . ' 404 Not Found');

			$data['column_left'] = $this->load->controller('common/column_left');
			$data['column_right'] = $this->load->controller('common/column_right');
			$data['content_top'] = $this->load->controller('common/content_top');
			$data['content_bottom'] = $this->load->controller('common/content_bottom');
			$data['footer'] = $this->load->controller('common/footer');
			$data['header'] = $this->load->controller('common/header');

			$this->response->setOutput($this->load->view('error/not_found', $data));
			
		}
	}
}