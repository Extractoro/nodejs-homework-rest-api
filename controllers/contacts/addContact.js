const service = require("../../services/contactsService");
const { joiSchema } = require("../../schema");

const addContactController = async (req, res, next) => {
  const { error } = joiSchema.validate(req.body);
  if (error) {
    return res.json({ status: 400, message: "Missing fields" });
  }
  const { _id: owner } = req.user;

  const result = await service.addContact(req.body, owner);
  res.status(201).json(result);
};

module.exports = addContactController;
