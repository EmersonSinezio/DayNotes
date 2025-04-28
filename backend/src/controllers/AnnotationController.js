const Annotations = require("../models/AnnotationData");

module.exports = {
  async read(req, res) {
    try {
      const annotationList = await Annotations.find()
        .sort({ createdAt: -1 })
        .lean();
      return res.json(annotationList);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Erro ao buscar anotações" });
    }
  },

  async create(req, res) {
    try {
      const { title, notes, priority } = req.body;

      if (!notes || !title) {
        return res
          .status(400)
          .json({ error: "É necessário um título e uma anotação" });
      }

      const annotationCreated = await Annotations.create({
        title,
        notes,
        priority: priority || false,
      });

      return res.status(201).json(annotationCreated);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Erro ao criar anotação" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const annotationDeleted = await Annotations.findByIdAndDelete(id);

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
