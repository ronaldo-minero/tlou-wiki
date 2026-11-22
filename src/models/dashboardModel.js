var database = require("../database/config");

function obterProgressoGeral(idUsuario) {
    var instrucaoSql = `
        SELECT 
            COUNT(c.idConquista) AS totalItens,
            COUNT(uc.fkConquista) AS totalColetados
        FROM conquista c
        LEFT JOIN usuario_conquista uc 
            ON c.idConquista = uc.fkConquista 
            AND uc.fkUsuario = ${idUsuario} 
            AND uc.statusMarcado = 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterCapitulosConcluidos(idUsuario) {
    var instrucaoSql = `
        SELECT 
            c.capitulo,
            COUNT(c.idConquista) AS totalCapitulo,
            COUNT(uc.fkConquista) AS coletadosCapitulo
        FROM conquista c
        LEFT JOIN usuario_conquista uc 
            ON c.idConquista = uc.fkConquista 
            AND uc.fkUsuario = ${idUsuario} 
            AND uc.statusMarcado = 1
        GROUP BY c.capitulo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterProgressoTipos(idUsuario) {
    var instrucaoSql = `
        SELECT 
            c.tipo,
            COUNT(c.idConquista) AS total,
            COUNT(uc.fkConquista) AS coletados
        FROM conquista c
        LEFT JOIN usuario_conquista uc 
            ON c.idConquista = uc.fkConquista 
            AND uc.fkUsuario = ${idUsuario} 
            AND uc.statusMarcado = 1
        GROUP BY c.tipo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obterProgressoGeral,
    obterCapitulosConcluidos,
    obterProgressoTipos
};
