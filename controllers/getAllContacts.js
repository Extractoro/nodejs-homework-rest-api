const service = require("../services/contactsService");

const getAllContactsController = async (_, res) => {
  const contacts = await service.getContacts();
  res.json({ contacts });
};

module.exports = getAllContactsController;
