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
const port = process.env.PORT || 3001;

const allowedOrigins = [
 'http://localhost:5173',                // Development
  'https://tasksflow01.netlify.app'       // Production
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }
    
    console.log('Request origin:', origin);
    console.log('Allowed origins:', allowedOrigins);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
//app.use(cors())

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
