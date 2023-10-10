import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const host = "http://localhost:8080";
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;

const ChatBox = ({ currentChat, socket }) => {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await JSON.parse(localStorage.getItem("user"));

      const response = await axios.post(recieveMessageRoute, {
        from: data.id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
    if (currentChat) {
      fetchData();
    }
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem("user")
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data.id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data.id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };


  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbox-container">
      <div className="chat-header">
        <div className="user-details">
          <div className="username">
            <h3>{currentChat?.username}</h3>
          </div>
        </div>
        {/* <Logout /> */}
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${message.fromSelf ? "sended" : "recieved"
                  }`}
              >
                <div className="content ">
                  <p>{message?.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
};

export default ChatBox;