<?php

if($_SERVER['REQUEST_METHOD']!== 'PUT'){
    header('Allow: PUT');
    http_response_code(405);
    echo json_encode(
        array('message' => 'Method not allowed')
    );
    return;
}

header( 'Access-Control-Allow-Orlgln: *');
header( 'Content-Type: application/json');
header( 'Access-control-Allow-methods: PUT');

include_once '../db/Database.php';
include_once '../models/Bookmark.php';

$database = new Database();
$dbConnection = $database->connect();

$bookmark = new Bookmark($dbConnection);

$data = json_decode(file_get_contents('php://input'));

if(!$data || !$data->id || !$data->title){
    http_response_code(422);
    echo json_encode(
        array('message' => 'Error: missing required parameters id and title')
    );
    return;
}
$bookmark->setId($data->id);
$bookmark->setTitle($data->title);

if($bookmark->update()){
    echo json_encode(
        array('message' => 'bookmark was updated')
    );
}
else{
    echo json_encode(
        array('message' => 'bookmark was not updated')
    );
}