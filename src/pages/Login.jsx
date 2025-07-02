import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:8000/api/login", { email, password });
      const { usuario, cliente, token } = res.data;

      sessionStorage.setItem("usuario", JSON.stringify(usuario));
      if (cliente) sessionStorage.setItem("cliente", JSON.stringify(cliente));
      sessionStorage.setItem("token", token);

      setMensaje("¡Inicio de sesión exitoso!");

      setTimeout(() => {
        const redir = sessionStorage.getItem("redireccionReserva") || "/";
        sessionStorage.removeItem("redireccionReserva");
        navigate(redir);
        window.location.reload();
      }, 1500);
    } catch {
      setError("Credenciales inválidas");
    }
  };

  if (mensaje) {
    return <div style={{ ...centrado }}> {mensaje} </div>;
  }

  return (
    <div style={{ ...contenedorLogin }}>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        {/* inputs */}
      </form>
      <button onClick={() => navigate("/registro-cliente")} style={botonRegistrarse}>
        Registrarse
      </button>
    </div>
  );
}
