// src/router/index.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SobreNosotros from "../pages/SobreNosotros";
import Explorar from "../pages/Explorar";
import Comodidades from "../pages/Comodidades";
import Habitaciones from "../pages/Habitaciones";

export default function RouterApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre-nosotros" element={<SobreNosotros />} />
      <Route path="/explorar" element={<Explorar />} />
      <Route path="/comodidades" element={<Comodidades />} />
      <Route path="/habitaciones" element={<Habitaciones />} />
    </Routes>
  );
}
