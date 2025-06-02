import { useEffect, useState } from 'react';
import axios from 'axios';

function Habitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/habitaciones')
      .then((res) => {
        setHabitaciones(res.data);
      })
      .catch((err) => {
        console.error('Error al obtener habitaciones', err);
      });
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Nuestras Habitaciones</h2>
      <div className="row">
        {habitaciones.length > 0 ? (
          habitaciones.map((hab) => (
            <div className="col-md-4 mb-4" key={hab.id}>
              <div className="card h-100 shadow">
                <img
                  src={`http://localhost:8000/storage/${hab.imagen}`}
                  className="card-img-top"
                  alt={`Habitación ${hab.numero}`}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Habitación {hab.numero}</h5>
                  <p>{hab.descripcion}</p>
                  <p><strong>Tipo:</strong> {hab.tipo}</p>
                  <p><strong>Capacidad:</strong> {hab.capacidad} persona(s)</p>
                  <p><strong>Precio:</strong> ${hab.precio}</p>
                  <a href="#" className="btn btn-primary mt-auto">Ver Detalles</a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No hay habitaciones disponibles.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Habitaciones;
