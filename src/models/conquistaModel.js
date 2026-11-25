var database = require("../database/config");

function carregarConquistasBD(capitulo) {
    var instrucaoSql = `
        SELECT idConquista, tipo, titulo, subtitulo, descricao, capitulo
        FROM conquista
        WHERE capitulo = ${capitulo};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function inserir(idUsuario, idConquista, status) {
    var instrucaoSql = `
        SELECT * FROM usuario_conquista WHERE fkUsuario = ${idUsuario} AND fkConquista = ${idConquista};
    `;

    return database.executar(instrucaoSql)
        .then(function (resultado) {
            if (resultado.length > 0) {
                instrucaoSql = `UPDATE usuario_conquista SET statusMarcado = ${status}, dtDesbloqueio = CURRENT_TIMESTAMP WHERE fkUsuario = ${idUsuario} AND fkConquista = ${idConquista};`;
            } else {
                instrucaoSql = `INSERT INTO usuario_conquista (fkUsuario, fkConquista, statusMarcado) VALUES (${idUsuario}, ${idConquista}, ${status});`;
            }
            return database.executar(instrucaoSql);
        })
        .catch(function (erro) {
            console.error("Erro no inserir:", erro);
        });
}

function listar(idUsuario) {
    var instrucaoSql = `
        SELECT c.idConquista, uc.statusMarcado
        FROM usuario_conquista uc
        JOIN conquista c ON c.idConquista = uc.fkConquista
        WHERE uc.fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterProgressoCapitulo(idUsuario, capitulo) {
    var instrucaoSql = `
        SELECT 
            COUNT(c.idConquista) AS total,
            COUNT(uc.fkConquista) AS coletados
        FROM conquista c
        LEFT JOIN usuario_conquista uc ON c.idConquista = uc.fkConquista 
            AND uc.fkUsuario = ${idUsuario} 
            AND uc.statusMarcado = 1
        WHERE c.capitulo = ${capitulo};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    carregarConquistasBD,
    inserir,
    listar,
    obterProgressoCapitulo
};
