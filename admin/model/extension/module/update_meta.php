<?php
class ModelExtensionModuleUpdateMeta extends Model {

	public function updateZero() {
		$this->db->query("UPDATE `" . DB_PREFIX . "product_description` SET `updates_meta` = '0'");
        $this->db->query("UPDATE `" . DB_PREFIX . "category_description` SET `updates_meta` = '0'");
        $this->db->query("UPDATE `" . DB_PREFIX . "manufacturer_description` SET `updates_meta` = '0'");
        $this->db->query("UPDATE `" . DB_PREFIX . "information_description` SET `updates_meta` = '0'");
	}

    public function getProducts($category_id, $language_id) {
        $query = $this->db->query("SELECT p.product_id,p.model, p.price, p.tax_class_id, pd.name, pm.name as manufacturer_name, cd.name as category_name FROM " . DB_PREFIX . "product p LEFT JOIN " . DB_PREFIX . "product_description pd ON (p.product_id = pd.product_id) LEFT JOIN " . DB_PREFIX . "product_to_category p2c ON (p.product_id = p2c.product_id) LEFT JOIN " . DB_PREFIX . "category_description cd ON (cd.category_id = p2c.category_id) LEFT JOIN " . DB_PREFIX . "manufacturer pm ON (p.manufacturer_id = pm.manufacturer_id) WHERE pd.language_id = '" . (int)$language_id . "' AND p2c.category_id = '" . (int)$category_id . "' AND pd.updates_meta = 0 ORDER BY pd.name ASC");

        return $query->rows;
    }
    public function getCategory($category, $language_id) {
        $query = $this->db->query("SELECT category_id, name FROM " . DB_PREFIX . "category_description where language_id = '".(int)$language_id."' AND category_id in(".$this->db->escape($category).") ORDER BY name ASC");

        return $query->rows;
    }
    public function getManufacturer() {
        $query = $this->db->query("SELECT manufacturer_id, name FROM " . DB_PREFIX . "manufacturer ORDER BY name ASC");

        return $query->rows;
    }
    public function getInformation($language_id) {
        $query = $this->db->query("SELECT information_id, title FROM " . DB_PREFIX . "information_description where language_id = '".(int)$language_id."' ORDER BY title ASC");

        return $query->rows;
    }
     public function getMinMax($category_id) {
        $sql = " SELECT MIN(CASE WHEN special IS NOT NULL THEN special ELSE price END) AS min, MAX(CASE WHEN special IS NOT NULL THEN special ELSE price END) AS max, tax_class_id FROM
        (SELECT DISTINCT p.tax_class_id, p.price, ( SELECT price FROM " . DB_PREFIX . "product_special as ps WHERE ps.product_id = p.product_id AND customer_group_id = '" . (int)$this->config->get('config_customer_group_id') . "' AND ( ( ps.date_start = '0000-00-00' OR ps.date_start < NOW() ) AND ( ps.date_end = '0000-00-00' OR ps.date_end > NOW() ) ) ORDER BY ps.priority ASC LIMIT 1 ) AS special FROM " . DB_PREFIX . "product p
        LEFT JOIN " . DB_PREFIX . "product_to_category p2c ON (p.product_id = p2c.product_id)
        LEFT JOIN " . DB_PREFIX . "product_to_store p2s ON (p.product_id = p2s.product_id)
        WHERE 
        p.status = '1' 
        AND p2s.store_id = '" . (int)$this->config->get('config_store_id') . "'
        AND p2c.category_id = '" . (int)$category_id. "') as t";


        $query = $this->db->query($sql);

        return $query->row;
    }
    public function getMinMaxManuf($manufacturer_id) {
        $sql = " SELECT MIN(CASE WHEN special IS NOT NULL THEN special ELSE price END) AS min, MAX(CASE WHEN special IS NOT NULL THEN special ELSE price END) AS max, tax_class_id FROM
        (SELECT DISTINCT p.tax_class_id, p.price, ( SELECT price FROM " . DB_PREFIX . "product_special as ps WHERE ps.product_id = p.product_id AND customer_group_id = '" . (int)$this->config->get('config_customer_group_id') . "' AND ( ( ps.date_start = '0000-00-00' OR ps.date_start < NOW() ) AND ( ps.date_end = '0000-00-00' OR ps.date_end > NOW() ) ) ORDER BY ps.priority ASC LIMIT 1 ) AS special FROM " . DB_PREFIX . "product p
        LEFT JOIN " . DB_PREFIX . "manufacturer md ON (md.manufacturer_id = p.manufacturer_id)
        LEFT JOIN " . DB_PREFIX . "product_to_store p2s ON (p.product_id = p2s.product_id)
        WHERE 
        p.status = '1' 
        AND p2s.store_id = '" . (int)$this->config->get('config_store_id') . "'
        AND md.manufacturer_id = '" . (int)$manufacturer_id. "') as t";

        $query = $this->db->query($sql);

        return $query->row;
    }
	public function getProductsSeo($category_id, $language_id) {
        $query = $this->db->query("SELECT p.product_id, pd.name FROM " . DB_PREFIX . "product p LEFT JOIN " . DB_PREFIX . "product_description pd ON (p.product_id = pd.product_id) LEFT JOIN " . DB_PREFIX . "product_to_category p2c ON (p.product_id = p2c.product_id) WHERE p2c.category_id = '" . (int)$category_id . "' AND pd.language_id = '".(int)$language_id."'");

        return $query->rows;
    }
	public function SetUpdate_meta($array)
    {
        foreach ($array as $value) {
            $query = $this->db->query("SELECT count(COLUMN_NAME) as tab_meta FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '" . DB_DATABASE . "' AND TABLE_NAME = '" . DB_PREFIX . $value ."_description' AND             COLUMN_NAME='updates_meta'");
            if (!$query->row['tab_meta']) {
                $this->db->query("ALTER TABLE `" . DB_PREFIX . $value ."_description` ADD `updates_meta` TINYINT(1) NOT NULL AFTER `meta_h1`");

            }

        }
    }

    public function updateMetaProduct($data, $language_id, $per){
        foreach ($data['meta'] as $key => $item) {
            $sql = "UPDATE " . DB_PREFIX .$this->db->escape($data['type'])."_description SET ";
            $sql .= $item;
            if ($per) {
                $sql .= " WHERE ".$this->db->escape($data['type'])."_id = '". (int)$data['product_id']."' AND language_id = '".(int)$language_id."' AND updates_meta = 0";
            } else {
                $sql .= " WHERE ".$this->db->escape($data['type'])."_id = '". (int)$data['product_id']."' AND language_id = '".(int)$language_id."' AND updates_meta = 0 AND (".$this->db->escape($key)." = '' OR ".$this->db->escape($key)." IS NULL)";
            }

            $this->db->query($sql);
        }
        $this->db->query("UPDATE " . DB_PREFIX .$this->db->escape($data['type'])."_description SET updates_meta = '1' WHERE ".$this->db->escape($data['type'])."_id = '". (int)$data['product_id']."' AND language_id = '".(int)$language_id."'");
    }

    public function getStructure($table) {
        $this->db->query("SET wait_timeout = 3000000");
        $query = $this->db->query("SHOW COLUMNS FROM ".DB_PREFIX.$this->db->escape($table)."");

        return $query->rows;
    }
	public function setUrl($type, $id, $seo_url, $language_id, $update = false) {
        $this->db->query("INSERT INTO " . DB_PREFIX . "seo_url  SET store_id = '" . (int)$this->config->get('config_store_id') . "', language_id = '" . (int)$language_id . "',query = '" . $this->db->escape($type) . "=" . (int)$id . "', keyword = '" . $this->db->escape($seo_url) . "'");
		if ($update){
			$this->db->query("UPDATE " . DB_PREFIX . "seo_url  SET keyword = '" . $this->db->escape($seo_url) . "' WHERE store_id = '" . (int)$this->config->get('config_store_id') . "' AND language_id = '" . (int)$language_id . "' AND query LIKE '" . $this->db->escape($type) . "=" . (int)$id . "'");
		}        
    }
	public function getUrl($type, $id, $language_id) {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "seo_url  WHERE query = '" . $this->db->escape($type) . "=" . (int)$id . "' AND language_id = '" . (int)$language_id . "' AND store_id = '" . (int)$this->config->get('config_store_id') . "'");
		if (empty($query->row['keyword']) && !empty($query->row['query'])) {
			$this->db->query("DELETE FROM " . DB_PREFIX . "seo_url  WHERE query = '" . $this->db->escape($type) . "=" . (int)$id . "' AND language_id = '" . (int)$language_id . "' AND store_id = '" . (int)$this->config->get('config_store_id') . "'");
			return false;
		} else if (!empty($query->row['keyword']) && !empty($query->row['query'])){
			return true;
		}
		else {
			return false;
		}
        
    }
	public function getDubli($language_id) {
        $query = $this->db->query("SELECT ua1.query, ua1.keyword FROM " . DB_PREFIX . "seo_url ua1 JOIN " . DB_PREFIX . "seo_url ua2 WHERE ua1.language_id = '" . (int)$language_id . "' AND ua1.keyword = ua2.keyword AND ua1.query <> ua2.query AND ua1.keyword != '' GROUP BY ua1.query ORDER BY ua1.keyword");

        return $query->rows;
    }
	public function setDubUrl($query, $seo_url, $language_id) {
        $query = $this->db->query("UPDATE " . DB_PREFIX . "seo_url  SET keyword = '" . $this->db->escape($seo_url) . "' WHERE query = '" . $this->db->escape($query) . "' AND language_id = '" . (int)$language_id . "'");
		        
    }
	public function getCategories($language_id, $data = array()) {
        $sql = "SELECT cp.category_id AS category_id, GROUP_CONCAT(cd1.name ORDER BY cp.level SEPARATOR '&nbsp;&nbsp;&gt;&nbsp;&nbsp;') AS name, c1.parent_id, c1.sort_order, c1.status,(select count(product_id) as product_count from " . DB_PREFIX . "product_to_category pc where pc.category_id = c1.category_id) as product_count FROM " . DB_PREFIX . "category_path cp LEFT JOIN " . DB_PREFIX . "category c1 ON (cp.category_id = c1.category_id) LEFT JOIN " . DB_PREFIX . "category c2 ON (cp.path_id = c2.category_id) LEFT JOIN " . DB_PREFIX . "category_description cd1 ON (cp.path_id = cd1.category_id) LEFT JOIN " . DB_PREFIX . "category_description cd2 ON (cp.category_id = cd2.category_id) WHERE cd1.language_id = '" . (int)$language_id . "' AND cd2.language_id = '" . (int)$language_id . "'";

       
        $sql .= " GROUP BY cp.category_id";

        $sort_data = array(
            'product_count',
            'name',
            'sort_order'
        );

        if (isset($data['sort']) && in_array($data['sort'], $sort_data)) {
            $sql .= " ORDER BY " . $data['sort'];
        } else {
            $sql .= " ORDER BY sort_order";
        }

        if (isset($data['order']) && ($data['order'] == 'DESC')) {
            $sql .= " DESC";
        } else {
            $sql .= " ASC";
        }

        $query = $this->db->query($sql);

        return $query->rows;
    }
	public function getInformations($language_id) {
		
			$sql = "SELECT * FROM " . DB_PREFIX . "information i LEFT JOIN " . DB_PREFIX . "information_description id ON (i.information_id = id.information_id) WHERE id.language_id = '" . (int)$language_id . "'";

			$sql .= " ORDER BY id.title ASC";
			
			$query = $this->db->query($sql);

			return $query->rows;
	}
	public function getManufacturers() {
		$sql = "SELECT manufacturer_id, name FROM " . DB_PREFIX . "manufacturer ORDER BY name ASC";

		
		$query = $this->db->query($sql);

		return $query->rows;
	}
}