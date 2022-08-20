const service = require("../services/contactsService");
const { joiSchema } = require("../schema");

const updateContactController = async (req, res, next) => {
  const { error } = joiSchema.validate(req.body);
  if (error) {
    return res.json({ status: 400, message: "Missing fields" });
  }
  const result = await service.updateContact(req.params.contactId, req.body);
  if (!result) res.json({ status: 404 });
  res.json({ message: "Success", status: 200 });
};

module.exports = updateContactController;
