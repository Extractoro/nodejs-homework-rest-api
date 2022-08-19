const service = require("../../services/contactsService");

const getAllContactsController = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  const contacts = await service.getContacts(_id);
  res.json({ contacts });
};

module.exports = getAllContactsController;
