var database = require("../database/config");

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT idUsuario, apelido, email, ultimoCapitulo FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(apelido, email, senha) {
    var instrucaoSql = `
        INSERT INTO usuario (apelido, email, senha, ultimoCapitulo) VALUES ('${apelido}', '${email}', '${senha}', 1);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarUltimoCapitulo(idUsuario, capitulo) {
    var instrucaoSql = `
        UPDATE usuario SET ultimoCapitulo = ${capitulo} WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterUltimoCapitulo(idUsuario) {
    var instrucaoSql = `
        SELECT ultimoCapitulo FROM usuario WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    atualizarUltimoCapitulo,
    obterUltimoCapitulo
};
