<?php

class ModelExtensionPaymentYandexGoDeliveryCardOD extends Model{

    public function getMethod($address, $total)
    {
        $this->load->language('extension/payment/yandexgodelivery_card_od');

        return [
            'code' => 'yandexgodelivery_card_od',
            'title' => $this->language->get('text_title'),
            'terms' => '',
            'sort_order' => $this->config->get('payment_yandexgodelivery_card_od_sort_order'),
        ];
    }
}
