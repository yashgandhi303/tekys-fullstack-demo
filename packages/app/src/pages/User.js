import React, { useState, useEffect } from "react";

import { UserService } from "../services";
import EventBus from "../common/EventBus";

const User = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    UserService.getUser()?.then(
      (response) => {
        setContent(response.data.user);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
        if (error.response && 
            (error.response.status === 401 || error.response.status === 403)
          ) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>username: {content?.username}</h3>
        <h3>email: {content?.email}</h3>
      </header>
    </div>
  );
};

export default User;
