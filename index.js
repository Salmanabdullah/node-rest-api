// Creates an Express application. The express() function is a top-level function exported by the express module.
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

//Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
dotenv.config();

//You can connect to MongoDB with the mongoose.connect() method. localhost will be chanaged to process.env.VARIABLE_NAME_ON_.ENVfile
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("connected to MONGO_DB");
});

/************middlewares*********************/

//This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

//Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());

//HTTP request logger middleware for node.js
app.use(morgan("common"));

//Routes HTTP GET requests to the specified path with the specified callback functions.
app.get("/", (req, res) => {
  res.send("GET request to homepage");
});

app.listen(8800, () => {
  console.log("Backend server is running");
});
