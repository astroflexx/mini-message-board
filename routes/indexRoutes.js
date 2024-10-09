const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");

const indexRoutes = Router();

const messages = [
  {
    id: uuidv4(),
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    id: uuidv4(),
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

const map = new Map();

messages.forEach((message) => {
  map.set(message.id, message);
});

indexRoutes.get("/", (req, res) => {
  res.render("index", { messages: messages });
});

indexRoutes.get("/new", (req, res) => {
  res.render("form");
});

indexRoutes.post("/new", (req, res) => {
  const messageId = uuidv4();
  const message = {
    id: messageId,
    text: req.body.messageText,
    user: req.body.messageUser,
    added: new Date(),
  };

  messages.push(message);
  map.set(messageId, message);

  res.redirect("/");
});

indexRoutes.get("/message/:id", (req, res) => {
  const messageId = req.params.id;

  if (map.has(messageId)) {
    const message = map.get(messageId);
    res.render("message", { message: message });
  } else {
    res.status(404).send("Message not found.");
  }
});

indexRoutes.use((req, res) => {
  res.status(404).send("The requested resource is not found on this server.");
});

module.exports = {
  indexRoutes,
};
