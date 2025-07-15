import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//const API_URL = import.meta.env.VITE_API_URL;
const API_URL = 'http://127.0.0.1:8000';

export default function RegistroCliente() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    dni: "",
    email: "",
    celular: "",
    telefono: "",
    direccion: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(`${API_URL}/api/registro-cliente`, formData);

      // Hacemos login automático
      const res = await axios.post(`${API_URL}/api/login`, {
        email: formData.email,
        password: formData.password,
      });

      const { usuario, cliente, token } = res.data;

      sessionStorage.setItem("usuario", JSON.stringify(usuario));
      if (cliente) sessionStorage.setItem("cliente", JSON.stringify(cliente));
      sessionStorage.setItem("token", token);

      setMensaje("¡Registro exitoso!");
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Error al registrar."
      );
    }
  };

  if (mensaje) {
    return (
      <div style={{
        height: "100vh", display: "flex", justifyContent: "center", alignItems: "center",
        backgroundColor: "#caf0f8", fontSize: "28px", fontWeight: "bold", color: "#0077b6"
      }}>
        {mensaje}
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "500px", margin: "60px auto", padding: "30px",
      borderRadius: "12px", backgroundColor: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: "center", color: "#0a9396", marginBottom: "20px" }}>
        Registro de Cliente
      </h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
        <input name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} required />
        <input name="dni" placeholder="DNI" maxLength={8} value={formData.dni} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Correo" value={formData.email} onChange={handleChange} required />
        <input name="celular" placeholder="Celular" value={formData.celular} onChange={handleChange} required />
        <input name="telefono" placeholder="Teléfono (opcional)" value={formData.telefono} onChange={handleChange} />
        <input name="direccion" placeholder="Dirección (opcional)" value={formData.direccion} onChange={handleChange} />
        <input name="password" type="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
        <input name="password_confirmation" type="password" placeholder="Confirmar contraseña" value={formData.password_confirmation} onChange={handleChange} required />

        <button type="submit" style={{
          width: "100%", backgroundColor: "#0a9396", color: "#fff",
          padding: "12px", border: "none", borderRadius: "8px", fontWeight: "bold", marginTop: "15px"
        }}>
          Registrarse
        </button>
      </form>
    </div>
  );
}
