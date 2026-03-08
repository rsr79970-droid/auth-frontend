import axios from "axios";

export const api = axios.create({
  baseURL: "https://auth-backend-six-sand.vercel.app",
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache",
  },
});
