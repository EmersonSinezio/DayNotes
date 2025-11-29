# DayNotes - Sistema de Anotações Seguras e Produtividade 📝🔒📅

![Demo](/front/public/readme/homepage.jpg)

Aplicação fullstack para gerenciamento de anotações, tarefas e produtividade. Além de anotações seguras, o sistema oferece um Calendário interativo, Quadro Kanban para gestão de projetos e um Dashboard com estatísticas detalhadas.

> ✨ **Novidades na versão atual:**
>
> - 📅 **Calendário Interativo:** Visualize e gerencie tarefas por data.
> - 📋 **Quadro Kanban:** Organize projetos em colunas (A Fazer, Em Progresso, Concluído).
> - 📊 **Dashboard Completo:** Estatísticas de produtividade e gráficos de atividades.
> - 🎨 **Interface Moderna:** Design responsivo com Tailwind CSS.
> - 🔐 **Segurança Reforçada:** Autenticação JWT e validação robusta.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://day-notes-client.vercel.app)

## 🛠 Tecnologias Utilizadas

### Frontend

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-7.5.3-CA4245?logo=react-router)](https://reactrouter.com/)
[![React Toastify](https://img.shields.io/badge/React_Toastify-11.0.5-FF813F)](https://fkhadra.github.io/react-toastify/)
[![Axios](https://img.shields.io/badge/Axios-1.1.3-5A29E4?logo=axios)](https://axios-http.com/)

### Backend

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-6.7.0-880000)](https://mongoosejs.com/)
[![JWT](https://img.shields.io/badge/JWT-9.0.2-000000?logo=jsonwebtokens)](https://jwt.io/)

## ✨ Funcionalidades Principais

### 📅 Produtividade e Organização

- **Calendário**: Visualização mensal com tarefas agendadas.
- **Kanban Board**: Gestão visual de tarefas com drag-and-drop (arrastar e soltar).
- **Dashboard**: Visão geral do progresso, tarefas pendentes e estatísticas.

### 🔐 Segurança e Autenticação

- Registro com validação forte de senha.
- Login com tokens JWT e armazenamento seguro.
- Proteção contra ataques de força bruta.

### 📝 Gerenciamento de Notas

- Criação, edição e exclusão de notas.
- Categorização e priorização.
- Busca e filtros avançados.

## 🔧 Instalação e Execução

### Pré-requisitos

- Node.js 18.x
- MongoDB (local ou Atlas)
- NPM 9.x+

1. **Clone o repositório:**

```bash
git clone https://github.com/EmersonSinezio/DayNotes.git
cd DayNotes
```

2. **Configure o Backend:**

```bash
cd backend
npm install
cp .env.example .env
# Edite o .env com suas configurações (MongoDB URI, JWT Secret, etc.)
```

3. **Configure o Frontend:**

```bash
cd front
npm install
# O frontend espera que o backend esteja rodando na porta definida (padrão 3333)
```

4. **Inicie os serviços:**

```bash
# Terminal 1 (Backend):
cd backend
npm run dev

# Terminal 2 (Frontend):
cd front
npm run dev
```

5. **Acesse a aplicação:**

```text
http://localhost:3000
```

## 📬 Contato

**Emerson Sinezio**
[![Email](https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white)](mailto:emerson.sineziio@gmail.com)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/emerson-sineziio)
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/emerson-sineziio)

---

**Nota:** Este projeto está em constante evolução.
