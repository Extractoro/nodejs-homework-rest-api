const contacts = require("../models/contacts");

const contactById = async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.contactId);
    if (!result) res.json({ status: 404, message: "Uncorrect id" });
    return res.json({ result, status: 200 });
  } catch (error) {
    next(error);
  }
};

module.exports = contactById;
