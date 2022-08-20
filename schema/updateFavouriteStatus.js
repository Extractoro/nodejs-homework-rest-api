const Joi = require("joi");

const updateFavouriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = updateFavouriteSchema;
