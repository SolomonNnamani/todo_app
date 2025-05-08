
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
const password = process.env.MONGO_DB;

mongoose
  .connect(
    `mongodb+srv://solomonnnamani01:${password}@todo.cpbgq3r.mongodb.net/?retryWrites=true&w=majority&appName=todo`
  )
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Error connecting to database: ", err));

const todoSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref:'Userbase'},
  item: { type: String, required: true },
  completed: { type: Boolean, default: false },
  edit: { type: Boolean, default: false },
  date: { type: String, required: true },
});

module.exports =  mongoose.models.Todo || mongoose.model("Todo", todoSchema);
