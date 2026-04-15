import { useDocumentTitle } from '../hooks/useDocumentTitle';
import Hero from '../components/Hero';
import SeccionIntro from '../components/SeccionIntro';
import SeccionServicios from '../components/SeccionServicios';
import SeccionFabricacion from '../components/SeccionFabricacion';
import SeccionPersonalizados from '../components/SeccionPersonalizados';
import SeccionPorQueElegirnos from '../components/SeccionPorQueElegirnos';
import Contacto from '../components/Contacto';

export default function Home() {
  useDocumentTitle(null);
  return (
    <>
      <Hero />
      <div style={{ height: '80px', background: 'linear-gradient(180deg, #000 0%, #111111 100%)', pointerEvents: 'none' }} />
      <SeccionIntro />
      <SeccionServicios />
      <SeccionFabricacion />
      <SeccionPersonalizados />
      <SeccionPorQueElegirnos />
      <Contacto />
    </>
  );
}
