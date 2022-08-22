const service = require("../../services/contactsService");

const getAllContactsController = async (req, res) => {
  const { _id: owner } = req.user;
  const contacts = await service.getContacts(owner);
  res.json({ contacts });
};

module.exports = getAllContactsController;
