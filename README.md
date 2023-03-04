# Sistema de help desk

Sistema onde se poderá criar tickets para solicitação de suporte ao usuário.

## Estrutura

```
.
├── dist            <-- Arquivos buildados da aplicação
├── src
│ ├── @types        <-- Tipagem geral da aplicação
│ ├── application   <-- Implementação de regra de negócio
│ ├── domain        <-- Entidades da aplicação
│ └── infra
│   ├── db          <-- Implementação de banco de dados
│   └── http        <-- Implementação de servidor web
├── static
│ └── styles        <-- Estilização de arquivos
└── views
  ├── components    <-- Componentes de UI
  └── pages         <-- Páginas html/ejs
```

## Requisitos funcionais

- [ ] Contas
  - [ ] Realizar login
  - [ ] Criar conta
  - [ ] Adicionar usuário como suporte
- [ ] Tickets
  - [ ] Criar novo ticket
  - [ ] Adicionar tags ao ticket
  - [ ] Responder ticket como usuário
  - [ ] Responder ticket como suporte
  - [ ] Marcar ticket como finalizado

## Configurando banco de dados
O banco de dados utilizado na aplicação é um mysql. É possível configurar rapidamente utilizando o arquivo `docker-compose.yml`, rodando o script:

```bash
docker-compose up -d db
```

## Rodar aplicação localmente

```bash
npm run dev
```
