const express = require("express");

const router = express.Router();

const Student = require("../models/student.model");

const authenticate = require("../middlewares/authenticate");

router.get("/new", function (req, res) {
  return res.render("student/new");
});

router.get("/", authenticate, async function (req, res) {
  const students = await Student.find().lean().exec();
  const user = req.user;

  delete user.password;
  return res.send({ students, user });
});

module.exports = router;
