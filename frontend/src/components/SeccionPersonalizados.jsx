import { motion } from 'framer-motion';
import Reveal from './Reveal';

// Lista de imágenes para el carrete. 
const CARRETE_IMAGES = [
  'personalizados.png',
  'personalizados2.png',
  'personalizados3.png'
].map(img => `/images/imagesCarrete/${img}`);

export default function SeccionPersonalizados() {
  // Duplicamos la lista para el efecto de scroll infinito sin saltos
  const doubleImages = [...CARRETE_IMAGES, ...CARRETE_IMAGES];

  return (
    <section
      style={{ padding: '8rem 2rem', background: 'transparent', overflow: 'hidden' }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '5rem',
          alignItems: 'center',
        }}
      >
        {/* Carrete de Imágenes (Lado Izquierdo) */}
        <div style={{ order: 0, overflow: 'hidden', position: 'relative', width: '100%' }}>
          <Reveal x={-40}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', background: 'transparent', display: 'flex', alignItems: 'center' }}>
              
              <motion.div
                animate={{ x: [0, '-50%'] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 25,
                    ease: "linear",
                  },
                }}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  padding: '0 0.5rem',
                  width: 'fit-content'
                }}
              >
                {doubleImages.map((src, idx) => (
                  <div
                    key={idx}
                    style={{
                      flexShrink: 0,
                      width: '280px',
                      height: '380px',
                      background: 'transparent',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img
                      src={src}
                      alt={`Diseño personalizado ${idx}`}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      onError={(e) => { 
                        // Placeholder si la imagen no existe aún
                        e.target.style.display = 'none';
                        e.target.parentNode.style.background = 'linear-gradient(45deg, #111, #222)';
                      }}
                    />
                  </div>
                ))}
              </motion.div>

              {/* Degradados laterales para suavizar bordes - Sincronizados con el fondo del sitio */}
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(90deg, #111111 0%, transparent 25%, transparent 75%, #111111 100%)', zIndex: 2 }} />
            </div>
          </Reveal>
        </div>

        {/* Texto (Lado Derecho) */}
        <div>
          <Reveal delay={0.1} x={40}>
            <p style={{ color: 'var(--blue-light)', letterSpacing: '0.4em', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              A medida
            </p>
          </Reveal>
          
          <Reveal delay={0.2} x={40}>
            <h2
              style={{
                color: '#fff',
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '2rem',
                letterSpacing: '-0.02em',
              }}
            >
              Productos y diseños <span style={{ color: 'var(--blue-light)' }}>personalizados</span>
            </h2>
          </Reveal>

          <Reveal delay={0.3} x={40}>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '1rem' }}>
              ¿Tenés una idea, un diseño propio o una necesidad específica? Trabajamos con vos desde el boceto hasta el objeto terminado.
            </p>
          </Reveal>

          <Reveal delay={0.4} x={40}>
            <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, marginBottom: '3rem', fontSize: '0.95rem' }}>
              Envianos tu archivo STL, OBJ, plano o simplemente describinos qué necesitás. Modelamos, imprimimos y entregamos. Sin mínimos para unidades, sin límites de complejidad.
            </p>
          </Reveal>

          <Reveal delay={0.5} x={40}>
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.05, backgroundColor: 'var(--blue-light)', color: '#000' }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-block',
                background: 'transparent',
                border: '1px solid var(--blue-light)',
                color: 'var(--blue-light)',
                padding: '1rem 2.5rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textDecoration: 'none',
                borderRadius: '2px',
                transition: 'all 0.3s',
              }}
            >
              SOLICITAR PRESUPUESTO
            </motion.a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
