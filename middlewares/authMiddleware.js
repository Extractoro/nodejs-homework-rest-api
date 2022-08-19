const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");

  if (!token) {
    throw new Error("Not authorized");
  }

  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
};

module.exports = {
  authMiddleware,
};
