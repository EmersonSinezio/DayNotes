const Annotations = require("../models/AnnotationData");

module.exports = {
  async read(req, res) {
    try {
      const { userid } = req.params;
      const priorityNotes = await Annotations.find({
        user: userid,
        priority: true,
      })
        .sort({ createdAt: -1 })
        .lean();

      return res.json(priorityNotes);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao buscar anotações prioritárias" });
    }
  },

  async update(req, res) {
    try {
      const { id, userid } = req.params;
      const annotation = await Annotations.findOne({
        _id: id,
        user: userid,
      });

      if (!annotation) {
        return res.status(404).json({ error: "Anotação não encontrada" });
      }

      annotation.priority = !annotation.priority;
      await annotation.save();

      return res.json(annotation);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar prioridade" });
    }
  },
};
