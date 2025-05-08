const Todo = require('../models/mongooseTodo.js');
const verifyToken = require("../middleware/verifyToken.js")

const editTask = (app) => {
  app.put('/api/edit/:id', verifyToken, async (req, res) => {
    console.log("Received PUT request to /api/edit/:id");
    console.log("Request body: ", req.body);
    
    try {
      // Check if req.body exists
      if (!req.body || Object.keys(req.body).length === 0) {
        console.log('Request body is empty');
        return res.status(400).json({ error: 'Request body is missing' });
      }
      
      const { item, edit, date } = req.body;
      const { id } = req.params;
      
      console.log(`Updating task ${id} with new item: ${item}`);
      
      // Find the task before updating (for debugging)
      const beforeTask = await Todo.findById(id);
      if (!beforeTask) {
        console.log('Task not found');
        return res.status(404).json({ error: 'Task not found' });
      }
      console.log("Task before update:", beforeTask);
      
      // Update the task
      const task = await Todo.findOneAndUpdate(
        {_id:id, userId:req.user.id},
        {
          item, // New task text
          edit: edit !== undefined ? edit : true,
          date: date || new Date().toLocaleDateString("en-GB"),
          
        },
        { new: true } // Return the updated document
      );
      
      console.log('Updated task:', task);
      res.status(200).json(task);
    } catch (error) {
      console.error("Error updating task:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

module.exports = editTask;