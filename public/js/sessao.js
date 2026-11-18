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
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}
