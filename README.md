# Projeto CRUD de Usuários com React + Node.js + MySQL

Este é um projeto fullstack para cadastro de usuários, com as funcionalidades de criar, visualizar, editar e excluir registros. Utiliza:

- **Frontend**: React + Vite + ShadCN UI + Tailwind
- **Backend**: Node.js + Express
- **Banco de dados**: MySQL

---

## Funcionalidades

- Visualização de todos os usuários
- Cadastro de novo usuário
- Edição de dados existentes
- Exclusão de registros
- Feedback por toast (componente `sonner`)

---

## Como rodar o projeto

### 1. Clone o repositório
```bash
https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

### 2. Configure o banco de dados MySQL

- Importe o arquivo `users.sql` que está em:

```bash
backend/banco/users.sql
```

### 3. Rodando o backend (API Node.js)

Acesse a pasta `backend/api`:

```bash
cd backend/api
npm install
npm run dev
```

O backend subirá em `http://localhost:8800`

> Certifique-se de que o MySQL está rodando localmente e com usuário/senha configurado no arquivo `db.js` corretamente.


### 4. Rodando o frontend (React + Vite)

Abra outro terminal e acesse:

```bash
cd frontend-novo
npm install
npm run dev
```

O frontend subirá em `http://localhost:5173`

---

## 🚀 Scripts

### Backend
```bash
cd backend/api
npm run dev
```

### Frontend
```bash
cd frontend-novo
npm run dev
```

---

Agora é só clonar, importar o SQL e rodar! 🚀


