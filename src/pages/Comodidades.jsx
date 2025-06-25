import React from "react";

const comodidades = [
  {
    titulo: "🛏️ Habitaciones cómodas",
    descripcion: "Habitaciones amplias con camas king/queen, Wi-Fi, calefacción y vistas a la ciudad de Cusco.",
  },
  {
    titulo: "🍽️ Restaurante gourmet",
    descripcion: "Cocina fusión andina con platos típicos e internacionales, desayuno buffet incluido.",
  },
  {
    titulo: "💆 Spa & Bienestar",
    descripcion: "Relájate con masajes, sauna, jacuzzi y tratamientos faciales en nuestro spa exclusivo.",
  },
  {
    titulo: "🏊 Piscina climatizada",
    descripcion: "Piscina techada con temperatura ideal todo el año, perfecta para relajarse después de un tour.",
  },
  {
    titulo: "📶 Wi-Fi gratuito",
    descripcion: "Conexión de alta velocidad en todas las áreas del hotel, ideal para viajeros y nómadas digitales.",
  },
  {
    titulo: "🧺 Lavandería",
    descripcion: "Servicio rápido de lavado y planchado, ideal para estancias largas.",
  },
  {
    titulo: "🧳 Guardaequipaje",
    descripcion: "Deja tus maletas con nosotros si llegas antes del check-in o después del check-out.",
  },
  {
    titulo: "🚖 Transporte y tours",
    descripcion: "Coordinamos traslados al aeropuerto y tours guiados a Machu Picchu, Valle Sagrado y más.",
  },
];

const Comodidades = () => {
  return (
    <div style={{ padding: "30px" }}>
      <div style={{
        backgroundColor: "#f1f8e9",
        borderRadius: "12px",
        padding: "30px",
        textAlign: "center",
        marginBottom: "30px"
      }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "10px", color: "#33691e" }}>Nuestras Comodidades</h2>
        <p style={{ maxWidth: "700px", margin: "0 auto", color: "#33691e" }}>
          Todo lo que necesitas para una estadía inolvidable en Cusco: confort, sabor, relajación y servicio de calidad.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        {comodidades.map((item, index) => (
          <div key={index} style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>
            <h3 style={{ margin: "0 0 10px", fontSize: "1.1rem", color: "#2e7d32" }}>{item.titulo}</h3>
            <p style={{ margin: 0, fontSize: "0.95rem", color: "#555" }}>{item.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comodidades;
