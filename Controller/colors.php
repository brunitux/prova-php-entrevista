<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userId = $_POST["userId"];
    include_once "../connection.php";
    
    $connection = new Connection();
    $users = $connection->query("SELECT * FROM users WHERE id='$userId'");
    $resultado = $connection->query("SELECT user_id, color_id FROM user_colors WHERE user_id='$userId'");

    $color = "";

    foreach ($resultado as $row) {
        $color = $row->color_id;
    }

    foreach($users as $user){
        echo('{"id": "'.$user->id.'", "name": "'.$user->name.'", "email": "'.$user->email.'", "color": "'.$color.'"}');
    }
}
?>
