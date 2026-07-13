<?php 
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

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
} catch (PDOException $e) {
    die("Could not connect. " . $e->getMessage());
}

$data = json_decode(file_get_contents("php://input"), true);
$categories = $data['categories'];
$userId = $_SESSION['user_id'];

try{
    $upsertSql= "INSERT INTO categories (id, user_id, name, monthly, goal)
                VALUES (:id, :user_id, :name, :monthly, :goal)
                ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                monthly = VALUES(monthly),
                goal = VALUES(goal) ";
    $stmt = $conn->prepare($upsertSql);

    $validIds = [];

    foreach($categories as $category){
        $isNew = $category['id'] <= 0;

        $stmt->execute([
            ':id' => $isNew ? null : $category['id'],
            ':user_id' => $userId,
            ':name' => $category['name'],
            ':monthly' => $category['monthly'],
            ':goal' => $category['goal'],
        ]);

        if ($isNew){
            $validIds[] = $conn->lastInsertId();
        } else {
            $validIds[] = $category['id'];
        }
    }

    if(!empty($validIds)){
    $placeholder = implode(',', array_fill(0, count($validIds), '?'));
    $deleteSql = "DELETE FROM categories WHERE user_id = ? AND id NOT IN ($placeholder)";
    $deleteStmt = $conn->prepare($deleteSql);
    $deleteStmt->execute(array_merge([$userId], $validIds));
    }else{
        $deleteStmt = $conn->prepare("DELETE FROM categories WHERE user_id = ?");
        $deleteStmt->execute([$userId]);
    }

    echo json_encode(["status" => "success"]);

}catch(PDOException $e){
    http_response_code(500);
    echo "Error: " . $e->getMessage();
}

?>