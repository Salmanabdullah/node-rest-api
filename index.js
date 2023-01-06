// Creates an Express application. The express() function is a top-level function exported by the express module.
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

//Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
dotenv.config();

//database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected"))
  .catch(() => console.log("No connection"));
/************middlewares*********************/

//This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

//Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());

//HTTP request logger middleware for node.js
app.use(morgan("common"));

//Routes HTTP GET requests to the specified path with the specified callback functions.
// app.get("/", (req, res) => {
//   res.send("welcome to homepage");
// });

// app.get("/users", (req, res) => {
//   res.send("welcome to UserPage");
// });

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log("Backend server is running");
});
