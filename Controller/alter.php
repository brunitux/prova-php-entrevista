<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $colorId = $_POST["colorId"];

    $userId = $_POST["userId"];
    $userName = $_POST["userName"];
    $userEmail = $_POST["userEmail"];

    updateUser($userId, $userName, $userEmail);
    updateUserColor($userId, $colorId);

}
function updateUser($userId, $userName, $userEmail){
    include_once "../connection.php";
    $connection = new Connection();
    $connection->query("UPDATE users SET name='$userName', email='$userEmail' WHERE id='$userId'");

}
function updateUserColor($userId, $colorId){
    include_once "../connection.php";
    $connection = new Connection();
    $connection->query("UPDATE user_colors SET color_id='$colorId' WHERE user_id='$userId'");
}
?>