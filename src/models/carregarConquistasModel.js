var database = require("../database/config")

function carregarConquistasBD(capitulo) {
        console.log(`Acessando as conquistas no capitulo ${capitulo}`)
        var instrucaoSql = `
            SELECT idConquista, tipo, titulo, subtitulo, descricao FROM conquista 
            WHERE capitulo = ${capitulo};
        `;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}

module.exports = {
    carregarConquistasBD
};