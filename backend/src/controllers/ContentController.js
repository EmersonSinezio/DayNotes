const Annotations = require("../models/AnnotationData");

module.exports = {
  async update(req, res) {
    try {
      const { id, userid } = req.params;
      const updates = req.body;

      const annotation = await Annotations.findOneAndUpdate(
        { _id: id, user: userid },
        updates,
        { new: true }
      );

      if (!annotation) {
        return res.status(404).json({ error: "Anotação não encontrada" });
      }

      return res.json(annotation);
    } catch (error) {
      console.error("Erro detalhado:", error);
      return res.status(500).json({
        error: "Erro ao atualizar anotação",
        details: error.message,
      });
    }
  },
};
