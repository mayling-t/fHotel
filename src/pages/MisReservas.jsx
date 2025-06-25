import React, { useState } from "react";

export default function MisReservas() {
  const [reservas, setReservas] = useState([
    {
      id: 1,
      habitacion: "Suite Deluxe",
      fechaEntrada: "2025-06-15",
      fechaSalida: "2025-06-18",
      imagen: "https://storage.kempinski.com/cdn-cgi/image/w=1920,f=auto,g=auto,fit=scale-down/ki-cms-prod/images/1/9/9/8/58991-1-eng-GB/b5e1e27eeeb4-73656243_4K.jpg",
      cancelada: false,
      editando: false,
    },
    {
      id: 2,
      habitacion: "Habitación Doble",
      fechaEntrada: "2025-07-01",
      fechaSalida: "2025-07-05",
      imagen: "https://www.hotelpresidente.com.bo/images/slider-hdoble-2.jpg",
      cancelada: false,
      editando: false,
    },
  ]);

  const [mensaje, setMensaje] = useState("");

  const cancelarReserva = (id) => {
    setReservas((prev) =>
      prev.map((r) => (r.id === id ? { ...r, cancelada: true } : r))
    );
  };

  const toggleEditar = (id) => {
    setReservas((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, editando: !r.editando } : r
      )
    );
  };

  const guardarCambios = (id, nuevaEntrada, nuevaSalida) => {
    setReservas((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              fechaEntrada: nuevaEntrada,
              fechaSalida: nuevaSalida,
              editando: false,
            }
          : r
      )
    );

    // Mostrar mensaje por 3 segundos
    setMensaje("Cambios guardados con éxito 🎉");
    setTimeout(() => setMensaje(""), 3000);
  };

  const formatearFecha = (fecha) => {
    const [año, mes, dia] = fecha.split("-");
    return `${dia}/${mes}/${año}`;
  };

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4 text-center">Mis Reservas</h2>

      {mensaje && (
        <div className="alert alert-success text-center">{mensaje}</div>
      )}

      <div className="row">
        {reservas.map((reserva) =>
          !reserva.cancelada ? (
            <div className="col-md-6 mb-4" key={reserva.id}>
              <div className="card shadow-sm">
                <img
                  src={reserva.imagen}
                  className="card-img-top"
                  alt={reserva.habitacion}
                />
                <div className="card-body">
                  <h5 className="card-title">{reserva.habitacion}</h5>

                  {reserva.editando ? (
                    <>
                      <div className="mb-2">
                        <label>Entrada:</label>
                        <input
                          type="date"
                          defaultValue={reserva.fechaEntrada}
                          className="form-control"
                          onChange={(e) => (reserva.nuevaEntrada = e.target.value)}
                        />
                      </div>
                      <div className="mb-2">
                        <label>Salida:</label>
                        <input
                          type="date"
                          defaultValue={reserva.fechaSalida}
                          className="form-control"
                          onChange={(e) => (reserva.nuevaSalida = e.target.value)}
                        />
                      </div>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() =>
                          guardarCambios(
                            reserva.id,
                            reserva.nuevaEntrada || reserva.fechaEntrada,
                            reserva.nuevaSalida || reserva.fechaSalida
                          )
                        }
                      >
                        Guardar
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => toggleEditar(reserva.id)}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="card-text">
                        <strong>Entrada:</strong> {formatearFecha(reserva.fechaEntrada)}
                        <br />
                        <strong>Salida:</strong> {formatearFecha(reserva.fechaSalida)}
                      </p>
                      <button
                        className="btn btn-outline-danger btn-sm me-2"
                        onClick={() => cancelarReserva(reserva.id)}
                      >
                        Cancelar reserva
                      </button>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => toggleEditar(reserva.id)}
                      >
                        Editar
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
