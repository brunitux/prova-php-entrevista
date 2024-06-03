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
            // console.log(data);
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
            // console.log(data);
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
// barra de pesquisa
const search = document.getElementById("search");

search.addEventListener("input", ()=>{
    const filter = search.value.toUpperCase();

    const userInfoDiv = document.getElementById("userInfo");
    const userDivs = userInfoDiv.getElementsByClassName("info");

    // show/noshow conforme a pesquisa
    for (var i = 0; i < userDivs.length; i++) {
        var userName = userDivs[i].getElementsByClassName("nome")[0];
        if (userName.innerHTML.toUpperCase().indexOf(filter) > -1) {
            userDivs[i].style.display = "";
        } else {
            userDivs[i].style.display = "none";
        }
    }
});
function executarFuncao() {
    var links = document.querySelectorAll('.info .nome');
    
    links.forEach(function(link) {
        var id = link.id;
        // console.log("ID do link:", id);
        const idNew = id.replace('user', '');
        minhaFuncao(idNew, id);
    });
}

function minhaFuncao(id, originalId) {
    const ajax = new XMLHttpRequest();
    ajax.open("POST", "../Controller/colors.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send(`userId=${id}`);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            const data = ajax.responseText;
            const valores = JSON.parse(data);

            let colorClass;
            switch (valores.color) {
                case "1":
                    colorClass = "azul";
                    break;
                case "2":
                    colorClass = "vermelho";
                    break;
                case "3":
                    colorClass = "amarelo";
                    break;
                case "4":
                    colorClass = "verde";
                    break;
            }
            if (colorClass) {
                document.getElementById(originalId).classList.add(colorClass);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", executarFuncao);