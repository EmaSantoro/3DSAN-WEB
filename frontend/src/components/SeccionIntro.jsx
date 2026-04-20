import { motion } from 'framer-motion';
import Reveal from './Reveal';

const TruckIcon = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ width: '2.5rem', height: '2.5rem', display: 'inline-block', verticalAlign: 'middle', stroke: 'var(--blue-light)' }}>
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 4v4h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const STATS = [
  { value: '+600', label: 'Clientes satisfechos' },
  { value: '100%', label: 'Personalización' },
  { value: TruckIcon, label: 'Envíos a todo el país' },
];

export default function SeccionIntro() {
  return (
    <section
      style={{
        padding: '10rem 2rem',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '860px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <p style={{ color: 'var(--blue-light)', letterSpacing: '0.4em', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1.5rem', textTransform: 'uppercase' }}>
            Impresiones 3DSAN
          </p>
        </Reveal>

        <Reveal delay={0.2} y={40}>
          <h2 style={{
            color: '#fff',
            fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: '1.5rem',
            letterSpacing: '-0.03em',
          }}>
            Del concepto <span style={{ color: 'var(--blue-light)' }}>al objeto</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.4} y={20}>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: 1.75,
            maxWidth: '600px',
            margin: '0 auto 5rem',
          }}>
            Soluciones 3D de precisión para cada desafío. Transformamos ideas, diseños y necesidades en objetos reales con la más alta calidad.
          </p>
        </Reveal>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2rem, 8vw, 6rem)', flexWrap: 'wrap' }}>
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: 'center' }}
            >
              <motion.div 
                whileHover={{ scale: 1.1, color: '#fff' }}
                style={{
                  color: 'var(--blue-light)',
                  fontSize: '2.8rem',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  marginBottom: '0.5rem'
                }}
              >
                {stat.value}
              </motion.div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', letterSpacing: '0.12em', fontWeight: 500, textTransform: 'uppercase' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
