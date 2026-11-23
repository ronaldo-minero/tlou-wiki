let chartProgresso = null;

let listaCapitulos = [
    { numero: 1, nome: "Cidade Natal", estacao: "Prólogo", imagem: "cidade-natal.webp", totalItens: 0 },
    { numero: 2, nome: "A zona de quarentena", estacao: "Verão", imagem: "zona-de-quarentena.jpg", totalItens: 11 },
    { numero: 3, nome: "A periferia", estacao: "Verão", imagem: "periferia.jpg", totalItens: 12 },
    { numero: 4, nome: "A cidade de Bill", estacao: "Verão", imagem: "cidade-de-bill.png", totalItens: 11 },
    { numero: 5, nome: "Pittsburgh", estacao: "Verão", imagem: "pittsburgh.png", totalItens: 21 },
    { numero: 6, nome: "Os subúrbios", estacao: "Verão", imagem: "suburbios.jpg", totalItens: 15 },
    { numero: 7, nome: "Represa do Tommy", estacao: "Outono", imagem: "represa-de-tommy.jpg", totalItens: 8 },
    { numero: 8, nome: "A universidade", estacao: "Outono", imagem: "universidade.jpg", totalItens: 14 },
    { numero: 9, nome: "Resort à beira do lago", estacao: "Inverno", imagem: "resort-lago.jpg", totalItens: 12 },
    { numero: 10, nome: "Depósito de ônibus", estacao: "Primavera", imagem: "terminal-rodoviario.jpg", totalItens: 14 },
    { numero: 11, nome: "O laboratório dos Vagalumes", estacao: "Primavera", imagem: "laboratorio-vagalumes.jpg", totalItens: 5 },
    { numero: 12, nome: "Jackson", estacao: "Epílogo", imagem: "jackson.png", totalItens: 1 }
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
                        elCapitulos.innerHTML = `${concluidosFormatado} / 12 CAPÍTULOS CONCLUÍDOS`;
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
                    let elPItens = document.getElementById("p_itens_ultimo");
                    let elBtn = document.getElementById("btn_continuar_checklist");
                    let divCard = document.getElementById("div_card_ultimo");

                    if (elSpanEstacao) {
                        elSpanEstacao.innerHTML = `${numFormatado} / ${cap.estacao.toUpperCase()}`;
                    }
                    if (elH2Nome) {
                        elH2Nome.innerHTML = cap.nome.toUpperCase();
                    }
                    if (elPItens) {
                        elPItens.innerHTML = `${cap.totalItens} colecionáveis nesta etapa.`;
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

function carregarDashboard() {
    let idUsuario = sessionStorage.ID_USUARIO;
    if (!idUsuario) {
        return;
    }

    carregarProgressoGeral(idUsuario);
    carregarProgressoTipos(idUsuario);
    carregarUltimoCapitulo();
}
