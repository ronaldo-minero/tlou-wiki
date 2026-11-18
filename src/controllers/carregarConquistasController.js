var carregarConquistasModel = require("../models/carregarConquistasModel");

function carregarConquistaBD(req, res) {

    let capitulo = req.body.capitulo;

    carregarConquistasModel.carregarConquistasBD(capitulo)
    .then(
        function(resultado) {
            res.status(200).json(resultado)
        }
    ).catch(function(erro) {
                    res.status(500).json(erro.sqlMessage)
    })
}


module.exports = {
    carregarConquistaBD
}