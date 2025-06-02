import React, { useEffect, useState } from "react";
import { obtenerHabitaciones } from "../services/habitacionService";


export default function Habitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerHabitaciones();
        setHabitaciones(data);
      } catch (error) {
        console.error("Error al cargar habitaciones:", error);
      }
    };
    cargar();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Nuestras Habitaciones</h2>
      <div className="row">
        {habitaciones.length === 0 ? (
          <p className="text-center">No hay habitaciones registradas.</p>
        ) : (
          habitaciones.map((hab) => (
            <div className="col-md-4 mb-4" key={hab.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={`/images/${hab.imagen}`} // O la ruta correcta que tengas
                  alt={hab.tipo}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{`Habitación ${hab.numero} (${hab.tipo})`}</h5>
                  <p className="card-text">{hab.descripcion}</p>
                  <p className="card-text">
                    <strong>Precio: </strong>${hab.precio}
                  </p>
                  <p className="card-text">
                    <strong>Capacidad: </strong> {hab.capacidad} personas
                  </p>
                  <button className="btn btn-primary w-100">Ver detalles</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
