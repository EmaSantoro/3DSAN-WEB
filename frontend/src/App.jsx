import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import ServicioDetalle from './pages/ServicioDetalle';
import TrabajoDetalle from './pages/TrabajoDetalle';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/servicios/:slug" element={<ServicioDetalle />} />
        <Route path="/trabajos/:id" element={<TrabajoDetalle />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
