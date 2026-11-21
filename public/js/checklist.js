function configurarChecks() {
    let checks = document.querySelectorAll(".check-conquista");

    for (let i = 0; i < checks.length; i++) {
        checks[i].addEventListener("change", function () {
            let status = this.checked ? 1 : 0;
            let idUsuario = sessionStorage.ID_USUARIO;
            let idConquista = this.dataset.id;

            fetch("/conquistas/inserir", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    idUsuarioServer: idUsuario,
                    idConquistaServer: idConquista,
                    statusServer: status
                })
            });
        });
    }

    fetch(`/conquistas/listar/${sessionStorage.ID_USUARIO}`)
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            for (let i = 0; i < checks.length; i++) {
                let idConquista = checks[i].dataset.id;

                for (let j = 0; j < dados.length; j++) {
                    if (dados[j].idConquista == idConquista) {
                        checks[i].checked = dados[j].statusMarcado == 1;
                    }
                }
            }
        })
        .catch(function (erro) {
            console.log("Erro ao carregar checks:", erro);
        });
}

function salvarUltimoCapitulo(idCapitulo) {
    let idUsuario = sessionStorage.ID_USUARIO;

    if (idUsuario == undefined) {
        return;
    }

    fetch("/usuarios/atualizarUltimoCapitulo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuario: idUsuario,
            capitulo: idCapitulo
        })
    }).then(function (resposta) {
        if (!resposta.ok) {
            console.log("Erro ao salvar último capítulo no banco.");
        }
    }).catch(function (erro) {
        console.log("Erro ao salvar último capítulo:", erro);
    });
}
