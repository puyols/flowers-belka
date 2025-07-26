<?php

class ControllerExtensionModuleUpdateMeta extends Controller {
   private $error = array();

	private $count_product = false;
    private $count_lang = false;
	private $count_seourl = array();
	public $result;

	public function index() {
		$this->load->language('extension/module/update_meta');
        $this->load->model('setting/setting');
        $this->load->model('catalog/category');
		$this->load->model('extension/module/update_meta');
        $this->document->addScript('view/javascript/jquery/bootstrap-checkbox/dist/js/bootstrap-checkbox.js');
		$this->model_extension_module_update_meta->SetUpdate_meta(['product','category','information','manufacturer']);
		$this->document->setTitle($this->language->get('heading_title'));

		
		if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
			
			if (!$this->config->get('module_update_meta_status')) {
				$this->request->post['module_update_meta_status'] = true;
			}
			$this->model_setting_setting->editSetting('module_update_meta', $this->request->post);

			$this->session->data['success'] = $this->language->get('text_success');

			$this->response->redirect($this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=module', true));
		}

		

        $data['run'] = htmlspecialchars_decode($this->url->link('extension/module/update_meta/run_category', 'user_token=' . $this->session->data['user_token'], true));
		$data['run_manuf'] = htmlspecialchars_decode($this->url->link('extension/module/update_meta/run_manuf', 'user_token=' . $this->session->data['user_token'], true));
        $data['run_inform'] = htmlspecialchars_decode($this->url->link('extension/module/update_meta/run_inform', 'user_token=' . $this->session->data['user_token'], true));
		$data['seo_url'] = htmlspecialchars_decode($this->url->link('extension/module/update_meta/seo_url', 'user_token=' . $this->session->data['user_token'], true));
		$data['seo_url_dubli'] = htmlspecialchars_decode($this->url->link('extension/module/update_meta/seo_url_dubli', 'user_token=' . $this->session->data['user_token'], true));
        $data['reset'] = htmlspecialchars_decode($this->url->link('extension/module/update_meta/reset', 'user_token=' . $this->session->data['user_token'], true));
		
        $this->load->model('localisation/language');

        $data['languages'] = $this->model_localisation_language->getLanguages();
        $data['lang_code'] = $this->config->get('config_language');

		if (isset($this->error['warning'])) {
			$data['error_warning'] = $this->error['warning'];
		} else {
			$data['error_warning'] = '';
		}

		$data['breadcrumbs'] = array();

		$data['breadcrumbs'][] = array(
			'text' => $this->language->get('text_home'),
			'href' => $this->url->link('common/dashboard', 'user_token=' . $this->session->data['user_token'], true)
		);

		$data['breadcrumbs'][] = array(
			'text' => $this->language->get('text_extension'),
			'href' => $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=module', true)
		);

		$data['breadcrumbs'][] = array(
			'text' => $this->language->get('heading_title'),
			'href' => $this->url->link('extension/module/update_meta', 'user_token=' . $this->session->data['user_token'], true)
		);


		$data['action'] = $this->url->link('extension/module/update_meta', 'user_token=' . $this->session->data['user_token'], true);

		$data['cancel'] = $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=module', true);

        foreach ($data['languages'] as $language) {
          $data['categories'][$language['language_id']] = $this->model_extension_module_update_meta->getCategories($language['language_id']);
            if (isset($this->request->post['module_update_meta'][$language['language_id']]['product_category'])) {
                $data['product_category'][$language['language_id']] = $this->request->post['module_update_meta'][$language['language_id']]['product_category'];
            }  elseif (isset($this->config->get('module_update_meta')[$language['language_id']]['product_category'])) {
                $data['product_category'][$language['language_id']] = $this->config->get('module_update_meta')[$language['language_id']]['product_category'];
            } else {
                $data['product_category'][$language['language_id']] = array();
            }

            if (isset($this->request->post['module_update_meta'][$language['language_id']]['meta-meta_h1-product'])) {
                $data['meta_h1_product'][$language['language_id']] = $this->request->post['module_update_meta'][$language['language_id']]['meta-meta_h1-product'];
            } else {
                $data['meta_h1_product'][$language['language_id']] = $this->config->get('module_update_meta')[$language['language_id']]['meta-meta_h1-product'];
            }

            if (isset($this->request->post['module_update_meta'][$language['language_id']]['meta-meta_title-product'])) {
                $data['meta_title_product'][$language['language_id']] = $this->request->post['module_update_meta'][$language['language_id']]['meta-meta_title-product'];
            } else {
                $data['meta_title_product'][$language['language_id']] = $this->config->get('module_update_meta')[$language['language_id']]['meta-meta_title-product'];
            }

            if (isset($this->request->post['module_update_meta'][$language['language_id']]['meta-meta_keyword-product'])) {
                $data['meta_keyword_product'][$language['language_id']] = $this->request->post['module_update_meta'][$language['language_id']]['meta-meta_keyword-product'];
            } else {
                $data['meta_keyword_product'][$language['language_id']] = $this->config->get('module_update_meta')[$language['language_id']]['meta-meta_keyword-product'];
            }

            if (isset($this->request->post['module_update_meta'][$language['language_id']]['meta-meta_description-product'])) {
                $data['meta_description_product'][$language['language_id']] = $this->request->post['module_update_meta'][$language['language_id']]['meta-meta_description-product'];
            } else {
                $data['meta_description_product'][$language['language_id']] = $this->config->get('module_update_meta')[$language['language_id']]['meta-meta_description-product'];
            }

            if (isset($this->request->post['module_update_meta'][$language['language_id']]['meta-meta_h1-category'])) {
                $data['meta_h1_category'][$language['language_id']] = $this->request->post['module_update_meta'][$language['language_id']]['meta-meta_h1-category'];
            } else {
                $data['meta_h1_category'][$language['language_id']] = $this->config->get('module_update_meta')[$language['language_id']]['meta-meta_h1-category'];
            }

            if (isset($this->request->post['module_update_meta'][$language['language_id']]['meta-meta_title-category'])) {
                $data['meta_title_category'][$language['language_id']] = $this->request->post['module_update_meta'][$language['language_id']]['meta-meta_title-category'];
            } else {
                $data['meta_title_category'][$language['language_id']] = $this->config->get('module_update_meta')[$language['language_id']]['meta-meta_title-category'];
            }

            if (isset($this->request->post['module_update_meta'][$language['language_id']]['meta-meta_keyword-category'])) {
                $data['meta_keyword_category'][$language['language_id']] = $this->request->post['module_update_meta'][$language['language_id']]['meta-meta_keyword-category'];
            } else {
                $data['meta_keyword_category'][$language['language_id']] = $this->config->get('module_update_meta')[$language['language_id']]['meta-meta_keyword-category'];
            }

            if (isset($this->request->post['module_update_meta'][$language['language_id']]['meta-meta_description-category'])) {
                $data['meta_description_category'][$language['language_id']] = $this->request->post['module_update_meta'][$language['language_id']]['meta-meta_description-category'];
            } else {
                $data['meta_description_category'][$language['language_id']] = $this->config->get('module_update_meta')[$language['language_id']]['meta-meta_description-category'];
            }

            if (isset($this->request->post['module_update_meta'][$language['language_id']]['meta-meta_h1-manufacturer'])) {
                $data['meta_h1_manufacturer'][$language['language_id']] = $this->request->post['module_update_meta'][$language['language_id']]['meta-meta_h1-manufacturer'];
            } else {
                $data['meta_h1_manufacturer'][$language['language_id']] = $this->config->get('module_update_meta')[$language['language_id']]['meta-meta_h1-manufacturer'];
            }

            if (isset($this->request->post['module_update_meta'][$language['language_id']]['meta-meta_title-manufacturer'])) {
                $data['meta_title_manufacturer'][$language['language_id']] = $this->request->post['module_update_meta'][$language['language_id']]['meta-meta_title-manufacturer'];
            } else {
                $data['meta_title_manufacturer'][$language['language_id']] = $this->config->get('module_update_meta')[$language['language_id']]['meta-meta_title-manufacturer'];
            }

            if (isset($this->request->post['module_update_meta'][$language['language_id']]['meta-meta_keyword-manufacturer'])) {
                $data['meta_keyword_manufacturer'][$language['language_id']] = $this->request->post['module_update_meta'][$language['language_id']]['meta-meta_keyword-manufacturer'];
            } else {
                $data['meta_keyword_manufacturer'][$language['language_id']] = $this->config->get('module_update_meta')[$language['language_id']]['meta-meta_keyword-manufacturer'];
            }

            if (isset($this->request->post['module_update_meta'][$language['language_id']]['meta-meta_description-manufacturer'])) {
                $data['meta_description_manufacturer'][$language['language_id']] = $this->request->post['module_update_meta'][$language['language_id']]['meta-meta_description-manufacturer'];
            } else {
                $data['meta_description_manufacturer'][$language['language_id']] = $this->config->get('module_update_meta')[$language['language_id']]['meta-meta_description-manufacturer'];
            }

            if (isset($this->request->post['module_update_meta'][$language['language_id']]['meta-meta_h1-information'])) {
                $data['meta_h1_information'][$language['language_id']] = $this->request->post['module_update_meta'][$language['language_id']]['meta-meta_h1-information'];
            } else {
                $data['meta_h1_information'][$language['language_id']] = $this->config->get('module_update_meta')[$language['language_id']]['meta-meta_h1-information'];
            }

            if (isset($this->request->post['module_update_meta'][$language['language_id']]['meta-meta_title-information'])) {
                $data['meta_title_information'][$language['language_id']] = $this->request->post['module_update_meta'][$language['language_id']]['meta-meta_title-information'];
            } else {
                $data['meta_title_information'][$language['language_id']] = $this->config->get('module_update_meta')[$language['language_id']]['meta-meta_title-information'];
            }

            if (isset($this->request->post['module_update_meta'][$language['language_id']]['meta-meta_keyword-information'])) {
                $data['meta_keyword_information'][$language['language_id']] = $this->request->post['module_update_meta'][$language['language_id']]['meta-meta_keyword-information'];
            } else {
                $data['meta_keyword_information'][$language['language_id']] = $this->config->get('module_update_meta')[$language['language_id']]['meta-meta_keyword-information'];
            }

            if (isset($this->request->post['module_update_meta'][$language['language_id']]['meta-meta_description-information'])) {
                $data['meta_description_information'][$language['language_id']] = $this->request->post['module_update_meta'][$language['language_id']]['meta-meta_description-information'];
            } else {
                $data['meta_description_information'][$language['language_id']] = $this->config->get('module_update_meta')[$language['language_id']]['meta-meta_description-information'];
            }

            if (isset($this->request->post['module_update_meta'][$language['language_id']]['cat_per'])) {
                $data['update_meta_catPer'][$language['language_id']] = $this->request->post['module_update_meta'][$language['language_id']]['cat_per'];
            } elseif(isset($this->config->get('module_update_meta')[$language['language_id']]['cat_per'])) {
                $data['update_meta_catPer'][$language['language_id']] = $this->config->get('module_update_meta')[$language['language_id']]['cat_per'];
            } else {
                $data['update_meta_catPer'][$language['language_id']] = 0;
            }
            if (isset($this->request->post['module_update_meta'][$language['language_id']]['manuf_per'])) {
                $data['update_meta_manufPer'][$language['language_id']] = $this->request->post['module_update_meta'][$language['language_id']]['manuf_per'];
            } elseif(isset($this->config->get('module_update_meta')[$language['language_id']]['manuf_per'])) {
                $data['update_meta_manufPer'][$language['language_id']] = $this->config->get('module_update_meta')[$language['language_id']]['manuf_per'];
            } else {
                $data['update_meta_manufPer'][$language['language_id']] = 0;
            }
            if (isset($this->request->post['module_update_meta'][$language['language_id']]['inform_per'])) {
                $data['update_meta_informPer'][$language['language_id']] = $this->request->post['module_update_meta'][$language['language_id']]['inform_per'];
            } elseif(isset($this->config->get('module_update_meta')[$language['language_id']]['inform_per'])) {
                $data['update_meta_informPer'][$language['language_id']] = $this->config->get('module_update_meta')[$language['language_id']]['inform_per'];
            } else {
                $data['update_meta_informPer'][$language['language_id']] = 0;
            }
        }
		if (isset($this->request->post['module_update_meta_chpucat'])) {
            $data['update_meta_chpucat'] = $this->request->post['module_update_meta_chpucat'];
        } else {
            $data['update_meta_chpucat'] = $this->config->get('module_update_meta_chpucat');
        }
        if (isset($this->request->post['module_update_meta_chpu_upd'])) {
            $data['update_meta_chpu_upd'] = $this->request->post['module_update_meta_chpu_upd'];
        } else {
            $data['update_meta_chpu_upd'] = $this->config->get('module_update_meta_chpu_upd');
        }
        if (isset($this->request->post['module_update_meta_chpu_pref'])) {
            $data['update_meta_chpu_pref'] = $this->request->post['module_update_meta_chpu_pref'];
        } else {
            $data['update_meta_chpu_pref'] = $this->config->get('module_update_meta_chpu_pref');
        }
		
		$data['header'] = $this->load->controller('common/header');
		$data['column_left'] = $this->load->controller('common/column_left');
		$data['footer'] = $this->load->controller('common/footer');

		$this->response->setOutput($this->load->view('extension/module/update_meta', $data));
	}
	public function seo_url(){
		$this->load->language('extension/module/update_meta');
        $this->load->model('extension/module/update_meta');
		
        $this->load->model('localisation/language');
		$manufacturers = $this->model_extension_module_update_meta->getManufacturers();
		
        $languages = $this->model_localisation_language->getLanguages();
        foreach ($languages as $language) {
            $code_language = preg_replace("/-.*/",'',$language['code']);

            $categories = $this->model_extension_module_update_meta->getCategories($language['language_id']);
			if ($categories) {
				foreach ($categories as $category){

					if (!$this->model_extension_module_update_meta->getUrl('category_id', $category['category_id'], $language['language_id'])) {
						if ($this->request->post['chpucat']) {

							$this->model_extension_module_update_meta->setUrl('category_id', $category['category_id'], preg_replace("/nbsp-nbsp-/", '', $this->trans(htmlspecialchars_decode(($this->request->post['chpupref'] ? $code_language."-" : "").$category['name']))), $language['language_id']);

						} else {
							$cat_name = explode('nbsp-nbsp-', $this->trans(htmlspecialchars_decode($category['name'])));
							$this->model_extension_module_update_meta->setUrl('category_id', $category['category_id'], array_pop($cat_name), $language['language_id']);
						}						
						$this->count_seourl[] = $category['category_id'];

					} else {
						if($this->request->post['chpuupd']) {
							if ($this->request->post['chpucat']) {

							$this->model_extension_module_update_meta->setUrl('category_id', $category['category_id'], preg_replace("/nbsp-nbsp-/", '', $this->trans(htmlspecialchars_decode(($this->request->post['chpupref'] ? $code_language."-" : "").$category['name']))), $language['language_id']);

						} else {
							$cat_name = explode('nbsp-nbsp-', $this->trans(htmlspecialchars_decode($category['name'])));
							$this->model_extension_module_update_meta->setUrl('category_id', $category['category_id'], ($this->request->post['chpupref'] ? $code_language."-" : "").array_pop($cat_name), $language['language_id']);
						}						
						$this->count_seourl[] = $category['category_id'];
						}
					}
					
					$products = $this->model_extension_module_update_meta->getProductsSeo($category['category_id'], $language['language_id']);
					foreach ($products as $product) {
						if (!$this->model_extension_module_update_meta->getUrl('product_id', $product['product_id'], $language['language_id'])) {
							$this->model_extension_module_update_meta->setUrl('product_id', $product['product_id'], $this->trans(($this->request->post['chpupref'] ? $code_language."-" : "").$product['name']), $language['language_id']);
							$this->count_seourl[] = $product['product_id'];

						} else {
							if($this->request->post['chpuupd']) {
								$this->model_extension_module_update_meta->setUrl('product_id', $product['product_id'], $this->trans(($this->request->post['chpupref'] ? $code_language."-" : "").$product['name']), $language['language_id'], true);
								$this->count_seourl[] = $product['product_id'];
							}
                    }

					}
				}
			}
			$informations = $this->model_extension_module_update_meta->getInformations($language['language_id']);
			if ($informations) {
				foreach ($informations as $information){

					if (!$this->model_extension_module_update_meta->getUrl('information_id', $information['information_id'], $language['language_id'])) {
						$this->model_extension_module_update_meta->setUrl('information_id', $information['information_id'], $this->trans(($this->request->post['chpupref'] ? $code_language."-" : "").$information['title']), $language['language_id']);
						$this->count_seourl[] = $information['information_id'];
					} else {
						if($this->request->post['chpuupd']) {
							$this->model_extension_module_update_meta->setUrl('information_id', $information['information_id'], $this->trans(($this->request->post['chpupref'] ? $code_language."-" : "").$information['title']), $language['language_id'], true);
							$this->count_seourl[] = $information['information_id'];
						}
					}
				}
			}
			
			
			if ($manufacturers) {
				foreach ($manufacturers as $manufacturer){
					if (!$this->model_extension_module_update_meta->getUrl('manufacturer_id', $manufacturer['manufacturer_id'], $language['language_id'])) {
						$this->model_extension_module_update_meta->setUrl('manufacturer_id', $manufacturer['manufacturer_id'], $this->trans(($this->request->post['chpupref'] ? $code_language."-" : "").$manufacturer['name']), $language['language_id']);
						$this->count_seourl[] = $manufacturer['manufacturer_id'];
					} else {
						if($this->request->post['chpuupd']) {
							$this->model_extension_module_update_meta->setUrl('manufacturer_id', $manufacturer['manufacturer_id'], $this->trans(($this->request->post['chpupref'] ? $code_language."-" : "").$manufacturer['name']), $language['language_id'], true);
							$this->count_seourl[] = $manufacturer['manufacturer_id'];
						}
					}
				}
			}
		}
		$json['success'] = sprintf($this->language->get('text_chpu'),count($this->count_seourl));

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($json));
	}
	public function seo_url_dubli(){

		$dubli = array();
		$this->load->language('extension/module/update_meta');
        $this->load->model('extension/module/update_meta');
        $this->load->model('localisation/language');

        $languages = $this->model_localisation_language->getLanguages();
        foreach ($languages as $language) {
            $dubli = $this->model_extension_module_update_meta->getDubli($language['language_id']);
            $arr = array();
            foreach ($dubli as $d) {
                $arr[$d['keyword']][] = $d;
            }

            foreach ($arr as $dub) {
                foreach (array_splice($dub, 1) as $key => $dubl) {

                    $this->model_extension_module_update_meta->setDubUrl($dubl['query'], $dubl['keyword'] . '-' . ($key + 1), $language['language_id']);
                }

            }
        }
        //echo '<pre>'; print_r($arr); die('</pre>') ;
		$json['success'] = sprintf($this->language->get('text_dubli_upd'),count($dubli));

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($json));
	}
    public function run_category()
    {
        $this->load->language('extension/module/update_meta');
        $this->load->model('extension/module/update_meta');
        $this->load->model('catalog/category');

        $data_array = $this->newFormatData($this->request->post['module_update_meta']);

        try {
        foreach ($data_array as $language => $data) {
            if (isset($data['product_category'])) {
                $this->count_lang = $this->count_lang + 1;

                $categories = $this->model_extension_module_update_meta->getCategory(implode(',', $data['product_category']), $language);

                foreach ($categories as $item) {
                    $MinMax = $this->model_extension_module_update_meta->getMinMax($item['category_id']);

                    $array = [
                        'name' => $item['name'],
                        'shop_name' => isset($this->config->get('config_langdata')[$language]['meta_title']) ? $this->config->get('config_langdata')[$language]['meta_title'] : '',
                        'min_p' => $this->tax->calculate($MinMax['min'], $MinMax['tax_class_id'], $this->config->get('config_tax')),
                        'max_p' => $this->tax->calculate($MinMax['max'], $MinMax['tax_class_id'], $this->config->get('config_tax')),
                        'meta' => $data['category']
                    ];

                    $meta = $this->meta($array);

                    foreach ($meta['meta'] as $meta_name => $meta_value) {

                        $meta_array[$meta_name] = $meta_name . '="' . trim($this->db->escape($meta_value)) . '"';

                    }

                    $last_key = key(array_slice($meta_array, -1, 1, TRUE));
                    $meta_array[$last_key] = rtrim($meta_array[$last_key], ',');

                    $result = [
                        'meta' => $meta_array,
                        'type' => 'category',
                        'product_id' => $item['category_id'],
                    ];
                    if (!isset($data['cat_per'])) {
                        $data['cat_per'] = 0;
                    }

                    $this->model_extension_module_update_meta->updateMetaProduct($result, $language, $data['cat_per']);
                    unset($result);
                    unset($meta_array);
                    unset($meta);
                    // echo '<pre>'; print_r($result); die('</pre>') ;
                    $this->result = $this->update_Meta($item['category_id'], $language, $data);


                }
            }
        }
    } catch (Exception $e) {
            echo 'Сбой в методе  - update_Meta: ',  $e->getMessage(), "\n";
			$json['error'] = $e->getMessage();
        }
        $json['success'] = sprintf($this->language->get('text_count'),($this->result/($this->count_lang*$this->count_lang)));

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($json));
    }
    public function run_manuf()
    {
        $this->load->language('extension/module/update_meta');
        $this->load->model('extension/module/update_meta');

        $data_array = $this->newFormatData($this->request->post['module_update_meta']);
        $manufacturers = $this->model_extension_module_update_meta->getManufacturer();
        try {
            $count = 0;
            foreach ($data_array as $language => $data) {
                if ($data['manufacturer']) {
                    $this->count_lang = $this->count_lang + 1;

                    foreach ($manufacturers as $item) {
                        $MinMax = $this->model_extension_module_update_meta->getMinMaxManuf($item['manufacturer_id']);

                        $array = [
                            'name' => $item['name'],
                            'shop_name' => isset($this->config->get('config_langdata')[$language]['meta_title']) ? $this->config->get('config_langdata')[$language]['meta_title'] : '',
                            'min_p' => $this->tax->calculate($MinMax['min'], $MinMax['tax_class_id'], $this->config->get('config_tax')),
                            'max_p' => $this->tax->calculate($MinMax['max'], $MinMax['tax_class_id'], $this->config->get('config_tax')),
                            'meta' => $data['manufacturer']
                        ];

                        $meta = $this->meta($array);

                        foreach ($meta['meta'] as $meta_name => $meta_value) {

                            $meta_array[$meta_name] = $meta_name . '="' . trim($this->db->escape($meta_value)) . '"';

                        }

                        $last_key = key(array_slice($meta_array, -1, 1, TRUE));
                        $meta_array[$last_key] = rtrim($meta_array[$last_key], ',');

                        $result = [
                            'meta' => $meta_array,
                            'type' => 'manufacturer',
                            'product_id' => $item['manufacturer_id'],
                        ];
                        if (!isset($data['manuf_per'])) {
                            $data['manuf_per'] = 0;
                        }

                        $this->model_extension_module_update_meta->updateMetaProduct($result, $language, $data['manuf_per']);
                        unset($result);
                        unset($meta_array);
                        unset($meta);
                        $count ++;

                    }
                }
            }


        } catch (Exception $e) {
            echo 'Сбой в методе  - update_Meta: ',  $e->getMessage(), "\n";
            $json['error'] = $e->getMessage();
        }

        $json['success'] = sprintf($this->language->get('text_count_manuf'),($count/$this->count_lang));

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($json));
    }

    public function run_inform()
    {
        $this->load->language('extension/module/update_meta');
        $this->load->model('extension/module/update_meta');

        $data_array = $this->newFormatData($this->request->post['module_update_meta']);

        try {
            $count = 0;
            foreach ($data_array as $language => $data) {
                if ($data['information']) {
                    $this->count_lang = $this->count_lang + 1;

                    $informations = $this->model_extension_module_update_meta->getInformation($language);

                    foreach ($informations as $item) {

                        $array = [
                            'name' => $item['title'],
                            'shop_name' => isset($this->config->get('config_langdata')[$language]['meta_title']) ? $this->config->get('config_langdata')[$language]['meta_title'] : '',
                            'meta' => $data['information']
                        ];

                        $meta = $this->meta($array);

                        foreach ($meta['meta'] as $meta_name => $meta_value) {

                            $meta_array[$meta_name] = $meta_name . '="' . trim($this->db->escape($meta_value)) . '"';

                        }

                        $last_key = key(array_slice($meta_array, -1, 1, TRUE));
                        $meta_array[$last_key] = rtrim($meta_array[$last_key], ',');

                        $result = [
                            'meta' => $meta_array,
                            'type' => 'information',
                            'product_id' => $item['information_id'],
                        ];
                        if (!isset($data['inform_per'])) {
                            $data['inform_per'] = 0;
                        }

                        $this->model_extension_module_update_meta->updateMetaProduct($result, $language, $data['inform_per']);
                        unset($result);
                        unset($meta_array);
                        unset($meta);
                        $count ++;

                    }
                }
            }


        } catch (Exception $e) {
            echo 'Сбой в методе  - update_Meta: ',  $e->getMessage(), "\n";
            $json['error'] = $e->getMessage();
        }

        $json['success'] = sprintf($this->language->get('text_count_inform'),($count/$this->count_lang));

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($json));
    }

    function update_Meta($category_id, $language, $data)
    {
            $products = $this->model_extension_module_update_meta->getProducts($category_id, $language);
			if (!empty($products)) {
                $count = 0;
                foreach ($products as $product) {

                    $array = [
                        'name' => $product['name'],
                        'model' => $product['model'],
                        'price' => $this->tax->calculate($product['price'], $product['tax_class_id'], $this->config->get('config_tax')),
                        'manufacturer' => $product['manufacturer_name'],
                        'category_name' => $product['category_name'],
                        'shop_name' => isset($this->config->get('config_langdata')[$language]['meta_title']) ? $this->config->get('config_langdata')[$language]['meta_title'] : '',
                        'meta' => $data['product']
                    ];

                    $meta = $this->meta($array);

                    foreach ($meta['meta'] as $meta_name => $meta_value) {

                            $meta_array[$meta_name] = $meta_name .' = "'.trim($this->db->escape($meta_value)).'"';

                    }


                    $last_key = key(array_slice( $meta_array, -1, 1, TRUE ));
                    $meta_array[$last_key] = rtrim($meta_array[$last_key], ',');

                    $result = [
                        'meta' => $meta_array,
                        'type' => 'product',
                        'product_id' => $product['product_id']
                    ];
                    if(!isset($data['cat_per'])) {
                        $data['cat_per'] = 0;
                    }
                    $this->model_extension_module_update_meta->updateMetaProduct($result, $language, $data['cat_per']);
                    unset($meta_array); unset($result); unset($array);


                    $count++;

                }

                $this->count_product = $this->count_product + $count;
			}
       
        return $this->count_product;
    }
    public function StrCharPosBack($haystack, $needle) {// ищет последнее вхождение символа
        for ($i = utf8_strlen($haystack) ; $i>=0 ; $i--){
            if (utf8_substr($haystack, $i, 1) === $needle)
                return $i;
        }
        return false;
    }
    public function meta($data) {

        $replace = array('{n}', '{p}', '{m}', '{cn}', '{md}', '{sn}', '{min_p}', '{max_p}');

        $sub = [
            0 => isset($data['name']) ? $data['name'] : '',
            1 => isset($data['price']) ? $data['price'] : '',
            2 => isset($data['manufacturer']) ? $data['manufacturer'] : '',
            3 => isset($data['category_name']) ? $data['category_name'] : '',
            4 => isset($data['model']) ? $data['model'] : '',
            5 => isset($data['shop_name']) ? $data['shop_name'] : '',
            6 => isset($data['min_p']) ? $data['min_p'] : '',
            7 => isset($data['max_p']) ? $data['max_p'] : '',
        ];

        foreach ($data['meta'] as $key => $value) {
            $strArray = str_replace($replace, $sub, $value);
            foreach ($strArray as $meta => $str) {
                while (utf8_strpos($str, "{") !== false){
                    $pos1 = utf8_strpos($str, "}");
                    $buf_mas = utf8_substr($str, 0, $pos1);
                    $pos2 = $this->StrCharPosBack ($buf_mas, "{");
                    $buf_mas = utf8_substr($buf_mas, $pos2+1);
                    $text_new = '{'.$buf_mas.'}';
                    $exploded_buf_mas = explode ("|", $buf_mas);
                    $rnd = rand(0, count($exploded_buf_mas)-1);

                    $str = str_replace($text_new, $exploded_buf_mas[$rnd], $str);

                }
                $strNewArray[$meta] = $str;
            }

            $meta_result[$key] = $strNewArray;
        }

        return $meta_result;
    }

	protected function validate() {
		if (!$this->user->hasPermission('modify', 'extension/module/update_meta')) {
			$this->error['warning'] = $this->language->get('error_permission');
		}

		return !$this->error;
	}

    public function newFormatData($data){
        if ($data) {
            foreach ($data as $language => $item) {
                foreach ($item as $name => $value) {
                    switch($name){
                        case 'product_category':
                            $result[$language][$name] = $value;
                            break;
                        case (preg_match('/.+_per/sm',$name) ? true : false):
                            $result[$language][$name] = $value;
                            break;
                        default:
                            $element = explode('-', $name);
                            switch ($name) {
                                case $element[0] . '-' . $element[1] . '-' . $element[2]:
                                    $result[$language][$element[2]][$element[0]][$element[1]] = htmlspecialchars(trim($value));
                                    break;
                            }
                    }
                 /*   if ($name == 'product_category') {
                        $result[$language][$name] = $value;
                    }
                    if (preg_match('/.+_per/sm',$name)) {
                        $result[$language][$name] = $value;
                    } else {
                        $element = explode('-', $name);
                        switch ($name) {
                            case $element[0] . '-' . $element[1] . '-' . $element[2]:
                                $result[$language][$element[2]][$element[0]][$element[1]] = htmlspecialchars(trim($value));
                                break;
                        }
                    }*/
                }
            }

            return $result;
        }
    }

    public function reset(){
        $this->load->language('extension/module/update_meta');
        $this->load->model('extension/module/update_meta');
        $this->model_extension_module_update_meta->updateZero();

	    $json['success'] = $this->language->get('success_reset');

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($json));
    }
	public function trans($title) {
		
        $alf = array(
            'а' => 'a', 'б' => 'b', 'в' => 'v',
            'г' => 'g', 'д' => 'd', 'е' => 'e',
            'ё' => 'e', 'ж' => 'zh', 'з' => 'z',
            'и' => 'i', 'й' => 'y', 'к' => 'k',
            'л' => 'l', 'м' => 'm', 'н' => 'n',
            'о' => 'o', 'п' => 'p', 'р' => 'r',
            'с' => 's', 'т' => 't', 'у' => 'u',
            'ф' => 'f', 'х' => 'h', 'ц' => 'c',
            'ч' => 'ch', 'ш' => 'sh', 'щ' => 'sch',
            'ь' => '', 'ы' => 'y', 'ъ' => '',
            'э' => 'e', 'ю' => 'yu', 'я' => 'ya',
            'А' => 'A', 'Б' => 'B', 'В' => 'V',
            'Г' => 'G', 'Д' => 'D', 'Е' => 'E',
            'Ё' => 'E', 'Ж' => 'Zh', 'З' => 'Z',
            'И' => 'I', 'Й' => 'Y', 'К' => 'K',
            'Л' => 'L', 'М' => 'M', 'Н' => 'N',
            'О' => 'O', 'П' => 'P', 'Р' => 'R',
            'С' => 'S', 'Т' => 'T', 'У' => 'U',
            'Ф' => 'F', 'Х' => 'H', 'Ц' => 'C',
            'Ч' => 'Ch', 'Ш' => 'Sh', 'Щ' => 'Sch',
            'Ь' => '', 'Ы' => 'Y', 'Ъ' => '',
            'Э' => 'E', 'Ю' => 'Yu', 'Я' => 'Ya',
        );

        $title = strtr($title, $alf);
        $title = mb_strtolower($title);
        $title = mb_ereg_replace('[^-0-9a-z]', '-', $title);
        $title = mb_ereg_replace('[-]+', '-', $title);
        $title = trim($title, '-');
        return $title;
    }
}