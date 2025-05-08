const Todo = require("../models/mongooseTodo.js");
const verifyToken = require("../middleware/verifyToken.js")
const getTask = (app) => {
  //fetch All Tasks
  app.get("/api/tasks", verifyToken,  async (req, res) => {
    try {
      const fetchTasks = await Todo.find({userId: req.user.id});
      res.status(200).json(fetchTasks);
    } catch (error) {
      console.log("Failed to fetch saved data: ", error);
      res.status(500).json({ error: "Failed to fetch Data." });
    }
  });
};
module.exports = getTask;
