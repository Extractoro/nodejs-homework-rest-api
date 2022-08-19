const { User } = require("../schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registration = async (email, password) => {
  const user = await User.findOne({ email });

  if (user !== null && !(await bcrypt.compare(email, user.email))) {
    throw new Error("Email in use");
  }

  const userCreation = new User({
    email,
    password,
  });

  await userCreation.save();
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("No user with this email");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error("Email or password is wrong");
  }

  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      subscription: user.subscription,
    },
    process.env.JWT_SECRET
  );

  return token;
};

const logout = async (userId) => {
  const userLogout = await User.findByIdAndUpdate(userId, { token: "" });
  return userLogout;
};

module.exports = {
  registration,
  login,
  logout,
};
