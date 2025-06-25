import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import fondo1 from '../assets/fondo1.jpg';
import fondo2 from '../assets/fondo2.jpg';
import logo from '../assets/logo.png';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Navbar />

      {/* Carrusel */}
      <div id="carouselExample" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          {[fondo1, fondo2].map((img, i) => (
            <div
              key={i}
              className={`carousel-item ${i === 0 ? 'active' : ''}`}
              style={{ height: '100vh', overflow: 'hidden' }}
            >
              <img
                src={img}
                className="d-block w-100"
                alt={`Slide ${i}`}
                style={{ objectFit: 'cover', height: '100%', filter: 'brightness(0.6)' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Contenedor blanco semitransparente */}
      <div
        className="position-absolute top-0 start-50 translate-middle-x p-4 bg-white bg-opacity-75 rounded shadow"
        style={{
          marginTop: '120px',
          maxWidth: '750px',
          width: '90%',
          zIndex: 10,
        }}
      >
        <div className="text-center">
          <img src={logo} alt="Logo" style={{ height: '250px', marginBottom: '35px' }} />
          <p style={{ fontSize: '1.2rem' }}>
            Descubre una experiencia única de lujo, confort y vistas espectaculares.
          </p>
        </div>
      </div>

      {/* Sección inferior visible */}
      <div className="container text-white mt-5 mb-5" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row bg-dark bg-opacity-75 p-4 rounded">
          <div className="col-md-6 text-center">
            <h3>Síguenos</h3>
            <p>@CieloAzulHotel en Instagram, Facebook y Twitter</p>
          </div>
          <div className="col-md-6 text-center">
            <h3>Nuestras Sedes</h3>
            <p>Playa del Carmen • Tulum • Bacalar</p>
          </div>
        </div>
      </div>
    </div>
  );
}
