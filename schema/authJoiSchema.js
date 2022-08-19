const Joi = require("joi");

const authSchema = Joi.object({
  email: Joi.string().min(8).max(24).required(),
  password: Joi.string().min(8).max(24).required(),
});

module.exports = authSchema;
