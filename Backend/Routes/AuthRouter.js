const express = require("express");
const router = express.Router();
const { signup, login } = require("../Controllers/AuthController");
const {
  signupvalidation,
  loginvalidation,
} = require("../Middlewares/AuthValidation");

router.post("/login", loginvalidation, login);

router.post("/signup", signupvalidation, signup);

module.exports = router;
