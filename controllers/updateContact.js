const contacts = require("../models/contacts");
const { joiSchema } = require("../schema");

const updateContact = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      return res.json({ status: 400, message: "missing fields" });
    }
    contacts.updateContact(req.params.contactId, req.body);
    res.json({ message: "Success", status: 200 });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
