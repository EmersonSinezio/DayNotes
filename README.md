# DayNotes - Sistema de Anotações Seguras 📝🔒

![Demo](/front/public/readme/homepage.jpg)

Aplicação fullstack para gerenciamento de anotações diárias com sistema de autenticação robusto e criptografia de dados. Cada usuário tem acesso exclusivo às suas notas com total privacidade e segurança.

> ✨ **Novidades na versão atual:**
>
> - Sistema de autenticação reforçado com JWT
> - Validação forte de senhas (8+ caracteres, maiúsculas, minúsculas, números e símbolos)
> - Validação de nomes de usuário
> - Criptografia de dados sensíveis
> - Barra de força de senha em tempo real

[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://day-notes-client.vercel.app)

## 🛠 Tecnologias Utilizadas

### Frontend

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![React Router](https://img.shields.io/badge/React_Router-6.15.0-CA4245?logo=react-router)](https://reactrouter.com/)
[![React Toastify](https://img.shields.io/badge/React_Toastify-9.1.3-FF813F)](https://fkhadra.github.io/react-toastify/)
[![Axios](https://img.shields.io/badge/Axios-1.4.0-5A29E4?logo=axios)](https://axios-http.com/)

### Backend

[![Node.js](https://img.shields.io/badge/Node.js-18.16.0-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.1.0-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-7.3.1-880000)](https://mongoosejs.com/)
[![JWT](https://img.shields.io/badge/JWT-9.0.2-000000?logo=jsonwebtokens)](https://jwt.io/)
[![Bcrypt](https://img.shields.io/badge/Bcrypt-5.1.1-3949AB)](https://www.npmjs.com/package/bcrypt)
[![Crypto](https://img.shields.io/badge/Crypto-1.0.1-000000?logo=node.js)](https://nodejs.org/api/crypto.html)

## ✨ Funcionalidades Principais

### Segurança e Autenticação

- 🔑 Registro com validação forte de senha
- 🔐 Login com tokens JWT e armazenamento seguro
- 🛡️ Middleware de autenticação em todas as rotas protegidas
- 🚫 Proteção contra ataques de força bruta
- 🔄 Tokens JWT com expiração automática

### Gerenciamento de Notas

- ✏️ Criação de notas com prioridade
- 📝 Edição em tempo real
- 🗑️ Exclusão segura de notas
- 🔍 Busca e organização de notas
- 🏷️ Marcação de notas prioritárias

### Experiência do Usuário

- 📱 Design responsivo
- 📊 Barra de força de senha em tempo real
- ✅ Feedback visual imediato para validações
- ⏱️ Redirecionamento automático após ações
- 💬 Notificações toast para interações

## 🔧 Instalação e Execução

### Pré-requisitos

- Node.js 18.x
- MongoDB (local ou Atlas)
- NPM 9.x+

1. Clone o repositório:

```bash
git clone https://github.com/EmersonSinezio/DayNotes.git
cd DayNotes
```

2. Configure backend:

```bash
cd backend
npm install
cp .env.example .env
# Edite o .env com suas configurações
```

3. Configure frontend

```bash
cd ../frontend
npm install
cp .env.example .env
# Configure REACT_APP_API_URL
```

4. Inicie os serviços:

```bash
# Em um terminal:
cd ../backend
npm run dev

# Em outro terminal:
cd ../frontend
npm start
```

4. Acesse a aplicação

```text
http://localhost:3000
```

## 🛡️ Sistema de Segurança

### Autenticação

sequenceDiagram
participant Client
participant Server
participant DB

    Client->>Server: POST /users/register
    Server->>DB: Valida usuário único
    Server->>Server: Criptografa senha (bcrypt)
    Server->>DB: Salva novo usuário
    Server->>Client: 201 Created

    Client->>Server: POST /users/login
    Server->>DB: Busca usuário
    Server->>Server: Compara senhas (bcrypt)
    Server->>Server: Gera JWT
    Server->>Client: 200 OK + token

    Client->>Server: Requests com token JWT
    Server->>Server: Verifica token
    Server->>DB: Operações seguras

### Validações

- **Usuário:**
  - 3-20 caracteres
  - Apenas letras, números, `.` e `_`
  - Único no sistema
- **Senha:**
  - Mínimo 8 caracteres
  - 1 letra maiúscula
  - 1 letra minúscula
  - 1 número
  - 1 caractere especial
  - Validação em tempo real

## 📦 Estrutura do Projeto

```text
DayNotes/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── annotationController.js
│   │   │   └── userController.js
│   │   ├── middlewares/
│   │   │   └── authMiddleware.js
│   │   ├── models/
│   │   │   ├── AnnotationData.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   └── api.js
│   │   └── utils/
│   │       └── security.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── AuthForm.jsx
│   │   │   └── notes/
│   │   │       ├── NoteAdd.jsx
│   │   │       ├── NoteList.jsx
│   │   │       └── NoteItem.jsx
│   │   ├── pages/
│   │   │   ├── Homepage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── UserNotes.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── auth.js
│   │   ├── styles/
│   │   │   ├── auth.css
│   │   │   └── notes.css
│   │   ├── App.jsx
│   │   └── index.jsx
│   └── .env
```

## 🌟 Melhorias Recentes

1. **Sistema de Autenticação Reforçado:**

   - Tokens JWT com expiração de 1h
   - Middleware de verificação em todas as rotas protegidas
   - Armazenamento seguro no cliente

2. **Validações Avançadas:**

   - Força de senha em tempo real com feedback visual
   - Validação de formato de nome de usuário
   - Verificação de unicidade no banco de dados

3. **Segurança de Dados:**

   - Criptografia de senhas com bcrypt
   - Geração de IDs únicos com verificação anti-colisão
   - Proteção contra injeção de dados

4. **Experiência do Usuário:**

   - Formulários interativos com validação instantânea
   - Notificações toast para feedback de ações
   - Interface intuitiva e responsiva

## 📬 Contato

**Emerson Sinezio**  
[![Email](https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white)](mailto:emerson.sineziio@gmail.com)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/emerson-sineziio)
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/emerson-sineziio)

---

**Nota:** Este projeto está em constante evolução. Próximas atualizações incluirão recuperação de senha, autenticação de dois fatores e categorização de notas.
