//const path = require("path");
const express = require("express");

const { register, login } = require("./controllers/auth.controller");
const studentController = require("./controllers/student.controller");

const app = express();
app.use(express.json());

app.post("/register", register);
app.post("/login", login);
app.use("/students", studentController)


module.exports = app;