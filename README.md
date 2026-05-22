# 🏥 MedCloud API — Healthcare SaaS Backend

O **MedCloud** é uma API RESTful para gerenciamento de consultas médicas, autenticação de usuários e controle de agenda clínica.  
O projeto foi desenvolvido em **Node.js** com foco em arquitetura limpa, escalabilidade e separação de responsabilidades, simulando cenários reais de aplicações SaaS da área da saúde.

---

# 🚀 Objetivos do Projeto

Este projeto foi criado com o objetivo de consolidar conhecimentos avançados de backend utilizando JavaScript moderno, aplicando conceitos amplamente utilizados no mercado como:

- Clean Architecture
- SOLID
- Repository Pattern
- RBAC (Role-Based Access Control)
- JWT Authentication
- PostgreSQL
- Testes Automatizados
- Docker
- Validação de Payloads
- Regras de negócio complexas

Mais do que um CRUD simples, o MedCloud foi estruturado para simular uma aplicação backend profissional.

---

# 🧠 Diferenciais Técnicos

## ✅ Clean Architecture & SOLID
Toda a lógica de negócio é desacoplada da camada HTTP e da infraestrutura.

A aplicação foi organizada em:
- Use Cases
- Repositories
- Controllers
- Entities
- Middlewares

Isso garante:
- baixo acoplamento
- alta manutenibilidade
- fácil escalabilidade
- testabilidade

---

## ✅ Autenticação JWT + RBAC
Sistema completo de autenticação utilizando:
- JWT
- Bcrypt
- Middleware de autenticação
- Controle de acesso baseado em cargos

Perfis implementados:
- `admin`
- `doctor`
- `patient`

---

## ✅ PostgreSQL + Queries Dinâmicas
O projeto utiliza PostgreSQL com:
- queries parametrizadas
- filtros dinâmicos
- paginação
- transações
- proteção contra SQL Injection

---

## ✅ Validação Robusta com Zod
Validação completa de:
- body
- params
- query params

Garantindo integridade dos dados antes da execução dos casos de uso.

---

## ✅ Docker Ready
Ambiente totalmente isolado com Docker Compose para facilitar setup e execução do banco de dados.

---

## ✅ Testes Automatizados
Cobertura de testes utilizando:
- Jest
- Supertest

Incluindo:
- testes de integração
- testes de rotas protegidas
- validações de autenticação
- regras críticas de negócio

---

# 📖 Regras de Negócio Implementadas

## 🕒 Regras Cronológicas
- Bloqueio de consultas no passado
- Consultas permitidas apenas em horários fechados
- Validação completa utilizando DayJS

---

## 🚫 Prevenção de Overbooking
O sistema impede múltiplos agendamentos simultâneos para o mesmo médico.

---

## 🔐 Controle de Permissões
Usuários comuns possuem acesso limitado enquanto administradores possuem privilégios avançados.

---

## 📌 Atualização Inteligente de Perfil
Atualização parcial de usuários utilizando:
- `COALESCE`
- rastreamento automático com `updated_at`

---

## ❌ Cancelamento Restrito
Consultas não podem ser canceladas com menos de 24 horas de antecedência.

---

# 📁 Estrutura do Projeto

```bash
backend/
├── src/
│   ├── application/
│   │   ├── useCases/
│   │   ├── services/
│   │
│   ├── domain/
│   │   ├── entities/
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │   ├── http/
│   │   ├── repositories/
│   │
│   ├── errors/
│   │
│   └── tests/
│
├── docker-compose.yml
├── package.json
└── README.md
```
# 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- Docker
- JWT
- Bcrypt
- Zod
- Jest
- Supertest
- DayJS

---

# ⚙️ Como Executar o Projeto

## 📌 Pré-requisitos

Antes de começar, você precisará ter instalado:

- Node.js 18+
- Docker
- Docker Compose

---

## 1️⃣ Clonar o Repositório

```bash
git clone <url-do-repositorio>
```

---

## 2️⃣ Configurar Variáveis de Ambiente

Entre na pasta do backend:

```bash
cd backend
```

Crie seu arquivo `.env`:

```bash
cp .env.example .env
```

---

## 3️⃣ Subir Banco de Dados com Docker

Na raiz do projeto, execute:

```bash
docker compose up -d
```

---

## 4️⃣ Instalar Dependências

```bash
npm install
```

---

## 5️⃣ Executar Seed do Banco

```bash
npm run seed
```

O script irá:

- Criar usuários de teste
- Popular consultas automaticamente
- Preparar o ambiente inicial da aplicação

---

## 6️⃣ Rodar a Aplicação

```bash
npm run dev
```

Servidor disponível em:

```txt
http://localhost:3000
```

---

# 📚 Swagger Documentation

A API possui documentação interativa utilizando Swagger UI.

Com a aplicação em execução, acesse:

```txt
http://localhost:3000/api-docs
```

---

# 🧪 Executar Testes

```bash
npm test
```

---

# 🔐 Funcionalidades Principais

## 👤 Usuários

- Cadastro de usuários
- Login com autenticação JWT
- Atualização de perfil
- Controle de permissões por role

---

## 📅 Consultas

- Criação de consultas
- Cancelamento de consultas
- Atualização de status
- Listagem com filtros dinâmicos
- Paginação de resultados

---

## 🩺 Disponibilidade Médica

- Disponibilidade diária
- Disponibilidade mensal
- Bloqueio de horários ocupados

---

# 📈 Conceitos Aplicados

- REST API Design
- SOLID
- Clean Architecture
- Repository Pattern
- Middleware Pattern
- Error Handling
- SQL Dinâmico
- Paginação
- Validação de Dados
- Autenticação Stateless

---

# 🧑‍💻 Autor

Desenvolvido por **Guilherme Lacerda**.

- GitHub: https://github.com/LacerdaJunior
- LinkedIn: https://www.linkedin.com/in/guilherme-lacerda49/
