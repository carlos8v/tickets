# Sistema de help desk

Sistema onde se poderá criar tickets para solicitação de suporte ao usuário.

## Estrutura

```
.
└── apps
  ├── backend
  │ ├── dist            <-- Arquivos buildados do backend
  │ └── src
  │   ├── @types        <-- Tipagem geral da aplicação
  │   ├── application   <-- Implementação de regra de negócio
  │   ├── domain        <-- Entidades da aplicação
  │   └── infra
  │     ├── db          <-- Implementação de banco de dados
  │     └── http        <-- Implementação de servidor web
  └── frontend
    ├── dist            <-- Arquivos buildados do frontend
    ├── public          <-- Arquivos estáticos
    └── src
      ├── components    <-- Componentes de UI
      ├── context       <-- Store no frontend
      ├── pages         <-- Páginas da aplicação
      └── services      <-- Serviços de interação com backend
```

## Requisitos funcionais

- [ ] Contas
  - [x] Realizar login
  - [x] Criar conta
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

1. Instalar as dependências:
```bash
# apps/backend
npm install

# apps/frontend
npm install
```
2. Gerar os esquemas do banco de dado
```bash
# apps/backend
npm run schema:generate
```
3. Iniciar individualmente os servidores backend e frontend
```bash
# apps/backend
npm run dev

# apps/frontend
npm run dev
```
