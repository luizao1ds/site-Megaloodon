
let botao = document.getElementById("botao")

botao.onclick = function(){ 
let Usuário = document.getElementById("Usuário")
let Senha = document.getElementById("Senha")
if (Usuário.value == "123" && Senha.value == "123") {
    window.location.href = "index_pagina_inicial.html";
}
else if (Usuário.value == "admin" && Senha.value == "1") {
    window.location.href = "index_admin.html";
}
else {
    alert ("Usuário ou Senha incorreto")
}

}

