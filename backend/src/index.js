const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db.Config");
const routes = require("./routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// app.use(async (req, res, next) => {
//   try {
//     console.log("📡 Iniciando conexão...");
//     await connectDB();
//     next();
//   } catch (err) {
//     console.error("💥 Erro durante a conexão:");
//     console.error(err);
//     res.status(500).json({
//       error: "Erro de conexão com o banco de dados",
//       details:
//         process.env.NODE_ENV === "development" && err instanceof Error
//           ? err.message
//           : undefined,
//     });
//   }
// });

const startServer = async () => {
  try {
    await connectDB();
    app.listen(3001, () => {
      console.log(`🚀 Servidor iniciado na porta http://localhost:${3001}`);
    });
  } catch (err) {
    console.error("💥 Erro durante a conexão:");
    console.error(err);
  }
};

startServer();

// Rotas
app.use(routes);

// Exportação para Vercel
module.exports = app;
