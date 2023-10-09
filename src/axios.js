import axios from "axios";

// Create an instance of Axios with global configurations
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
