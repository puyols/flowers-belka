<?php
class ControllerExtensionModuleLmStudio extends Controller {
    public function install() {
        // Логика для установки модуля (если требуется)
        $this->load->model('setting/setting');
        $this->model_setting_setting->editSetting('module_lm_studio', ['module_lm_studio_status' => 1]);
    }

    public function uninstall() {
        // Логика для удаления модуля (если требуется)
        $this->load->model('setting/setting');
        $this->model_setting_setting->deleteSetting('module_lm_studio');
    }

    public function index() {
        // Основной код модуля
    }
}
class ControllerExtensionModuleLmStudio extends Controller {
    public function index() {
        $this->load->language('extension/module/lm_studio');
        $data['heading_title'] = $this->language->get('heading_title');

        if ($this->request->server['REQUEST_METHOD'] == 'POST') {
            $prompt = $this->request->post['prompt'];

            // Вызов API LM Studio
            $url = 'http://127.0.0.1:4040/chat/completions';
            $data = [
                'model' => 'ваша_модель', // Укажите идентификатор модели
                'messages' => [
                    ['role' => 'user', 'content' => $prompt]
                ],
                'temperature' => 0.7,
            ];

            $options = [
                'http' => [
                    'header'  => "Content-type: application/json\r\n",
                    'method'  => 'POST',
                    'content' => json_encode($data),
                ],
            ];

            $context  = stream_context_create($options);
            $result = file_get_contents($url, false, $context);

            if ($result === FALSE) {
                $response = 'Ошибка при обращении к API.';
            } else {
                $response = json_decode($result, true)['choices'][0]['message']['content'];
            }

            $data['generated_text'] = $response;
        }

        $data['action'] = $this->url->link('extension/module/lm_studio', 'user_token=' . $this->session->data['user_token'], true);
        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');

        $this->response->setOutput($this->load->view('extension/module/lm_studio', $data));
    }
}