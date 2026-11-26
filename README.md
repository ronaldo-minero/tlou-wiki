<div align="center">

# TLOU Wiki
### *"Procure a Luz"*

*"Quando estiver perdido na escuridão, procure a luz."* — Vagalumes

Guia (wiki) e rastreador (tracker) interativo de colecionáveis de **The Last of Us Part I**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MySQL](https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Linux](https://img.shields.io/badge/VM_Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)

![Status](https://img.shields.io/badge/status-concluído-brightgreen?style=flat-square)
![Projeto](https://img.shields.io/badge/SPTech-Projeto_Individual_2026--2-red?style=flat-square)

</div>

---

## 📑 Sumário

- [Sobre o projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Conteúdo mapeado](#-conteúdo-mapeado)
- [Arquitetura](#-tecnologias-e-arquitetura)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Fora do escopo](#-fora-do-escopo)
- [Como rodar](#-como-rodar)

---

## 🌿 Sobre o projeto

Jogadores que buscam 100% de conclusão em *The Last of Us Part I* dependem de listas soltas na internet, que não guardam o progresso individual e costumam expor spoilers da história.

A **TLOU Wiki** centraliza o catálogo de colecionáveis em uma aplicação web que:

- 💾 salva o progresso de cada jogador em banco de dados;
- 🙈 oferece um **Modo Sem Spoiler** para esconder descrições de localização;
- 📊 mostra estatísticas reais de avanço em uma dashboard interativa.

Tudo isso para tornar a busca pela **Platina** mais organizada e imersiva.

---

## ✨ Funcionalidades

| | Funcionalidade | Descrição |
|---|---|---|
| 🏠 | **Landing Page** | Apresentação do jogo, personagens (Joel, Ellie, Tess e Tommy), as 4 estações da jornada e os 9 tipos de colecionáveis |
| 🔐 | **Cadastro e login** | Cadastro com medidor de força de senha em tempo real (regex), validação de campos e autenticação via API Node.js + `sessionStorage` |
| 📊 | **Dashboard** | Gráfico de rosca em Chart.js com progresso total, capítulos concluídos, barras por tipo de colecionável, card de **Último Acesso**, progresso dos 12 capítulos e lista dos **Últimos 10 Encontrados** com data/hora |
| 📖 | **Páginas por capítulo** | 12 capítulos navegáveis, cada um com barra de progresso própria e lista dinâmica de colecionáveis vinda do banco |
| ✅ | **Checklist persistente** | Marcação e desmarcação de itens gravando direto no MySQL via `fetch` sem recarregar a página |
| 🙈 | **Modo Sem Spoiler** | Chave na navbar que substitui as descrições dos colecionáveis pelo aviso *"Modo anti-spoiler ativo"* enquanto estiver ativada |

---

## 🗂️ Conteúdo mapeado

O projeto cobre os **12 capítulos** de *The Last of Us Part I* (Verão, Outono, Inverno e Primavera) e **205 colecionáveis** divididos em 9 categorias:

| Categoria | Qtd. |
|---|:---:|
| 📜 Artefatos | **85** |
| 💬 Conversas opcionais | **37** |
| 🏷️ Pingentes de vagalume | **30** |
| 🦸 Quadrinhos *Savage Starlight* | **14** |
| 🚪 Portas de faca | **13** |
| 📘 Manuais de treinamento | **12** |
| 🔧 Ferramentas de bancada | **5** |
| 😂 Piadas da Ellie | **5** |
| 🔒 Cofres | **4** |
| **Total** | **205** |

---

## 🧱 Tecnologias e arquitetura

| Camada | Tecnologia |
|---|---|
| 🎨 Front-end | HTML5, CSS3 e JavaScript |
| 📈 Gráficos | Chart.js |
| ⚙️ Back-end | API Node.js + Express (`web-data-viz`, padrão MVC) |
| 🗄️ Banco de dados | MySQL, isolado em uma Máquina Virtual Linux |

> ⚠️ A VM Linux contém **somente** o banco de dados. A API e o site rodam fora dela e se conectam via rede.

---

## 📁 Estrutura de pastas

```
📦 tlou-wiki
 ┣ 📂 docs/          → documentação oficial (PDF) e diário de prompts
 ┣ 📂 public/
 ┃ ┣ 📂 assets/      → imagens dos capítulos, estações e personagens
 ┃ ┣ 📂 capitulos/   → páginas HTML dos 12 capítulos
 ┃ ┣ 📂 dashboard/   → painel principal do usuário logado
 ┃ ┣ 📂 js/          → scripts de sessão, dashboard e checklist
 ┃ ┣ 📂 styles/      → folhas de estilo CSS
 ┃ ┣ 📜 index.html
 ┃ ┣ 📜 login.html
 ┃ ┗ 📜 cadastro.html
 ┣ 📂 src/
 ┃ ┣ 📂 controllers/ → regras e formatação de dados (usuário, conquistas e dashboard)
 ┃ ┣ 📂 database/    → conexão MySQL e script tlouwiki.sql
 ┃ ┣ 📂 models/      → consultas SQL no banco de dados
 ┃ ┗ 📂 routes/      → rotas da API Express
 ┣ 📜 .env.example
 ┗ 📜 app.js
```

---

## 🚧 Fora do escopo

- ❌ Catálogo de *The Last of Us Part II*
- ❌ Imagens da localização exata de cada colecionável (as dicas são em texto)
- ❌ Rankings competitivos entre jogadores
- ❌ Compra ou download de jogos
- ❌ Integração com contas da PlayStation Network ou Steam

---

## 🚀 Como rodar

1. Execute o script `src/database/tlouwiki.sql` no seu servidor MySQL (local ou na VM Linux).
2. Copie o arquivo `.env.example` para `.env.dev` (ou `.env` em produção) e preencha os dados de acesso ao banco (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, etc.).
3. Instale as dependências e inicie o servidor:
   ```bash
   npm install
   npm start
   ```
4. Acesse no navegador: `http://localhost:3333`

---

<div align="center">

Projeto acadêmico sem fins lucrativos, inspirado em *The Last of Us Part I* (Naughty Dog), sem vínculo oficial com a franquia.

*Procure a luz.*

</div>
