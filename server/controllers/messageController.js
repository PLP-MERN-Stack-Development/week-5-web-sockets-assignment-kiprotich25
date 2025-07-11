let messages = [];

const getMessages = (req, res) => {
  res.json(messages);
};

const addMessage = (message) => {
  messages.push(message);
  if (messages.length > 100) messages.shift(); // Limit memory
};

const getAll = () => messages;

module.exports = { getMessages, addMessage, getAll };

