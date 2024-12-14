<?php

if($_SERVER['REQUEST_METHOD']!== 'DELETE'){
    header('Allow: DELETE');
    http_response_code(405);
    echo json_encode(
        array('message' => 'Method not allowed')
    );
    return;
}

header( 'Access-Control-Allow-Orlgln: *');
header( 'Content-Type: application/json');
header( 'Access-control-Allow-methods: DELETE');

include_once '../db/Database.php';
include_once '../models/Bookmark.php';

$database = new Database();
$dbConnection = $database->connect();

$bookmark = new Bookmark($dbConnection);

$data = json_decode(file_get_contents('php://input'));

if(!$data || !$data->id){
    http_response_code(422);
    echo json_encode(
        array('message' => 'Error: missing required parameter id')
    );
    return;
}
$bookmark->setId($data->id);

if($bookmark->delete()){
    echo json_encode(
        array('message' => 'bookmark was deleted')
    );
}
else{
    echo json_encode(
        array('message' => 'bookmark was not deleted')
    );
}