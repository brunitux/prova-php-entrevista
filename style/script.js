// Criar novo usuário
function userCreate(userName, userEmail, userColor) {
	const ajax = new XMLHttpRequest();
	ajax.open("POST", "./Controller/insert.php", true);
	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.send(`userName=${userName}&userEmail=${userEmail}&userColor=${userColor}`);
    
	ajax.onreadystatechange = function() {
        // state 4 e o http.status 200, requisicao deu certo.
		if (ajax.readyState == 4 && ajax.status == 200) {
			const data = ajax.responseText; // retorno do php
            return;
		}
	}
}

// popular box de edição
function editar(userId) {
    const displayContainerBox = document.getElementById("userContainerBkg");
    displayContainerBox.style.display = "flex";
    document.getElementById("titleBox").innerText = "Editar usuário";
    const userName = document.getElementById("nameInput");
    const userEmail = document.getElementById("emailInput");
    const colorInput = document.getElementById("colorInput");
    const userIdInput = document.getElementById("userId");

    const ajax = new XMLHttpRequest();
    ajax.open("POST", "../Controller/infoUsers.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send(`userId=${userId}`);
    
    ajax.onreadystatechange = function() {
        // state 4 e o http.status 200, requisicao deu certo.
        if (ajax.readyState == 4 && ajax.status == 200) {
            const data = ajax.responseText;
            console.log(data);
            const valores = JSON.parse(data);

            document.getElementById("saveData").addEventListener("click", ()=>{
                alterUser();
            });

            userName.value = valores.name;
            userEmail.value = valores.email;
            colorInput.value = valores.color;
            userIdInput.value = valores.id;
        }
    }
}

function addUser() {
    const userName = document.getElementById("nameInput");
    const userEmail = document.getElementById("emailInput");
    const colorInput = document.getElementById("colorInput");
    const displayContainerBox = document.getElementById("userContainerBkg");

    displayContainerBox.style.display = "flex";
    colorInput.style.display = "none";
    document.getElementById("closeContainerBox").style.top = "-4.5rem";

    document.getElementById("titleBox").innerText = "Adicionar usuário";
    // salvar dados novo usuário
    document.getElementById("saveData").addEventListener("click", ()=>{
        userCreate(userName.value, userEmail.value);
    });
}
function alterUser() {
    const userName = document.getElementById("nameInput");
    const userEmail = document.getElementById("emailInput");
    const colorInput = document.getElementById("colorInput");
    const userId = document.getElementById("userId");
    const displayContainerBox = document.getElementById("userContainerBkg");

    displayContainerBox.style.display = "flex";

    const ajax = new XMLHttpRequest();
    ajax.open("POST", "../Controller/alter.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send(`userId=${userId.value}&colorId=${colorInput.value}&userName=${userName.value}&userEmail=${userEmail.value}`);
    
    ajax.onreadystatechange = function() {
        // state 4 e o http.status 200, requisicao deu certo.
        if (ajax.readyState == 4 && ajax.status == 200) {
            const data = ajax.responseText;
            console.log(data);
        }
    }
}
// deletar usuário
function deleteUser(userId) {
    const ajax = new XMLHttpRequest();
    ajax.open("POST", "../Controller/delete.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send(`userId=${userId}`);
    
    ajax.onreadystatechange = function() {
        // state 4 e o http.status 200, requisicao deu certo.
        if (ajax.readyState == 4 && ajax.status == 200) {
            const data = ajax.responseText;
            console.log(data);
        }
    }
}
// fechar box de dados
document.getElementById("closeContainerBox").addEventListener("click", ()=> {
    const userName = document.getElementById("nameInput");
    const userEmail = document.getElementById("emailInput");
    const colorInput = document.getElementById("colorInput");
    const displayContainerBox = document.getElementById("userContainerBkg");
    displayContainerBox.style.display = "none";
    document.getElementById("titleBox").innerText = "";
    userName.value = "";
    userEmail.value = "";
    colorInput.value = "1";
});
