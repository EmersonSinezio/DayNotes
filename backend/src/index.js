const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db.Config");
const routes = require("./routes.js");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

console.log("📡 Iniciando conexão...");
console.log("diretorio atual", __dirname);
console.log(
  "variaveis de ambiente",
  process.env.MONGODB_URI ? "existe" : "nao existe",
  process.env.JWT_SECRET ? "existe" : "nao existe"
);

app.use(async (req, res, next) => {
  try {
    console.log("📡 Iniciando conexão...");
    await connectDB();
    next();
  } catch (err) {
    console.error("💥 Erro durante a conexão:");
    console.error(err);
    res.status(500).json({
      error: "Erro de conexão com o banco de dados",
      details:
        process.env.NODE_ENV === "development" && err instanceof Error
          ? err.message
          : undefined,
    });
  }
});
app.use((err, req, res, next) => {
  console.error("💥 ERRO NÃO TRATADO:", err);
  res.status(500).json({
    error: "Erro interno",
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Rotas não encontradas
// Rotas
app.use(routes);
//  Rota de teste
app.get("/test", (req, res) => {
  res.send("Server is working!");
});
app.use((req, res) => {
  console.warn("⚠️ Rota não encontrada:", req.method, req.url);
  res.status(404).json({ error: "Rota não encontrada", url: req.url });
});

// Exportação para Vercel
module.exports = app;
