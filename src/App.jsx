import React, { useEffect, useState } from 'react';
import {
  getHabitaciones,
  crearHabitacion,
} from './services/habitacionService';

function App() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [formulario, setFormulario] = useState({
    numero: '',
    tipo: '',
    precio: '',
    estado: 'disponible',
  });

  const cargarHabitaciones = async () => {
    try {
      const data = await getHabitaciones();
      setHabitaciones(data);
    } catch (error) {
      console.error('Error al cargar habitaciones', error);
    }
  };

  useEffect(() => {
    cargarHabitaciones();
  }, []);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearHabitacion(formulario);
      setFormulario({ numero: '', tipo: '', precio: '', estado: 'disponible' });
      cargarHabitaciones();
    } catch (error) {
      console.error('Error al crear habitación', error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Habitaciones</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="numero"
          placeholder="Número"
          value={formulario.numero}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tipo"
          placeholder="Tipo"
          value={formulario.tipo}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={formulario.precio}
          onChange={handleChange}
          required
        />
        <select name="estado" value={formulario.estado} onChange={handleChange}>
          <option value="disponible">Disponible</option>
          <option value="ocupada">Ocupada</option>
          <option value="mantenimiento">Mantenimiento</option>
        </select>
        <button type="submit">Registrar</button>
      </form>

      <h2>Lista de habitaciones</h2>
      <ul>
        {habitaciones.map((hab) => (
          <li key={hab.id}>
            {hab.numero} | {hab.tipo} | S/. {hab.precio} | {hab.estado}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
