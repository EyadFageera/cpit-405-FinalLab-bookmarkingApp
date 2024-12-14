<?php

if($_SERVER['REQUEST_METHOD']!== 'GET'){
    header('Allow: GET');
    http_response_code(405);
    echo json_encode(
        array('message' => 'Method not allowed')
    );
    return;
}

header( 'Access-Control-Allow-Origin: *');
header( 'Content-Type: application/json');
header( 'Access-control-Allow-methods: GET');

include_once '../db/Database.php';
include_once '../models/Bookmark.php';

$database = new Database();
$dbConnection = $database->connect();

$bookmark = new Bookmark($dbConnection);

$result = $bookmark->readAll();
if(!empty($result)){
    echo json_encode($result);
}
else{
    echo json_encode(
        array('message' => 'No bookmarks were found')
    );
}