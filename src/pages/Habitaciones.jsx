import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  obtenerHabitacionesDisponibles,
  obtenerTodasHabitaciones,
} from "../services/habitacionService";

import imgDoble from "../assets/doble.jpg";
import imgSimple from "../assets/simple.jpg";
import imgSuite from "../assets/suite.jpg";
import imgReparacion from "../assets/reparacion.jpg";

export default function Habitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [todasHabitaciones, setTodasHabitaciones] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [tipo, setTipo] = useState("");

  useEffect(() => {
    const cargarHabitaciones = async () => {
      try {
        const data = await obtenerTodasHabitaciones();
        setTodasHabitaciones(data);
      } catch (error) {
        console.error("Error al cargar todas las habitaciones:", error);
      }
    };

    cargarHabitaciones();
  }, []);

  const buscar = async () => {
    if (!fechaInicio || !fechaFin) {
      alert("Por favor selecciona ambas fechas.");
      return;
    }

    try {
      const data = await obtenerHabitacionesDisponibles(fechaInicio, fechaFin, tipo);
      setHabitaciones(data);
    } catch (error) {
      console.error("Error al buscar habitaciones:", error);
      alert("Error al cargar habitaciones disponibles.");
    }
  };

  const obtenerImagen = (tipo) => {
    switch (tipo.toLowerCase()) {
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

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Busca tu habitación ideal</h2>

      <div className="row mb-4">
        <div className="col-md-3">
          <label>Fecha de Inicio</label>
          <input
            type="date"
            className="form-control"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label>Fecha de Fin</label>
          <input
            type="date"
            className="form-control"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label>Tipo</label>
          <select
            className="form-control"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="simple">Simple</option>
            <option value="doble">Doble</option>
            <option value="suite">Suite</option>
          </select>
        </div>
        <div className="col-md-3 d-flex align-items-end">
          <button className="btn btn-primary w-100" onClick={buscar}>
            Buscar
          </button>
        </div>
      </div>

      {/* Habitaciones disponibles */}
      {habitaciones.length > 0 && (
        <div className="row">
          <h4 className="mb-3 py-2 titulo-cursiva text-white text-center"
            style={{ backgroundColor: "#3E54AC", borderRadius: "8px" }}>
            Habitaciones disponibles
          </h4>
          {habitaciones.map((hab) => (
            <div className="col-md-4 mb-4" key={hab.id}>
              <div className="card h-100 shadow">
                <img
                  src={obtenerImagen(hab.tipo)}
                  alt={`Habitación ${hab.tipo}`}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    Habitación {hab.numero} ({hab.tipo})
                  </h5>
                  <p className="card-text">{hab.descripcion}</p>
                  <p className="card-text">
                    <strong>Precio:</strong> S/ {hab.precio}
                  </p>
                  <p className="card-text">
                    <strong>Capacidad:</strong> {hab.capacidad} personas
                  </p>
                  <Link to={`/habitacion/${hab.id}`} className="btn btn-primary w-100">
                    Ver detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mostrar todas si no se buscó nada */}
      {habitaciones.length === 0 && (
        <div className="row mt-5">
          <h4 className="mb-3">Todas nuestras habitaciones</h4>
          {todasHabitaciones.map((hab) => (
            <div className="col-md-4 mb-4" key={hab.id}>
              <div className="card h-100 shadow">
                <img
                  src={obtenerImagen(hab.tipo)}
                  alt={`Habitación ${hab.tipo}`}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    Habitación {hab.numero} ({hab.tipo})
                  </h5>
                  <p className="card-text">{hab.descripcion}</p>
                  <p className="card-text">
                    <strong>Precio:</strong> S/ {hab.precio}
                  </p>
                  <p className="card-text">
                    <strong>Capacidad:</strong> {hab.capacidad} personas
                  </p>
                  <Link to={`/habitacion/${hab.id}`} className="btn btn-primary w-100">
                    Ver detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
