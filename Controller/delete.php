<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include_once "../connection.php";
    
    $userId = $_POST["userId"];

    // deletando usuário e suas relações
    $connection = new Connection();
    $connection->query("DELETE FROM users WHERE id='$userId'");

    $connection = new Connection();
    $connection->query("DELETE FROM user_colors WHERE user_id='$userId'");
}
?>