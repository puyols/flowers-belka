<?php
class ControllerExtensionModuleTags extends Controller {
	private $error = array();

	public function index() {
		$this->load->language('extension/module/tags');

		$this->document->setTitle($this->language->get('page_title'));

		$this->load->model('setting/setting');

		if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
			$this->model_setting_setting->editSetting('tags', $this->request->post);
			$this->model_setting_setting->editSetting('module_tags', array('module_tags_status'=>$this->request->post['tags_status']));

			$this->session->data['success'] = $this->language->get('text_success');

			$this->response->redirect($this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'], true));
		}

		$data['heading_title'] = $this->language->get('heading_title');

		$data['text_edit'] = $this->language->get('text_edit');
		$data['text_enabled'] = $this->language->get('text_enabled');
		$data['text_disabled'] = $this->language->get('text_disabled');

		$data['entry_status'] = $this->language->get('entry_status');

		$data['button_save'] = $this->language->get('button_save');
		$data['button_cancel'] = $this->language->get('button_cancel');

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
			'text' => $this->language->get('text_module'),
			'href' => $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'], true)
		);

		$data['breadcrumbs'][] = array(
			'text' => $this->language->get('page_title'),
			'href' => $this->url->link('extension/module/tags', 'user_token=' . $this->session->data['user_token'], true)
		);

		$data['action'] = $this->url->link('extension/module/tags', 'user_token=' . $this->session->data['user_token'], true);

		$data['cancel'] = $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'], true);

		if (isset($this->request->post['tags_status'])) {
			$data['tags_status'] = $this->request->post['tags_status'];
		} else {
			$data['tags_status'] = $this->config->get('tags_status');
		}

		if (isset($this->request->post['tags_quantity'])) {
			$data['tags_quantity'] = $this->request->post['tags_quantity'];
		} else {
			$data['tags_quantity'] = $this->config->get('tags_quantity');
		}

		if (isset($this->request->post['tags_type'])) {
			$data['tags_type'] = $this->request->post['tags_type'];
		} else {
			$data['tags_type'] = $this->config->get('tags_type');
		}

		if (isset($this->request->post['tags_category'])) {
			$data['tags_category'] = $this->request->post['tags_category'];
		} else {
			$data['tags_category'] = $this->config->get('tags_category');
		}

		$data['header'] = $this->load->controller('common/header');
		$data['column_left'] = $this->load->controller('common/column_left');
		$data['footer'] = $this->load->controller('common/footer');

		$this->response->setOutput($this->load->view('extension/module/tags', $data));
	}

	protected function validate() {
		if (!$this->user->hasPermission('modify', 'extension/module/tags')) {
			$this->error['warning'] = $this->language->get('error_permission');
		}

		return !$this->error;
	}
}