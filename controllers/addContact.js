const contacts = require("../models/contacts");
const {joiSchema} = require("../schema");

const addContact = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      return res.json({ status: 400, message: "missing fields" });
    }
    contacts.addContact(req.body);
    res.json({ message: "Success", status: 201 });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
