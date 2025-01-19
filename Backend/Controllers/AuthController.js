const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

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
    //sending response in console box to user in json format
    return res.status(200).json({
      message: "Login success",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  }
  catch (error) {
    return res.status(500).json({
      message: "Failed to Login",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
};
