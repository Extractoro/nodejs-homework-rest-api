const getAllContactsController = require("./getAllContacts");
const getContactsByIdController = require("./getContactById");
const addContactController = require("./addContact");
const deleteContactController = require("./deleteContact");
const updateContactController = require("./updateContact");
const updateContactStatusController = require("./updateContactStatus");

module.exports = {
  getAllContactsController,
  getContactsByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateContactStatusController,
};
