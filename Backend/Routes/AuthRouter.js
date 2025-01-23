const express = require("express");
const router = express.Router();
const {
   signup,
   login,
   verifyOtp,
   resendOTP,
   Forget
} = require("../Controllers/AuthController");
const {
   signupvalidation,
   loginvalidation,
} = require("../Middlewares/AuthValidation");

router.post("/login", loginvalidation, login);

router.post("/signup", signupvalidation, signup);

router.post("/verifyotp", verifyOtp);

router.post("/resendotp", resendOTP);

router.post("/forget", Forget);

module.exports = router;
