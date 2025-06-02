// src/pages/Home.jsx

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import fondo from '../assets/fondo.jpg'; // Asegúrate que exista esta imagen

export default function Home() {
  const [activeTab, setActiveTab] = useState('inicio');

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '80px',
        color: 'white',
      }}
    >
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={{ padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px', margin: '20px' }}>
        {activeTab === 'inicio' && (
          <div>
            <h1>Bienvenido a Cielo Azul</h1>
            <p>Tu descanso frente al mar te espera.</p>
          </div>
        )}

        {activeTab === 'sobreNosotros' && (
          <div>
            <h2>Sobre Nosotros</h2>
            <p>Somos un hotel boutique frente al mar, con servicios exclusivos para ti.</p>
          </div>
        )}

        {activeTab === 'explorar' && (
          <div>
            <h2>Explorar</h2>
            <p>Descubre actividades, playas cercanas y cultura local.</p>
          </div>
        )}

        {activeTab === 'comodidades' && (
          <div>
            <h2>Comodidades</h2>
            <p>Piscina, spa, restaurante gourmet y más.</p>
          </div>
        )}
      </div>
    </div>
  );
}
