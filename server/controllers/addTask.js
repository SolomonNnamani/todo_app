const Todo = require('../models/mongooseTodo.js');
const verifyToken = require("../middleware/verifyToken.js")

const addTask = (app) => {
  

  //Add new Tasks
  app.post("/api/tasks", verifyToken, async (req, res) => {
    const { task } = req.body;

    try {
      const userTask = new Todo({
        item: task,
        date: new Date().toLocaleDateString("en-GB"),
        userId:req.user.id
      });
      await userTask.save();
      console.log("Task Added: ", userTask);
      res.status(200).json({ userTask });
    } catch (error) {
      console.log("Failed to save task: ", error);
      res.status(500).json({ error: "Fail to add task!" });
    }
  });
};

module.exports = addTask;
