var dashboardModel = require("../models/dashboardModel");

function obterProgressoGeral(req, res) {
    let idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("idUsuario está undefined!");
        return;
    }

    dashboardModel.obterProgressoGeral(idUsuario)
        .then(function (resultadoGeral) {
            let dadosGeral = resultadoGeral[0] || {};
            let totalItens = dadosGeral.totalItens || 0;
            let totalColetados = dadosGeral.totalColetados || 0;
            let porcentagem = totalItens > 0 ? Math.round((totalColetados / totalItens) * 100) : 0;

            dashboardModel.obterCapitulosConcluidos(idUsuario)
                .then(function (resultadoCapitulos) {
                    let capitulosConcluidos = 0;

                    for (let i = 0; i < resultadoCapitulos.length; i++) {
                        let cap = resultadoCapitulos[i];
                        if (cap.totalCapitulo > 0 && cap.coletadosCapitulo === cap.totalCapitulo) {
                            capitulosConcluidos++;
                        }
                    }

                    res.status(200).json({
                        totalItens: totalItens,
                        totalColetados: totalColetados,
                        porcentagem: porcentagem,
                        capitulosConcluidos: capitulosConcluidos,
                        totalCapitulos: 12
                    });
                })
                .catch(function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                });
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterProgressoTipos(req, res) {
    let idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("idUsuario está undefined!");
        return;
    }

    dashboardModel.obterProgressoTipos(idUsuario)
        .then(function (resultado) {
            let mapaDados = {};
            for (let i = 0; i < resultado.length; i++) {
                let item = resultado[i];
                mapaDados[item.tipo] = {
                    total: item.total || 0,
                    coletados: item.coletados || 0
                };
            }

            let ordemTipos = [
                { tipo: "Artefato", label: "Artefatos" },
                { tipo: "Pingente", label: "Pingentes" },
                { tipo: "Quadrinho", label: "Quadrinhos" },
                { tipo: "Manual", label: "Manuais" },
                { tipo: "Ferramenta", label: "Ferramentas" },
                { tipo: "Conversa", label: "Conversas" },
                { tipo: "Piada da Ellie", label: "Piadas da Ellie" },
                { tipo: "Porta de faca", label: "Portas de faca" },
                { tipo: "Cofre", label: "Cofres" }
            ];

            let listaFormatada = [];
            for (let i = 0; i < ordemTipos.length; i++) {
                let def = ordemTipos[i];
                let dadosTipo = mapaDados[def.tipo] || { total: 0, coletados: 0 };
                let porcentagem = dadosTipo.total > 0 ? Math.round((dadosTipo.coletados / dadosTipo.total) * 100) : 0;

                listaFormatada.push({
                    tipo: def.tipo,
                    label: def.label,
                    total: dadosTipo.total,
                    coletados: dadosTipo.coletados,
                    porcentagem: porcentagem
                });
            }

            res.status(200).json(listaFormatada);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterUltimosEncontrados(req, res) {
    let idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("idUsuario está undefined!");
        return;
    }

    dashboardModel.obterUltimosEncontrados(idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterProgressoCapitulos(req, res) {
    let idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("idUsuario está undefined!");
        return;
    }

    dashboardModel.obterCapitulosConcluidos(idUsuario)
        .then(function (resultado) {
            let mapaCapitulos = {};
            for (let i = 0; i < resultado.length; i++) {
                let cap = resultado[i];
                mapaCapitulos[cap.capitulo] = {
                    total: cap.totalCapitulo || 0,
                    coletados: cap.coletadosCapitulo || 0
                };
            }

            let listaCapitulos = [];
            for (let num = 1; num <= 12; num++) {
                let dados = mapaCapitulos[num] || { total: 0, coletados: 0 };
                let porcentagem = dados.total > 0 ? Math.round((dados.coletados / dados.total) * 100) : 0;

                listaCapitulos.push({
                    capitulo: num,
                    total: dados.total,
                    coletados: dados.coletados,
                    porcentagem: porcentagem
                });
            }

            res.status(200).json(listaCapitulos);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    obterProgressoGeral,
    obterProgressoTipos,
    obterUltimosEncontrados,
    obterProgressoCapitulos
};
