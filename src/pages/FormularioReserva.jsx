import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { crearReserva } from "../services/ReservaService";

export default function FormularioReserva() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habitacion, setHabitacion] = useState(null);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [reservaExitosa, setReservaExitosa] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/habitaciones/${id}`)
      .then((r) => setHabitacion(r.data))
      .catch(() => alert("Error al obtener habitación"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const clienteRaw = sessionStorage.getItem("cliente");

      if (!clienteRaw) {
        sessionStorage.setItem("redireccionReserva", `/reservar/${id}`);
        return navigate("/login");
      }

      const cliente = JSON.parse(clienteRaw);

      const data = {
        idCliente: cliente.id,
        idHabitacion: id,
        fechaInicio,
        fechaFin,
      };

      await crearReserva(data);

      setReservaExitosa(true);

      // Redirige a "Mis Reservas" después de 2 segundos
      setTimeout(() => navigate("/mis-reservas"), 2000);
    } catch (error) {
      alert("Error al realizar reserva");
      console.error(error);
    }
  };

  if (reservaExitosa) {
    return (
      <div style={{
        height: "100vh", display: "flex", justifyContent: "center",
        alignItems: "center", fontSize: "24px",
        backgroundColor: "#d8f3dc", color: "#2a9d8f"
      }}>
        ✅ ¡Reserva realizada con éxito! Redirigiendo a tus reservas...
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "600px", margin: "40px auto", padding: "30px",
      background: "#fff", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#023e8a" }}>
        Reserva: {habitacion?.nombre}
      </h2>
      <form onSubmit={handleSubmit}>
        <label>Fecha de inicio</label>
        <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />

        <label>Fecha de fin</label>
        <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} required />

        <button type="submit" style={{
          marginTop: "20px", backgroundColor: "#0077b6", color: "#fff",
          padding: "12px", border: "none", borderRadius: "8px", width: "100%", fontWeight: "bold"
        }}>
          Confirmar reserva
        </button>
      </form>
    </div>
  );
}
