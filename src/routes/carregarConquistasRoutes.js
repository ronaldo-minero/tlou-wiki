var express = require("express");
var router = express.Router();
var carregarConquistasController = require("../controllers/carregarConquistasController");

router.post("/carregarConquistasBD", function (req, res) {
    carregarConquistasController.carregarConquistaBD(req, res);
});

module.exports = router;