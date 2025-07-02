import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export const login = async (email, password) => {
  await API.get("/sanctum/csrf-cookie"); // <-- muy importante
  const response = await API.post("/api/login", { email, password });
  return response.data;
};

export const logout = async () => {
  await API.post("/api/logout");
};
