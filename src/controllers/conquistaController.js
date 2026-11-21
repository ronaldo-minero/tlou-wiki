var conquistaModel = require("../models/conquistaModel");

function carregarConquistasBD(req, res) {
    let capitulo = req.body.capitulo;

    if (capitulo == undefined) {
        res.status(400).send("Capitulo está undefined!");
    } else {
        conquistaModel.carregarConquistasBD(capitulo)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function inserir(req, res) {
    let idUsuario = req.body.idUsuarioServer;
    let idConquista = req.body.idConquistaServer;
    let status = req.body.statusServer;

    if (idUsuario == undefined || idConquista == undefined || status == undefined) {
        res.status(400).send("Dados undefined");
        return;
    } else {
        conquistaModel.inserir(idUsuario, idConquista, status)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function listar(req, res) {
    let idUsuario = req.params.idUsuario;

    conquistaModel.listar(idUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterProgressoCapitulo(req, res) {
    let idUsuario = req.params.idUsuario;
    let capitulo = req.params.capitulo;

    if (idUsuario == undefined || capitulo == undefined) {
        res.status(400).send("idUsuario ou capitulo está undefined!");
        return;
    }

    conquistaModel.obterProgressoCapitulo(idUsuario, capitulo)
        .then(function (resultado) {
            let dados = resultado[0] || {};
            let total = dados.total || 0;
            let coletados = dados.coletados || 0;
            let pendentes = total - coletados;
            let porcentagem = total > 0 ? Math.round((coletados / total) * 100) : 100;

            res.status(200).json({
                total: total,
                coletados: coletados,
                pendentes: pendentes,
                porcentagem: porcentagem
            });
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    carregarConquistasBD,
    inserir,
    listar,
    obterProgressoCapitulo
};
