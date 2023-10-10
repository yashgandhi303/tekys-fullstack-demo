/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { AuthService } from "../services";
import { ChatBox, Contacts, Welcome } from "../components";

const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      navigate("/login");
    } else {
      setCurrentUser(currentUser);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:8080");
      socket.current.emit("add-user", currentUser.id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        const data = await AuthService.getAllUsers(currentUser);
        setContacts(data.data);
      }
    }
    fetchData();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="chat-container">
      <div className="c-container">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatBox currentChat={currentChat} socket={socket} />
        )}
      </div>
    </div>
  );
};

export default Chat;
