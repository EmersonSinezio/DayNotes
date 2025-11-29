import axios from "axios";

const api = axios.create({
  baseURL: "https://day-notes-server-test.vercel.app",
  //baseURLDEV: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default api;
