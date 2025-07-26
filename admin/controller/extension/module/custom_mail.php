<?php
class ControllerExtensionModuleCustomMail extends Controller {
	private $error = array();
    private $error_email = false;

	public function index() {
		$this->load->language('extension/module/custom_mail');

		$this->document->setTitle($this->language->get('heading_title'));
        $this->document->addScript('view/javascript/jquery/LC-switch-master/lc_switch.min.js');
        $this->document->addStyle('view/javascript/jquery/LC-switch-master/lc_switch.css');
        $this->document->addScript('view/javascript/jquery/colorpicker/bootstrap-colorpicker.min.js');
        $this->document->addStyle('view/javascript/jquery/colorpicker/bootstrap-colorpicker.min.css');
        $this->document->addScript('view/javascript/jquery/bootstrap-checkbox/dist/js/bootstrap-checkbox.js');


		$this->load->model('setting/module');

		if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
			if (!isset($this->request->get['module_id'])) {
				$this->model_setting_module->addModule('custom_mail', $this->request->post);
			} else {
				$this->model_setting_module->editModule($this->request->get['module_id'], $this->request->post);
			}

			$this->session->data['success'] = $this->language->get('text_success');

			$this->response->redirect($this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=module', true));
		}

		if (isset($this->error['warning'])) {
			$data['error_warning'] = $this->error['warning'];
		} else {
			$data['error_warning'] = '';
		}

		if (isset($this->error['name'])) {
			$data['error_name'] = $this->error['name'];
		} else {
			$data['error_name'] = '';
		}

		if (isset($this->error['description'])) {
			$data['error_description'] = $this->error['description'];
		} else {
			$data['error_description'] = '';
		}
        if (isset($this->error['error_email'])) {
            $data['error_email'] = $this->language->get('error_email');
        } else {
            $data['error_email'] = '';
        }

        if (isset($this->error['banner_image'])) {
            $data['error_banner_image'] = $this->error['banner_image'];
        } else {
            $data['error_banner_image'] = array();
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

		if (!isset($this->request->get['module_id'])) {
			$data['breadcrumbs'][] = array(
				'text' => $this->language->get('heading_title'),
				'href' => $this->url->link('extension/module/custom_mail', 'user_token=' . $this->session->data['user_token'], true)
			);
		} else {
			$data['breadcrumbs'][] = array(
				'text' => $this->language->get('heading_title'),
				'href' => $this->url->link('extension/module/custom_mail', 'user_token=' . $this->session->data['user_token'] . '&module_id=' . $this->request->get['module_id'], true)
			);
		}

		if (!isset($this->request->get['module_id'])) {
			$data['action'] = $this->url->link('extension/module/custom_mail', 'user_token=' . $this->session->data['user_token'], true);
		} else {
			$data['action'] = $this->url->link('extension/module/custom_mail', 'user_token=' . $this->session->data['user_token'] . '&module_id=' . $this->request->get['module_id'], true);
		}

		$data['cancel'] = $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=module', true);

		if (isset($this->request->get['module_id']) && ($this->request->server['REQUEST_METHOD'] != 'POST')) {
			$module_info = $this->model_setting_module->getModule($this->request->get['module_id']);
		}

        $this->load->model('tool/image');
        $data['placeholder'] = $this->model_tool_image->resize('no_image.png', 100, 100);
        $data['placeholder_form'] = $this->model_tool_image->resize('no_image.png', 30, 30);

        if (isset($this->request->post['image']) && is_file(DIR_IMAGE . $this->request->post['image'])) {
            $data['thumb'] = $this->model_tool_image->resize($this->request->post['image'], 100, 100);
			$data['image'] = $this->request->post['image'];
        } elseif (!empty($module_info) && is_file(DIR_IMAGE . $module_info['image'])) {
            $data['thumb'] = $this->model_tool_image->resize($module_info['image'], 100, 100);
            $data['image'] = $module_info['image'];
        } else {
            $data['thumb'] = $this->model_tool_image->resize('no_image.png', 100, 100);
            $data['image'] = 'no_image.png';
        }

		if (isset($this->request->post['name'])) {
			$data['name'] = $this->request->post['name'];
		} elseif (!empty($module_info)) {
			$data['name'] = $module_info['name'];
		} else {
			$data['name'] = '';
		}



		if (isset($this->request->post['description'])) {
			$data['description'] = $this->request->post['description'];
		} elseif (!empty($module_info)) {
			$data['description'] = $module_info['description'];
		} else {
			$data['description'] = '';
		}



        if (isset($this->request->post['name_bottom'])) {
            $data['name_bottom'] = $this->request->post['name_bottom'];
        } elseif (!empty($module_info)) {
            $data['name_bottom'] = $module_info['name_bottom'];
        } else {
            $data['name_bottom'] = '';
        }

        if (isset($this->request->post['color_text'])) {
            $data['color_text'] = $this->request->post['color_text'];
        } elseif (!empty($module_info)) {
            $data['color_text'] = $module_info['color_text'];
        } else {
            $data['color_text'] = '';
        }

        if (isset($this->request->post['mask'])) {
            $data['mask'] = $this->request->post['mask'];
        } elseif (!empty($module_info)) {
            $data['mask'] = $module_info['mask'];
        } else {
            $data['mask'] = '';
        }

        $data['forms'] = array();

        if (isset($this->request->post['form_mail'])) {
            $forms = $this->request->post['form_mail'];
        } elseif (!empty($module_info)) {
            $forms = $module_info['form_mail'];
        } else {
            $forms = array();
        }


            foreach ($forms as $key => $form_mail) {
                if (isset($this->error[$key]['input_name'])) {
                    $data['error_input_name'][$key] = $this->error[$key]['input_name'];
                } else {
                    $data['error_input_name'][$key] = '';
                }
                if (isset($form_mail['required'])) {
                    $required = $form_mail['required'];
                } else {
                    $required = '';
                }
                if (isset($form_mail['radio'])) {
                    $radio = $form_mail['radio'];
                } else {
                    $radio = '';
                }
                if (isset($form_mail['checkbox'])) {
                    $checkbox = $form_mail['checkbox'];
                } else {
                    $checkbox = '';
                }
                if (isset($form_mail['select'])) {
                    $select = $form_mail['select'];
                } else {
                    $select = '';
                }
                if (is_file(DIR_IMAGE . $form_mail['image'])) {
                    $image = $form_mail['image'];
                    $thumb = $form_mail['image'];
                } else {
                    $image = '';
                    $thumb = 'no_image.png';
                }
                $data['forms'][] = array(
                    'title'      => $form_mail['title'],
                    'placeholder'      => $form_mail['placeholder'],
                    'select_form'       => $form_mail['select_form'],
                    'input_name'      => $form_mail['input_name'],
                    'color'       => $form_mail['color'],
                    'color_text'       => $form_mail['color_text'],
                    'radio'       => $radio,
                    'checkbox'       => $checkbox,
                    'select'       => $select,
                    'required'       => $required,
                    'image'      => $image,
                    'thumb'      => $this->model_tool_image->resize($thumb, 30, 30)
                );
            }


		if (isset($this->request->post['status'])) {
			$data['status'] = $this->request->post['status'];
		} elseif (!empty($module_info)) {
			$data['status'] = $module_info['status'];
		} else {
			$data['status'] = '';
		}

		$data['header'] = $this->load->controller('common/header');
		$data['column_left'] = $this->load->controller('common/column_left');
		$data['footer'] = $this->load->controller('common/footer');

		$this->response->setOutput($this->load->view('extension/module/custom_mail', $data));
	}

	protected function validate() {
		if (!$this->user->hasPermission('modify', 'extension/module/custom_mail')) {
			$this->error['warning'] = $this->language->get('error_permission');
		}

		if ((utf8_strlen($this->request->post['name']) < 3) || (utf8_strlen($this->request->post['name']) > 64)) {
			$this->error['name'] = $this->language->get('error_name');
		}
        if (isset($this->request->post['form_mail'])) {
            $email = array();
            foreach ($this->request->post['form_mail'] as $key => $form_mail) {
                if ((utf8_strlen($form_mail['input_name']) < 3) || (utf8_strlen($form_mail['input_name']) > 15)) {
                    $this->error[$key]['input_name'] = $this->language->get('error_name_input');
                }
                $email[] = $form_mail['select_form'];

            }
            if (!in_array("email", $email)) {
                $this->error['error_email']  = true;
            }

        }


		return !$this->error;
	}
}