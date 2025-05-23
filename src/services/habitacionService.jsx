// src/services/habitacionService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/habitaciones';

export const getHabitaciones = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const crearHabitacion = async (datos) => {
  const response = await axios.post(API_URL, datos);
  return response.data;
};
