const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    ref: "User",
    required: [true, "Nome de usuário é obrigatório"],
    unique: true,
    trim: true,
    minlength: [3, "Nome de usuário deve ter pelo menos 3 caracteres"],
  },
  password: {
    type: String,
    required: [true, "Senha é obrigatória"],
    minlength: [6, "Senha deve ter pelo menos 6 caracteres"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userid: {
    type: String,
    required: true,
    unique: true,
    default: () => Math.random().toString(36).substr(2, 9),
  },
});

// Middleware pré-save aprimorado
userSchema.pre("save", async function (next) {
  try {
    // Só executa se a senha foi modificada
    if (!this.isModified("password")) return next();

    // Garante que a senha é uma string
    const passwordStr = String(this.password);

    // Gera o salt
    const salt = await bcrypt.genSalt(10);

    // Cria o hash
    const hash = await bcrypt.hash(passwordStr, salt);

    // Atribui o hash à senha
    this.password = hash;

    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar senhas
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // Converte para string
    const candidate = String(candidatePassword);
    return await bcrypt.compare(candidate, this.password);
  } catch (error) {
    throw new Error("Falha na comparação de senhas");
  }
};

module.exports = mongoose.model("User", userSchema);
