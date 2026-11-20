DROP DATABASE IF EXISTS tlouwiki;
CREATE DATABASE tlouwiki;
USE tlouwiki;

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    apelido VARCHAR(45) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    spoiler TINYINT DEFAULT 0,
    ultimoCapitulo INT DEFAULT 1,
    dtCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_spoiler CHECK (spoiler IN (0, 1)),
    CONSTRAINT chk_ultimoCapitulo CHECK (ultimoCapitulo BETWEEN 1 AND 12)
);

CREATE TABLE conquista (
    idConquista INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(30) NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    subtitulo VARCHAR(150),
    descricao VARCHAR(255) NOT NULL,
    capitulo INT NOT NULL,
    CONSTRAINT chk_tipo CHECK (tipo IN (
        'Artefato', 
        'Pingente', 
        'Quadrinho', 
        'Manual', 
        'Conversa', 
        'Porta de faca', 
        'Ferramenta', 
        'Cofre', 
        'Piada da Ellie'
    )),
    CONSTRAINT chk_capitulo CHECK (capitulo BETWEEN 1 AND 12)
);

CREATE TABLE usuario_conquista (
    fkUsuario INT NOT NULL,
    fkConquista INT NOT NULL,
    statusMarcado TINYINT NOT NULL DEFAULT 0,
    dtDesbloqueio DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (fkUsuario, fkConquista),
    CONSTRAINT fk_uc_usuario FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario) ON DELETE CASCADE,
    CONSTRAINT fk_uc_conquista FOREIGN KEY (fkConquista) REFERENCES conquista(idConquista) ON DELETE CASCADE,
    CONSTRAINT chk_statusMarcado CHECK (statusMarcado IN (0, 1))
);

INSERT INTO usuario (apelido, email, senha, spoiler, ultimoCapitulo) VALUES
('Joel Miller', 'joel@tlou.com', '123456', 0, 4),
('Ellie Williams', 'ellie@tlou.com', '123456', 1, 1),
('Ronaldo Teste', 't@t', 't', 0, 1);

INSERT INTO conquista (capitulo, tipo, titulo, subtitulo, descricao) VALUES
(2, 'Artefato', 'Aviso de Toque de Recolher', 'Zona de Quarentena', 'No mural de avisos perto do posto de controle, logo após a primeira cutscene.'),
(2, 'Artefato', 'Panfleto dos Vagalumes', 'Zona de Quarentena', 'No chão da rua, perto do local do atentado dos Vagalumes.'),
(2, 'Artefato', 'Nota de Racionamento', 'Zona de Quarentena', 'Na fila de distribuição de rações, sobre uma mesa.'),
(2, 'Artefato', 'Mapa da Z.Q. de Boston', 'Zona de Quarentena', 'Dentro do esconderijo de Joel e Tess, na parede.'),
(2, 'Artefato', 'Nota de Contrabando', 'Zona de Quarentena', 'No túnel secreto usado para sair da Z.Q.'),
(2, 'Artefato', 'Crachá Militar', 'Zona de Quarentena', 'Junto a um corpo no prédio abandonado, fora do muro.'),
(2, 'Pingente', 'Pingente de Vagalume #1', 'Zona de Quarentena', 'Fora do muro, pendurado numa árvore — derrube com um tijolo ou garrafa.'),
(2, 'Conversa', 'Tess — sobre Robert', 'Zona de Quarentena', 'Fale com Tess enquanto atravessam a área do mercado.'),
(2, 'Conversa', 'Tess — no posto de controle', 'Zona de Quarentena', 'Aguarde e interaja com Tess antes de mostrar os documentos.'),
(2, 'Conversa', 'Tess — fora do muro', 'Zona de Quarentena', 'Após descer do prédio, aproxime-se de Tess perto da janela.'),
(2, 'Conversa', 'Marlene — sobre os Vagalumes', 'Zona de Quarentena', 'Antes de sair do esconderijo dos Vagalumes, fale com Marlene.');

INSERT INTO conquista (capitulo, tipo, titulo, subtitulo, descricao) VALUES
(3, 'Artefato', 'Nota para Derek', 'Periferia', 'Na drogaria, sobre o balcão dos fundos.'),
(3, 'Artefato', 'Mapa do Centro', 'Periferia', 'No prédio de escritórios, primeira sala à esquerda.'),
(3, 'Artefato', 'Diário do Sobrevivente', 'Periferia', 'No arranha-céu inclinado, perto da escada de emergência.'),
(3, 'Artefato', 'Nota de Evacuação', 'Periferia', 'Entrada do museu, junto às barricadas.'),
(3, 'Artefato', 'Carta de Despedida', 'Periferia', 'Museu, 2º andar, sala com o teto desabado.'),
(3, 'Artefato', 'Nota do Posto Avançado', 'Periferia', 'No posto militar abandonado após o metrô.'),
(3, 'Artefato', 'Panfleto de Evacuação', 'Periferia', 'Rua alagada, sobre um carro capotado.'),
(3, 'Artefato', 'Nota sobre os Estalados', 'Periferia', 'No túnel do metrô, junto a uma mochila.'),
(3, 'Artefato', 'Carteira Antiga', 'Periferia', 'Corpo dentro do ônibus tombado.'),
(3, 'Artefato', 'Ordens dos Vagalumes', 'Periferia', 'Capitólio, perto dos corpos dos Vagalumes.'),
(3, 'Artefato', 'Relatório de Patrulha', 'Periferia', 'Capitólio, mesa na sala lateral.'),
(3, 'Pingente', 'Pingente de Vagalume #2', 'Periferia', 'Telhado da drogaria, canto junto ao parapeito.'),
(3, 'Pingente', 'Pingente de Vagalume #3', 'Periferia', 'Museu, pendurado numa viga do salão principal.'),
(3, 'Pingente', 'Pingente de Vagalume #4', 'Periferia', 'Do lado de fora do Capitólio, na fonte seca.'),
(3, 'Manual', 'Manual — Faca: Amolação', 'Periferia', 'Atrás da porta de shiv da drogaria.'),
(3, 'Porta de faca', 'Porta de Shiv — Drogaria', 'Periferia', 'Nos fundos da drogaria; contém suprimentos e o manual.'),
(3, 'Porta de faca', 'Porta de Shiv — Metrô', 'Periferia', 'Plataforma do metrô, lado direito antes da água.'),
(3, 'Conversa', 'Tess — sobre a rota', 'Periferia', 'Logo após sair da Z.Q., fale com Tess.'),
(3, 'Conversa', 'Ellie — primeira vez fora', 'Periferia', 'No prédio alto, quando Ellie olha a cidade pela janela.'),
(3, 'Conversa', 'Ellie — sobre o museu', 'Periferia', 'Antes de entrar no museu, aguarde o comentário dela.'),
(3, 'Conversa', 'Ellie — sobre os estaladores', 'Periferia', 'Após o primeiro encontro, fale com Ellie no corredor.'),
(3, 'Conversa', 'Ellie — no Capitólio', 'Periferia', 'Na escadaria externa, interaja com Ellie.');

INSERT INTO conquista (capitulo, tipo, titulo, subtitulo, descricao) VALUES
(4, 'Artefato', 'Mapa de Bill', 'A Cidade de Bill', 'No esconderijo de Bill (igreja), sobre a mesa de planejamento.'),
(4, 'Artefato', 'Lista de Suprimentos', 'A Cidade de Bill', 'Porão da igreja, presa no quadro de avisos.'),
(4, 'Artefato', 'Panfleto ''Os Infectados''', 'A Cidade de Bill', 'Na rua principal, dentro da caminhonete abandonada.'),
(4, 'Artefato', 'Nota da Armadilha', 'A Cidade de Bill', 'Perto do fio da primeira armadilha de Bill.'),
(4, 'Artefato', 'Diário do Morador', 'A Cidade de Bill', 'Casa à direita da barricada, quarto do 2º andar.'),
(4, 'Artefato', 'Nota do Bar', 'A Cidade de Bill', 'No bar, atrás do balcão.'),
(4, 'Artefato', 'Calendário Marcado', 'A Cidade de Bill', 'Cozinha da casa com o gerador.'),
(4, 'Artefato', 'Carta de Frank', 'A Cidade de Bill', 'Na casa no fim do bairro — a despedida do parceiro de Bill.'),
(4, 'Artefato', 'Nota da Escola', 'A Cidade de Bill', 'Corredor da escola, junto aos armários.'),
(4, 'Pingente', 'Pingente de Vagalume #5', 'A Cidade de Bill', 'Pendurado na placa da entrada da cidade.'),
(4, 'Pingente', 'Pingente de Vagalume #6', 'A Cidade de Bill', 'Cemitério atrás da igreja, junto a uma lápide.'),
(4, 'Pingente', 'Pingente de Vagalume #7', 'A Cidade de Bill', 'Quintal da casa com a caminhonete, na árvore.'),
(4, 'Quadrinho', 'Savage Starlight: Termination Shock', 'A Cidade de Bill', 'Quarto de adolescente na casa perto da escola.'),
(4, 'Manual', 'Manual — Kit Médico: Talas', 'A Cidade de Bill', 'Porão da igreja, na prateleira de suprimentos.'),
(4, 'Manual', 'Manual — Faca: Reforço', 'A Cidade de Bill', 'Na casa segura de Bill, perto do arsenal.'),
(4, 'Porta de faca', 'Porta de Shiv — Loja da Rua Principal', 'A Cidade de Bill', 'Lado esquerdo da rua principal; suprimentos raros dentro.'),
(4, 'Ferramenta', 'Ferramentas — Nível 2', 'A Cidade de Bill', 'Na garagem, perto da bancada onde o carro é consertado.'),
(4, 'Cofre', 'Cofre de Bill', 'A Cidade de Bill', 'Porão da igreja; a combinação está anotada na Lista de Suprimentos.'),
(4, 'Piada da Ellie', 'Sessão de piadas — livro ''Sem Trocadilhos''', 'A Cidade de Bill', 'No caminhão, Ellie testa as primeiras piadas do livro que encontrou.'),
(4, 'Conversa', 'Ellie — sobre Bill', 'A Cidade de Bill', 'Após conhecer Bill, fale com Ellie na igreja.'),
(4, 'Conversa', 'Bill — sobre armadilhas', 'A Cidade de Bill', 'Enquanto Bill desarma o arame, interaja com ele.'),
(4, 'Conversa', 'Ellie — a revista', 'A Cidade de Bill', 'No caminhão, Ellie mostra o ''achado'' da casa de Bill.'),
(4, 'Conversa', 'Bill — sobre Frank', 'A Cidade de Bill', 'Depois da casa no fim do bairro, fale com Bill.'),
(4, 'Conversa', 'Ellie — sobre dirigir', 'A Cidade de Bill', 'Antes de empurrar o carro, converse com Ellie.');

INSERT INTO conquista (capitulo, tipo, titulo, subtitulo, descricao) VALUES
(5, 'Artefato', 'Diário do Caçador', 'Pittsburgh', 'Loja onde ocorre a emboscada, atrás do caixa.'),
(5, 'Artefato', 'Nota da Emboscada', 'Pittsburgh', 'Posto de pedágio dos caçadores, sobre a mesa.'),
(5, 'Artefato', 'Mapa do Hotel', 'Pittsburgh', 'Recepção do hotel, no balcão.'),
(5, 'Artefato', 'Livro-Razão do Hotel', 'Pittsburgh', 'Escritório atrás da recepção.'),
(5, 'Artefato', 'Cartão-Chave do Hotel', 'Pittsburgh', 'Porão do hotel, sala de segurança perto do gerador (item de história).'),
(5, 'Artefato', 'Nota do Julgamento', 'Pittsburgh', 'Suite 3000, sala de conferências 302, no canto.'),
(5, 'Artefato', 'Nota de Fuga', 'Pittsburgh', 'Apartamento após conhecer Henry e Sam, no quarto.'),
(5, 'Artefato', 'Lista de Vigias', 'Pittsburgh', 'Prédio dos caçadores, junto ao rádio.'),
(5, 'Artefato', 'Carta ao Irmão', 'Pittsburgh', 'Loja de brinquedos, atrás da estante caída.'),
(5, 'Artefato', 'Diário da Mãe', 'Pittsburgh', 'Apartamento do 3º andar com o berço.'),
(5, 'Artefato', 'Nota do Arsenal', 'Pittsburgh', 'Depósito de armas dos caçadores.'),
(5, 'Artefato', 'Rota do Comboio', 'Pittsburgh', 'Caminhão blindado abandonado, no painel.'),
(5, 'Artefato', 'Nota da Ponte', 'Pittsburgh', 'Barricada perto da ponte, presa num caixote.'),
(5, 'Artefato', 'Bilhete de Despedida', 'Pittsburgh', 'Livraria, mesa dos fundos.'),
(5, 'Artefato', 'Nota do Esconderijo', 'Pittsburgh', 'Casa segura de Henry e Sam, na parede de planos.'),
(5, 'Pingente', 'Pingente de Vagalume #8 — Colby Reed', 'Pittsburgh', 'Hotel, banheiro feminino após a queda da escada, no box do canto.'),
(5, 'Pingente', 'Pingente de Vagalume #9 — Lucas Rios', 'Pittsburgh', 'Banheiro à esquerda antes da Suite 3000 — pegue antes de encontrar Henry.'),
(5, 'Pingente', 'Pingente de Vagalume #10', 'Pittsburgh', 'No mastro de bandeira do pátio entre os prédios.'),
(5, 'Quadrinho', 'Savage Starlight: Accretion', 'Pittsburgh', 'Hotel — após reencontrar Ellie, atravesse a sacada pela borda; mesa de centro.'),
(5, 'Quadrinho', 'Savage Starlight: Deep Phase', 'Pittsburgh', 'Quarto 201, dentro do quarto dos fundos (atrás da porta de shiv).'),
(5, 'Quadrinho', 'Savage Starlight: Antiparticles', 'Pittsburgh', 'Loja de brinquedos, prateleira baixa perto da vitrine.'),
(5, 'Manual', 'Manual — Corpo a Corpo: Nós', 'Pittsburgh', 'Hotel, corredor após o banheiro, sobre uma escrivaninha.'),
(5, 'Manual', 'Manual — Construção de Molotov', 'Pittsburgh', 'Cozinha do apartamento, após a cutscene com Henry e Sam.'),
(5, 'Porta de faca', 'Porta de Shiv — Livraria', 'Pittsburgh', 'Fundos da livraria, ao lado da escada.'),
(5, 'Porta de faca', 'Porta de Shiv — Hotel', 'Pittsburgh', 'Porão do hotel, corredor alagado.'),
(5, 'Porta de faca', 'Porta de Shiv — Quarto 201', 'Pittsburgh', 'Descendo as escadas após conhecer Henry e Sam; quadrinho dentro.'),
(5, 'Porta de faca', 'Porta de Shiv — Loja de Penhores', 'Pittsburgh', 'Rua lateral antes da ponte.'),
(5, 'Ferramenta', 'Ferramentas — Nível 3', 'Pittsburgh', 'Depósito dos caçadores, na bancada do 2º andar.'),
(5, 'Cofre', 'Cofre do Hotel', 'Pittsburgh', 'Atrás da recepção; a combinação está no Livro-Razão do Hotel.'),
(5, 'Conversa', 'Ellie — sobre os caçadores', 'Pittsburgh', 'Após a emboscada, fale com Ellie no beco.'),
(5, 'Conversa', 'Ellie — o assovio', 'Pittsburgh', 'Hotel, saguão: Ellie tenta aprender a assoviar.'),
(5, 'Conversa', 'Ellie — no hotel', 'Pittsburgh', 'Antes de subir a escada montada, interaja com Ellie.'),
(5, 'Conversa', 'Henry — o plano', 'Pittsburgh', 'Casa segura, fale com Henry junto ao mapa.'),
(5, 'Conversa', 'Sam — brinquedo', 'Pittsburgh', 'Loja de brinquedos, aproxime-se de Sam na vitrine.'),
(5, 'Conversa', 'Ellie e Sam — videogames', 'Pittsburgh', 'Casa segura, os dois conversando no sofá.'),
(5, 'Conversa', 'Ellie — muro da escola', 'Pittsburgh', 'Após Ellie ajudar na escalada, ela para no portão da escola militar.'),
(5, 'Conversa', 'Ellie — pôster do cinema', 'Pittsburgh', 'No estacionamento, perto do cartaz de ''Dawn of the Wolf Parte 2''.'),
(5, 'Piada da Ellie', 'Sessão de piadas — Livraria', 'Pittsburgh', 'No 2º andar da livraria após derrotar os caçadores; espere pacientemente Ellie tirar o livro da mochila.'),
(5, 'Piada da Ellie', 'Sessão de piadas — Hotel', 'Pittsburgh', 'No saguão do hotel, após subir a escada improvisada e esperar Ellie.');

INSERT INTO conquista (capitulo, tipo, titulo, subtitulo, descricao) VALUES
(6, 'Artefato', 'Nota do Barco Encalhado', 'Os Subúrbios', 'Explore o navio encalhado na praia, na cabine.'),
(6, 'Artefato', 'Diário de Ish', 'Os Subúrbios', 'Esgoto, no acampamento inicial de Ish.'),
(6, 'Artefato', 'Bem-vindos ao Abrigo', 'Os Subúrbios', 'Área comunitária do esgoto, mural de entrada.'),
(6, 'Artefato', 'Desenho das Crianças', 'Os Subúrbios', 'Sala de aula improvisada no esgoto.'),
(6, 'Artefato', 'Nota para Susan', 'Os Subúrbios', 'Dormitório do abrigo, sobre um beliche.'),
(6, 'Artefato', 'Nota ''Encurralados''', 'Os Subúrbios', 'Atrás da porta lacrada — o fim da história do abrigo.'),
(6, 'Artefato', 'Mapa do Esgoto', 'Os Subúrbios', 'Sala de controle, junto às válvulas.'),
(6, 'Artefato', 'Carta do Morador', 'Os Subúrbios', 'Primeira casa do subúrbio, cozinha.'),
(6, 'Artefato', 'Nota do Cachorro', 'Os Subúrbios', 'Quintal com a casinha de cachorro.'),
(6, 'Artefato', 'Diário da Vizinhança', 'Os Subúrbios', 'Casa amarela, escrivaninha do escritório.'),
(6, 'Artefato', 'Panfleto do Atirador', 'Os Subúrbios', 'Perto da casa do atirador de tocaia.'),
(6, 'Artefato', 'Foto de Família', 'Os Subúrbios', 'Casa do fim da rua, sala de estar — Sam a observa por um longo tempo.'),
(6, 'Pingente', 'Pingente de Vagalume #11', 'Os Subúrbios', 'Na âncora do navio encalhado, lado externo.'),
(6, 'Pingente', 'Pingente de Vagalume #12', 'Os Subúrbios', 'Esgoto, sala alagada após o gerador.'),
(6, 'Pingente', 'Pingente de Vagalume #13', 'Os Subúrbios', 'Caixa de correio derrubada na rua principal do subúrbio.'),
(6, 'Pingente', 'Pingente de Vagalume #14', 'Os Subúrbios', 'Casa em obras, pendurado no andaime.'),
(6, 'Quadrinho', 'Savage Starlight: Messenger Particle', 'Os Subúrbios', 'Dormitório das crianças no esgoto.'),
(6, 'Quadrinho', 'Savage Starlight: Negentropy', 'Os Subúrbios', 'Quarto de criança na casa azul do subúrbio.'),
(6, 'Manual', 'Manual — Kit Médico: Esterilização', 'Os Subúrbios', 'Banheiro da casa amarela, no armário.'),
(6, 'Porta de faca', 'Porta de Shiv — Esgoto', 'Os Subúrbios', 'Corredor lateral antes da área comunitária.'),
(6, 'Cofre', 'Cofre do Abrigo', 'Os Subúrbios', 'Sala de suprimentos do esgoto; combinação no Diário de Ish.'),
(6, 'Conversa', 'Henry — sobre o barco', 'Os Subúrbios', 'Na praia, fale com Henry olhando o navio.'),
(6, 'Conversa', 'Sam — sobre Ish', 'Os Subúrbios', 'No abrigo do esgoto, Sam observa os desenhos.'),
(6, 'Conversa', 'Ellie e Sam — dardos', 'Os Subúrbios', 'Bar do subúrbio, os dois jogando dardos.'),
(6, 'Conversa', 'Ellie — sobre o futuro', 'Os Subúrbios', 'Antes de sair do bairro, Ellie fala sobre o que fará ''depois''.');

INSERT INTO conquista (capitulo, tipo, titulo, subtitulo, descricao) VALUES
(7, 'Artefato', 'Esquemas da Usina', 'Represa do Tommy', 'Após o ataque dos bandidos, volte à sala da bancada; sobre a mesa grande.'),
(7, 'Artefato', 'Lista de Turnos da Represa', 'Represa do Tommy', 'Sala de controle, quadro de avisos.'),
(7, 'Artefato', 'Carta à Filha', 'Represa do Tommy', 'Casa do rancho, gaveta da cômoda.'),
(7, 'Artefato', 'Mapa de Jackson', 'Represa do Tommy', 'Escritório de Tommy, na parede.'),
(7, 'Artefato', 'Nota do Vigia', 'Represa do Tommy', 'Torre de observação na entrada da represa.'),
(7, 'Artefato', 'Diário do Colono', 'Represa do Tommy', 'Alojamento, sob o beliche.'),
(7, 'Artefato', 'Nota de Manutenção', 'Represa do Tommy', 'Corredor das turbinas, caixa de ferramentas.'),
(7, 'Artefato', 'Carta de Agradecimento', 'Represa do Tommy', 'Refeitório, presa no mural.'),
(7, 'Artefato', 'Nota dos Bandidos', 'Represa do Tommy', 'Junto ao corpo de um invasor, após o ataque.'),
(7, 'Pingente', 'Pingente de Vagalume #15', 'Represa do Tommy', 'Na cerca da entrada, lado do rio.'),
(7, 'Pingente', 'Pingente de Vagalume #16', 'Represa do Tommy', 'Passarela superior da represa, pendurado no cabo.'),
(7, 'Pingente', 'Pingente de Vagalume #17', 'Represa do Tommy', 'Margem do rio, perto da roda d''água quebrada.'),
(7, 'Pingente', 'Pingente de Vagalume #18 — Ryan Oliverio', 'Represa do Tommy', 'Descendo as escadas, sala à direita, entre duas máquinas.'),
(7, 'Pingente', 'Pingente de Vagalume #19 — Brent Pino', 'Represa do Tommy', 'Casa do rancho, quarto dos fundos à direita, sobre um armário.'),
(7, 'Quadrinho', 'Savage Starlight: Zero Point', 'Represa do Tommy', 'Casa do rancho, quarto do andar de cima, junto à janela.'),
(7, 'Manual', 'Manual — Fumaça: Química', 'Represa do Tommy', 'Sala da bancada, prateleira ao lado.'),
(7, 'Manual', 'Manual — Corpo a Corpo: Técnicas', 'Represa do Tommy', 'Alojamento da represa, sobre a mesa de jogos.'),
(7, 'Porta de faca', 'Porta de Shiv — Depósito da Represa', 'Represa do Tommy', 'Pátio externo, porta metálica à esquerda.'),
(7, 'Ferramenta', 'Ferramentas — Nível 4', 'Represa do Tommy', 'Sala da bancada, junto ao manual.'),
(7, 'Piada da Ellie', 'Sessão de piadas — a caminho da represa', 'Represa do Tommy', 'No cavalo, Ellie puxa o livro de piadas para quebrar o silêncio.'),
(7, 'Conversa', 'Tommy — sobre Jackson', 'Represa do Tommy', 'Fale com Tommy na passarela da represa.'),
(7, 'Conversa', 'Maria — sobre a comunidade', 'Represa do Tommy', 'Converse com Maria perto do refeitório.'),
(7, 'Conversa', 'Ellie — o cavalo', 'Represa do Tommy', 'Nos estábulos, Ellie apresenta ''Callus''.');

INSERT INTO conquista (capitulo, tipo, titulo, subtitulo, descricao) VALUES
(8, 'Artefato', 'Mapa do Campus da UEC', 'A Universidade', 'Guarita da entrada, no balcão.'),
(8, 'Artefato', 'Diário do Cientista', 'A Universidade', 'Laboratório de ciências, mesa central.'),
(8, 'Artefato', 'Gravador dos Vagalumes', 'A Universidade', 'Laboratório principal — a gravação que aponta para Salt Lake City.'),
(8, 'Artefato', 'Lista dos Vagalumes', 'A Universidade', 'Dormitório usado como base, mural do saguão.'),
(8, 'Artefato', 'Nota do Dormitório', 'A Universidade', 'Quarto 205 do dormitório, escrivaninha.'),
(8, 'Artefato', 'Panfleto do Campus', 'A Universidade', 'Pátio central, banco perto da estátua.'),
(8, 'Artefato', 'Nota de Pesquisa', 'A Universidade', 'Sala de arquivos do laboratório.'),
(8, 'Artefato', 'Carta do Estudante', 'A Universidade', 'Biblioteca, mesa dos fundos.'),
(8, 'Pingente', 'Pingente de Vagalume #20', 'A Universidade', 'No arco da entrada do campus, jogue algo para derrubar.'),
(8, 'Pingente', 'Pingente de Vagalume #21', 'A Universidade', 'Pátio interno, na árvore junto aos geradores.'),
(8, 'Pingente', 'Pingente de Vagalume #22', 'A Universidade', 'Telhado do dormitório, acessível pela escada externa.'),
(8, 'Pingente', 'Pingente de Vagalume #23', 'A Universidade', 'Laboratório, sala de observação dos macacos.'),
(8, 'Quadrinho', 'Savage Starlight: Free Radicals', 'A Universidade', 'No início, vire o cavalo e suba a estrada — dentro de um SUV.'),
(8, 'Quadrinho', 'Savage Starlight: Foreign Element', 'A Universidade', 'Dormitório, sala comunal com a mesa de sinuca.'),
(8, 'Manual', 'Manual — Bomba: Contenção', 'A Universidade', 'Depósito do laboratório, atrás das caixas.'),
(8, 'Ferramenta', 'Ferramentas — Nível 5', 'A Universidade', 'Oficina do campus, na bancada principal.'),
(8, 'Cofre', 'Cofre do Laboratório', 'A Universidade', 'Sala de arquivos; combinação na Nota de Pesquisa.'),
(8, 'Porta de faca', 'Porta de Shiv — Dormitório', 'A Universidade', 'Subsolo do dormitório, ao lado da lavanderia.'),
(8, 'Conversa', 'Ellie — sobre a faculdade', 'A Universidade', 'Entrando no campus, Ellie pergunta como era estudar.'),
(8, 'Conversa', 'Ellie — os macacos', 'A Universidade', 'Quando os macacos aparecem, aproxime-se de Ellie.'),
(8, 'Conversa', 'Ellie — o gravador', 'A Universidade', 'Após ouvir a gravação, fale com Ellie antes de sair.');

INSERT INTO conquista (capitulo, tipo, titulo, subtitulo, descricao) VALUES
(9, 'Artefato', 'Mapa do Resort', 'Resort à Beira do Lago', 'Recepção do resort, atrás do balcão.'),
(9, 'Artefato', 'Diário de David', 'Resort à Beira do Lago', 'Sala de David no restaurante, gaveta trancada.'),
(9, 'Artefato', 'Lista de Provisões do Bando', 'Resort à Beira do Lago', 'Despensa do restaurante, presa na porta.'),
(9, 'Artefato', 'Nota do Caçador de Veados', 'Resort à Beira do Lago', 'Cabana na floresta, junto à lareira.'),
(9, 'Artefato', 'Carta da Mãe ao Filho', 'Resort à Beira do Lago', 'Chalé 4, sobre a cama.'),
(9, 'Artefato', 'Nota da Serraria', 'Resort à Beira do Lago', 'Interior da serraria, bancada de corte.'),
(9, 'Artefato', 'Diário do Prisioneiro', 'Resort à Beira do Lago', 'Cela onde Ellie é mantida, riscado na parede — canto.'),
(9, 'Artefato', 'Nota de Vigia do Lago', 'Resort à Beira do Lago', 'Píer congelado, dentro do barco.'),
(9, 'Artefato', 'Receita do Restaurante', 'Resort à Beira do Lago', 'Cozinha do restaurante, mural.'),
(9, 'Pingente', 'Pingente de Vagalume #24', 'Resort à Beira do Lago', 'Na placa da entrada do resort.'),
(9, 'Pingente', 'Pingente de Vagalume #25', 'Resort à Beira do Lago', 'Floresta, pendurado num galho sobre o riacho congelado.'),
(9, 'Pingente', 'Pingente de Vagalume #26', 'Resort à Beira do Lago', 'Telhado da serraria, junto à chaminé.'),
(9, 'Pingente', 'Pingente de Vagalume #27', 'Resort à Beira do Lago', 'Varanda do chalé principal.'),
(9, 'Quadrinho', 'Savage Starlight: Uncertainty', 'Resort à Beira do Lago', 'Chalé 2, quarto dos fundos.'),
(9, 'Quadrinho', 'Savage Starlight: Force Carrier', 'Resort à Beira do Lago', 'Escritório da serraria, sobre o arquivo.'),
(9, 'Manual', 'Manual — Molotov: Aplicação', 'Resort à Beira do Lago', 'Despensa do restaurante, prateleira alta.'),
(9, 'Manual', 'Manual — Fumaça: Aperfeiçoamento', 'Resort à Beira do Lago', 'Cabana na floresta, baú ao lado da cama.'),
(9, 'Porta de faca', 'Porta de Shiv — Chalés', 'Resort à Beira do Lago', 'Entre os chalés 3 e 4, porta lateral.'),
(9, 'Porta de faca', 'Porta de Shiv — Serraria', 'Resort à Beira do Lago', 'Depósito externo da serraria.'),
(9, 'Conversa', 'Joel e Ellie — a caça', 'Resort à Beira do Lago', 'Na abertura, com Ellie e o arco na neve.'),
(9, 'Conversa', 'David — sobre o grupo', 'Resort à Beira do Lago', 'Enquanto seguram a horda juntos, fale com David.'),
(9, 'Conversa', 'Joel — depois do resgate', 'Resort à Beira do Lago', 'Momento final do capítulo, aproxime-se de Ellie.');

INSERT INTO conquista (capitulo, tipo, titulo, subtitulo, descricao) VALUES
(10, 'Artefato', 'Panfleto de Evacuação de SLC', 'Terminal Rodoviário', 'Entrada da rodoviária, no chão junto às catracas.'),
(10, 'Artefato', 'Diário da Mãe de Ellie', 'Terminal Rodoviário', 'Mochila de Ellie — entregue durante a conversa no ônibus (item de história).'),
(10, 'Artefato', 'Nota do Comboio Militar', 'Terminal Rodoviário', 'Caminhão militar tombado no viaduto.'),
(10, 'Artefato', 'Folheto do Zoológico', 'Terminal Rodoviário', 'Perto da área das girafas, bilheteria destruída.'),
(10, 'Pingente', 'Pingente de Vagalume #28', 'Terminal Rodoviário', 'Poste de luz na saída da rodoviária.'),
(10, 'Pingente', 'Pingente de Vagalume #29', 'Terminal Rodoviário', 'Túnel alagado, nicho acima da linha d''água.'),
(10, 'Quadrinho', 'Savage Starlight: Kinetic Theory', 'Terminal Rodoviário', 'Dentro do ônibus escolar, banco do fundo — a última edição.'),
(10, 'Manual', 'Manual — Bomba: Estilhaços', 'Terminal Rodoviário', 'Acampamento militar abandonado no túnel.'),
(10, 'Piada da Ellie', 'Sessão de piadas — ''é tudo o que eu tenho''', 'Terminal Rodoviário', 'Ellie lê as últimas piadas do livro — desta vez, para fazer Joel sorrir.'),
(10, 'Conversa', 'Ellie — as girafas', 'Terminal Rodoviário', 'No terraço, fique ao lado de Ellie observando a manada.'),
(10, 'Ferramenta', 'Ferramentas — Nível 5', 'Terminal Rodoviário', 'Área de triagem médica da FEMA, dentro da grande tenda branca após sair do túnel.'),
(10, 'Quadrinho', 'Savage Starlight: Precipitate', 'Terminal Rodoviário', 'Túnel subterrâneo alagado, dentro do escritório lateral na passarela de ventilação.');

INSERT INTO conquista (capitulo, tipo, titulo, subtitulo, descricao) VALUES
(11, 'Artefato', 'Diário de Marlene', 'Laboratório dos Vagalumes', 'Quarto de Marlene no hospital, mesa de cabeceira.'),
(11, 'Artefato', 'Gravador de Marlene', 'Laboratório dos Vagalumes', 'Mesma sala do diário — a última gravação dela.'),
(11, 'Pingente', 'Pingente de Vagalume #30', 'Laboratório dos Vagalumes', 'Estacionamento do hospital, junto ao posto de guarda — o último.'),
(11, 'Conversa', 'Marlene — no corredor', 'Laboratório dos Vagalumes', 'Interaja durante o trajeto guiado pelo hospital.'),
(11, 'Porta de faca', 'Porta de Shiv — Hospital St. Mary', 'Laboratório dos Vagalumes', '6º andar do hospital, atrás do balcão de recepção na área de pediatria.');

INSERT INTO conquista (capitulo, tipo, titulo, subtitulo, descricao) VALUES
(12, 'Quadrinho', 'Savage Starlight: Catalysis', 'Jackson', 'Na caminhonete abandonada junto à cerca na trilha para Jackson.');

INSERT INTO usuario_conquista (fkUsuario, fkConquista, statusMarcado, dtDesbloqueio) VALUES
(1, 1, 1, '2026-11-17 19:10:00'),
(1, 2, 1, '2026-11-17 19:25:30'),
(1, 7, 1, '2026-11-17 19:40:15'),
(1, 12, 1, '2026-11-17 20:00:00');

INSERT INTO usuario_conquista (fkUsuario, fkConquista, statusMarcado, dtDesbloqueio) VALUES
(3, 1, 1, CURRENT_TIMESTAMP),
(3, 2, 1, CURRENT_TIMESTAMP),
(3, 7, 1, CURRENT_TIMESTAMP);

CREATE OR REPLACE VIEW vw_historico_conquistas AS
SELECT 
    uc.fkUsuario,
    u.apelido,
    c.idConquista,
    c.titulo,
    c.subtitulo,
    c.tipo,
    c.capitulo,
    uc.dtDesbloqueio,
    DATE_FORMAT(uc.dtDesbloqueio, '%d/%m/%Y %H:%i') AS dtFormatada
FROM usuario_conquista uc
JOIN usuario u ON uc.fkUsuario = u.idUsuario
JOIN conquista c ON uc.fkConquista = c.idConquista
WHERE uc.statusMarcado = 1;

CREATE OR REPLACE VIEW vw_progresso_usuarios AS
SELECT 
    u.idUsuario,
    u.apelido,
    COUNT(CASE WHEN uc.statusMarcado = 1 THEN uc.fkConquista END) AS totalColecionaveis,
    ROUND((COUNT(CASE WHEN uc.statusMarcado = 1 THEN uc.fkConquista END) / 205) * 100, 1) AS percentualTotal,
    MAX(CASE WHEN uc.statusMarcado = 1 THEN uc.dtDesbloqueio END) AS ultimoDesbloqueio
FROM usuario u
LEFT JOIN usuario_conquista uc ON u.idUsuario = uc.fkUsuario
GROUP BY u.idUsuario, u.apelido;

SELECT tipo, COUNT(*) AS quantidade FROM conquista GROUP BY tipo ORDER BY quantidade DESC;

SELECT COUNT(*) AS totalCatalogo FROM conquista;

SELECT * FROM vw_historico_conquistas WHERE fkUsuario = 3 ORDER BY dtDesbloqueio DESC LIMIT 4;
