const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator");
const otpmailsender = require("../helper/mailer,js");
const { log } = require("console");

const signup = async (req, res) => {
  console.log("Server is Running");
  try {
    const { name, email, password } = req.body; // Destructure from req.body

    // Check if user exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email is already exists", success: false });
    }
    let user = new Users({ name, email, password }); //import Users Collection in user veriable

    // Hash the password
    user.password = await bcrypt.hash(password, 10);

    //save in database using user veriable
    let result = await user.save();

    //send response to Client in console
    return res.status(201).json({
      message: "User created successfully",
      success: true,
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to save data",
      success: false,
    });
  }
};

const login = async (req, res) => {
  console.log("Server is Running");
  try {
    const { email, password } = req.body; // Destructure from req.body
    const errorMsg = "Auth Failed email or password is wrong";

    // Find user by email and Check it is available in database or not
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    // Checking Password is match to database or not
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    // Cheking JWT Token if credentials are correct or not
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    //Generating the Otp for the Otp verification

    let otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const existingOtp = await OTP.findOne({ email });
    if (existingOtp) {
      // Update the OTP if it already exists
      await OTP.updateOne({ email }, { $set: { otp } });
    } else {
      // Create a new OTP entry
      const newOtp = new OTP({ email, otp });
      await newOtp.save();
    }

    const mailResponse = await otpmailsender(user.email, otp, "VERIFY");

    // console.log("OTP Email Response:", mailResponse);

    //sending response in console box to user in json format

    return res.status(200).json({
      message: "Login success",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to Login",
      success: false,
    });
  }
};

//OTP VERIFICATION CODE
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await Users.findOne({ email });
    const existing = await OTP.findOne({ email });

    if (!existing) {
      return res.status(403).json({ success: false, alert: "Invalid OTP" });
    }
    if (existing.otp === otp) {
      // OTP matches
      existing.otp = null; // Clear OTP after successful verification
      existing.markModified("otp");
      await existing.save();

      if (!user) {
        return res
          .status(404)
          .json({ success: false, alert: "User not found" });
      }
      
      return res.status(200).json({
        success: true,
        alert: "OTP verified successfully",
        email: user.email,
        name: user.name,
      });
    } else {
      // OTP does not match
      return res
        .status(400)
        .json({ alert: "Invalid OTP! OTP not found", success: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, alert: "OTP verification failed" });
  }
};

module.exports = {
  signup,
  login,
  verifyOtp,
};
