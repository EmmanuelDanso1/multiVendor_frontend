import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/auth/",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  // Only attach token if NOT hitting login or register
  if (
    token &&
    !config.url.includes("login/") &&
    !config.url.includes("register/")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
