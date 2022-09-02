const getCurrent = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ status: 401, message: "Not authorized" });
  }

  const { email, subscription, avatarURL } = req.user;

  res
    .status(200)
    .json({ status: 200, res: { email, subscription, avatarURL } });
};

module.exports = getCurrent;