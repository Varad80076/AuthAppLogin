const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator");
const otpmailsender = require("../helper/mailer,js");

//SIGNUP CODE
const signup = async (req, res) => {
   console.log("Server is Running");
   try {
      const { name, email, password } = req.body; // Destructure from req.body

      // Check if user exists
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
         return res
            .status(409)
            .json({ message: "Email is already exists", success: false});
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
      });
   } catch (error) {
      return res.status(500).json({
         message: "Failed to save data",
         success: false,
      });
   }
};

//LOGIN CODE 
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
      const expirationTime = Date.now() + 5 * 1000; //5sec

      const existingOtp = await OTP.findOne({ email });
      if (existingOtp) {
         // Update the OTP if it already exists
         await OTP.updateOne(
            { email },
            { $set: { otp, time: expirationTime } }
         );
      } else {
         // Create a new OTP entry
         const newOtp = new OTP({ email, otp, time: expirationTime });
         await newOtp.save();
      }

      const updatedOtp = await OTP.findOne({ email });

      const mailResponse = await otpmailsender(user.email,null, otp, "VERIFY");

      //sending response in console box to user in json format

      return res.status(200).json({
         alert: "Login success",
         success: true,
         jwtToken,
         email,
         name: user.name,
         time: updatedOtp.time,
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
   console.log("running otp verification");

   try {
      const { email, otp} = req.body;
   
      const user = await Users.findOne({ email });
      const existing = await OTP.findOne({ email });

      if (!existing) {
         return res.status(403).json({ success: false, alert: "Invalid OTP" });
      }

      if (existing.otp === otp) {
         // OTP matches
         existing.otp = null;
         existing.time = 0;
         existing.markModified("otp");
         existing.markModified("time");
         await existing.save();

         if (!user) {
            
            return res
               .status(404)
               .json({ success: false, message: "User not found" });
         }

         return res.status(200).json({
            success: true,
            alert: "OTP verified successfully",
            email: user.email,
            name: user.name,
         });

      } else {
         // OTP does not match
         existing.otp = null;
         existing.time = 0;
         existing.markModified("otp");
         existing.markModified("time");
            await existing.save();
         return res
            .status(400)
            .json({ alert: "Invalid OTP! OTP not found", success: false });
      }
   } catch (error) {
      res.status(500).json({
         success: false,
         alert: "OTP verification failed",
      });
   }
};

//RESNED OTP CODE
const resendOTP = async (req, res) => {
   console.log("server is running");

   try {
      const { email } = req.body;
      let otp = otpGenerator.generate(4, {
         upperCaseAlphabets: false,
         specialChars: false,
         lowerCaseAlphabets: false,
      });

      const expirationTime = Date.now() + 5 * 1000; //5sec
      const existingOtp = await OTP.findOne({ email });

      if (existingOtp) {
         // Update the OTP if it already exists
         await OTP.updateOne(
            { email },
            { $set: { otp, time: expirationTime } }
         );
      } else {
         // Create a new OTP entry
         const newOtp = new OTP({ email, otp, time: expirationTime,token:null });
         await newOtp.save();
      }
      const updatedOtp = await OTP.findOne({ email });
      const mailResponse = await otpmailsender(updatedOtp.email,null, otp, "VERIFY");
      return res.status(200).json({
         message: "Resend Otp success",
         success: true,
      });
   } catch (error) {
      res.status(500).json({ success: false, message: "Failed to resend OTP" });
   }
};
//forget password email
const forgetpass = async (req,res) => {

   try {
      const { email } = req.body;
      const user = await Users.findOne({ email });
      if (!user) {
         return res.status(404).json({ success: false, message: "User not found"});
      }
            
      // Generate JWT token with 20 minutes expiration
      const jwtToken = jwt.sign(
         { email: user.email, _id: user._id },
         process.env.JWT_SECRET,
         { expiresIn: "20m" } // Token expires in 20 minutes
      );
      const resetLink = `http://localhost:5173/reset-password/${jwtToken}`;
      // const newOtp = new OTP({ email, otp:null, time: null, resetLink });
      // await OTP.updateOne(
      //    { email:user.email },
      //    { $set: { token:resetLink } }
      // );
         // await newOtp.save();
      if (user.email === email) {
         const mailResponse = await otpmailsender(email,resetLink, null, "RESET");
         return res.status(200).json({
            success: true,
            message: "Mail send successfully",
            jwtToken,
            email: user.email,
            name: user.name,
         });
      } else {
         // OTP does not match
         return res
            .status(400)
            .json({ alert: "Invalid Email! Link not found", success: false });
      }
      
   } catch (error) {
      res.status(500).json({ success: false, alert: "Failed to send Email" });
   }
}


//Reset Password
const resetpass = async (req, res) => {

   try {
      
      const { token,password } = req.body;
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const { email, _id } = decoded;
      // const otp = await OTP.findOne({ token });
      // if (token === otp.token) {
      //    console.log("token equal aahe re")
      // }
      const user = await Users.findOne({ _id });
      const errorMsg = "User Not Found! Please try again."
      if (!user) {
         return res.status(403).json({ message: errorMsg, success: false });
      }
      // await OTP.updateOne(
      //    { email },
      //    { $set: { token:null } }
      // );
      // Hash the password
      const hashpassword = await bcrypt.hash(password, 10);
      if (user) {
         // Update the Password if it already exists
         console.log('Updating password for:', user.email, user._id);

         await Users.updateOne(
            { _id },
            { $set: { password:hashpassword } }
            
         )
         return res.status(200).json({
            message: "Password reset successfully",
            success: true,
            
         });
      }
      else{
         return res.status(409).json({
            message: "Password reset successfully",
            success: true,
         });
      }
      

   } catch (error) {
      res.status(500).json({ success: false, alert: "Failed to Reset Password" });
   }
}

module.exports = {
   signup,
   login,
   verifyOtp,
   resendOTP,
   forgetpass,
   resetpass
};
