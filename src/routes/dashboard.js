var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController");

router.get("/obterProgressoGeral/:idUsuario", function (req, res) {
    dashboardController.obterProgressoGeral(req, res);
});

router.get("/obterProgressoTipos/:idUsuario", function (req, res) {
    dashboardController.obterProgressoTipos(req, res);
});

module.exports = router;
