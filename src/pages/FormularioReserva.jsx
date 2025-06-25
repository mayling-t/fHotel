import React, { useState } from 'react';

const FormularioReserva = () => {
  const [reservaExitosa, setReservaExitosa] = useState(false);

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '40px auto',
      backgroundColor: '#ffffff',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    titulo: {
      textAlign: 'center',
      marginBottom: '25px',
      color: '#005f73',
    },
    formulario: {
      display: 'flex',
      flexDirection: 'column',
    },
    campo: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '8px',
    },
    boton: {
      backgroundColor: '#0a9396',
      color: 'white',
      border: 'none',
      padding: '12px',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    mensaje: {
      marginTop: '20px',
      textAlign: 'center',
      color: '#0a9396',
      fontWeight: 'bold',
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setReservaExitosa(true);
    localStorage.setItem('reservo', 'true'); // 👈 marca que se reservó
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>Reservar habitación</h2>
      <form style={styles.formulario} onSubmit={handleSubmit}>
        <div style={styles.campo}>
          <label htmlFor="nombre" style={styles.label}>Nombre completo</label>
          <input type="text" id="nombre" placeholder="Tu nombre" style={styles.input} />
        </div>

        <div style={styles.campo}>
          <label htmlFor="email" style={styles.label}>Correo electrónico</label>
          <input type="email" id="email" placeholder="correo@ejemplo.com" style={styles.input} />
        </div>

        <div style={styles.campo}>
          <label htmlFor="fechaEntrada" style={styles.label}>Fecha de entrada</label>
          <input type="date" id="fechaEntrada" style={styles.input} />
        </div>

        <div style={styles.campo}>
          <label htmlFor="fechaSalida" style={styles.label}>Fecha de salida</label>
          <input type="date" id="fechaSalida" style={styles.input} />
        </div>

        <div style={styles.campo}>
          <label htmlFor="personas" style={styles.label}>Número de personas</label>
          <input type="number" id="personas" min="1" defaultValue="1" style={styles.input} />
        </div>

        <button type="submit" style={styles.boton}>
          Confirmar reserva
        </button>
      </form>

      {reservaExitosa && (
        <p style={styles.mensaje}>✅ ¡Reserva realizada con éxito!</p>
      )}
    </div>
  );
};

export default FormularioReserva;
