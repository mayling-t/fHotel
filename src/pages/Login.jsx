import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
//const API_URL = 'http://127.0.0.1:8000';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        email,
        password,
      });

      const { token, usuario } = response.data;

      sessionStorage.setItem("usuario", JSON.stringify(usuario));
      sessionStorage.setItem("token", token);

      const redirigirA = sessionStorage.getItem("redireccionReserva");
      if (redirigirA) {
        sessionStorage.removeItem("redireccionReserva");
        navigate(redirigirA);
      } else {
        navigate("/");
      }
    } catch (error) {
      setError("Credenciales incorrectas o error del servidor.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Iniciar Sesión</h2>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Contraseña:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Iniciar sesión
        </button>
      </form>

      <p style={{ marginTop: "15px", textAlign: "center" }}>
        ¿No tienes una cuenta?{" "}
        <span
          onClick={() => navigate("/registro")}
          style={{ color: "#0a9396", cursor: "pointer", fontWeight: "bold" }}
        >
          Regístrate aquí
        </span>
      </p>
    </div>
  );
}
