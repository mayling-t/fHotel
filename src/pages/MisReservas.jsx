import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
//const API_URL = 'http://127.0.0.1:8000';

export default function MisReservas() {
  const [reservasOriginal, setReservasOriginal] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [fechaBusqueda, setFechaBusqueda] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    cargarReservasCliente();
  }, []);

  const cargarReservasCliente = async () => {
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

    try {
      const resCliente = await axios.get(`${API_URL}/api/cliente/usuario/${usuario.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const clienteId = resCliente.data.id;

      const resReservas = await axios.get(`${API_URL}/api/reservas/cliente/${clienteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReservas(resReservas.data);
      setReservasOriginal(resReservas.data);
      setCargando(false);
    } catch (error) {
      console.error(error);
      setMensaje("Error al obtener las reservas.");
      setTipoMensaje("error");
      setCargando(false);
    }
  };

  const handleBuscarPorFecha = (e) => {
    e.preventDefault();
    if (!fechaBusqueda) return;

    const filtradas = reservasOriginal.filter((r) => r.fecha_inicio === fechaBusqueda);
    setReservas(filtradas);

    if (filtradas.length === 0) {
      setMensaje("No se encontraron reservas para esa fecha.");
      setTipoMensaje("error");
    } else {
      setMensaje("");
    }
  };

  const handleResetBusqueda = () => {
    setReservas(reservasOriginal);
    setFechaBusqueda("");
    setMensaje("");
  };

  const handleCancelar = async (idReserva) => {
    const confirmar = confirm("¿Estás seguro de cancelar esta reserva?");
    if (!confirmar) return;

    const token = sessionStorage.getItem("token");

    try {
      await axios.put(`${API_URL}/api/reservas/${idReserva}/cancelar`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMensaje("Reserva cancelada correctamente.");
      setTipoMensaje("exito");
      cargarReservasCliente();
    } catch (error) {
      console.error(error);
      setMensaje("Error al cancelar la reserva.");
      setTipoMensaje("error");
    }
  };

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
    <div style={{
      padding: "20px", maxWidth: "1100px", margin: "0 auto",
      backgroundColor: "#1d2b5a", minHeight: "100vh"
    }}>
      <h2 style={{
        textAlign: "center", marginBottom: "20px",
        color: "#fff", fontSize: "28px"
      }}>
        🛏️ Mis Reservas
      </h2>

      <form onSubmit={handleBuscarPorFecha} style={{
        display: "flex", justifyContent: "center", marginBottom: "20px", gap: "10px"
      }}>
        <input
          type="date"
          value={fechaBusqueda}
          onChange={(e) => setFechaBusqueda(e.target.value)}
          style={{
            padding: "6px", borderRadius: "6px", border: "1px solid #ccc",
            width: "180px"
          }}
        />
        <button type="submit" style={{
          backgroundColor: "#0077b6", color: "#fff", padding: "8px 16px",
          border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer"
        }}>
          🔎 Buscar fecha
        </button>

        <button type="button" onClick={handleResetBusqueda} style={{
          backgroundColor: "#6c757d", color: "#fff", padding: "8px 16px",
          border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer"
        }}>
          🔄 Ver todas
        </button>
      </form>

      {mensaje && (
        <div style={{
          padding: "8px", marginBottom: "20px", borderRadius: "6px",
          backgroundColor: tipoMensaje === "error" ? "#ffcccc" : "#d4edda",
          color: tipoMensaje === "error" ? "#d90429" : "#155724",
          textAlign: "center", fontWeight: "bold"
        }}>
          {mensaje}
        </div>
      )}

      {reservas.length === 0 ? (
        <p style={{ textAlign: "center", color: "#fff" }}>No tienes reservas registradas.</p>
      ) : (
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px"
        }}>
          {reservas.map((reserva) => {
            const precio = reserva.habitacion?.precio;
            const precioFormateado = typeof precio === 'number' ? precio.toFixed(2) : "0.00";

            let imagenHabitacion = "/src/assets/simple.jpg"; // Por defecto
            if (reserva.habitacion?.imagen) {
              imagenHabitacion = `/src/assets/${reserva.habitacion.imagen}`;
            }

            return (
              <div key={reserva.id} style={{
                border: "1px solid #ccc", padding: "10px",
                borderRadius: "8px", backgroundColor: "#f8f9fa", boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
              }}>
                <img
                  src={imagenHabitacion}
                  alt="Imagen habitación"
                  style={{
                    width: "100%", height: "150px", objectFit: "cover",
                    borderRadius: "6px", marginBottom: "6px"
                  }}
                />
                <h4 style={{ color: "#023e8a", fontSize: "1rem" }}>Habitación: {reserva.habitacion?.numero || "Sin nombre"}</h4>
                <p style={{ fontSize: "0.9rem" }}><strong>Precio:</strong> S/ {precioFormateado}</p>
                <p style={{ fontSize: "0.9rem" }}><strong>Inicio:</strong> {reserva.fecha_inicio}</p>
                <p style={{ fontSize: "0.9rem" }}><strong>Fin:</strong> {reserva.fecha_fin}</p>
                <p style={{ fontSize: "0.9rem" }}><strong>Estado:</strong> {reserva.estado}</p>

                {reserva.estado === "confirmada" && (
                  <button
                    onClick={() => handleCancelar(reserva.id)}
                    style={{
                      backgroundColor: "#d90429", color: "#fff", padding: "6px 10px",
                      border: "none", borderRadius: "6px", fontSize: "0.9rem",
                      marginTop: "6px", cursor: "pointer"
                    }}
                  >
                    ❌ Cancelar
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
