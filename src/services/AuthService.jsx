// src/services/authService.js

import axios from "axios";

 //Usamos variable de entorno
const API = axios.create({
 baseURL: import.meta.env.VITE_API_URL,
withCredentials: true,
});
//const API_URL = 'http://127.0.0.1:8000';


export const login = async (email, password) => {
  await API.get("/sanctum/csrf-cookie"); // necesario para Sanctum
  const response = await API.post("/api/login", { email, password });
  return response.data;
};

export const logout = async () => {
  await API.post("/api/logout");
};
