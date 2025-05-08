const Todo = require("../models/mongooseTodo.js");
const verifyToken = require("../middleware/verifyToken.js")
const checkedTask = (app) => {
  app.put("/api/tasks/:id", verifyToken, async (req, res) => {
    try {
      const { completed } = req.body;
      const { id } = req.params;
      let userTaskCheck = await Todo.findOneAndUpdate(
      {_id: id, userId:req.user.id});
      if (!userTaskCheck) {
        return res.status(404).json({ err: "Task not found" });
      }
      userTaskCheck.completed = completed;
      await userTaskCheck.save();
      res.status(200).json(userTaskCheck);
    } catch (error) {
      console.log("Failed to update task: ", error);
      res.status(500).json({ err: "Failed to update task" });
    }
  });
};

module.exports = checkedTask;
