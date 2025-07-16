import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
//const API_URL = 'http://127.0.0.1:8000';

export const obtenerClientePorUsuario = async (idUsuario) => {
  const response = await axios.get(`${API_URL}/api/cliente/usuario/${idUsuario}`);
  return response.data;
};
