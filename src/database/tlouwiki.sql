DROP DATABASE IF EXISTS tlouwiki;
CREATE DATABASE IF NOT EXISTS tlouwiki;

USE tlouwiki;

DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    apelido VARCHAR(15) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) UNIQUE NOT NULL,
    dtCriacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuario (apelido, email, senha) VALUES
('Ronaldo Teste', 't@t', 't')

