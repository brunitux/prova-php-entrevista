<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'connection.php';

$connection = new Connection();

$colors = $connection->query("SELECT id, name FROM colors");
$users = $connection->query("SELECT id, name, email FROM users ORDER BY id DESC");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Orbitron&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./style/style.css">
    <title>Home</title>
</head>
<body>
    <div class="painel">
        <form class="searchForm">
            <input type="text" id="search" class="search" name="q" placeholder="Pesquisar usuários">
        </form>
    </div>
    <div class="userList">
        <div class='infoTitle'>
            <a class='nome'>Nome</a>
            <a class='email'>Email</a>
            <div class='botoes'>
                <h3>Ações</h3>
            </div>
            <div class="addUser" onclick="addUser()">+</div>
        </div>
        <div class='userInfo' id="userInfo">
            <?php
                foreach($users as $user) {
                    echo("
                        <div class='info'>
                            <a class='nome'>$user->name</a>
                            <a class='email'>$user->email</a>
                            <div class='botoes'>
                                <button class='btn editar' onclick='editar(\"$user->id\")'>Editar</button>
                                <button class='btn excluir' onclick='deleteUser(\"$user->id\")'>Excluir</button>
                            </div>
                        </div>
                    ");
                }
            ?>
        </div>
    </div>
    <div class="userContainerBkg" id="userContainerBkg">
        <div class="userContainer">
            <h2 id="titleBox">Usuário</h2>
            <div class="close" id="closeContainerBox">X</div>
            <input type="text" id="nameInput" class="nameInput" name="name" placeholder="Nome">
            <input type="email" id="emailInput" class="emailInput" name="email" placeholder="Email">
            <input type="hidden" name="userId" id="userId">
            <select class="custom-select" name="colorInput" id="colorInput">
                <?php
                foreach ($colors as $color) {
                    echo("<option value='$color->id'");
                    if ($color->id == 1) {
                        echo(" selected");
                    }
                    echo(">$color->name</option>");
                }
                ?>
            </select>
            <button class="saveData" id="saveData">Salvar</button>
        </div>
    </div>
    <script src="./style/script.js"></script>
</body>
</html>