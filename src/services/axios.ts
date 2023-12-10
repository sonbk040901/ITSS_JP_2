import axios from "axios";

export const BASE_URL = "http://127.0.0.1:3000/";
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
