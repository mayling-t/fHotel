// src/services/habitacionService.js
const API_URL = `${import.meta.env.VITE_API_URL}/api`;
import axios from "axios";

//const API_URL = 'http://127.0.0.1:8000/api';

export const obtenerHabitacionesDisponibles = async (fechaInicio, fechaFin, tipo) => {
  try {
    const params = {
      fechaInicio,
      fechaFin,
    };
    if (tipo) params.tipo = tipo;

    const response = await axios.get(`${API_URL}/habitaciones/disponibles`, { params });
    return response.data.habitaciones; // Ojo: retorna array dentro de "habitaciones"
  } catch (error) {
    console.error("Error al obtener habitaciones disponibles:", error);
    throw error;
  }
};

export const obtenerTodasHabitaciones = async () => {
  try {
    const response = await axios.get(`${API_URL}/habitaciones`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todas las habitaciones:", error);
    throw error;
  }
};

export const obtenerDisponibilidadPorHabitacion = async (idHabitacion, fechaInicio, fechaFin) => {
  try {
    const params = {};
    if (fechaInicio) params.fechaInicio = fechaInicio;
    if (fechaFin) params.fechaFin = fechaFin;

    const response = await axios.get(`${API_URL}/habitaciones/${idHabitacion}/disponibilidad`, { params });
    return response.data; // Tiene { disponiblidades: [...] }
  } catch (error) {
    console.error(`Error al obtener disponibilidad de habitación ${idHabitacion}:`, error);
    throw error;
  }
};
