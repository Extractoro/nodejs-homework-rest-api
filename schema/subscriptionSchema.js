const Joi = require("joi");

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valueOf("starter", "pro", "business").required(),
});

module.exports = subscriptionSchema;
