const { addMessage, getAllMessage } = require("../controllers/message.controller");

module.exports = function(app) {
  app.post("/api/messages/addmsg", addMessage);
  app.post("/api/messages/getmsg", getAllMessage);
};