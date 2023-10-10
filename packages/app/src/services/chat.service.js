import axios from "axios";

const API_URL = "http://localhost:8080/api/messages/";

const sendMessage = async ({
  dataId,
  currentChatId,
  msg,
}) => {
  return await axios.post(`${API_URL}addmsg`, {
    from: dataId,
    to: currentChatId,
    message: msg,
  });
}

const receiveMessage = async ({
  dataId,
  currentChatId,
}) => {
  return await axios.post(`${API_URL}getmsg`, {
    from: dataId,
    to: currentChatId,
  });
}

const ChatService = {
  sendMessage,
  receiveMessage
}

export default ChatService;

