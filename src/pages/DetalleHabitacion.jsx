import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Importar las imágenes
import imgSimple from "../assets/simple.jpg";
import imgDoble from "../assets/doble.jpg";
import imgSuite from "../assets/suite.jpg";
import imgReparacion from "../assets/reparacion.jpg"; // por si no coincide ningún tipo

export default function DetalleHabitacion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habitacion, setHabitacion] = useState(null);

  useEffect(() => {
    const fetchHabitacion = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/habitaciones/${id}`);
        setHabitacion(response.data);
      } catch (error) {
        console.error("Error al cargar los detalles de la habitación:", error);
      }
    };

    fetchHabitacion();
  }, [id]);

  const handleReservar = () => {
    navigate("/login"); // Redirige a login por ahora
  };

  const obtenerImagen = (tipo) => {
    switch (tipo?.toLowerCase()) {
      case "simple":
        return imgSimple;
      case "doble":
        return imgDoble;
      case "suite":
        return imgSuite;
      default:
        return imgReparacion;
    }
  };

  if (!habitacion) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Cargando detalles...</p>;
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "12px",
        backgroundColor: "#f5f5f5",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ color: "#005f73", marginBottom: "20px" }}>{habitacion.nombre}</h2>

      <img
        src={obtenerImagen(habitacion.tipo)}
        alt={habitacion.tipo}
        style={{ width: "100%", borderRadius: "10px", marginBottom: "20px" }}
      />

      <p>
        <strong>Tipo:</strong> {habitacion.tipo}
      </p>
      <p>
        <strong>Capacidad:</strong> {habitacion.capacidad} personas
      </p>
      <p>
        <strong>Precio:</strong> S/{habitacion.precio} por noche
      </p>
      <p>
        <strong>Descripción:</strong> {habitacion.descripcion}
      </p>

      <button
        onClick={handleReservar}
        style={{
          marginTop: "25px",
          backgroundColor: "#0a9396",
          color: "#fff",
          padding: "12px 20px",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Reservar esta habitación
      </button>
    </div>
  );
}
