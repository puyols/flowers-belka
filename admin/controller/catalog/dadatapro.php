<?php

class ControllerCatalogDadataPro extends Controller {
    private $cooperate        = 'Created by Timur T.R / version[ 3.0.0 ]';
    private $base;
    private $error;
    private $setting_path;
    private $setting_default_path;
    private $app_path;
    private $catalog_path;
    private $error_permission = "<div class=\"container\"><br><div class=\"box\"><article class=\"message is-warning\"><div class=\"message-body\">{{error}}</div></article></div></div>";
    private $module_name      = 'dadatapro';
    private $extension_path   = 'extension/extension';

    public function __construct( $registry ) {
        parent::__construct($registry);

        $this->load->language('catalog/dadatapro');
        $this->load->model('setting/setting');

        if( isset($this->request->server['HTTPS']) && ( ( $this->request->server['HTTPS'] == 'on' ) || ( $this->request->server['HTTPS'] == '1' ) ) ) {
            $this->base = HTTPS_SERVER;
        } else {
            $this->base = HTTP_SERVER;
        }

        if( (float)VERSION > 2.3 ) {
            $this->module_name = 'module_dadatapro';
            $this->extension_path = 'extension/';
        } elseif( (float)VERSION < 2.3 ) {
            $this->extension_path = 'extension/module';
        }

        $this->app_path = DIR_APPLICATION . 'view/javascript/dadatapro/';

        $this->setting_path = DIR_CONFIG . 'dadatapro/settings.json';
        $this->setting_default_path = DIR_CONFIG . 'dadatapro/settings_default.json';
        $this->catalog_path = DIR_CATALOG . 'view/javascript/dadatapro/pages/';
    }

    public function index() {
        $find_data = array(
            'base'             => $this->base,
            'code'             => $this->language->get('code'),
            'lang'             => $this->language->get('lang'),
            'direction'        => $this->language->get('direction'),
            'title'            => $this->language->get('heading_title'),
            'link_save'        => $this->setLink('catalog/dadatapro/save'),
            'link_reset'       => $this->setLink('catalog/dadatapro/reset'),
            'link_settings'    => $this->setLink('catalog/dadatapro/settings'),
            'link_message'     => $this->setLink('catalog/dadatapro/message'),
            'error_permission' => '',
        );

        if( file_exists($this->app_path . 'index.html') ) {
            $index_html = file_get_contents($this->app_path . 'index.html');

            $index_html = str_replace('/css/', 'view/javascript/dadatapro/css/', $index_html);
            //$this->error = 'test';
            if( $this->validate() === false ) {
                $find_data['error_permission'] = str_replace('{{error}}', $this->error, $this->error_permission);
                $index_html = preg_replace('/<link href=\/js\/.+?>/sm', '', $index_html);
                $index_html = preg_replace('/<script.+?<\/script>/sm', '', $index_html);
            } else {
                $index_html = str_replace('/js/', 'view/javascript/dadatapro/js/', $index_html);
            }

            foreach( $find_data as $key => $replacement ) {
                $index_html = str_replace('{{' . $key . '}}', $replacement, $index_html);
            }
        } else {
            $index_html = 'Не найден файл шаблона!';
        }

        $this->response->setOutput($index_html);
    }

    public function settings() {
        $json = array();

        if( $this->validate() === true ) {
            if( file_exists($this->setting_path) ) {
                $json['tabsData'] = json_decode(file_get_contents($this->setting_path), true);
            } elseif( file_exists($this->setting_default_path) ) {
                $json['tabsData'] = json_decode(file_get_contents($this->setting_default_path), true);
            } else {
                $json['tabsData'] = array();
            }

            $json['tabsLink'] = array();

            foreach( $json['tabsData'] as $route => &$tab_setting ) {
                $route_name = $this->language->get($route);
                $json['tabsLink'][$route] = $route_name ? $route_name : $route;
                if( !empty($tab_setting['data']) ) {
                    foreach( $tab_setting['data'] as &$group ) {
                        if( !empty($group) ) {
                            foreach( $group as &$value ) {
                                if( !empty($value['label']) ) {
                                    $value['label'] = $this->language->get($value['label']);
                                }
                            }
                        }
                    }
                }
            }

            $json['header_title'] = $this->language->get('heading_title');
            $json['text_button_save'] = $this->language->get('text_button_save');
            $json['text_back_page_modules'] = $this->language->get('text_back_page_modules');
            $json['text_apikey'] = $this->language->get('text_apikey');
            $json['text_apikey_notification'] = $this->language->get('text_apikey_notification');
            $json['text_status'] = $this->language->get('text_status');

            $json['breadcrumbs'] = array(
                array( 'href' => $this->setLink('common/dashboard'), 'title' => $this->language->get('text_home') ),
            );

            $json['breadcrumbs'] = array(
                array( 'href' => $this->setLink('common/dashboard'), 'title' => $this->language->get('text_home') ),
                array( 'href' => $this->setLink($this->extension_path), 'title' => $this->language->get('text_extension') ),
                array( 'href' => $this->setLink('catalog/dadatapro'), 'title' => $this->language->get('heading_title') ),
            );

            $json['back_page_modules'] = $this->setLink($this->extension_path);

            $json['status'] = $this->config->get($this->module_name . '_status') ? $this->config->get($this->module_name . '_status') : 0;
            $json['apikey'] = $this->config->get($this->module_name . '_apikey');

            $json['link_to_dadata'] = array( 'name', 'email', 'address', 'party', );

            $json['cooperate'] = $this->cooperate;
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->addHeader('Cache-Control: no-cache');
        $this->response->setOutput(json_encode($json));
    }

    public function reset() {
        if( $this->validate() === true ) {
            if( file_exists($this->setting_path) ) {
                unlink($this->setting_path);
            }
            $this->settings();
        }
    }

    public function message() {
        $message = array();
        if( $this->validate() === true ) {
            if( isset($this->request->get['route_name']) && ( $route = $this->request->get['route_name'] ) ) {
                $layout_id = $this->getLayout($route);
                if( (int)$layout_id === 0 ) {
                    $message['danger'] = "Обратите внимание! Не найден route <strong>{$route}</strong>, в схемах. Передите в раздел <a target='_blank' href='{$this->setLink('design/layout')}'>[схемы]</a> и добавьте его";
                } else {
                    $message['success'] = "Route <strong>{$route}</strong>, найден в схемах. Все отлично!";
                }
            }
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->addHeader('Cache-Control: no-cache');
        $this->response->setOutput(json_encode($message));
    }

    public function save() {
        $json = array();

        if( ( $this->request->server['REQUEST_METHOD'] === 'POST' )
            && $this->validate()
            && isset($this->request->server['CONTENT_TYPE'])
            && ( $this->request->server['CONTENT_TYPE'] === 'application/json;charset=UTF-8' )
            && ( $request = json_decode(file_get_contents('php://input'), 1) ) ) {
            if( isset($request['status']) && ( $config = $this->setSettingToModelAndFile($request) ) ) {
                $this->model_setting_setting->editSetting($this->module_name, $config);

                file_put_contents($this->setting_path, json_encode($request['tabsData']));
                $json['ok'] = 'Вы успешно сохранили настройки!';
            }
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->addHeader('Cache-Control: no-cache');
        $this->response->setOutput(json_encode($json));
    }

    protected function setSettingToModelAndFile( $request ) {
        $setting = array(
            $this->module_name . '_status' => $request['status'],
            $this->module_name . '_apikey' => $request['apikey'],
            $this->module_name . '_routes' => array(),
        );

        $this->db->query("DELETE FROM " . DB_PREFIX . "layout_module WHERE code = '" . $this->db->escape($this->module_name) . "'");

        foreach( $request['tabsData'] as $route => $tab ) {
            $file_to_route = str_replace('/', '_', $route);
            $route_arr = explode('/', $route);

            $func_name = 'dadata';
            foreach( $route_arr as $route_path ) {
                $func_name .= ucfirst($route_path);
            }

            $route_setting = array();

            if( $tab['status'] === 'default' && $assemble_configuration = $this->assembleСonfiguration($tab['data'], $func_name) ) {
                if( $route === 'checkout/checkout' || $route === 'account/register' || $route === 'account/address' ) {
                    $assemble_configuration .= "$(document).on('ajaxSuccess', function(event, jqxhr, settings){if (settings.url.indexOf('country&country_id=176') > 0) { {$func_name}(); }});";
                } elseif( $route === 'account/edit' ) {
                    $assemble_configuration .= "$(function() {  {$func_name}(); });";
                }
                file_put_contents($this->catalog_path . $file_to_route . '.js', $assemble_configuration);
                $route_setting['addScript'] = $file_to_route . '.js';
            }

            if( $tab['status'] === 'javascript' ) {
                $tab['javascript'] = ';function ' . $func_name . '(){ ' . $tab['javascript'] . '}';
                file_put_contents($this->catalog_path . $file_to_route . '.js', $tab['javascript']);
                $route_setting['addScript'] = $file_to_route . '.js';
            }

            if( $tab['status'] !== 'off' && $tab['css'] !== '' ) {
                file_put_contents($this->catalog_path . $file_to_route . '.css', $tab['css']);
                $route_setting['addStyle'] = $file_to_route . '.css';
            }

            if( $tab['status'] !== 'off' && ( $layout_id = $this->getLayout($route) ) ) {
                $setting[$this->module_name . '_routes'][$route] = $route_setting;
                $this->db->query("INSERT INTO " . DB_PREFIX . "layout_module SET layout_id = '" . (int)$layout_id . "', code = '" . $this->db->escape($this->module_name) . "', `position` = 'content_top', sort_order = 999");
            }
        }

        return $setting;
    }

    protected function getLayout( $route ) {
        if( $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "layout_route WHERE route = '" . $this->db->escape($route) . "' LIMIT 1")->row ) {
            return $query['layout_id'];
        }

        return 0;
    }

    protected function assembleСonfiguration( $config, $func_name ) {
        $create_javascript = "";
        foreach( $config as $key => $values ) {
            $blocks = array();
            $new_elements = array();

            foreach( $values as $index => $value ) {
                if( $value['status'] === 'on' ) {
                    if( !isset($blocks[$value['group_type']]) ) $blocks[$value['group_type']] = array();
                    if( !isset($new_elements[$value['group_type']]) ) $new_elements[$value['group_type']] = array();

                    if( isset($value['newElement']) ) {
                        if( $value['awaiting'] !== '' && $value['newElement'] !== '' ) {
                            $re = '/(.+child:.)([\'"])(.+)([\'"])(.+)/ms';
                            preg_match_all($re, $value['newElement'], $matches, PREG_SET_ORDER, 0);
                            $new_element = $matches[0][1];
                            $new_element .= '\'';//$matches[0][2];
                            $new_element .= str_replace('\'', '"', $matches[0][3]);
                            $new_element .= '\'';//$matches[0][4];
                            $new_element .= $matches[0][5];
                            $new_elements[$value['group_type']]['before'] = "before: '{$value['awaiting']}', newElement: helper.create({$new_element})";
                        }
                    }

                    if( !empty($value['reload']) ) {
                        $new_elements[$value['group_type']]['reload'] = $value['reload'];
                    }

                    if( !empty($value['onSelected']) ) {
                        $new_elements[$value['group_type']]['onSelected'] = $value['onSelected'];
                    }

                    if( !empty($value['helper_keys']) ) {
                        $queue = array();
                        $queue[] = "awaiting: \"{$value['awaiting']}\"";

                        if( !empty($value['prefetch']) ) {
                            if( isset($value['clear']) && $value['clear'] === 'true' ) {
                                $queue[] .= "clear: true";
                            }
                            $queue[] .= "prefetch: function(target) { {$value['prefetch']} }";
                        }

                        $callback = 'function(suggest, helper, element) {';
                        if( !empty($value['callback']) ) {
                            $callback .= $value['callback'];
                        }
                        $callback .= "return helper('{$value['helper_keys']}', suggest);}";
                        $queue[] = "callback: {$callback}";

                        if( !empty($value['single']) ) {
                            if( strpos($func_name, 'Simple') === false ) {
                                $this->finalCreateJs($create_javascript, array( $value['group_type'] => array( '{ ' . implode(', ', $queue) . ' }' ) ));
                            } else {
                                $this->finalCreateJs(
                                    $create_javascript,
                                    array( $value['group_type'] => array( '{ ' . implode(', ', $queue) . ' }' ) ),
                                    array( $value['group_type'] => array( 'onSelected' => 'reloadAll();' ) )
                                );
                            }
                        } else {
                            $blocks[$value['group_type']][$index] = '{ ' . implode(', ', $queue) . ' }';
                        }
                    }
                }
            }

            $this->finalCreateJs($create_javascript, $blocks, $new_elements);
        }

        if( $create_javascript ) {
            $create_javascript = ';function ' . $func_name . '(){ ' . $create_javascript . '};';
        }

        return $create_javascript;
    }

    protected function finalCreateJs( &$create_javascript, $blocks, $new_elements = array() ) {
        foreach( $blocks as $group_name => $value ) {
            if( count($value) > 0 ) {
                $queue = implode(', ', $value);

                $create_javascript .= "UserDadata({ type: '{$group_name}', delay: 777,";

                if( isset($new_elements[$group_name]) ) {
                    if( !empty($new_elements[$group_name]['before']) ) {
                        $create_javascript .= "element: function (helper) { return { {$new_elements[$group_name]['before']} } },";
                    }
                    if( !empty($new_elements[$group_name]['reload']) ) {
                        $create_javascript .= "reload: function(store, helper) { {$new_elements[$group_name]['reload']} },";
                    }
                    if( !empty($new_elements[$group_name]['onSelected']) ) {
                        $create_javascript .= "onSelected: function(suggest, helper) { {$new_elements[$group_name]['onSelected']} },";
                    }
                }

                $create_javascript .= "queue: [{$queue}]});";
            }
        }
    }

    protected function setLink( $path, $params = array() ) {
        if( (float)VERSION > 2.3 ) {
            return str_replace('&amp;', '&', $this->url->link($path, 'user_token=' . $this->session->data['user_token'] . ( $params ? implode('&', $params) : '' ), true));
        }

        return str_replace('&amp;', '&', $this->url->link($path, 'token=' . $this->session->data['token'] . ( $params ? implode('&', $params) : '' ), true));
    }

    protected function validate() {
        if( !$this->user->hasPermission('modify', 'catalog/dadatapro') ) {
            $this->error = $this->language->get('error_permission');
        }
        // Test Permission
        //$this->error = $this->language->get('error_permission');
        return !$this->error;
    }
}