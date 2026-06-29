<?php 

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


$data = json_decode(file_get_contents("php://input"), true);

$login = $data["login"];
$password = $data["password"];


if ($login ==="admin" && $password ==="2caba41d2fc2"){
    echo json_encode(["success" => true]);
}else{
    echo json_encode(["success" => false, "message" => "invalid Login or password"]);
}

?>