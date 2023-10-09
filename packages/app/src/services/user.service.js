import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const user = JSON.parse(localStorage.getItem("user"));

const getPublicContent = () => {
  return axios.get(API_URL + "public");
};

const getUserBoard = () => {
  if (!user) {
    window.location.assign("login");
    return;
  }
  const headers = {
    'x-access-token': `${user?.accessToken}`, // Example authorization header
  };

  return axios.get(API_URL + "user", { headers });
};

const UserService = {
  getPublicContent,
  getUserBoard,
}

export default UserService;
