// импорт модулей fs и path для работы с файловой системой
const fs = require("fs/promises");
const { type } = require("os");
const path = require("path");

const { v4: uuidv4 } = require("uuid"); //npm пакет для присвоения id

// Вариант c async await
// Создай переменную contactsPath и запиши в нее путь к файлу contacts.json. Для составления пути ипользуй методы модуля path.
const contactsPath = path.join(__dirname, "db", "contacts.json");
// console.log(contactsPath);

// Добавь функции для работы с коллекцией контактов. В функциях используй модуль fs и его методы readFile() и writeFile()
const listContacts = async () => {
  try {
    // читаем  и выводим данные из contacts.json
    const content = await fs.readFile(contactsPath, "utf-8");
    console.table(JSON.parse(content));
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const content = await fs.readFile(contactsPath, "utf-8");
    // console.log(content);

    const parsedContacts = JSON.parse(content);
    // console.log(parsedContacts);

    const requiredContact =
      parsedContacts.find((contact) => String(contact.id) === contactId) ||
      `Contact ID${contactId} not found`;

    console.table(requiredContact);
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const content = await fs.readFile(contactsPath, "utf-8");

    const parsedContacts = JSON.parse(content);

    const filteredContacts = parsedContacts.filter(
      (contact) => String(contact.id) !== contactId
    );

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    console.log(`The contact with ID${contactId} deleted!`);
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const content = await fs.readFile(contactsPath, "utf-8");

    const parsedContacts = JSON.parse(content);

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    const updatedContacts = [...parsedContacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    console.log(`The contact ${name} added!`);
  } catch (error) {
    console.log(error.message);
  }
};

// Сделай экспорт созданных функций через module.exports
module.exports = { listContacts, getContactById, removeContact, addContact };

// // Вариант без async await
// // Создай переменную contactsPath и запиши в нее путь к файлу contacts.json. Для составления пути ипользуй методы модуля path.
// const contactsPath = path.join(__dirname, "db", "contacts.json");
// // console.log(contactsPath);

// // Добавь функции для работы с коллекцией контактов. В функциях используй модуль fs и его методы readFile() и writeFile()

// function listContacts() {
//   // читаем  и выводим данные из contacts.json
//   fs.readFile(contactsPath, "utf-8")
//     .then(JSON.parse)
//     .then(console.table)
//     .catch((error) => console.log(error.message));
// }

// function getContactById(contactId) {
//   fs.readFile(contactsPath, "utf-8")
//     .then(JSON.parse)
//     .then(
//       (contacts) => contacts.find((contact) => contact.id === contactId)
//       // ||
//       // `Contact ID${contactId} not found`
//     )
//     .then(console.log)
//     .catch((error) => console.log(error.message));
// }

// function removeContact(contactId) {
//   fs.readFile(contactsPath, "utf-8")
//     .then(JSON.parse)
//     .then((contacts) => {
//       const filteredContacts = contacts.filter(
//         (contact) => contact.id !== contactId
//       );

//       fs.writeFile(
//         contactsPath,
//         JSON.stringify(filteredContacts, null, 2)
//       ).then(() => console.log(`The contact with ID${contactId} deleted!`));
//     })
//     // .then(console.table)
//     .catch((error) => console.log(error.message));
// }

// function addContact(name, email, phone) {
//   fs.readFile(contactsPath, "utf-8")
//     .then(JSON.parse)
//     .then((contacts) => {
//       const newContact = {
//         id: uuidv4(),
//         name,
//         email,
//         phone,
//       };

//       const updatedContacts = [...contacts, newContact];

//       fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2)).then(
//         () => console.log(`The contact added!`)
//       );
//     })
//     // .then(console.table)
//     .catch((error) => console.log(error.message));
// }

// // Сделай экспорт созданных функций через module.exports
// module.exports = { listContacts, getContactById, removeContact, addContact };
