<?php

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
	$content = trim(file_get_contents("php://input"));
	$decoded = json_decode($content, true);

	if (is_array($decoded)) {
		$data = array(
		'status' => 'success',
		'data' => array(
		'domain' => $decoded['domain'],
		'status' => 1,
		'license_user' => $decoded['license_user'],
		'license_key' => $decoded['license_key'],
		'license_type' => 'Multivendor',
		'purchase_date' => strtotime("now"),
		'supported_until' => 'Never',
		'support_active' => strtotime("+10 year")
		)
		);
		echo json_encode($data);

	}
} else {
	// Send error back to user.
	header('HTTP/1.1 405 Method Not Allowed');
	exit();
}