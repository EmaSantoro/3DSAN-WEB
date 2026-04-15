import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

function Counter({ to, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2.2, ease: 'easeOut', onUpdate: v => setVal(Math.round(v)) });
    return c.stop;
  }, [inView, to]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

const STATS = [
  { prefix: '+', to: 600, suffix: '', label: 'Clientes satisfechos' },
  { prefix: '',  to: 100, suffix: '%', label: 'Diseños personalizados' },
  { prefix: '',  to: 0,   suffix: 'Todo el país', label: 'Envíos', special: 'Todo el país' },
];

export default function SeccionIntro() {
  return (
    <section
      style={{
        padding: '6rem 2rem',
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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ color: 'var(--blue-light)', letterSpacing: '0.35em', fontSize: '0.75rem', marginBottom: '1.5rem' }}
        >
          IMPRESIONES 3DSAN
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            color: '#fff',
            fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: '1.5rem',
            letterSpacing: '-0.03em',
          }}
        >
          Del concepto al objeto.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            color: 'var(--text-2)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: 1.75,
            maxWidth: '600px',
            margin: '0 auto 4rem',
          }}
        >
          Soluciones 3D de precisión para cada desafío. Transformamos ideas, diseños y necesidades en objetos reales con la más alta calidad.
        </motion.p>

        {/* Stats con counter animado */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2rem, 8vw, 6rem)', flexWrap: 'wrap' }}>
          {[
            { to: 600, prefix: '+', suffix: '', label: 'Clientes satisfechos' },
            { to: 100, prefix: '',  suffix: '%', label: 'Personalización' },
            { to: null, label: 'Envíos a todo el país', special: true },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.12 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                color: '#fff',
                fontSize: '2.2rem',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #fff 30%, var(--blue-light) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {stat.special
                  ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ width: '2rem', height: '2rem', display: 'inline-block', verticalAlign: 'middle', stroke: 'var(--blue-xlight)' }}>
                      <rect x="1" y="3" width="15" height="13" rx="1" />
                      <path d="M16 8h4l3 4v4h-7V8z" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  )
                  : <Counter to={stat.to} prefix={stat.prefix} suffix={stat.suffix} />
                }
              </div>
              <div style={{ color: 'var(--text-3)', fontSize: '0.75rem', letterSpacing: '0.12em', marginTop: '0.4rem' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
