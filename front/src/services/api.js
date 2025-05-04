import axios from "axios";

const api = axios.create({
  baseURL: "https://day-notes-server.vercel.app/",
});

export default api;
