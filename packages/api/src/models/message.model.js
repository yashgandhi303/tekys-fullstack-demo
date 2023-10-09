const mongoose = require("mongoose");

const Message = mongoose.model("Message", new mongoose.Schema({
  text: String,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}));

module.exports = Message;
