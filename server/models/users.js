const mongoose = require("mongoose");
const dotenv = require("dotenv");
const password = process.env.MONGO_DB;
dotenv.config();

mongoose
  .connect(
    `mongodb+srv://solomonnnamani01:${password}@todo.cpbgq3r.mongodb.net/?retryWrites=true&w=majority&appName=todo`
  )
  .then(() => console.log("Registration database connected"))
  .catch((error) => console.log("Error connecting to database:", error));

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //New Fields
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});
module.exports = mongoose.model("Userbase", userSchema);
