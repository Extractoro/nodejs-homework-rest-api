const fs = require("fs");
const { uploadAvatar } = require("../../services/authService");

const uploadAvatarController = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempPath, originalname } = req.file;

    const avatarURL = await uploadAvatar(_id, originalname, tempPath);

    res.status(200).json({ status: 200, res: avatarURL });
  } catch (error) {
    fs.unlink(req.file.path);
    res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports = uploadAvatarController;
