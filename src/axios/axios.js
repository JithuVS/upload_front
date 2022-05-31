import axios from "axios";
const instance = axios.create({
  baseURL: "https://uplooads.herokuapp.com",
  withCredentials: true
});
export default instance;
