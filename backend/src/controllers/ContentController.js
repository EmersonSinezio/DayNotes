const Annotations = require("../models/AnnotationData");

module.exports = {
  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, notes } = req.body;

      const annotation = await Annotations.findById(id);

      if (!annotation) {
        return res.status(404).json({ error: "Anotação não encontrada" });
      }

      if (title) annotation.title = title;
      if (notes) annotation.notes = notes;

      await annotation.save();
      return res.json(annotation);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Erro ao atualizar anotação" });
    }
  },
};
