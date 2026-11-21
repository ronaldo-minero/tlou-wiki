var express = require("express");
var router = express.Router();
var conquistaController = require("../controllers/conquistaController");

router.post("/carregarConquistasBD", function (req, res) {
    conquistaController.carregarConquistasBD(req, res);
});

router.post("/inserir", function (req, res) {
    conquistaController.inserir(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    conquistaController.listar(req, res);
});

module.exports = router;
