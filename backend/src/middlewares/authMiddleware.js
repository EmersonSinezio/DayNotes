// authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Acesso negado" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    if (req.params.userid !== user.userid) {
      return res.status(403).json({ message: "Acesso não autorizado" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = verifyUser;
