import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { crearReserva } from "../services/ReservaService";

const API_URL = import.meta.env.VITE_API_URL;

export default function FormularioReserva() {
  const { id } = useParams(); // ID de la habitación
  const navigate = useNavigate();
  const [habitacion, setHabitacion] = useState(null);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [reservaExitosa, setReservaExitosa] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/api/habitaciones/${id}`)
      .then((r) => setHabitacion(r.data))
      .catch(() => alert("Error al obtener habitación"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuarioRaw = sessionStorage.getItem("usuario");

    if (!usuarioRaw) {
      sessionStorage.setItem("redireccionReserva", `/reservar/${id}`);
      return navigate("/login");
    }

    const usuario = JSON.parse(usuarioRaw);

    try {
      // Obtener el cliente asociado al usuario
      const response = await axios.get(`${API_URL}/api/cliente/usuario/${usuario.id}`);
      const cliente = response.data;

      const data = {
        idCliente: cliente.id,
        idHabitacion: id,
        fechaInicio,
        fechaFin
      };

      await crearReserva(data);

      setReservaExitosa(true);

      setTimeout(() => navigate("/mis-reservas"), 2000);
    } catch (error) {
      console.error("Error al realizar reserva", error);
      const errores = error?.response?.data?.errors;
      if (errores) {
        const mensaje = Object.values(errores).flat().join("\n");
        alert("Errores de validación:\n" + mensaje);
      } else {
        alert("Error al realizar la reserva");
      }
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
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          required
        />

        <label>Fecha de fin</label>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          required
        />

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
