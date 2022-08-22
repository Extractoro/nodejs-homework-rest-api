const joiSchema = require("./joiSchema");
const authSchema = require("./authJoiSchema");
const { Contact } = require("./mongooseSchema");
const { User } = require("./userSchema");
const favouriteStatus = require("./updateFavouriteStatus");
const subscriptionSchema = require("./subscriptionSchema");

module.exports = {
  joiSchema,
  Contact,
  favouriteStatus,
  User,
  authSchema,
  subscriptionSchema,
};
