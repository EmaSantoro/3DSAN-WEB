import { useState } from 'react';
import { motion } from 'framer-motion';

const SPECS = [
  { label: 'Filamentos', value: 'PLA · PETG · ABS · TPU' },
  { label: 'Precisión',  value: '±0.1 mm' },
];

export default function SeccionFabricacion() {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section
      id="fabricacion"
      style={{ padding: '6rem 2rem', background: 'transparent', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'center' }}>

        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{ color: 'var(--blue-light)', letterSpacing: '0.35em', fontSize: '0.72rem', marginBottom: '1.2rem' }}>
            TECNOLOGÍA
          </p>

          <h2 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            Fabricación en alta calidad
          </h2>

          <p style={{ color: 'var(--text-2)', lineHeight: 1.85, marginBottom: '1.5rem', fontSize: '0.97rem' }}>
            Trabajamos con impresoras marca <strong style={{ color: 'var(--blue-xlight)', fontWeight: 700 }}>Bambulab</strong>, líderes mundiales en impresión 3D de alta velocidad y precisión FDM. Cada pieza que fabricamos refleja el nivel de tecnología de nuestro equipamiento.
          </p>

          <p style={{ color: 'var(--text-3)', lineHeight: 1.85, fontSize: '0.93rem', marginBottom: '2.5rem' }}>
            Contamos con sistema multifilamento AMS integrado y ambiente con temperatura controlada, garantizando consistencia en cada impresión.
          </p>

          {/* Specs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {SPECS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                style={{ borderTop: '1px solid var(--border)', paddingTop: '0.85rem' }}
              >
                <div style={{ color: 'var(--text-3)', fontSize: '0.68rem', letterSpacing: '0.15em', marginBottom: '0.4rem' }}>{s.label}</div>
                <div style={{ color: 'var(--blue-xlight)', fontSize: '0.88rem', fontWeight: 700 }}>{s.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Imagen Bambulab */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            style={{
              aspectRatio: '4/3',
              background: 'var(--bg-4)',
              border: '1px solid var(--border)',
              overflow: 'hidden',
              position: 'relative',
              borderRadius: '2px',
            }}
            className="glow-pulse"
          >
            <img
              src="/images/bambulab.jpg"
              alt="Impresoras Bambulab 3DSAN"
              onLoad={() => setImgLoaded(true)}
              onError={(e) => { e.target.style.display = 'none'; }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.6s' }}
            />
            {/* Placeholder si no hay imagen */}
            {!imgLoaded && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  style={{ width: '60px', height: '60px', border: '1px solid var(--border-bright)', borderRadius: '50%', borderTopColor: 'var(--blue)' }}
                />
                <span style={{ color: 'var(--text-3)', fontSize: '0.72rem', letterSpacing: '0.2em' }}>BAMBULAB</span>
              </div>
            )}
            {/* Overlay azul sutil */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
