import { useDocumentTitle } from '../hooks/useDocumentTitle';
import Hero from '../components/Hero';
import SeccionIntro from '../components/SeccionIntro';
import SeccionServicios from '../components/SeccionServicios';
import SeccionPersonalizados from '../components/SeccionPersonalizados';
import SeccionFabricacion from '../components/SeccionFabricacion';
import Destacados from '../components/Destacados';
import Galeria from '../components/Galeria';
import SeccionPorQueElegirnos from '../components/SeccionPorQueElegirnos';
import Contacto from '../components/Contacto';

const Divider = () => <div className="section-divider" />;

export default function Home() {
  useDocumentTitle(null);
  return (
    <>
      <Hero />
      <div style={{ height: '80px', background: 'linear-gradient(180deg, #000 0%, #111111 100%)', pointerEvents: 'none' }} />
      <SeccionIntro />
      <Divider />
      <SeccionServicios />
      <Divider />
      <SeccionPersonalizados />
      <Divider />
      <SeccionFabricacion />
      <Divider />
      <Destacados />
      <Divider />
      <Galeria />
      <Divider />
      <SeccionPorQueElegirnos />
      <Divider />
      <Contacto />
    </>
  );
}
