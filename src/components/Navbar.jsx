// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import React from "react";
import "./Navbar.css";

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/assets/solnube.png" alt="Logo Cielo Azul" />
        <span>Cielo Azul 🌤️</span>
      </div>
      <ul className="nav-links">
        <li
          className={activeTab === "inicio" ? "active" : ""}
          onClick={() => setActiveTab("inicio")}
        >
          <Link to="/">Inicio</Link>
        </li>
        <li
          className={activeTab === "sobreNosotros" ? "active" : ""}
          onClick={() => setActiveTab("sobreNosotros")}
        >
          <Link to="/sobre-nosotros">Sobre Nosotros</Link>
        </li>
        <li
          className={activeTab === "explorar" ? "active" : ""}
          onClick={() => setActiveTab("explorar")}
        >
          <Link to="/explorar">Explorar</Link>
        </li>
        <li
          className={activeTab === "comodidades" ? "active" : ""}
          onClick={() => setActiveTab("comodidades")}
        >
          <Link to="/comodidades">Comodidades</Link>
        </li>
        <li
          className={`reservar-btn ${activeTab === "habitaciones" ? "active" : ""}`}
          onClick={() => setActiveTab("habitaciones")}
        >
          <Link className="btn btn-primary" to="/habitaciones">
            Reservar ahora
          </Link>
        </li>
      </ul>
    </nav>
  );
}
