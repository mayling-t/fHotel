import { useEffect, useState } from "react";
import axios from "axios";

export default function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const clienteRaw = sessionStorage.getItem("cliente");

    if (!clienteRaw) {
      alert("Por favor inicia sesión para ver tus reservas.");
      return;
    }

    let cliente;
    try {
      cliente = JSON.parse(clienteRaw);
    } catch {
      alert("Error al leer datos del cliente. Inicia sesión nuevamente.");
      return;
    }

    const token = sessionStorage.getItem("token");

    axios.get(`http://localhost:8000/api/reservas/cliente/${cliente.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setReservas(res.data);
      setCargando(false);
    })
    .catch(() => {
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
