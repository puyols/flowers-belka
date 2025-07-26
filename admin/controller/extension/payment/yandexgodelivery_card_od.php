<?php
class ControllerExtensionPaymentYandexGoDeliveryCardOD extends Controller {
    private $error = [];

    public function index() {
        $this->load->language('extension/payment/yandexgodelivery_card_od');

        $this->document->setTitle('Card on delivery');

        $this->load->model('setting/setting');

        if (($this->request->server['REQUEST_METHOD'] === 'POST') && $this->validate()) {
            $this->model_setting_setting->editSetting('payment_yandexgodelivery_card_od', $this->request->post);

            $this->session->data['success'] = $this->language->get('text_success');

            $this->response->redirect($this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=payment', true));
        }

        $data['error_warning'] = $this->error['warning'] ?? '';

        $data['breadcrumbs'] = [];

        $data['breadcrumbs'][] = [
            'text' => $this->language->get('text_home'),
            'href' => $this->url->link('common/dashboard', 'user_token=' . $this->session->data['user_token'], true)
        ];

        $data['breadcrumbs'][] = [
            'text' => $this->language->get('text_extension'),
            'href' => $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=payment', true)
        ];

        $data['breadcrumbs'][] = [
            'text' => $this->language->get('heading_title'),
            'href' => $this->url->link('extension/payment/yandexgodelivery_card_od', 'user_token=' . $this->session->data['user_token'], true)
        ];

        $data['action'] = $this->url->link('extension/payment/yandexgodelivery_card_od', 'user_token=' . $this->session->data['user_token'], true);

        $data['cancel'] = $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=payment', true);

        if (isset($this->request->post['payment_yandexgodelivery_card_od_status'])) {
            $data['payment_yandexgodelivery_card_od_status'] = $this->request->post['payment_yandexgodelivery_card_od_status'];
        } else {
            $data['payment_yandexgodelivery_card_od_status'] = $this->config->get('payment_yandexgodelivery_card_od_status');
        }

        if (isset($this->request->post['payment_yandexgodelivery_card_od_sort_order'])) {
            $data['payment_yandexgodelivery_card_od_sort_order'] = $this->request->post['payment_yandexgodelivery_card_od_sort_order'];
        } else {
            $data['payment_yandexgodelivery_card_od_sort_order'] = $this->config->get('payment_yandexgodelivery_card_od_sort_order');
        }

        if (isset($this->request->post['payment_yandexgodelivery_card_od_order_status_id'])) {
            $data['payment_yandexgodelivery_card_od_order_status_id'] = $this->request->post['payment_yandexgodelivery_card_od_order_status_id'];
        } else {
            $data['payment_yandexgodelivery_card_od_order_status_id'] = $this->config->get('payment_yandexgodelivery_card_od_order_status_id');
        }
        $this->load->model('localisation/order_status');
        $data['order_statuses'] = $this->model_localisation_order_status->getOrderStatuses();

        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');

        $this->response->setOutput($this->load->view('extension/payment/yandexgodelivery_card_od', $data));
    }

    protected function validate() {
        if (!$this->user->hasPermission('modify', 'extension/payment/yandexgodelivery_card_od')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        return !$this->error;
    }
}
