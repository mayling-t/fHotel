import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// IMPORTAR LAS IMÁGENES DE TUS HABITACIONES
import dobleImg from "../assets/doble.jpg";
import simpleImg from "../assets/simple.jpg";
import suiteImg from "../assets/suite.jpg";

const API_URL = import.meta.env.VITE_API_URL;
//const API_URL = 'http://127.0.0.1:8000';
=======
const API_URL = 'http://127.0.0.1:8000';


export default function MisReservas() {
  const [reservasOriginal, setReservasOriginal] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [serviciosDisponibles, setServiciosDisponibles] = useState([]);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const [reservaActual, setReservaActual] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modalDetalle, setModalDetalle] = useState(false);
  const [detalleReserva, setDetalleReserva] = useState(null);
  const [detallePago, setDetallePago] = useState(null);
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

  const [metodoPago, setMetodoPago] = useState("efectivo");
  const navigate = useNavigate();

  useEffect(() => {
    obtenerReservas();
  }, []);


  const obtenerReservas = () => {
    const usuarioRaw = sessionStorage.getItem("usuario");
    if (!usuarioRaw) return navigate("/login");

    let usuario;
    try {
      usuario = JSON.parse(usuarioRaw);
    } catch {
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
=======
    axios
      .get(`${API_URL}/api/cliente/usuario/${usuario.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resCliente) => {
        const clienteId = resCliente.data.id;

        return axios.get(`${API_URL}/api/reservas/cliente/${clienteId}`, {
          headers: { Authorization: `Bearer ${token}` },
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
  };

  const abrirModalServicios = async (reserva) => {
    setReservaActual(reserva);

    try {
      const res = await axios.get(`${API_URL}/api/servicios-extras`);
      setServiciosDisponibles(res.data);
      setServiciosSeleccionados([]);
      setMostrarModal(true);
    } catch (error) {
      console.error("Error al obtener servicios extras:", error);
    }
  };

  const abrirModalDetalle = async (reserva) => {
    try {
      const resDetalle = await axios.get(`${API_URL}/api/reservas/${reserva.id}/servicios-extras`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      setDetalleReserva(resDetalle.data);

      if (reserva.estado === "finalizada") {
        // Si la reserva está pagada, obtenemos el pago
        const resPago = await axios.get(`${API_URL}/api/pagos/${reserva.id}`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        });
        setDetallePago(resPago.data);
      } else {
        setDetallePago(null);
      }

      setMetodoPago("efectivo"); // reset método pago
      setModalDetalle(true);
    } catch (error) {
      console.error("Error al obtener detalle de reserva o pago:", error);
      alert("No se pudo obtener el detalle de la reserva o pago.");
    }
  };

  const toggleServicio = (servicio) => {
    const yaExiste = serviciosSeleccionados.find((s) => s.id === servicio.id);
    if (yaExiste) {
      setServiciosSeleccionados(serviciosSeleccionados.filter((s) => s.id !== servicio.id));
    } else {
      setServiciosSeleccionados([...serviciosSeleccionados, servicio]);
    }
  };

  const confirmarServicios = async () => {
    const token = sessionStorage.getItem("token");

    try {
      for (const servicio of serviciosSeleccionados) {
        await axios.post(`${API_URL}/api/reserva-servicios`, {
          id_reserva: reservaActual.id,
          id_servicio_extra: servicio.id,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      alert("Servicios añadidos correctamente.");
      setMostrarModal(false);
      obtenerReservas();
    } catch (error) {
      console.error("Error al agregar servicios:", error);
      alert("Ocurrió un error al agregar los servicios.");
    }
  };

  const pagarReserva = async () => {
    if (!detalleReserva || !detalleReserva.cliente) return alert("No hay detalles para pagar.");

    const token = sessionStorage.getItem("token");


    const montoHabitacion = Number(detalleReserva.habitacion?.precio || 0);
    const montoServicios = detalleReserva.servicios_extras?.reduce((acc, s) => acc + Number(s.precio), 0) || 0;
    const montoTotal = montoHabitacion + montoServicios;

    try {
      const hoy = new Date().toISOString().split("T")[0]; // formato YYYY-MM-DD
      await axios.post(`${API_URL}/api/pagos`, {
        dni: detalleReserva.cliente.dni,
        fecha_pago: hoy,
        metodo_pago: metodoPago,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Pago registrado correctamente.");
      setModalDetalle(false);
      obtenerReservas();
    } catch (error) {
      console.error("Error al registrar pago:", error);
      alert("No se pudo registrar el pago.");
    }
  };

  const cancelarReserva = async (idReserva) => {
    const confirmar = confirm("¿Estás seguro que deseas cancelar esta reserva?");
    if (!confirmar) return;

    const token = sessionStorage.getItem("token");

    try {
      await axios.put(`${API_URL}/api/reservas/${idReserva}/cancelar`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Reserva cancelada correctamente.");
      obtenerReservas();
    } catch (error) {
      console.error("Error al cancelar reserva:", error);
      alert("Error al cancelar reserva.");
    }
  };

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

            let imagenHabitacion = simpleImg; // por defecto
            if (reserva.habitacion?.numero?.toLowerCase().includes("doble")) {
              imagenHabitacion = dobleImg;
            } else if (reserva.habitacion?.numero?.toLowerCase().includes("suite")) {
              imagenHabitacion = suiteImg;
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

    <div style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center", color: "#023e8a" }}>🛏️ Mis Reservas</h2>

      {cargando ? (
        <p>Cargando...</p>
      ) : reservas.length === 0 ? (
        <p style={{ textAlign: "center" }}>No tienes reservas registradas.</p>
      ) : (
        reservas.map((reserva) => (
          <div key={reserva.id} style={{
            border: "1px solid #ccc", padding: "20px", marginBottom: "20px",
            borderRadius: "10px", backgroundColor: "#f1f1f1"
          }}>
            <h4>Habitación: {reserva.habitacion?.numero || "Sin nombre"}</h4>
            <p><strong>Precio:</strong> S/ {Number(reserva.habitacion?.precio).toFixed(2)}</p>
            <p><strong>Fecha Inicio:</strong> {reserva.fecha_inicio}</p>
            <p><strong>Fecha Fin:</strong> {reserva.fecha_fin}</p>
            <p><strong>Estado:</strong> {reserva.estado}</p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              {reserva.estado === "confirmada" && (
                <>
                  <button
                    onClick={() => abrirModalServicios(reserva)}
                    style={{ backgroundColor: "#2a9d8f", color: "#fff", padding: "8px 12px", border: "none", borderRadius: "6px", cursor: "pointer" }}
                  >
                    ➕ Agregar Servicios Extras
                  </button>

                  <button
                    onClick={() => abrirModalDetalle(reserva)}
                    style={{ backgroundColor: "#0077b6", color: "#fff", padding: "8px 12px", border: "none", borderRadius: "6px", cursor: "pointer" }}
                  >
                    📄 Ver Detalle / Pagar
                  </button>

                  <button
                    onClick={() => cancelarReserva(reserva.id)}
                    style={{ backgroundColor: "#e63946", color: "#fff", padding: "8px 12px", border: "none", borderRadius: "6px", cursor: "pointer" }}
                  >
                    ❌ Cancelar Reserva
                  </button>
                </>
              )}

              {reserva.estado === "finalizada" && (
                <button
                  onClick={() => abrirModalDetalle(reserva)}
                  style={{ backgroundColor: "#0077b6", color: "#fff", padding: "8px 12px", border: "none", borderRadius: "6px", cursor: "pointer" }}
                >
                  📄 Ver Detalle Pago
                </button>
              )}
            </div>
          </div>
        ))

      )}

      {/* Modal Servicios */}
      {mostrarModal && reservaActual && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "12px", width: "400px", maxHeight: "90vh", overflowY: "auto" }}>
            <h3>Servicios Extras para reserva #{reservaActual.id}</h3>
            <ul>
              {serviciosDisponibles.map(servicio => (
                <li key={servicio.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={serviciosSeleccionados.some(s => s.id === servicio.id)}
                      onChange={() => toggleServicio(servicio)}
                    />{" "}
                    {servicio.nombre} - S/ {Number(servicio.precio).toFixed(2)}
                  </label>
                </li>
              ))}
            </ul>
            <p><strong>Total estimado:</strong> S/ {(() => {
              const precioHabitacion = Number(reservaActual.habitacion?.precio || 0);
              const precioServicios = serviciosSeleccionados.reduce((total, s) => total + Number(s.precio), 0);
              return (precioHabitacion + precioServicios).toFixed(2);
            })()}</p>
            <div style={{ marginTop: "20px", textAlign: "right" }}>
              <button onClick={() => setMostrarModal(false)} style={{ marginRight: "10px" }}>❌ Cancelar</button>
              <button onClick={confirmarServicios} style={{ backgroundColor: "#0077b6", color: "#fff", padding: "6px 12px", borderRadius: "5px" }}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detalle */}
      {modalDetalle && detalleReserva && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "12px", width: "520px", maxHeight: "90vh", overflowY: "auto" }}>
            <h3>Detalle de la Reserva</h3>
            <p><strong>Cliente:</strong> {detalleReserva.cliente?.nombre} {detalleReserva.cliente?.apellido}</p>
            <p><strong>DNI:</strong> {detalleReserva.cliente?.dni}</p>
            <p><strong>Habitación:</strong> {detalleReserva.habitacion?.numero}</p>
            <p><strong>Precio Habitación:</strong> S/ {Number(detalleReserva.habitacion?.precio).toFixed(2)}</p>
            <p><strong>Fecha Inicio:</strong> {detalleReserva.fecha_inicio}</p>
            <p><strong>Fecha Fin:</strong> {detalleReserva.fecha_fin}</p>

            <p><strong>Servicios Extras:</strong></p>
            <ul>
              {detalleReserva.servicios_extras?.length > 0 ? detalleReserva.servicios_extras.map((s, i) => (
                <li key={i}>{s.nombre} - S/ {Number(s.precio).toFixed(2)}</li>
              )) : <li>No se registraron servicios.</li>}
            </ul>

            <p><strong>Total:</strong> S/ {(Number(detalleReserva.habitacion?.precio || 0) + (detalleReserva.servicios_extras?.reduce((a, s) => a + Number(s.precio), 0) || 0)).toFixed(2)}</p>

            {detallePago && (
              <p><strong>Fecha de pago:</strong> {new Date(detallePago.fecha_pago).toLocaleDateString()}</p>
            )}

            {/* Solo mostrar botón pagar si no está finalizada */}
            {(!detallePago && detalleReserva.estado !== "finalizada") && (
              <>
                <label>
                  Método de pago:{" "}
                  <select value={metodoPago} onChange={e => setMetodoPago(e.target.value)}>
                    <option value="efectivo">Efectivo</option>
                    <option value="tarjeta">Tarjeta</option>
                    <option value="transferencia">Transferencia</option>
                  </select>
                </label>

                <div style={{ marginTop: "20px", textAlign: "right" }}>
                  <button onClick={() => setModalDetalle(false)} style={{ marginRight: "10px" }}>❌ Cancelar</button>
                  <button onClick={pagarReserva} style={{ backgroundColor: "#2a9d8f", color: "#fff", padding: "6px 12px", borderRadius: "5px" }}>💰 Pagar</button>
                </div>
              </>
            )}

            {/* Si ya está finalizada, solo botón cerrar */}
            {(detallePago || detalleReserva.estado === "finalizada") && (
              <div style={{ marginTop: "20px", textAlign: "right" }}>
                <button onClick={() => setModalDetalle(false)} style={{ marginRight: "10px" }}>❌ Cerrar</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
