const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const gravatar = require("gravatar");
const sgMail = require("@sendgrid/mail");
const { v4: uuid } = require("uuid");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const avatarsDir = path.join(__dirname, "..", "public", "avatars");

const registration = async (email, password) => {
  const user = await User.findOne({ email });

  if (user !== null && !(await bcrypt.compare(email, user.email))) {
    throw new Error("Email in use");
  }

  const url = gravatar.url(email, { protocol: "https" }, false);
  const verificationToken = uuid();

  const userCreation = new User({
    email,
    password,
    avatarURL: url,
    verificationToken,
  });

  await userCreation.save();

  const msg = {
    to: email,
    from: "vadymtytarenkoo@gmail.com",
    subject: "Confirm your email",
    text: `Please, <a href="http://localhost:3000/api/auth/registration_confirm/${verificationToken}">confirm</a> your email`,
    html: `Please, <a href="http://localhost:3000/api/auth/registration_confirm/${verificationToken}">confirm</a> your email`,
  };

  await sgMail.send(msg);
};

const registrationConfirm = async (verificationToken) => {
  const user = await User.findOne({ verificationToken, tokenIsActive: true });

  if (!user) {
    throw new Error("Invalid or expired verification token!");
  }

  user.tokenIsActive = false;
  user.verify = true;
  await user.save();

  const msg = {
    to: user.email,
    from: "vadymtytarenkoo@gmail.com",
    subject: "You successfully registered!",
    text: `You successfully registered! Thank you that you with us`,
    html: `You successfully registered! Thank you that you with us`,
  };

  await sgMail.send(msg);
};

const confirmationResend = async (email) => {
  const user = await User.findOne({ email, verify: false });

  if (!user) {
    throw new Error("Verification has already been passed");
  }

  const msg = {
    to: email,
    from: "vadymtytarenkoo@gmail.com",
    subject: "Confirm your email",
    text: `Please, <a href="http://localhost:3000/api/auth/registration_confirm/${user.verificationToken}">confirm</a> your email`,
    html: `Please, <a href="http://localhost:3000/api/auth/registration_confirm/${user.verificationToken}">confirm</a> your email`,
  };

  await sgMail.send(msg);
};

const login = async (email, password) => {
  const user = await User.findOne({ email, verify: true });

  if (!user) {
    throw new Error("No user with this email or you do not verify your email");
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
  registrationConfirm,
  confirmationResend,
  login,
  logout,
  updateSubcription,
  uploadAvatar,
};
