function carregarProgressoCapitulo(capitulo) {
    let idUsuario = sessionStorage.ID_USUARIO;

    if (idUsuario == undefined) {
        return;
    }

    fetch(`/conquistas/obterProgressoCapitulo/${idUsuario}/${capitulo}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    let elNumero = document.getElementById("div_progresso_numero");
                    let elPorcentagem = document.getElementById("span_progresso_porcentagem");
                    let elBarra = document.getElementById("div_barra_preenchida");
                    let elPendentes = document.getElementById("span_progresso_pendentes");

                    if (elNumero) {
                        elNumero.innerHTML = `${dados.coletados} / ${dados.total} itens`;
                    }

                    if (elPorcentagem) {
                        elPorcentagem.innerHTML = `${dados.porcentagem}% CONCLUÍDO`;
                    }

                    if (elBarra) {
                        elBarra.style.width = `${dados.porcentagem}%`;
                    }

                    if (elPendentes) {
                        elPendentes.innerHTML = `${dados.pendentes} ITENS PENDENTES`;
                    }
                });
            }
        })
        .catch(function (erro) {
            console.log("Erro ao carregar estatísticas do capítulo:", erro);
        });
}

function configurarChecks(capitulo) {
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
            }).then(function () {
                carregarProgressoCapitulo(capitulo);
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
            carregarProgressoCapitulo(capitulo);
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
