<?php 
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Not logged in"]);
    exit();
}

$servername = getenv('DB_HOST');
$username = getenv('DB_USER');
$password = getenv('DB_PASSWORD');
$dbname = getenv('DB_NAME');

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e){
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed", "details" => $e->getMessage()]);
    exit();
}


try {
    $sqlCheck="SELECT id, name, monthly, goal  FROM categories WHERE user_id = :id;";
    $stmt = $conn->prepare($sqlCheck);
    $stmt->bindParam(':id', $_SESSION['user_id']);
    $stmt->execute();
    $categories_list = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!$categories_list) {
        $categories_list = [];
    }

    echo json_encode(["categories" => $categories_list]);
    
}catch(PDOException $e){
    http_response_code(500);
    echo json_encode(["error" => "Query failed", "details" => $e->getMessage()]);
}

?>