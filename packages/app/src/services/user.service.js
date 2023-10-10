import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const user = JSON.parse(localStorage.getItem("user"));

const getUser = () => {
  if (!user) {
    window.location.assign("login");
    return;
  }
  const headers = {
    'x-access-token': `${user?.accessToken}`
  };

  return axios.get(`${API_URL}user`, { headers });
};

const UserService = {
  getUser,
}

export default UserService;
