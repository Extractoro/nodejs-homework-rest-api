const contacts = require("../models/contacts");

const deleteContact = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    contacts.removeContact(contactId);
    res.json({ message: "contact deleted", status: 200 });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
