<?php
// populando as tabelas com novo usuário
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        include_once "../connection.php";
        
        $userName = $_POST["userName"];
        $userEmail = $_POST["userEmail"];
        $connection = new Connection();
        
        $stmt = $connection->getConnection()->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
        $stmt->execute([$userName, $userEmail]);
        
        $userId = $connection->getConnection()->lastInsertId();
        
        $stmt = $connection->getConnection()->prepare("INSERT INTO user_colors (user_id, color_id) VALUES (?, ?)");
        $stmt->execute([$userId, '1']);
    } catch (Exception $e) {
        echo "Erro: " . $e->getMessage();
    }
}

