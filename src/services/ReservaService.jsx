// src/services/ReservaService.jsx
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export const crearReserva = async (data) => {
  const token = sessionStorage.getItem("token");

  return axios.post(`${API_URL}/reservas`, {
    id_cliente: data.idCliente,
    id_habitacion: data.idHabitacion,
    fecha_inicio: data.fechaInicio,
    fecha_fin: data.fechaFin,
    estado: "confirmada",
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

