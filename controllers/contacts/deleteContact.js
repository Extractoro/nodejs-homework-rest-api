const service = require("../../services/contactsService");

const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await service.deleteContact(contactId);
  if (!result) res.json({ status: 404 });
  res.json({ message: "Contact deleted", status: 200 });
};

module.exports = deleteContactController;
