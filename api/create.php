<?php

if($_SERVER['REQUEST_METHOD']!== 'POST'){
    header('Allow: POST');
    http_response_code(405);
    echo json_encode(
        array('message' => 'Method not allowed')
    );
    return;
}

header( 'Access-Control-Allow-Origin: *');
header( 'Content-Type: application/json');
header( 'Access-control-Allow-methods: POST');

include_once '../db/Database.php';
include_once '../models/Bookmark.php';

$database = new Database();
$dbConnection = $database->connect();

$bookmark = new Bookmark($dbConnection);
$data = json_decode(file_get_contents('php://input'), true);
if(!$data || !isset($data['title']) || !isset($data['link'])){
    http_response_code(422);
    echo json_encode(
        array('message' => 'Error missing required parameter task in the JSON body')
    );
    return;
}

$bookmark->setTitle($data['title']);
$bookmark->setLink($data['link']);

    if($bookmark->create()){
        echo json_encode(
            array('message' => 'A bookmark was created')
        );
    }
    else{
        echo json_encode(
            array('message' => 'Error: no bookmark was created')
        );
    }