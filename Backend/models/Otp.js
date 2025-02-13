//mongoose implimentation
const mongoose = require("mongoose");
//create Schema
const otpSchema = mongoose.Schema({
  email: {
    type: "String",
    required: true,
    unique: true,
  },
  otp: {
    type: "String",
    // required: true,
  },
  time: {
    type: "String",
    // required: true,
  },
  token: {
    type: "String",
    // required: true,
  },
});
//export Schema
module.exports = mongoose.model("otps", otpSchema);
