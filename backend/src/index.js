const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db.Config");
const routes = require("./routes.js");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
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
  res.status(404).json({ error: "Rota não encontrada", url: req.url });
});

// Exportação para Vercel
module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3333;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
