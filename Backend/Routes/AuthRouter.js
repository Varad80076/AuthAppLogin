const express = require("express");
const router = express.Router();
const { signup, login, verifyOtp,resendOTP } = require("../Controllers/AuthController");
const {
  signupvalidation,
  loginvalidation,
} = require("../Middlewares/AuthValidation");

router.post("/login", loginvalidation, login);

router.post("/signup", signupvalidation, signup);

router.post("/verifyotp", verifyOtp);

router.post("/resendotp", resendOTP);

module.exports = router;
