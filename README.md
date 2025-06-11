# DayNotes - Anotações Diárias 📝

![Demo](./front/public/readme/2025-05-03%2022.25.45%20day-notes-client.vercel.app%202d0acfae2b0b.jpg)

Aplicação fullstack para gerenciamento de anotações diárias com priorização, organização de tarefas e sistema de autenticação. Cada usuário tem suas próprias notas e preferências.

> ⚠️ **Em desenvolvimento:** este projeto ainda está em evolução. Planejo melhorar aspectos como o design, usabilidade e adicionar novas funcionalidades em breve.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://day-notes-client.vercel.app)

## 🛠 Tecnologias Utilizadas

[![React](https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/-Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![JWT](https://img.shields.io/badge/JWT-9.x-orange)](https://jwt.io/)

## ✨ Funcionalidades

### Frontend (React)

- Interface moderna e responsiva
- Cadastro e login de usuários
- Visualização de notas em cards organizáveis
- Criação, edição e exclusão de notas em tempo real
- Priorização visual de tarefas

### Backend (API Express)

- CRUD completo de anotações
- Autenticação JWT com registro e login
- Hash de senhas com bcrypt
- Sistema de priorização inteligente
- Rotas RESTful seguras
- Armazenamento em MongoDB via Mongoose

## 🔧 Instalação e Execução

> **Pré-requisitos:** Node.js e npm instalados, MongoDB em execução ou conexão com Atlas.

1. Clone o repositório:

   ```bash
   https://github.com/EmersonSinezio/DayNotes.git
   cd daynotes
   ```

2. Instale dependências do backend:

   ```bash
   cd backend
   npm install
   ```

3. Instale dependências do frontend:

   ```bash
   cd ../frontend
   npm install
   ```

4. Configure variáveis de ambiente:

   - Renomeie `.env.example` para `.env` em `backend/` e adicione:

     ```env
     PORT=3001
     MONGO_URI=mongodb://localhost:27017/daynotes
     JWT_SECRET=sua_chave_secreta_super_forte
     JWT_EXPIRES_IN=1h
     ```

   - No frontend, crie um arquivo `.env` com:

     ```env
     REACT_APP_API_URL=http://localhost:3001
     ```

5. Execute a API:

   ```bash
   cd backend
   npm run dev
   ```

6. Execute o cliente:

   ```bash
   cd ../frontend
   npm start
   ```

Agora acesse `http://localhost:3000` para ver a aplicação rodando.

## 📜 Documentação da API

### Autenticação

| Método | Rota              | Descrição                   |
| ------ | ----------------- | --------------------------- |
| POST   | `/users/register` | Registrar novo usuário      |
| POST   | `/users/login`    | Login e obtenção de JWT     |
| GET    | `/users/me`       | Perfil do usuário (privado) |

### Notas

| Método | Rota                                | Descrição             |
| ------ | ----------------------------------- | --------------------- |
| POST   | `/users/:userid/notes`              | Criar nova nota       |
| GET    | `/users/:userid/notes`              | Listar todas as notas |
| PUT    | `/users/:userid/notes/:id`          | Atualizar nota        |
| DELETE | `/users/:userid/notes/:id`          | Excluir nota          |
| PATCH  | `/users/:userid/notes/:id/priority` | Alternar prioridade   |

## 📦 Estrutura do Projeto

```
daynotes/
├── backend/
│   ├── src/
│   │   ├── config/        # Configurações do banco
│   │   ├── controllers/   # Lógica dos endpoints
│   │   ├── middlewares/   # Autenticação e validações
│   │   ├── models/        # Schemas do MongoDB
│   │   ├── routes.js      # Definição de rotas
│   │   ├── utils/
|   |   └── index.js      # Ponto de entrada da API
├── frontend/
│   ├── public/           # Arquivos estáticos
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── services/     # Integração com API (Axios)
│   │   ├── pages/
│   │   ├── App.jsx        # Componente principal
│   │   └── index.jsx      # Componente principal
│   └── package.json
```

## 📬 Contato

_Emerson Sinezio_

[![Email](https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white)](mailto:emerson.sineziio@gmail.com)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/emerson-sineziio)
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/emerson-sineziio)

## Todo 🐱‍👤:

- temas dark and white
- prioridades quebrado
- sidebar pendente

✔ autenticação
