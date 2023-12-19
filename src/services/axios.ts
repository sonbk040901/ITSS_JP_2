import { storeService } from "@/utils";
import axios from "axios";

export const BASE_URL = "http://127.0.0.1:3000/";
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const getAxiosInstance = async () => {
  const token = storeService.get<string>("token");
  if (!token) {
    throw new Error("No token found");
  }
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return axiosInstance;
};
