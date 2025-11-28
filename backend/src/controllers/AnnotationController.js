const User = require("../models/User");

module.exports = {
  async read(req, res) {
    try {
      const { userid } = req.params;
      const user = await User.findOne({ userid });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      return res.json(user.tasks);
    } catch (error) {
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  },

  async create(req, res) {
    try {
      const { userid } = req.params;
      const { title, notes, priority } = req.body;

      const user = await User.findOne({ userid });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const newTask = {
        title,
        notes,
        priority: priority || false,
      };

      user.tasks.push(newTask);
      await user.save();

      // Return the last added task (which includes the generated _id)
      return res.status(201).json(user.tasks[user.tasks.length - 1]);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao criar anotação",
        details: error.message,
      });
    }
  },

  async delete(req, res) {
    try {
      const { id, userid } = req.params;

      const user = await User.findOneAndUpdate(
        { userid },
        { $pull: { tasks: { _id: id } } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      return res.json({ message: "Anotação deletada com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar anotação" });
    }
  },
};
