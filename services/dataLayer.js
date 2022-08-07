const contacts = require("../models/contacts");

const getAll = async () => {
  try {
    const data = await contacts.listContacts();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = getAll;
