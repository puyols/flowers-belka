<?php
class ModelModuleHtmlBlock extends Model {
	
	public function getInformation($information_id) {
		
		$sql = "SELECT DISTINCT * ";
		$sql .= "FROM " . DB_PREFIX . "information i ";
		$sql .= "LEFT JOIN " . DB_PREFIX . "information_description id ON (i.information_id = id.information_id) ";
		$sql .= "WHERE i.information_id = '" . (int)$information_id . "' AND id.language_id = '" . (int)$this->config->get('config_language_id') . "'";
		
		return $this->db->query($sql)->row;
	}			 
	
	public function getInformations($data = array()) {
		
		$sql  = "SELECT * FROM " . DB_PREFIX . "information i ";
		$sql .= "LEFT JOIN " . DB_PREFIX . "information_description id ON (i.information_id = id.information_id) ";
		$sql .= "WHERE id.language_id = '" . (int)$this->config->get('config_language_id') . "' ";

		if (!empty($data['filter_title'])) {
			$sql .= " AND id.title LIKE '" . $this->db->escape($data['filter_title']) . "%'";
		}

		$sort_data = array(
			'id.title',
			'i.sort_order'
		);

		if (isset($data['sort']) && in_array($data['sort'], $sort_data)) {
			$sql .= " ORDER BY " . $data['sort'];
		} else {
			$sql .= " ORDER BY id.title";
		}

		if (isset($data['order']) && ($data['order'] == 'DESC')) {
			$sql .= " DESC";
		} else {
			$sql .= " ASC";
		}

		if (isset($data['start']) || isset($data['limit'])) {
			
			if ($data['start'] < 0) {
				$data['start'] = 0;
			}

			if ($data['limit'] < 1) {
				$data['limit'] = 20;
			}

			$sql .= " LIMIT " . (int)$data['start'] . "," . (int)$data['limit'];
		}

		$query = $this->db->query($sql);

		return $query->rows;
	}
}
?>