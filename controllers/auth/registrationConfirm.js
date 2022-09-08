const { registrationConfirm } = require("../../services/authService");

const registrationConfirmController = async (req, res) => {
  const { code } = req.params;
  await registrationConfirm(code);

  res.status(200).json({ status: 200, message: "Verification success!" });
};

module.exports = registrationConfirmController;
