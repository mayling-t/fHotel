import axios from "axios";

const API_URL = "http://localhost:8000/api"; // Ajusta al URL correcto

export const obtenerHabitaciones = async () => {
  const response = await axios.get(`${API_URL}/habitaciones`);
  return response.data;
};
