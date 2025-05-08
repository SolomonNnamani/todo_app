const express = require("express");
const cors = require("cors");
const addTask = require("./controllers/addTask.js");
const getTask = require("./controllers/getTask.js");
const checkedTask = require("./controllers/checkedTask.js");
const editTask = require("./controllers/editTask.js");
const deleteTask = require("./controllers/deleteTask.js");
const profile = require("./controllers/profile.js");
const register = require("./controllers/Auth/register.js");
const login = require("./controllers/Auth/login.js");
const forgotPassword = require("./controllers/Auth/forgotPassword.js");
const resetPasssword = require("./controllers/Auth/resetPassword.js");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

getTask(app);
addTask(app);
checkedTask(app);
editTask(app);
deleteTask(app);
profile(app);

//Auth
register(app);
login(app);
resetPasssword(app)
forgotPassword(app)

app.use((req, res) => {
  res.status(404).send(`<h1>Oops! page dont exist </h1>`);
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
