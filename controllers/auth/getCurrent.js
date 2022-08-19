const getCurrent = (req, res) => {
  if (!req.user) {
    return res.json({ status: 401, message: "Not authorized" });
  }

  const { email, subscription } = req.user;

  res.json({ status: 200, res: { email, subscription } });
};

module.exports = getCurrent;
