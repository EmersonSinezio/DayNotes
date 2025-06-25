const Annotations = require("../models/AnnotationData");
const User = require("../models/User");
const crypto = require("crypto");

module.exports = {
  async read(req, res) {
    try {
      const { userid } = req.params;
      const notes = await Annotations.find({ user: userid }).lean();
      return res.json(notes);
    } catch (error) {
      console.error("Erro ao buscar notas:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  },

  async create(req, res) {
    try {
      const user = req.user; // pega direto do middleware
      const { title, notes, priority } = req.body;

      // Gera um id único para a anotação
      let id, exists;
      do {
        id = crypto.randomBytes(8).toString("hex");
        exists = await Annotations.findOne({ id });
      } while (exists);

      const annotation = await Annotations.create({
        title,
        notes,
        priority: !!priority,
        user: req.user._id, // seu schema usa user: String
        id,
      });

      return res.status(201).json(annotation);
    } catch (err) {
      console.error("Erro ao criar anotação:", err);
      return res
        .status(500)
        .json({ error: "Erro ao criar anotação", details: err.message });
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
      console.error("Erro ao atualizar anotação:", error);
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
      console.error("Error:", error);
      return res.status(500).json({ error: "Erro ao deletar anotação" });
    }
  },
};
