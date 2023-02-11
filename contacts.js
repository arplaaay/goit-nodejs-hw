const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));
}

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const findContactId = contacts.find((contact) => contact.id === contactId);

  return findContactId;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const findContactIndex = contacts.findIndex((contact) => contact.id === contactId);

  if (findContactIndex > -1) {
    const removeContact = contacts.splice(findContactIndex, 1);

    updateContacts(contacts);
    return removeContact;
  } else {
    console.log("Enter valid value!");
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  updateContacts(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
