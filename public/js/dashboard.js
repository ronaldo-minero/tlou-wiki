let chartProgresso = null;

let listaCapitulos = [
    { numero: 1, nome: "Cidade Natal", estacao: "Prólogo", imagem: "cidade-natal.webp" },
    { numero: 2, nome: "A zona de quarentena", estacao: "Verão", imagem: "zona-de-quarentena.jpg" },
    { numero: 3, nome: "A periferia", estacao: "Verão", imagem: "periferia.jpg" },
    { numero: 4, nome: "A cidade de Bill", estacao: "Verão", imagem: "cidade-de-bill.png" },
    { numero: 5, nome: "Pittsburgh", estacao: "Verão", imagem: "pittsburgh.png" },
    { numero: 6, nome: "Os subúrbios", estacao: "Verão", imagem: "suburbios.jpg" },
    { numero: 7, nome: "Represa do Tommy", estacao: "Outono", imagem: "represa-de-tommy.jpg" },
    { numero: 8, nome: "A universidade", estacao: "Outono", imagem: "universidade.jpg" },
    { numero: 9, nome: "Resort à beira do lago", estacao: "Inverno", imagem: "resort-lago.jpg" },
    { numero: 10, nome: "Depósito de ônibus", estacao: "Primavera", imagem: "terminal-rodoviario.jpg" },
    { numero: 11, nome: "O laboratório dos Vagalumes", estacao: "Primavera", imagem: "laboratorio-vagalumes.jpg" },
    { numero: 12, nome: "Jackson", estacao: "Epílogo", imagem: "jackson.png" }
];

function inicializarGrafico(porcentagem) {
    const ctx = document.getElementById('graficoProgresso');
    if (!ctx) return;

    if (chartProgresso) {
        chartProgresso.data.datasets[0].data = [porcentagem, 100 - porcentagem];
        chartProgresso.update();
        return;
    }

    chartProgresso = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [porcentagem, 100 - porcentagem],
                backgroundColor: ['#cca248', '#1c221f'],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '90%',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            }
        }
    });
}

function carregarProgressoGeral(idUsuario) {
    fetch(`/dashboard/obterProgressoGeral/${idUsuario}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    let elPorcentagem = document.getElementById("h2_porcentagem_amostra");
                    let elItens = document.getElementById("strong_itens_amostra");
                    let elCapitulos = document.getElementById("span_capitulos_concluidos");

                    if (elPorcentagem) {
                        elPorcentagem.innerHTML = `${dados.porcentagem}%`;
                    }
                    if (elItens) {
                        elItens.innerHTML = `${dados.totalColetados} de ${dados.totalItens}`;
                    }
                    if (elCapitulos) {
                        let concluidosFormatado = dados.capitulosConcluidos < 10 ? "0" + dados.capitulosConcluidos : "" + dados.capitulosConcluidos;
                        elCapitulos.innerHTML = `${concluidosFormatado} / ${dados.totalCapitulos} CAPÍTULOS CONCLUÍDOS`;
                    }

                    inicializarGrafico(dados.porcentagem);
                });
            } else {
                console.log("Erro ao obter progresso geral da dashboard");
            }
        })
        .catch(function (erro) {
            console.log("Erro no fetch progresso geral:", erro);
        });
}

function carregarProgressoTipos(idUsuario) {
    fetch(`/dashboard/obterProgressoTipos/${idUsuario}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (listaTipos) {
                    let container = document.getElementById("div_lista_tipos");
                    if (!container) return;

                    let html = "";
                    for (let i = 0; i < listaTipos.length; i++) {
                        let item = listaTipos[i];
                        html += `
                        <div class="tipo">
                            <div class="tipo-topo">
                                <p>${item.label}</p>
                                <span>${item.coletados}/${item.total}</span>
                            </div>
                            <div class="barra">
                                <div class="preenchido" style="width: ${item.porcentagem}%"></div>
                            </div>
                        </div>
                        `;
                    }
                    container.innerHTML = html;
                });
            } else {
                console.log("Erro ao obter progresso por tipos da dashboard");
            }
        })
        .catch(function (erro) {
            console.log("Erro no fetch progresso tipos:", erro);
        });
}

function carregarUltimoCapitulo() {
    let idUsuario = sessionStorage.ID_USUARIO;

    if (idUsuario == undefined) {
        return;
    }

    fetch(`/usuarios/obterUltimoCapitulo/${idUsuario}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    let num = dados.ultimoCapitulo || 1;
                    let cap = listaCapitulos[num - 1];
                    let numFormatado = num < 10 ? "0" + num : "" + num;

                    let elSpanEstacao = document.getElementById("span_estacao_ultimo");
                    let elH2Nome = document.getElementById("h2_nome_ultimo");
                    let elBtn = document.getElementById("btn_continuar_checklist");
                    let divCard = document.getElementById("div_card_ultimo");

                    if (elSpanEstacao) {
                        elSpanEstacao.innerHTML = `${numFormatado} / ${cap.estacao.toUpperCase()}`;
                    }
                    if (elH2Nome) {
                        elH2Nome.innerHTML = cap.nome.toUpperCase();
                    }
                    if (elBtn) {
                        elBtn.onclick = function () {
                            window.location.href = `../capitulos/capitulo-${numFormatado}.html`;
                        };
                    }
                    if (divCard) {
                        divCard.style.backgroundImage = `linear-gradient(180deg, rgba(12, 14, 13, 0.35) 0%, rgba(12, 14, 13, 0.92) 85%), url('../assets/${cap.imagem}')`;
                    }
                });
            } else {
                console.log("Erro ao carregar último capítulo.");
            }
        })
        .catch(function (erro) {
            console.log("Erro ao buscar último capítulo:", erro);
        });
}

function carregarUltimosEncontrados(idUsuario) {
    fetch(`/dashboard/obterUltimosEncontrados/${idUsuario}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (lista) {
                    let container = document.getElementById("div_lista_ultimos");
                    if (!container) return;

                    if (lista.length == 0) {
                        container.innerHTML = `
                            <div class="item">
                                <div class="item-esquerda">
                                    <h4>Nenhum colecionável encontrado ainda</h4>
                                    <span class="label">MARQUE ITENS NOS CAPÍTULOS PARA VER SEU HISTÓRICO</span>
                                </div>
                            </div>
                        `;
                        return;
                    }

                    let html = "";
                    for (let i = 0; i < lista.length; i++) {
                        let item = lista[i];
                        let cap = listaCapitulos[item.capitulo - 1];
                        let nomeCap = cap ? cap.nome.toUpperCase() : `CAPÍTULO ${item.capitulo}`;

                        html += `
                            <div class="item">
                                <div class="item-esquerda">
                                    <h4>${item.titulo}</h4>
                                    <span class="label">${nomeCap} • ${item.tipo.toUpperCase()}</span>
                                </div>
                                <span class="tempo">${item.dataFormatada}</span>
                            </div>
                        `;
                    }
                    container.innerHTML = html;
                });
            } else {
                console.log("Erro ao carregar últimos encontrados.");
            }
        })
        .catch(function (erro) {
            console.log("Erro ao buscar últimos encontrados:", erro);
        });
}

function carregarProgressoCapitulos(idUsuario) {
    fetch(`/dashboard/obterProgressoCapitulos/${idUsuario}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (capitulos) {
                    for (let i = 0; i < capitulos.length; i++) {
                        let cap = capitulos[i];
                        let elItens = document.getElementById(`span_itens_cap_${cap.capitulo}`);
                        let elBarra = document.getElementById(`div_barra_cap_${cap.capitulo}`);

                        if (elItens) {
                            let textoItem = cap.total == 1 ? "item" : "itens";
                            elItens.innerHTML = `${cap.coletados}/${cap.total} ${textoItem}`;
                        }

                        if (elBarra) {
                            elBarra.style.width = `${cap.porcentagem}%`;
                        }
                    }
                });
            } else {
                console.log("Erro ao carregar progresso dos capítulos.");
            }
        })
        .catch(function (erro) {
            console.log("Erro ao buscar progresso dos capítulos:", erro);
        });
}

function carregarDashboard() {
    let idUsuario = sessionStorage.ID_USUARIO;
    if (!idUsuario) {
        return;
    }

    carregarProgressoGeral(idUsuario);
    carregarProgressoTipos(idUsuario);
    carregarProgressoCapitulos(idUsuario);
    carregarUltimoCapitulo();
    carregarUltimosEncontrados(idUsuario);
}
