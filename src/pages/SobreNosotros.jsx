import React from "react";

const SobreNosotros = () => {
  return (
    <div style={{ padding: "30px" }}>
      <div style={{
        backgroundColor: "#fff3e0",
        borderRadius: "12px",
        padding: "30px",
        textAlign: "center",
        marginBottom: "30px"
      }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "10px", color: "#bf360c" }}>Sobre Nosotros</h2>
        <p style={{ maxWidth: "800px", margin: "0 auto", fontSize: "1rem", color: "#5d4037" }}>
          En el corazón de Cusco, a solo unos pasos de la majestuosa Plaza de Armas y a la sombra de la fortaleza de
          Sacsayhuamán, nuestro hotel te da la bienvenida a una experiencia única. 
          <br /><br />
          Ubicados en la histórica <strong>Calle Saphi 728</strong>, combinamos la hospitalidad andina con el confort moderno. Nuestro objetivo es que cada huésped no solo visite Cusco, sino que lo viva: su historia, su cultura y su energía.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <h3 style={{ color: "#6d4c41" }}>Nuestra Historia</h3>
          <p style={{ color: "#4e342e" }}>
            Fundado por una familia cusqueña apasionada por su ciudad, el hotel fue restaurado respetando los detalles arquitectónicos coloniales originales, y cuenta con detalles rústicos, patios empedrados y muros de piedra que cuentan historias de siglos pasados.
          </p>
        </div>

        <div>
          <h3 style={{ color: "#6d4c41" }}>Nuestra Misión</h3>
          <p style={{ color: "#4e342e" }}>
            Ofrecer una experiencia auténtica, cómoda y culturalmente enriquecedora a cada huésped, con atención personalizada y una conexión real con la esencia de Cusco.
          </p>
        </div>

        <div>
          <h3 style={{ color: "#6d4c41" }}>¿Por qué elegirnos?</h3>
          <ul style={{ color: "#4e342e", paddingLeft: "20px" }}>
            <li>📍 Ubicación privilegiada: cerca de los principales atractivos turísticos.</li>
            <li>🛌 Habitaciones diseñadas para tu descanso y relajación.</li>
            <li>👣 Atención cálida y personalizada como en casa.</li>
            <li>🫖 Desayuno andino con productos locales cada mañana.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros;
