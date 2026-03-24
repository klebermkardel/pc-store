# 🖥️ K-Tech Store

Aplicação fullstack de e-commerce de hardware e periféricos para computadores, desenvolvida como projeto de portfólio.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Rodando o Projeto](#rodando-o-projeto)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Rotas da API](#rotas-da-api)
- [Credenciais Padrão](#credenciais-padrão)

---

## Sobre o Projeto

K-Tech Store é uma loja virtual completa com vitrine de produtos, carrinho de compras, checkout em etapas, autenticação JWT com refresh token e painel administrativo para gerenciamento de produtos, categorias e usuários.

---

## Tecnologias

### Backend
- **Node.js** + **Express 5**
- **Sequelize** (ORM) + **MySQL**
- **JWT** (jsonwebtoken) — autenticação com access e refresh token
- **Bcrypt** — hash de senhas
- **dotenv**, **cors**

### Frontend
- **React 19** + **Vite**
- **React Router DOM 7**
- **Tailwind CSS 4**
- **Axios** — requisições HTTP com interceptors

---

## Funcionalidades

### Loja
- [x] Vitrine com paginação (9 produtos por página)
- [x] Filtro por categoria, faixa de preço e busca por nome
- [x] Ordenação por preço
- [x] Página de detalhes do produto com especificações técnicas
- [x] Carrinho persistente no localStorage
- [x] Checkout em 3 etapas (endereço → pagamento → confirmação)
- [x] Tela de sucesso ao finalizar pedido

### Autenticação
- [x] Registro e login de usuários
- [x] Sessão persistente com JWT
- [x] Refresh token automático via interceptor do Axios
- [x] Logout com invalidação do token no banco

### Painel Admin (`/admin`)
- [x] Dashboard com métricas (total de produtos, categorias, clientes)
- [x] Listagem de produtos sem estoque e clientes recentes
- [x] CRUD completo de produtos
- [x] CRUD completo de categorias
- [x] Listagem e exclusão de usuários

### Geral
- [x] Design dark tech/gamer responsivo (mobile first)
- [x] Menu hamburguer em mobile
- [x] Rotas protegidas por autenticação e permissão de admin

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 20
- [MySQL](https://www.mysql.com/) >= 8
- npm

---

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/pc-store.git
cd pc-store
```

### 2. Instale as dependências do backend

```bash
cd backend
npm install
```

### 3. Instale as dependências do frontend

```bash
cd ../frontend
npm install
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` dentro da pasta `backend/` com as seguintes variáveis:

```env
# Banco de dados
DB_HOST=localhost
DB_NAME=pc_store
DB_USER=root
DB_PASS=sua_senha
DB_TIMEZONE=-03:00

# Servidor
PORT=3000
CORS_ORIGIN=http://localhost:5173

# JWT
JWT_SECRET=sua_chave_secreta_muito_segura
JWT_REFRESH_SECRET=outra_chave_secreta_para_refresh
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

### Gerando as chaves JWT

Execute o comando abaixo **duas vezes** no terminal para gerar o `JWT_SECRET` e o `JWT_REFRESH_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## Rodando o Projeto

### 1. Crie o banco de dados

Crie um banco de dados MySQL com o nome definido em `DB_NAME`:

```sql
CREATE DATABASE pc_store;
```

### 2. Popule o banco com dados iniciais

```bash
cd backend
npm run seed
```

Isso irá criar as tabelas, 5 categorias, 10 produtos e o usuário administrador padrão.

### 3. Inicie o backend

```bash
cd backend
npm run dev
```

O servidor irá rodar em `http://localhost:3000`.

### 4. Inicie o frontend

```bash
cd frontend
npm run dev
```

O frontend irá rodar em `http://localhost:5173`.

---

## Estrutura de Pastas

```
pc-store/
├── backend/
│   └── src/
│       ├── config/
│       │   └── database.js
│       ├── controllers/
│       │   ├── AdminController.js
│       │   ├── AuthController.js
│       │   ├── CategoryController.js
│       │   └── ProductController.js
│       ├── middleware/
│       │   ├── adminMiddleware.js
│       │   └── authMiddleware.js
│       ├── models/
│       │   ├── Category.js
│       │   ├── Product.js
│       │   └── User.js
│       ├── routes/
│       │   ├── adminRoutes.js
│       │   ├── authRoutes.js
│       │   ├── categoryRoutes.js
│       │   └── productRoutes.js
│       ├── seed.js
│       └── server.js
│
└── frontend/
    └── src/
        ├── components/
│       │   ├── Header.jsx
│       │   └── Sidebar.jsx
        ├── context/
        │   ├── AuthContext.jsx
        │   └── CartContext.jsx
        ├── pages/
        │   ├── admin/
        │   │   ├── AdminLayout.jsx
        │   │   ├── Categories.jsx
        │   │   ├── Dashboard.jsx
        │   │   ├── Products.jsx
        │   │   └── Users.jsx
        │   ├── Cart.jsx
        │   ├── Checkout.jsx
        │   ├── Home.jsx
        │   ├── Login.jsx
        │   ├── NotFound.jsx
        │   ├── ProductDetails.jsx
        │   └── Register.jsx
        ├── services/
        │   └── api.js
        ├── App.jsx
        └── main.jsx
```

---

## Rotas da API

### Públicas

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/products` | Lista produtos com filtros e paginação |
| `GET` | `/products/:id` | Detalhes de um produto |
| `GET` | `/categories` | Lista todas as categorias |
| `GET` | `/categories/:id` | Detalhes de uma categoria com produtos |
| `POST` | `/auth/register` | Cadastro de usuário |
| `POST` | `/auth/login` | Login |
| `POST` | `/auth/refresh` | Renovação do access token |

### Autenticadas (JWT)

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/auth/me` | Dados do usuário logado |
| `POST` | `/auth/logout` | Logout |

### Admin (JWT + is_admin)

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/admin/dashboard` | Métricas gerais |
| `GET` | `/admin/products` | Lista produtos |
| `POST` | `/admin/products` | Cria produto |
| `PUT` | `/admin/products/:id` | Atualiza produto |
| `DELETE` | `/admin/products/:id` | Exclui produto |
| `GET` | `/admin/categories` | Lista categorias |
| `POST` | `/admin/categories` | Cria categoria |
| `PUT` | `/admin/categories/:id` | Atualiza categoria |
| `DELETE` | `/admin/categories/:id` | Exclui categoria |
| `GET` | `/admin/users` | Lista clientes |
| `DELETE` | `/admin/users/:id` | Exclui cliente |

---

## Credenciais Padrão

Após rodar o seed, utilize as credenciais abaixo para acessar o painel admin:

```
Email: admin@pcstore.com
Senha: admin123
```

> ⚠️ Altere a senha do administrador após o primeiro acesso em produção.

---

## Licença

Este projeto foi desenvolvido para fins de portfólio.
