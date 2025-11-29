const User = require("../models/User");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

module.exports = {
  async register(req, res) {
    try {
      const { username, password, email } = req.body;

      // Check if user or email already exists
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (existingUser) {
        return res.status(400).json({ message: "Usuário ou email já existe" });
      }

      const user = new User({
        username,
        password,
        email,
        userid: crypto.randomBytes(8).toString("hex"),
        createdAt: Date.now(),
      });
      await user.save();
      res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Validate required fields
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username e password são obrigatórios" });
      }

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      // Compare passwords using model method
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      // Check if JWT_SECRET is defined
      if (!process.env.JWT_SECRET) {
        throw new Error("Variável de ambiente JWT_SECRET não configurada");
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async me(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Acesso negado" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user)
        return res.status(404).json({ message: "Usuário não encontrado" });

      res.json(user);
    } catch (error) {
      res.status(401).json({ message: "Token inválido" });
    }
  },
};
