<?php

class ControllerExtensionModuleDadataPro extends Controller {
    private $route;
    private $status;
    private $api_key;

    public function __construct( $registry ) {
        parent::__construct($registry);

        $module_name = (float)VERSION > 2.3 ? 'module_dadatapro' : 'dadatapro';

        $this->load->model('setting/setting');

        $this->status = (int)$this->config->get($module_name . '_status');
        $this->api_key = $this->config->get($module_name . '_apikey');
        $this->route = ( isset($this->request->get['route']) ) ? $this->request->get['route'] : 'common/home';
    }

    public function index() {
        $module_name = (float)VERSION > 2.3 ? 'module_dadatapro' : 'dadatapro';

        if( $this->status
            && $this->api_key
            && $this->config->get($module_name . '_routes')
            && !empty($this->config->get($module_name . '_routes')[$this->route])
            && ( $route_setting = $this->config->get($module_name . '_routes')[$this->route] ) ) {
            $this->document->addStyle('catalog/view/javascript/dadatapro/dadatapro.css');
            $this->document->addScript('catalog/view/javascript/dadatapro/dadatapro.js');

            foreach( $route_setting as $action => $file_name ) {
                $this->document->{$action}('catalog/view/javascript/dadatapro/pages/' . $file_name);
            }
        }

        return '';
    }

    public function suggestion() {
        $suggest = array();
        if( $this->status
            && $this->api_key
            && isset($this->request->get['type'])
            && isset($this->request->post)
            && ( $type = $this->request->get['type'] )
            && ( $request_json_string = $this->getJson() ) ) {

            $suggest = $this->Dadata($this->api_key, $type, $request_json_string);
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($suggest));
    }

    protected function getJson() {
        if( ( $this->request->server['REQUEST_METHOD'] === 'POST' )
            && isset($this->request->server['CONTENT_TYPE'])
            && ( $this->request->server['CONTENT_TYPE'] === 'application/json;charset=UTF-8' )
            && ( $request = file_get_contents('php://input') ) ) {

            return $request;
        }

        return false;
    }

    protected function Dadata( $api_key, $type, $fields) {
        $result = false;
        if( $ch = curl_init("https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/$type") ) {
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'Accept: application/json',
                'Authorization: Token ' . $api_key,
            ));
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
            $result = curl_exec($ch);
            $result = json_decode($result, true);
            curl_close($ch);
        }

        return $result;
    }
}