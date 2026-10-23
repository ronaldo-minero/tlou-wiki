<div align="center">

# TLOU Wiki
### *"Procure a Luz"*

*"Quando você estiver perdido na escuridão, procure pela luz."* — Vagalumes

Guia (wiki) e rastreador (tracker) interativo de colecionáveis e conquistas de **The Last of Us Part I**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MySQL](https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Linux](https://img.shields.io/badge/VM_Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)

![Status](https://img.shields.io/badge/status-em_desenvolvimento-orange?style=flat-square)
![Projeto](https://img.shields.io/badge/SPTech-Projeto_Individual_2026--2-red?style=flat-square)

</div>

---

## 📑 Sumário

- [Sobre o projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Conteúdo mapeado](#-conteúdo-mapeado-v1)
- [Arquitetura](#-tecnologias-e-arquitetura)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Segurança](#-segurança)
- [Fora do escopo](#-fora-do-escopo-da-v1)
- [Cronograma](#-cronograma)
- [Como rodar](#-como-rodar)

---

## 🌿 Sobre o projeto

Jogadores que querem 100% de conclusão em *The Last of Us Part I* dependem de listas soltas na internet, que não guardam o progresso individual e ainda costumam expor spoilers da história.

A **TLOU Wiki** centraliza o catálogo de colecionáveis em uma aplicação web que:

- 💾 salva o progresso de cada jogador em banco de dados;
- 🙈 oferece um **Modo Sem Spoiler**;
- 📊 mostra estatísticas em uma dashboard.

Tudo isso para tornar a busca pela **Platina** mais organizada, imersiva e segura.

---

## ✨ Funcionalidades

| | Funcionalidade | Descrição |
|---|---|---|
| 🏠 | **Landing Page** | Sinopse, personagens (Joel, Ellie, Tess e Tommy), estações, tipos de colecionáveis e página "Sobre Mim" |
| 🔐 | **Cadastro e login** | Validação no front-end (JavaScript) e no back-end (API Node.js) |
| 🎮 | **Seleção de jogo** | *Part I* disponível; *Part II* bloqueado com o aviso "Em breve" |
| 📊 | **Dashboard** | Gráficos em Chart.js: total encontrado, progresso por capítulo e por tipo, capítulos jogados, avanço até o final e até a Platina, insígnias |
| 📖 | **Catálogo por capítulo** | 12 capítulos na barra lateral, cada um com checklist (tipo e dica de localização em texto) |
| ✅ | **Checklist persistente** | Marque e desmarque itens, gravando no banco via API sem recarregar a página |
| 🙈 | **Modo Sem Spoiler** | Oculta resumos e dicas de itens ainda não encontrados até você clicar para revelar; preferência salva no banco |
| 🍂 | **Linha do Tempo** | Os capítulos na sequência das estações, do Verão à Primavera |
| 👤 | **Perfil** | Gerenciamento de preferências do usuário |

---

## 🗂️ Conteúdo mapeado (v1)

A v1 cobre integralmente o primeiro jogo: **12 capítulos** (Verão, Outono, Inverno, Primavera e Epílogo) e **199 colecionáveis** em 9 categorias.

| Categoria | Qtd. |
|---|:---:|
| 📜 Artefatos | **85** |
| 💬 Conversas opcionais | **37** |
| 🏷️ Pingentes de vagalume | **30** |
| 📘 Manuais de treinamento | **12** |
| 🚪 Portas de shiv | **12** |
| 🦸 Quadrinhos *Savage Starlight* | **12** |
| 🔧 Ferramentas de bancada | **4** |
| 🔒 Cofres | **4** |
| 😂 Piadas da Ellie | **3** |
| | **199** |

---

## 🧱 Tecnologias e arquitetura

| Camada | Tecnologia |
|---|---|
| 🎨 Front-end | HTML, CSS e JavaScript |
| 📈 Gráficos | Chart.js |
| ⚙️ Back-end | API Node.js (`web-data-viz`) |
| 🗄️ Banco de dados | SQL, isolado em uma Máquina Virtual Linux |

> ⚠️ A VM Linux contém **somente** o banco de dados. A API e o site rodam fora dela e se conectam via rede.

---

## 📁 Estrutura de pastas

```
📦 tlou-wiki
 ┣ 📂 public/    → páginas HTML, CSS e JavaScript
 ┗  📂 src/      → API Node.js
```

---

## 🔒 Segurança

- 🔑 Senhas nunca são armazenadas em texto puro: o hash é feito no back-end.
- 🛡️ Validação de dados em duas camadas (front-end e API).

---

## 🚧 Fora do escopo da v1

- ❌ Catálogo de *The Last of Us Part II* (aparece apenas como "Em breve")
- ❌ Imagens de localização dos colecionáveis (cada item tem só uma dica em texto; fica como melhoria futura)
- ❌ Rankings competitivos entre jogadores
- ❌ Compra ou download de jogos
- ❌ Integração com contas da PlayStation Network e Steam

---

## 🗓️ Cronograma

| Semana | Entrega |
|:---:|---|
| **1** | Start do projeto e escolha do tema |
| **2** | Documentação, Trello, repositório no GitHub e primeiros commits |
| **3** | Landing Page (`index.html`) |
| **4** | Cadastro, login, Home Logada, API gravando no banco na VM e listas renderizadas com `for` e vetores |
| **5** | Dashboard com Chart.js, indicadores, modo sem spoiler, perfil e linha do tempo |
| **6** | Finalização e apresentação de 10 minutos para a banca (30/11 a 04/12) |

---

## 🚀 Como rodar

> Ajuste esta seção conforme o seu ambiente.

```bash
# 1. Suba a VM Linux com o banco SQL e execute os scripts de banco/

# 2. Instale as dependências da API
cd api
npm install

# 3. Inicie a API
npm start

# 4. Abra front/index.html no navegador
```

---

<div align="center">

Projeto acadêmico sem fins lucrativos, inspirado em *The Last of Us Part I* (Naughty Dog), sem vínculo oficial com a franquia.

*Procure a luz.*

</div>
