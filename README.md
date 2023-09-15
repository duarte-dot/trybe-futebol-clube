# TFC - Trybe Futebol Clube ⚽

Neste projeto, criei uma aplicação informativa sobre partidas e classificações de futebol, um back-end robusto, integração de APIs e bancos de dados Dockerizados.

## Visão Geral do Projeto

O TFC é uma aplicação web que oferece informações sobre times de futebol, partidas e classificações. Ela foi construída com as seguintes características principais:

- Desenvolvimento de um back-end dockerizado utilizando o Sequelize.
- Implementação de uma API RESTful para fornecer dados para o front-end.
- Integração de dados de times, partidas e classificações.
- Implementação de autenticação de usuário com tokens.
- Desenvolvimento de funcionalidades de atualização e finalização de partidas.

## Estrutura do Projeto

Aqui está uma visão geral da estrutura do projeto:

- `/app/backend`: Código-fonte do back-end.
- `/app/frontend`: Código-fonte do front-end (parte não abordada neste README).

## Tecnologias Utilizadas

- Node.js: Para o desenvolvimento do servidor back-end.
- Docker: Para a criação de contêineres para o banco de dados.
- Sequelize: Para a modelagem de dados e interação com o banco de dados.
- Express.js: Para a criação da API RESTful.
- JWT (JSON Web Tokens): Para autenticação de usuário.
- Jest: Para testes unitários e de integração.

## Como Rodar o Projeto

Se você deseja executar o projeto localmente, siga estas etapas:

1. Clone o repositório: `git clone https://github.com/seu-usuario/tfc.git`
2. Navegue até a pasta do back-end: `cd tfc/app/backend`
3. Instale as dependências: `npm install`
4. Inicie o servidor: `npm start`
5. Agora você pode acessar a API em `http://localhost:3000`.

Lembre-se de configurar corretamente as variáveis de ambiente e o arquivo de configuração do banco de dados para que o projeto funcione localmente.

## Aprendizados e Desafios

Durante o desenvolvimento deste projeto, eu enfrentei e superei vários desafios interessantes. Alguns dos principais aprendizados incluem:

- Aprendizado profundo sobre o Sequelize e como criar modelos e migrações.
- Implementação de autenticação de usuário com tokens JWT.
- Integração de diferentes partes do projeto em um Docker Compose.
- Testes de unidade e de integração para garantir a qualidade do código.

