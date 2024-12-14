<?php

if($_SERVER['REQUEST_METHOD']!== 'GET'){
    header('Allow: GET');
    http_response_code(405);
    echo json_encode(
        array('message' => 'Method not allowed')
    );
    return;
}

header( 'Access-Control-Allow-Orlgln: *');
header( 'Content-Type: application/json');
header( 'Access-control-Allow-methods: GET');

include_once '../db/Database.php';
include_once '../models/Bookmark.php';

$database = new Database();
$dbConnection = $database->connect();

$bookmark = new Bookmark($dbConnection);

if(!isset($_GET['id'])){
    http_response_code(422);
    echo json_encode(
        array('message' => 'Error missing required query parameter id')
    );
    return;
}

$bookmark->setId($_GET['id']);
if($bookmark->readOne()){
    $result = array(
        'id' => $bookmark->getId(),
        'title' => $bookmark->getTitle(),
        'link' => $bookmark->getLink(),
        'dateAdded' => $bookmark->getDateAdded()
    );
    echo json_encode($result);
}
else{
    http_response_code(404);
    echo json_encode(
        array('message' => 'Error: No such bookmark')
    );
}