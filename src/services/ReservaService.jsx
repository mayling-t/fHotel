// src/services/ReservaService.js
import axios from "axios";

//const API_URL = 'http://127.0.0.1:8000/api';
// Usamos variable de entorno
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

export const obtenerReservas = async () => {
  const token = sessionStorage.getItem("token");

  const response = await axios.get(`${API_URL}/reservas`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const cancelarReserva = async (idReserva) => {
  const token = sessionStorage.getItem("token");

  return axios.put(`${API_URL}/reservas/${idReserva}/cancelar`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const buscarReservasPorFecha = async (fecha) => {
  const token = sessionStorage.getItem("token");

  const response = await axios.get(`${API_URL}/reservas`, {
    params: { fecha },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
