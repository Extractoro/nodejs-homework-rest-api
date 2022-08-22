const { registration } = require("../../services/authService");
const { authSchema } = require("../../schema");

const registrationController = async (req, res) => {
  const { error } = authSchema.validate(req.body);
  if (error) {
    return res.json({ status: 400, message: "Missing fields" });
  }

  const { email, password } = req.body;
  await registration(email, password);

  res.json({ status: 201, message: "Created" });
};

module.exports = registrationController;
