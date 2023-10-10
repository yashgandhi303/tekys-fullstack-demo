import React, { useState, useEffect } from "react";

const Welcome = () => {
  const [userName, setUserName] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    async function fetchData() {
      const data = await JSON.parse(localStorage.getItem("user"));
      setUserName(data?.username);
    }
    fetchData();
  }, []);

  return (
    <div className="welcome-container">
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
};

export default Welcome;
