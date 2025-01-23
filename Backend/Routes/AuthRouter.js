const express = require("express");
const router = express.Router();
const { signup, login, verifyOtp } = require("../Controllers/AuthController");
const {
  signupvalidation,
  loginvalidation,
} = require("../Middlewares/AuthValidation");

router.post("/login", loginvalidation, login);

router.post("/signup", signupvalidation, signup);

router.post("/verifyotp", verifyOtp);

module.exports = router;
