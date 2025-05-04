# DayNotes - Anotações Diárias

![Demo](./front/public/readme/2025-05-03%2022.25.45%20day-notes-client.vercel.app%202d0acfae2b0b.jpg)

Plataforma para gerenciamento de anotações com priorização e organização de tarefas.

[![Vercel Deployment](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://day-notes-client.vercel.app)

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
