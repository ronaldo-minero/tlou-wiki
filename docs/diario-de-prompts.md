# Diário de Prompts - TLOU Wiki

Registro cronológico das principais consultas feitas à IA generativa como apoio de estudo, revisão de sintaxe e depuração durante o desenvolvimento do Projeto Individual.

## 1. Configuração do modo de estudo (Semana 2)

**Prompt:**
> "Ative o modo teacher: durante este projeto da faculdade, quero que você me explique o funcionamento de cada conceito antes de sugerir código, apontando onde está o erro para que eu mesmo consiga ajustar e aprender."

**Auxílio e ajuste:**
Definido o formato de resposta focado em explicação passo a passo, priorizando exemplos curtos, indicação de linha nos arquivos e conceitos da arquitetura `web-data-viz` (HTML, CSS, JS, Node.js e MySQL).

## 2. Gradiente sobre imagem de fundo na Landing Page (Semana 3)

**Prompt:**
> "Como faço um gradiente escuro em um background no CSS sem esconder a imagem de fundo do lado direito, para o texto branco da home ficar legível?"

**Auxílio e ajuste:**
Explicado o empilhamento de camadas na propriedade `background` usando `linear-gradient(to right, ...)` antes do `url('../assets/inicio-bg.jpg')` na classe `.inicio` do `index.css`, escurecendo o lado esquerdo onde fica o texto e deixando a imagem visível à direita.

## 3. Padronização visual do CSS entre as páginas (Semana 3)

**Prompt:**
> "Já fechei a identidade visual da index.css. Como posso padronizar as cores, fontes, navbar e footer nas outras páginas (login, dashboard e capítulos) mantendo o código organizado?"

**Auxílio e ajuste:**
Extraídas as variáveis globais no `:root` (`--fundo`, `--fundo-alt`, `--dourado`, `--texto`, `--borda` e cores das quatro estações) e padronizada a estrutura de `navbar`, botões `.btn` e `footer` nos arquivos `login.css`, `dashboard.css` e `capitulos.css`.

## 4. Depuração de erro em rota da API no Node.js (Semana 4)

**Prompt:**
> "Meu fetch no front-end está dando erro 404 ao buscar os dados do capítulo/usuário. Pode me ajudar a achar onde está dando erro entre o fetch, o arquivo de rota e o app.js?"

**Auxílio e ajuste:**
Identificada a diferença entre envio de dados via `req.body` (rotas `POST`) e parâmetros na URL via `req.params` (rotas `GET` com `:idUsuario`), além da conferência do prefixo registrado no `app.use` dentro do `app.js` e correção do caminho de importação do script `sessao.js`.

## 5. Consulta SQL com LEFT JOIN para progresso dos capítulos (Semana 5)

**Prompt:**
> "Preciso contar o total de colecionáveis de um capítulo e quantos o usuário já marcou na tabela associativa `usuario_conquista`, mesmo quando ele ainda marcou zero itens. Qual tipo de JOIN devo usar?"

**Auxílio e ajuste:**
Explicada a diferença entre `INNER JOIN` e `LEFT JOIN`. Aplicado `LEFT JOIN` partindo da tabela `conquista` com filtro `uc.fkUsuario` e `uc.statusMarcado = 1` direto na cláusula `ON`, garantindo que o `COUNT` retorne o total real do capítulo mesmo sem itens marcados.

## 6. Gráfico de rosca no Chart.js e data em português no SQL (Semana 5)

**Prompt:**
> "Como deixo o gráfico doughnut do Chart.js com o centro vazado para colocar a porcentagem no meio, e como formato o datetime do MySQL para dia/mês/ano na lista de últimos encontrados?"

**Auxílio e ajuste:**
Configurada a opção `cutout: '90%'` com legenda oculta no `dashboard.js` para exibir o percentual centralizado, e aplicada a função `DATE_FORMAT(uc.dtDesbloqueio, '%d/%m/%Y %H:%i')` na consulta `obterUltimosEncontrados` do `dashboardModel.js`.

## 7. Dúvida de versionamento com Git no terminal (Semana 6)

**Prompt:**
> "Dei `git add .` com arquivos a mais sem querer e depois apareceu uma tela de merge no terminal quando puxei do repositório. Como tiro arquivos da área de stage e como fecho essa tela do merge?"

**Auxílio e ajuste:**
Orientado o uso de `git reset` para remover arquivos preparados antes do envio e explicado o funcionamento do editor Vim aberto pelo Git durante o merge (`Esc` seguido de `:wq` para salvar a mensagem de merge e concluir com `git push`).

## 8. Alinhamento do README com a entrega final (Semana 6)

**Prompt:**
> "Revise e alinhe o README.md apenas com as funcionalidades que realmente estão no projeto final, mantendo a arquitetura com o banco na VM Linux e atualizando as quantidades reais do banco."

**Auxílio e ajuste:**
Atualizado o `README.md` removendo itens que ficaram fora do escopo final (como seleção do segundo jogo), ajustando a tabela para os 205 colecionáveis cadastrados no `tlouwiki.sql`, documentando o `.env.example` e adicionando o passo a passo de execução.
