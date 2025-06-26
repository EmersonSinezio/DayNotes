const Annotations = require("../models/AnnotationData");
const User = require("../models/User");

module.exports = {
  async read(req, res) {
    try {
      const { userid } = req.params;
      const notes = await Annotations.find({ user: userid }).lean();
      return res.json(notes);
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

      const annotationCreated = await Annotations.create({
        title,
        notes,
        priority: priority || false,
        user: user.userid,
        id: user._id,
      });

      return res.status(201).json(annotationCreated);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao criar anotação",
        details: error.message,
      });
    }
  },
  async update(req, res) {
    try {
      const { userid, id } = req.params;
      const { title, notes } = req.body;

      const updatedNote = await Annotations.findOneAndUpdate(
        { _id: id, user: userid },
        { title, notes },
        { new: true, runValidators: true }
      );

      if (!updatedNote) {
        return res.status(404).json({ error: "Anotação não encontrada" });
      }

      return res.json(updatedNote);
    } catch (error) {
      return res.status(500).json({
        error: "Erro interno no servidor",
        details: error.message,
      });
    }
  },
  async delete(req, res) {
    try {
      const { id, userid } = req.params;
      const annotationDeleted = await Annotations.findOneAndDelete({
        _id: id,
        user: userid,
      });

      if (!annotationDeleted) {
        return res.status(404).json({ error: "Anotação não encontrada" });
      }

      return res.json({ message: "Anotação deletada com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar anotação" });
    }
  },
};
