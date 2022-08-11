const { Contact } = require("../schema/mongooseSchema");

const getContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (id) => {
  const result = await Contact.findById(id);
  return result;
};

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const deleteContact = async (id) => {
  const result = await Contact.findByIdAndRemove(id);
  return result;
};

const updateContact = async (id, body) => {
  const result = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
  return result;
};

const updateContactStatus = async (id, body) => {
  const result = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
  return result;
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateContactStatus,
};
