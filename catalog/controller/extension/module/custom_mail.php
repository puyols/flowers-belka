<?php
class ControllerExtensionModuleCustomMail extends Controller {

    private $error = array();

    private $forms_array = array();
    private $forms_files_array = array();

    public function index($setting) {

        header('Content-type: text/html; charset=utf-8');
        $this->load->language('extension/module/custom_mail');
        static $module = 0;
        $this->document->addScript('catalog/view/javascript/jquery/jquery.maskedinput.js');
        $this->document->addScript('catalog/view/javascript/jquery/jquery.fileinput.js');
        $data['form'] = array();

        if(isset($setting['description'])) {
            $setting['description'] = html_entity_decode($setting['description'], ENT_QUOTES, 'UTF-8');
        }

        if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {

            $this->forms_array['title'] = $this->request->post['title'];
            $mail = new Mail($this->config->get('config_mail_engine'));
            $mail->parameter = $this->config->get('config_mail_parameter');
            $mail->smtp_hostname = $this->config->get('config_mail_smtp_hostname');
            $mail->smtp_username = $this->config->get('config_mail_smtp_username');
            $mail->smtp_password = html_entity_decode($this->config->get('config_mail_smtp_password'), ENT_QUOTES, 'UTF-8');
            $mail->smtp_port = $this->config->get('config_mail_smtp_port');
            $mail->smtp_timeout = $this->config->get('config_mail_smtp_timeout');
            $email = $this->config->get('config_email');
            if ($this->request->post['form']) {
                foreach ($this->request->post['form'] as $k => $form) {
                     if ($form['type'] == 'email') {
                        $email = $form['email'];
                    }
                     if ($form['type'] != 'file') {
                         $this->forms_array['form'][$k]['title'] = $form['title'];
                         if (is_array(end($form))) {
                             $this->forms_array['form'][$k]['value'] = implode("; ", end($form));
                         } else {
                             $this->forms_array['form'][$k]['value'] = end($form);
                         }
                     }

                }
            }

            $mail->setTo($this->config->get('config_email'));
            if ($this->config->get('config_mail_engine') == 'mail') {
                $mail->setFrom($email);
            } else {
                $mail->setFrom($this->config->get('config_email'));
            }

            $mail->setReplyTo($email);
            $mail->setSender(html_entity_decode($email, ENT_QUOTES, 'UTF-8'));
            $mail->setSubject(html_entity_decode(sprintf($this->language->get('email_subject'), $email), ENT_QUOTES, 'UTF-8'));

            $mail->setHtml($this->load->view('mail/custom_mail',  $this->forms_array));
            if (!empty($this->forms_files_array)) {
                foreach ($this->forms_files_array as $file) {
                    move_uploaded_file($file['tmp_name'], $file['file']);
                    $mail->AddAttachment($file['file']);
                }
            }

            try {
                $mail->send();
            } catch (Exception $e) {
                echo 'Сбой в отправке письма: ',  $e->getMessage(), "\n";
            }

            if (!empty($this->forms_files_array)) {
                foreach ($this->forms_files_array as $file) {
                    unlink($file['file']);
                }
            }
            $this->response->redirect($this->url->link('information/contact/success'));
        }

       if (!empty($this->error)) {
            $data['error'] = $this->error;
        }

        $data['forms'] = $setting;
        $data['action'] = $this->request->server['REQUEST_URI'];
        $data['module'] = $module++;
        // Captcha
        if ($this->config->get('captcha_' . $this->config->get('config_captcha') . '_status') && in_array('contact', (array)$this->config->get('config_captcha_page'))) {
            $data['captcha'] = $this->load->controller('extension/captcha/' . $this->config->get('config_captcha'), $this->error);
        } else {
            $data['captcha'] = '';
        }
        return  $this->load->view('extension/module/custom_mail', $data);

    }
    protected function validate() {

        if (isset($this->request->post['form'])) {

            foreach ($this->request->post['form'] as $key => $form_mail) {
                switch ($form_mail['type']) {
                    case "textarea":
                        if (!empty(end($form_mail)) && ((utf8_strlen(end($form_mail)) < 3) || (utf8_strlen(end($form_mail)) > 128))) {

                            $this->error[$key]['textarea'] = $this->language->get('error_textarea');
                        }
                        break;
                    case "text":
                        if (!empty(end($form_mail)) && ((utf8_strlen(end($form_mail)) < 3) || (utf8_strlen(end($form_mail)) > 30))) {
                            $this->error[$key]['text'] = $this->language->get('error_text');
                        }
                        break;
                    case "email":
                        $reg_mail = "/.+@.+\..+/i";
                        if ( !preg_match($reg_mail, end($form_mail), $mail) ) {
                            $this->error[$key]['email'] = $this->language->get('error_email');
                        }

                        break;
                    case "date":
                        $reg_date = "/^([0-9]{2})-([0-9]{2})-([0-9]{4})$/";
                        if ( preg_match($reg_date, end($form_mail), $date) ) {
                            if ( !checkdate($date[2],$date[1],$date[3]) ) {
                                $this->error[$key]['date'] = $this->language->get('error_date');
                            }
                        }
                        break;

                }


            }
            //Проверка файлов
            if (isset($this->request->files['form'])) {
                $forms_files_array = array();
                foreach ($this->request->files['form'] as $key => $array_files) {
                    foreach ($array_files as $num => $files) {
                        foreach ($files as $name => $file) {
                            foreach ($file as $k => $value) {
                                $forms_files_array[$name][$k][$key] = $value;
                                $forms_files_array[$name][$k]['key'] = $num;
                            }

                        }
                    }
                }

                foreach ($forms_files_array as $name_key => $array_files) {
                    foreach ($array_files as  $file) {
                        if (is_file($file['tmp_name'])) {
                            $filename = html_entity_decode($file['name'], ENT_QUOTES, 'UTF-8');
                            $filename = $this->translit($filename);
                           
                            // Validate the filename length
                            if ((utf8_strlen($filename) < 3) || (utf8_strlen($filename) > 64)) {
                                $this->error[$file['key']]['file'] = $this->language->get('error_filename');

                            }

                            // Allowed file extension types
                            $allowed = array();

                            $extension_allowed = preg_replace('~\r?\n~', "\n", $this->config->get('config_file_ext_allowed'));

                            $filetypes = explode("\n", $extension_allowed);

                            foreach ($filetypes as $filetype) {
                                $allowed[] = trim($filetype);
                            }

                            if (!in_array(strtolower(substr(strrchr($filename, '.'), 1)), $allowed)) {
                                $this->error[$file['key']]['file'] = $this->language->get('error_filetype');
                            }

                            // Allowed file mime types
                            $allowed = array();

                            $mime_allowed = preg_replace('~\r?\n~', "\n", $this->config->get('config_file_mime_allowed'));

                            $filetypes = explode("\n", $mime_allowed);

                            foreach ($filetypes as $filetype) {
                                $allowed[] = trim($filetype);
                            }

                            if (!in_array($file['type'], $allowed)) {
                                $this->error[$file['key']]['file'] = $this->language->get('error_filetype');
                            }

                            // Check to see if any PHP files are trying to be uploaded
                            $content = file_get_contents($file['tmp_name']);

                            if (preg_match('/\<\?php/i', $content)) {
                                 $this->error[$file['key']]['file'] = $this->language->get('error_filetype_php');
                            }
                                // Return any upload error
                            if ($file['error'] != UPLOAD_ERR_OK) {
                                $this->error[$file['key']]['file'] = $this->language->get('error_upload_' . $file['error']);
                            }
                            if (empty($this->error[$file['key']]['file'])) {

                                $this->forms_files_array[] = array(
                                    'file' => DIR_UPLOAD .$filename,
                                    'tmp_name' => $file['tmp_name']
                                );

                            }
                        }

                    }
                }
              //  echo '<pre>'; print_r($this->forms_files_array); die('</pre>') ;
            }
        }

        // Captcha
        if ($this->config->get('captcha_' . $this->config->get('config_captcha') . '_status') && in_array('contact', (array)$this->config->get('config_captcha_page'))) {
            $captcha = $this->load->controller('extension/captcha/' . $this->config->get('config_captcha') . '/validate');

            if ($captcha) {
                $this->error['captcha'] = $captcha;
            }
        }

        return !$this->error;
    }
    public function success() {
        $this->load->language('information/contact');

        $this->document->setTitle($this->language->get('heading_title'));

        $data['breadcrumbs'] = array();

        $data['breadcrumbs'][] = array(
            'text' => $this->language->get('text_home'),
            'href' => $this->url->link('common/home')
        );

        $data['breadcrumbs'][] = array(
            'text' => $this->language->get('heading_title'),
            'href' => $this->url->link('information/contact')
        );

        $data['continue'] = $this->url->link('common/home');

        $data['column_left'] = $this->load->controller('common/column_left');
        $data['column_right'] = $this->load->controller('common/column_right');
        $data['content_top'] = $this->load->controller('common/content_top');
        $data['content_bottom'] = $this->load->controller('common/content_bottom');
        $data['footer'] = $this->load->controller('common/footer');
        $data['header'] = $this->load->controller('common/header');

        $this->response->setOutput($this->load->view('common/success', $data));
    }
    public function translit($s) {
        $s = (string) $s; // преобразуем в строковое значение
        $s = strip_tags($s); // убираем HTML-теги
        $s = str_replace(array("\n", "\r"), " ", $s); // убираем перевод каретки
        $s = preg_replace("/\s+/", ' ', $s); // удаляем повторяющие пробелы
        $s = trim($s); // убираем пробелы в начале и конце строки
        $s = function_exists('mb_strtolower') ? mb_strtolower($s) : strtolower($s); // переводим строку в нижний регистр (иногда надо задать локаль)
        $s = strtr($s, array('а'=>'a','б'=>'b','в'=>'v','г'=>'g','д'=>'d','е'=>'e','ё'=>'e','ж'=>'j','з'=>'z','и'=>'i','й'=>'y','к'=>'k','л'=>'l','м'=>'m','н'=>'n','о'=>'o','п'=>'p','р'=>'r','с'=>'s','т'=>'t','у'=>'u','ф'=>'f','х'=>'h','ц'=>'c','ч'=>'ch','ш'=>'sh','щ'=>'shch','ы'=>'y','э'=>'e','ю'=>'yu','я'=>'ya','ъ'=>'','ь'=>''));
        $s = preg_replace("/[^0-9a-z-_\. ]/i", "", $s); // очищаем строку от недопустимых символов
        $s = str_replace(" ", "-", $s); // заменяем пробелы знаком минус
        return $s; // возвращаем результат
    }
}