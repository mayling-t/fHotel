import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Guardar un usuario de ejemplo directamente en sessionStorage
    sessionStorage.setItem("usuario", JSON.stringify({
      nombre: "Juanita Ramírez",
      email: "juana@hotel.com"
    }));

    navigate("/");
  };

  const handleIrAReserva = () => {
    sessionStorage.setItem("usuario", JSON.stringify({
      nombre: "Juanita Ramírez",
      email: "juana@hotel.com"
    }));

    navigate("/reservar");
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '60px auto',
      padding: '30px',
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#0a9396', marginBottom: '20px' }}>Iniciar Sesión</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          required
          style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          required
          style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            backgroundColor: '#0a9396',
            color: '#fff',
            padding: '12px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Iniciar sesión
        </button>
      </form>

      <button
        onClick={handleIrAReserva}
        style={{
          marginTop: '20px',
          backgroundColor: '#005f73',
          color: '#fff',
          padding: '10px',
          border: 'none',
          borderRadius: '8px',
          width: '100%',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Registrarse y Reservar
      </button>
    </div>
  );
}
