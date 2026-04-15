import Hero from '../components/Hero';
import SeccionIntro from '../components/SeccionIntro';
import SeccionServicios from '../components/SeccionServicios';
import SeccionFabricacion from '../components/SeccionFabricacion';
import SeccionPersonalizados from '../components/SeccionPersonalizados';
import SeccionPorQueElegirnos from '../components/SeccionPorQueElegirnos';
import Contacto from '../components/Contacto';

const Divider = ({ fromColor = '#000', toColor = '#080808' }) => (
  <div
    style={{
      height: '80px',
      background: `linear-gradient(180deg, ${fromColor} 0%, ${toColor} 100%)`,
      pointerEvents: 'none',
    }}
  />
);

export default function Home() {
  return (
    <>
      <Hero />
      <Divider fromColor="#000" toColor="#080808" />
      <SeccionIntro />
      <Divider fromColor="#060606" toColor="#020202" />
      <SeccionServicios />
      <Divider fromColor="#000" toColor="#111" />
      <SeccionFabricacion />
      <Divider fromColor="#0d0d0d" toColor="#050505" />
      <SeccionPersonalizados />
      <Divider fromColor="#030303" toColor="#0b0b0b" />
      <SeccionPorQueElegirnos />
      <Divider fromColor="#0b0b0b" toColor="#090909" />
      <Contacto />
    </>
  );
}
