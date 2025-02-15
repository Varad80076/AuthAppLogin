const Joi = require("joi");
const User = require("../models/Users"); 

const signupvalidation = async (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    console.error("Validation Error:", error.details);
    return res.status(400).send({ message: "Bad Request", error: error.details });
  }

  try {
    // Check if username already exists
    const existingUserByName = await User.findOne({ name: req.body.name });
    if (existingUserByName) {
      return res.status(400).send({ message: "Username is already taken" });
    }

    // Check if email already exists
    const existingUserByEmail = await User.findOne({ email: req.body.email });
    if (existingUserByEmail) {
      return res.status(400).send({ message: "Email is already registered" });
    }

    next();
  } catch (err) {
    console.error("Error during uniqueness check:", err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
const loginvalidation = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4).max(100),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    console.error("Validation Error:", error.details); // Log validation error details
    return res.status(400).send({ message: "Bad Request", error: error.details });
  }
  next();
};

module.exports = {
  signupvalidation,
  loginvalidation,
};
