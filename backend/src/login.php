<?php 
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
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
    die("Could not connect. " . $e->getMessage());
}

$data = json_decode(file_get_contents("php://input"), true);

try {
    $sql="SELECT password FROM users WHERE username = :login;";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':login', $data['login']);
    $stmt->execute();
    $row = $stmt->fetch();

    if ($row && password_verify($data['password'], $row['password'])) {
        $_SESSION['user_id'] = $row['id'];
        $_SESSION['username'] = $data['login']; 
        echo json_encode(["success" => true, "username" => $_SESSION['username']] );
    } else {
        echo json_encode(["success" => false, "message" => "Invalid login or password"]);
    }
}catch(PDOException $e){
    echo json_encode(["success" => false, "message" =>"Error: " . $e->getMessage()]);
}

$conn = null;

?>