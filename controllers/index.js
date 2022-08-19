// Contacts
const getAllContactsController = require("./contacts/getAllContacts");
const getContactsByIdController = require("./contacts/getContactById");
const addContactController = require("./contacts/addContact");
const deleteContactController = require("./contacts/deleteContact");
const updateContactController = require("./contacts/updateContact");
const updateContactStatusController = require("./contacts/updateContactStatus");

// Auth
const registrationController = require("./auth/registration");
const loginController = require("./auth/login");

module.exports = {
  getAllContactsController,
  getContactsByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateContactStatusController,
  registrationController,
  loginController,
};
