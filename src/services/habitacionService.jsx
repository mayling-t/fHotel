import axios from "axios";

const API_URL = "http://localhost:8000/api"; 

export const obtenerHabitacionesDisponibles = async (fechaInicio, fechaFin, tipo) => {
  try {
    const formatearFecha = (fecha) => {
      const date = new Date(fecha);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const params = {
      fecha_inicio: formatearFecha(fechaInicio),
      fecha_fin: formatearFecha(fechaFin),
    };

    if (tipo) {
      params.tipo = tipo;
    }

    const response = await axios.get(`${API_URL}/habitaciones/disponibles`, { params });
    console.log("✅ Respuesta de API:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener habitaciones disponibles:", error);
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
