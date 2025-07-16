// src/pages/Comodidades.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

//const API_URL = 'http://127.0.0.1:8000';
const API_URL = import.meta.env.VITE_API_URL;

export default function Comodidades() {
  const [servicios, setServicios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/servicios-extras`);
        setServicios(response.data);
      } catch (err) {
        console.error("Error al cargar servicios extra:", err);
        setError("No se pudieron cargar los servicios extra");
      } finally {
        setCargando(false);
      }
    };

    cargarServicios();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      {/* Título */}
      <div style={{
        backgroundColor: "#f1f8e9",
        borderRadius: "12px",
        padding: "30px",
        textAlign: "center",
        marginBottom: "30px"
      }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "10px", color: "#33691e" }}>Nuestras Comodidades</h2>
        <p style={{ maxWidth: "700px", margin: "0 auto", color: "#33691e" }}>
          Todo lo que necesitas para una estadía inolvidable en Cusco: confort, sabor, relajación y servicio de calidad.
        </p>
      </div>

      {/* Estado de carga o error */}
      {cargando ? (
        <div style={{ textAlign: "center", marginBottom: "40px" }}>Cargando servicios extra...</div>
      ) : error ? (
        <div style={{ textAlign: "center", marginBottom: "40px", color: "red" }}>{error}</div>
      ) : servicios.length === 0 ? (
        <div style={{ textAlign: "center", marginBottom: "40px", color: "#777" }}>
          No hay servicios registrados.
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}>
          {servicios.map((servicio) => (
            <div key={servicio.id} style={{
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}>
              <h3 style={{ margin: "0 0 10px", fontSize: "1.1rem", color: "#2e7d32" }}>
                {servicio.nombre}
              </h3>
              <p style={{ marginBottom: "8px", fontSize: "0.95rem", color: "#555" }}>
                {servicio.descripcion || "Sin descripción"}
              </p>
              <p style={{ fontWeight: "bold", color: "#023e8a" }}>
                Precio: S/ {Number(servicio.precio).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
