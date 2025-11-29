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
  email: {
    type: String,
    required: [true, "Email é obrigatório"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props) => `${props.value} não é um email válido!`,
    },
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
  tasks: [
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      notes: {
        type: String,
        required: true,
        trim: true,
      },
      priority: {
        type: Boolean,
        default: false,
      },
      status: {
        type: String,
        enum: ["active", "pending", "inProgress", "review", "done"],
        default: "active",
      },
      category: {
        type: String,
        default: "General",
      },
      dueDate: {
        type: Date,
      },
      progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
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
