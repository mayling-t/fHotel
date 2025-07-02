import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const crearReserva = async (data) => {
  const token = sessionStorage.getItem("token");
  return axios.post(`${API_URL}/reservas`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
