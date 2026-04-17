import { motion } from 'framer-motion';
import Reveal from './Reveal';

export default function SeccionPersonalizados() {

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
        {/* Imagen lado izquierdo */}
        <div style={{ order: 0 }}>
          <Reveal x={-40}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              style={{
                aspectRatio: '1/1',
                background: '#080808',
                border: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
              }}
            >
              <img
                src="/productos/personalizados.jpeg"
                alt="Diseños personalizados 3DSAN"
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              {/* Decoración geométrica de fondo */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '1rem',
                  opacity: 0.3
                }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ rotate: [0, 90], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 10 + i * 2, ease: "linear" }}
                    style={{
                      width: `${100 - i * 25}px`,
                      height: `${100 - i * 25}px`,
                      border: '1px solid var(--blue-light)',
                      transform: `rotate(${i * 15}deg)`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </Reveal>
        </div>

        {/* Texto */}
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
