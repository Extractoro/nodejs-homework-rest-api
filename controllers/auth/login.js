const { login } = require("../../services/authService");
const { authSchema } = require("../../schema");

const loginController = async (req, res) => {
  const { error } = authSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ status: 400, message: "Missing fields" });
  }

  const { email, password } = req.body;
  const token = await login(email, password);

  res.status(200).json({ status: 200, token });
};

module.exports = loginController;
