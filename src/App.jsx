import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import SobreNosotros from "./pages/SobreNosotros";
import Explorar from "./pages/Explorar";
import Comodidades from "./pages/Comodidades";
import Habitaciones from "./pages/Habitaciones";
import DetalleHabitacion from "./pages/DetalleHabitacion";
import Login from "./pages/Login";
import FormularioReserva from "./pages/FormularioReserva";
import MisReservas from "./pages/MisReservas"; // 👈 AGREGA ESTA LÍNEA

import "./index.css";

function App() {
  return (
    <Router>
      <div className="page-background">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/explorar" element={<Explorar />} />
          <Route path="/comodidades" element={<Comodidades />} />
          <Route path="/habitaciones" element={<Habitaciones />} />
          <Route path="/habitacion/:id" element={<DetalleHabitacion />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reservar" element={<FormularioReserva />} />

          {/* ✅ Conectamos tu página de MisReservas */}
          <Route path="/mis-reservas" element={<MisReservas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
