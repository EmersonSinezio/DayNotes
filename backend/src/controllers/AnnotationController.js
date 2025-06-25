<<<<<<< HEAD
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
      const { userid } = req.params;
      const { title, notes, priority } = req.body;

      const user = await User.findOne({ userid });
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      // Gera ID único com verificação de colisão
      let id;
      let existingNote;
      do {
        id = crypto.randomBytes(8).toString("hex");
        existingNote = await Annotations.findOne({ id });
      } while (existingNote);

      const annotationCreated = await Annotations.create({
        title,
        notes,
        priority: priority || false,
        user: user.userid,
        id,
      });

      return res.status(201).json(annotationCreated);
    } catch (error) {
      console.error("Erro ao criar anotação:", error);
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
=======
const Annotations = require("../models/AnnotationData");
const User = require("../models/User"); // Adicione esta linha
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
      console.log("---------- NOVA REQUISIÇÃO ----------");
      console.log("Headers:", req.headers);
      console.log("Params:", req.params);
      console.log("Body:", req.body);

      const { userid } = req.params;
      const { title, notes, priority } = req.body;

      console.log("Buscando usuário com userid:", userid);
      const user = await User.findOne({ userid });

      if (!user) {
        console.error("Usuário não encontrado");
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      console.log("Criando nota para o usuário:", user);
      const annotationCreated = await Annotations.create({
        title,
        notes,
        priority: priority || false,
        user: user.userid,
      });

      console.log("Nota criada com sucesso:", annotationCreated);
      return res.status(201).json(annotationCreated);
    } catch (error) {
      console.error("Erro detalhado:", error);
      return res.status(500).json({
        error: "Erro ao criar anotação",
        details: error.message,
      });
    }
  },
  async update(req, res) {
    try {
      const { id, userid } = req.params;
      const { title, notes } = req.body;

      // Atualiza a nota apenas se pertencer ao usuário
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
>>>>>>> style
