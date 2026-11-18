// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.APELIDO_USUARIO;

    if (email != null && nome != null) {
        web_usuario.innerHTML = nome;
        web_usuario_nav.innerHTML = nome;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}