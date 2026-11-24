// sessão
function validarSessao() {
    let email = sessionStorage.EMAIL_USUARIO;
    let nome = sessionStorage.APELIDO_USUARIO;

    let elWebUsuario = document.getElementById("web_usuario");
    let elWebUsuarioNav = document.getElementById("web_usuario_nav");
    let elBUsuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        if (elWebUsuario != null) {
            elWebUsuario.innerHTML = nome;
        }
        if (elWebUsuarioNav != null) {
            elWebUsuarioNav.innerHTML = nome;
        }
        if (elBUsuario != null) {
            elBUsuario.innerHTML = nome;
        }
        configurarBotaoSpoiler();
    } else {
        window.location = "../login.html";
    }
}

function configurarBotaoSpoiler() {
    let btnSpoiler = document.querySelector(".modo-spoiler");

    if (btnSpoiler != null) {
        atualizarBotaoSpoiler();
        btnSpoiler.onclick = alternarModoSpoiler;
    }
}

function atualizarBotaoSpoiler() {
    let btnSpoiler = document.querySelector(".modo-spoiler");
    let ativo = sessionStorage.MODO_SPOILER == "true";

    if (btnSpoiler != null) {
        if (ativo) {
            btnSpoiler.classList.add("ativo");
        } else {
            btnSpoiler.classList.remove("ativo");
        }
    }
}

function alternarModoSpoiler() {
    let ativo = sessionStorage.MODO_SPOILER == "true";

    if (ativo) {
        sessionStorage.MODO_SPOILER = "false";
    } else {
        sessionStorage.MODO_SPOILER = "true";
    }

    atualizarBotaoSpoiler();

    if (typeof carregarConquistaBD == "function") {
        carregarConquistaBD();
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}
