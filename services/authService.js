const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const gravatar = require("gravatar");

const avatarsDir = path.join(__dirname, "..", "public", "avatars");

const registration = async (email, password) => {
  const user = await User.findOne({ email });

  if (user !== null && !(await bcrypt.compare(email, user.email))) {
    throw new Error("Email in use");
  }

  const url = gravatar.url(email, { protocol: "https" }, false);

  const userCreation = new User({
    email,
    password,
    avatarURL: url,
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
      avatarURL: user.avatarURL,
    },
    process.env.JWT_SECRET
  );

  return token;
};

const logout = async (userId) => {
  const userLogout = await User.findByIdAndUpdate(userId, { token: "" });
  return userLogout;
};

const updateSubcription = async (userId, body) => {
  const result = await User.findByIdAndUpdate(userId, body, {
    new: true,
  });

  return result;
};

const uploadAvatar = async (userId, originalName, tempPath) => {
  const [extension] = originalName.split(".").reverse();
  const newName = `${userId}.${extension}`;
  const updatePath = path.join(avatarsDir, newName);

  fs.rename(tempPath, updatePath, (err) => {
    if (err) {
      console.log(err);
    }
  });

  const avatarURL = path.join("avatars", newName);
  const minAvatarURL = path.join("public", "avatars", newName);

  Jimp.read(minAvatarURL, (err, newName) => {
    if (err) throw err;
    newName.resize(250, 250).quality(60).write(minAvatarURL);
  });

  await User.findByIdAndUpdate(
    userId,
    { avatarURL: minAvatarURL },
    {
      new: true,
    }
  );

  return avatarURL;
};

module.exports = {
  registration,
  login,
  logout,
  updateSubcription,
  uploadAvatar,
};
