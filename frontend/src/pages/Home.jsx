import Hero from '../components/Hero';
import Galeria from '../components/Galeria';
import Destacados from '../components/Destacados';
import AcercaDe from '../components/AcercaDe';
import Contacto from '../components/Contacto';

export default function Home() {
  return (
    <>
      <Hero />
      <Destacados />
      <Galeria />
      <AcercaDe />
      <Contacto />
    </>
  );
}
