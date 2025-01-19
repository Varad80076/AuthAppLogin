const Joi = require("joi");

const signupvalidation = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    console.error("Validation Error:", error.details); // Log validation error details
    return res.status(400).send({ message: "Bad Request", error: error.details });
  }
  next();
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
