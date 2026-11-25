var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController");

router.get("/obterProgressoGeral/:idUsuario", function (req, res) {
    dashboardController.obterProgressoGeral(req, res);
});

router.get("/obterProgressoTipos/:idUsuario", function (req, res) {
    dashboardController.obterProgressoTipos(req, res);
});

router.get("/obterUltimosEncontrados/:idUsuario", function (req, res) {
    dashboardController.obterUltimosEncontrados(req, res);
});

router.get("/obterProgressoCapitulos/:idUsuario", function (req, res) {
    dashboardController.obterProgressoCapitulos(req, res);
});

module.exports = router;
