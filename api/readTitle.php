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

if(!isset($_GET['title'])){
    http_response_code(422);
    echo json_encode(
        array('message' => 'Error missing required query parameter title')
    );
    return;
}

$bookmark->setTitle($_GET['title']);

$result = $bookmark->readTitle();
if(!empty($result)){
    echo json_encode($result);
}
else{
    http_response_code(404);
    echo json_encode(
        array('message' => 'Error: No such bookmark')
    );
}

