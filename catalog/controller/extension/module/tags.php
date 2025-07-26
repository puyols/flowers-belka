<?php
class ControllerExtensionModuleTags extends Controller {
	public function index() {
		$data = array();

		$this->load->language('extension/module/tags');
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

        $data['tags_quantity'] = $this->config->get('tags_quantity');
        $data['tags_type'] = $this->config->get('tags_type');
        $data['tags_category'] = $this->config->get('tags_category');

		if (isset($this->request->get['path'])) {
			$parts = explode('_', (string)$this->request->get['path']);
		} else {
			$parts = false;
		}

		if ($parts){
			$data['category_id'] = $parts[count($parts)-1];
		}

		$this->load->model('catalog/tags');

		$this->load->model('catalog/category');

		$data['tags'] = array();

		$tags = $this->model_catalog_tags->getCloudTags($data);
		
		foreach ($tags as $tag) {
			$href = $this->url->link('product/tags', 'tag_id=' . $tag['tag_id']);
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
                $href = $this->url->link('product/tags', 'path='.$path.'&tag_id=' . $tag['tag_id']);
        	}
			$data['tags'][] = array(
				'tag_id' 	  => $tag['tag_id'],
				'name'        => $tag['name'],
				'href'        => $href
			);
		}

		$data['count_tag'] = count($data['tags']);

		if ($data['count_tag']>3 && ($data['taglist_type'] == '3' || $data['taglist_type'] == '4')) {
	        $this->document->addStyle('catalog/view/javascript/jquery/slick/slick.css');
	        $this->document->addScript('catalog/view/javascript/jquery/slick/slick.min.js');
	        $this->document->addScript('catalog/view/javascript/seotags.js');
        }
        if ($data['taglist_type'] != '1') {
            $this->document->addStyle('catalog/view/theme/default/stylesheet/seotags.css');
        }
		
		return $this->load->view('extension/module/tags', $data);
		
	}
}