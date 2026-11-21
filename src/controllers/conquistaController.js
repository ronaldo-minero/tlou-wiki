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

module.exports = {
    carregarConquistasBD,
    inserir,
    listar
};
