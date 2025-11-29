const User = require("../models/User");

module.exports = {
  // Get all tasks for a user
  async read(req, res) {
    try {
      const { userid } = req.params;
      const user = await User.findOne({ userid });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json(user.tasks);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // Create a new task
  async create(req, res) {
    try {
      const { userid } = req.params;
      const { title, notes, priority, status, category, dueDate, progress } =
        req.body;

      const user = await User.findOne({ userid });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const newTask = {
        title,
        notes,
        priority: priority || false,
        status: status || "active",
        category: category || "General",
        dueDate: dueDate,
        progress: progress || 0,
      };

      user.tasks.push(newTask);
      await user.save();

      // Return the last added task (which includes the generated _id)
      return res.status(201).json(user.tasks[user.tasks.length - 1]);
    } catch (error) {
      return res.status(500).json({
        error: "Error creating task",
        details: error.message,
      });
    }
  },

  // Update a task
  async update(req, res) {
    try {
      const { id, userid } = req.params;
      const { title, notes, status, priority, category, dueDate, progress } =
        req.body;

      const updateData = {};
      if (title !== undefined) updateData["tasks.$.title"] = title;
      if (notes !== undefined) updateData["tasks.$.notes"] = notes;
      if (status !== undefined) updateData["tasks.$.status"] = status;
      if (priority !== undefined) updateData["tasks.$.priority"] = priority;
      if (category !== undefined) updateData["tasks.$.category"] = category;
      if (dueDate !== undefined) updateData["tasks.$.dueDate"] = dueDate;
      if (progress !== undefined) updateData["tasks.$.progress"] = progress;

      const user = await User.findOneAndUpdate(
        { userid, "tasks._id": id },
        {
          $set: updateData,
        },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: "Task not found" });
      }

      // Find the updated task to return it
      const updatedTask = user.tasks.id(id);

      return res.json(updatedTask);
    } catch (error) {
      console.error("Detailed error:", error);
      return res.status(500).json({
        error: "Error updating task",
        details: error.message,
      });
    }
  },

  // Delete a task
  async delete(req, res) {
    try {
      const { id, userid } = req.params;

      const user = await User.findOneAndUpdate(
        { userid },
        { $pull: { tasks: { _id: id } } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json({ message: "Task deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Error deleting task" });
    }
  },
};
