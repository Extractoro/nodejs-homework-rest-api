const service = require("../../services/contactsService");

const contactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await service.getContactById(contactId);
  if (!contact) res.json({ status: 404, message: "Uncorrect id" });
  res.json({ contact, status: 200 });
};

module.exports = contactByIdController;
