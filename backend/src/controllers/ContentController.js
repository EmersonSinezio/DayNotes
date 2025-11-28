const User = require("../models/User");

module.exports = {
  async update(req, res) {
    try {
      const { id, userid } = req.params;
      const { title, notes } = req.body;

      const user = await User.findOneAndUpdate(
        { userid, "tasks._id": id },
        {
          $set: {
            "tasks.$.title": title,
            "tasks.$.notes": notes,
          },
        },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: "Anotação não encontrada" });
      }

      // Find the updated task to return it
      const updatedTask = user.tasks.id(id);

      return res.json(updatedTask);
    } catch (error) {
      console.error("Erro detalhado:", error);
      return res.status(500).json({
        error: "Erro ao atualizar anotação",
        details: error.message,
      });
    }
  },
};
