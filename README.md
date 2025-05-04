# DayNotes - Anotações Diárias

![Demo](./front/public/readme/2025-05-03%2022.25.45%20day-notes-client.vercel.app%202d0acfae2b0b.jpg)

Plataforma para gerenciamento de anotações com priorização e organização de tarefas.

[![Vercel Deployment](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://day-notes-client.vercel.app)

## Tecnologias utilizadas

[![React](https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/-Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## ✨ Funcionalidades

**Backend (API):**

- CRUD completo de anotações
- Sistema de priorização inteligente
- Armazenamento em banco de dados MongoDB
- Rotas RESTful para gestão de conteúdo

**Frontend (React):**

- Interface moderna e responsiva
- Visualização em cards organizáveis
- Edição em tempo real
- Priorização visual

## 🛠 Tecnologias

**Backend:**

- Node.js
- Express
- MongoDB/Mongoose
- Vercel (Deploy)

**Frontend:**

- React.js
- Axios (Para integração com API)
- Context API ou Redux (Gestão de estado)
- Styled Components ou CSS Modules

## 📬 Contato

[![Email](https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white)](https://mailto:emerson.sineziio@gmail.com/) [![LinkedIn](https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/emerson-sineziio) [![Whatsapp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/5585992846060)

## 📦 Estrutura do Projeto

```
daynotes/
├── backend/
│ ├── src/
│ │ ├── config/ # Configurações do banco
│ │ ├── controllers/ # Lógica das rotas
│ │ ├── models/ # Modelos do MongoDB
│ │ └── routes.js # Definição de rotas
| | └── index.js # Arquivo principal
│ └── package.json
│
└── frontend/
├── public/
├── src/
│ ├── components/ # Componentes React
│ ├── services/ # Conexão com a API
│ └── App.js # Componente principal
└── package.json
```
