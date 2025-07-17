import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
//const API_URL = 'http://127.0.0.1:8000';
export const obtenerClientePorUsuario = async (usuarioId) => {
  try {
    const response = await axios.get(`${API_URL}/cliente/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      alert("No se encontró cliente vinculado al usuario. Por favor, registra tu perfil de cliente.");
      // Puedes redirigir o tomar otra acción
    }
    throw error;  // vuelve a lanzar para que lo capture el catch del form
  }
};
