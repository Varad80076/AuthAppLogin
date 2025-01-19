//mongoose implimentation
const mongoose = require("mongoose");
//create Schema
const userSchema = mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  email: {
    type: "String",
    required: true,
    unique: true,
  },
  password: {
    type: "String",
    required: true,
  },
});
//export Schema
module.exports = mongoose.model("users", userSchema);
