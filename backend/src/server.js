const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db.Config");
const routes = require("./routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use(routes);

// Conexão com MongoDB
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Conectado ao MongoDB");

    const PORT = process.env.PORT || 3333;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Falha na conexão com MongoDB:", error);
    process.exit(1);
  }
};

startServer();
