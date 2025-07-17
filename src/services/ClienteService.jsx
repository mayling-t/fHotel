import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export const obtenerClientePorUsuario = async (usuarioId) => {
  try {
    const response = await axios.get(`${API_URL}/cliente/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error("Error inesperado al obtener cliente:", error.message);
    if (error.response) {
      console.error("Respuesta del servidor:", error.response.data);
    }
    throw new Error("Error inesperado al obtener cliente.");
  }
};
