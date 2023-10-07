import { AppError } from "@utils/AppError";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3333",
});

API.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response?.data) {
      return Promise.reject(new AppError(err.response.data.message));
    } else {
      return Promise.reject(err);
    }
  }
);

export { API };
