const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const res = data.find((user) => user.id === contactId);
    if (!res) {
      return null;
    }
    return res;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const res = data.findIndex((user) => user.id === contactId);
  if (res === -1) {
    return null;
  }
  const [remove] = data.splice(res, 1);
  await updateContacts(data);
  return remove;
};

const addContact = async (body) => {
  const data = await listContacts();
  const { name, email, phone } = body;
  const contact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  data.push(contact);
  await updateContacts(data);
  return contact;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const { name, email, phone } = body;

  data.forEach((user) => {
    if (contactId === user.id) {
      user.name = name;
      user.email = email;
      user.phone = phone;
    }
  });

  await updateContacts(data);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
