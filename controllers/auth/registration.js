const { registration } = require("../../services/authService");
const { authSchema } = require("../../schema");

const registrationController = async (req, res) => {
  const { error } = authSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ status: 400, message: "Missing fields!" });
  }

  const { email, password } = req.body;
  await registration(email, password);

  res.status(201).json({
    status: 201,
    message: "Created. Please verify your email. We send you a letter!",
  });
};

module.exports = registrationController;
