const express = require("express");
const router = express.Router();
const {
   signup,
   login,
   verifyOtp,
   resendOTP,
   forgetpass,
   resetpass
} = require("../Controllers/AuthController");
const {
   signupvalidation,
   loginvalidation,
} = require("../Middlewares/AuthValidation");

router.post("/login", loginvalidation, login);

router.post("/signup", signupvalidation, signup);

router.post("/verifyotp", verifyOtp);

router.post("/resendotp", resendOTP);

router.post("/forget", forgetpass);

router.post("/reset", resetpass);

module.exports = router;
