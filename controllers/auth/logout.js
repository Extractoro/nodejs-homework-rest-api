const { logout } = require("../../services/authService");

const logoutController = async (req, res) => {
  const { _id } = req.user;

  if (!_id) {
    return res.status(401).json({ status: 401, message: "Not authorized" });
  }
  await logout(_id);
  res.status(204).json({ status: 204 });
};

module.exports = logoutController;
