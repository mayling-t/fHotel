import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logol.jpg";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem("usuario");
    if (data) {
      setUsuario(JSON.parse(data));
    } else {
      setUsuario(null);
    }
    setMostrarPerfil(false);
  }, [location]);

  const cerrarSesion = () => {
    sessionStorage.removeItem("usuario");
    setUsuario(null);
    setMostrarPerfil(false);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">

        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="Cielo Azul Logo"
            style={{ height: "70px", marginRight: "10px", objectFit: "contain" }}
          />
        </NavLink>

        <div className="d-flex align-items-center gap-4">
          <ul className="navbar-nav d-flex flex-row gap-4 mb-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/sobre-nosotros" className="nav-link">Sobre Nosotros</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/explorar" className="nav-link">Explorar</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/comodidades" className="nav-link">Comodidades</NavLink>
            </li>
            {usuario && (
              <li className="nav-item">
                <NavLink to="/mis-reservas" className="nav-link">Mis reservas</NavLink>
              </li>
            )}
          </ul>

          <NavLink
            to="/habitaciones"
            className="btn btn-primary rounded-pill px-4"
          >
            Reservar ahora
          </NavLink>

          {!usuario && (
            <NavLink
              to="/login"
              className="rounded-pill px-4 py-2"
              style={{
                backgroundColor: "#a2d2ff", // Celeste pastel
                color: "#003049",           // Texto azul oscuro
                border: "1px solid #a2d2ff",
                fontWeight: "bold",
                textDecoration: "none"
              }}
            >
              Iniciar sesión
            </NavLink>
          )}

          {usuario && (
            <div style={{ position: "relative" }}>
              <FaUserCircle
                size={30}
                color="#0a9396"
                style={{ cursor: "pointer" }}
                onClick={() => setMostrarPerfil(!mostrarPerfil)}
              />
              {mostrarPerfil && (
                <div style={{
                  position: "absolute",
                  right: 0,
                  top: "100%",
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  zIndex: 10,
                  minWidth: "200px"
                }}>
                  <p style={{ margin: 0 }}><strong>Nombre:</strong> {usuario.nombre}</p>
                  <p style={{ margin: 0 }}><strong>Correo:</strong> {usuario.email}</p>
                  <button
                    onClick={cerrarSesion}
                    style={{
                      marginTop: "10px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
