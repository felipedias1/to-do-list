# Projeto to-do-list

### Boas vindas ao "to-do-list"

## Contexto

O projeto foi uma proposta de desafio técnico da empresa Ebyrt para desenvolver uma aplicação que ajudasse a melhorar o desempenho e produtividade dos 
funcionários da empresa. Para isso, a proposta era fazer uma aplicação onde o funcionário pudesse visualizar, cadastrar editar e deletar suas tarefas 
pessoais, praticando a gestão do tempo no trabalho.

## Como instalar

Pre-requisitos para rodar o projeto:

1. mongoDB
2. NPM

Copie a chave ssh do projeto:
~~~
git@github.com:felipedias1/to-do-list.git
~~~
Abra um terminal no seu computador e utilize os comandos a baixo na ordem que são apresentados:

~~~
git clone git@github.com:felipedias1/to-do-list.git
cd to-do-list
npm install
npm start
~~~

A aplicação está configurada para rodar na porta local 3001 - http://localhost:3001

## Modo de desenvolvimento
Este projeto foi desenvolvido com foco em Backend, com uma cobertura de teste de integração e utilizando o software Isomnia para realizar as requisições.

## Tecnologias
Foram utilizados NodeJS, em conjunto com Express, Mocha/Chai/Sinon para a construção dos testes de integração e MongoDB como banco de dados

## Como utilizar
A API possui as seguintes rotas:

/login [POST] Faz login do usuário para acesso ao sistema

/user [POST] Cria um novo usuário

/task [GET] Retorna todas as tarefas cadastradas pelo usuario logado - (acesso com autenticação)
/tasks [POST] Faz o cadastramento de uma nova tarefa pelo usuario logado - (acesso com autenticação)
/tasks/:id [PUT] Utilizando o id da tarefa, o usuário poderá atualizar a tarefa - (acesso com autenticação)
/tasks/:id [DELETE] Utilizando o id da tarefa, o usuário poderá deletar a tarefa - (acesso com autenticação)

## Qual o próximo passo?
* Aumentar a cobertura de testes, construindo os testes unitários
* Implementar data de finalização das tarefas
* Implementação de acesso administrador
* Desenvolver o Front-End da aplicação.
