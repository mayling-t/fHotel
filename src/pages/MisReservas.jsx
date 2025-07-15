import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//const API_URL = import.meta.env.VITE_API_URL;
const API_URL = 'http://127.0.0.1:8000';

export default function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioRaw = sessionStorage.getItem("usuario");

    if (!usuarioRaw) {
      alert("Por favor inicia sesión para ver tus reservas.");
      return navigate("/login");
    }

    let usuario;
    try {
      usuario = JSON.parse(usuarioRaw);
    } catch {
      alert("Error al leer datos del usuario. Inicia sesión nuevamente.");
      return navigate("/login");
    }

    const token = sessionStorage.getItem("token");

    // Obtener cliente asociado al usuario
    axios
      .get(`${API_URL}/api/cliente/usuario/${usuario.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resCliente) => {
        const clienteId = resCliente.data.id;

        // Obtener reservas de ese cliente
        return axios.get(`${API_URL}/api/reservas/cliente/${clienteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((resReservas) => {
        setReservas(resReservas.data);
        setCargando(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Error al obtener las reservas");
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <div style={{
        height: "100vh", display: "flex", justifyContent: "center",
        alignItems: "center", fontSize: "24px", color: "#0077b6"
      }}>
        🔄 Cargando tus reservas...
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#023e8a" }}>
        🛏️ Mis Reservas
      </h2>

      {reservas.length === 0 ? (
        <p style={{ textAlign: "center", color: "#555" }}>No tienes reservas registradas.</p>
      ) : (
        reservas.map((reserva) => (
          <div key={reserva.id} style={{
            border: "1px solid #ccc", padding: "20px", marginBottom: "20px",
            borderRadius: "10px", backgroundColor: "#f1f1f1"
          }}>
            <h4>Habitación: {reserva.habitacion?.nombre || "Sin nombre"}</h4>
            <p><strong>Precio:</strong> S/ {reserva.precio?.toFixed(2) || "0.00"}</p>
            <p><strong>Fecha Inicio:</strong> {reserva.fecha_inicio}</p>
            <p><strong>Fecha Fin:</strong> {reserva.fecha_fin}</p>
            <p><strong>Estado:</strong> {reserva.estado}</p>
          </div>
        ))
      )}
    </div>
  );
}
