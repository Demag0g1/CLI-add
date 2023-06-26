const argv = require("yargs").argv;
const contacts = require("./db/contacts.js");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;
    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

async function listContacts() {
  const allContacts = await contacts.listContacts();
  console.log("List of contacts:");
  console.log(allContacts);
}

async function getContactById(id) {
  const contact = await contacts.getContactById(id);
  console.log("Contact with ID:", id);
  console.log(contact);
}
async function addContact(name, email, phone) {
  const newContact = await contacts.addContact(name, email, phone);
  console.log("New contact added:");
  console.log(newContact);
}

async function removeContact(id) {
  const removedContact = await contacts.removeContact(id);
  if (removedContact) {
    console.log("Contact removed:");
    console.log(removedContact);
  } else {
    console.log("Contact not found.");
  }
}

invokeAction(argv);
