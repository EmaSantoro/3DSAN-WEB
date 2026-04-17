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
      style={{ padding: '8rem 2rem', background: 'transparent', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', marginBottom: '6rem' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span style={{ 
            color: 'var(--blue-light)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.4em', 
            fontSize: '0.75rem',
            fontWeight: 600,
            display: 'block',
            marginBottom: '1.5rem'
          }}>
            Del Concepto al Objeto
          </span>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
            maxWidth: '1000px', 
            margin: '0 auto 2rem',
            color: '#fff',
            lineHeight: 1.1,
            fontWeight: 900,
            letterSpacing: '-0.02em'
          }}>
            Fabricación en <span style={{ color: 'var(--blue-light)' }}>alta calidad</span> con tecnología de vanguardia.
          </h2>
          <p style={{ 
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', 
            maxWidth: '750px', 
            margin: '0 auto',
            color: 'var(--text-2)',
            lineHeight: 1.6
          }}>
            Trabajamos con impresoras <strong style={{ color: 'var(--blue-xlight)' }}>Bambulab</strong>, líderes mundiales en precisión FDM, para materializar tus proyectos con una fidelidad milimétrica.
          </p>
        </motion.div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>

        {/* Detalles Técnicos */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p style={{ color: 'var(--text-3)', lineHeight: 1.85, fontSize: '0.97rem', marginBottom: '2.5rem' }}>
            Contamos con sistema multifilamento AMS integrado y ambiente con temperatura controlada, garantizando consistencia en cada impresión. La tecnología Bambulab nos permite reducir tiempos de entrega sin sacrificar calidad superficial.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {SPECS.map((s, i) => (
              <div key={s.label} style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                <div style={{ color: 'var(--text-3)', fontSize: '0.68rem', letterSpacing: '0.15em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>{s.label}</div>
                <div style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>{s.value}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Imagen Bambulab */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div style={{
              aspectRatio: '16/10',
              background: 'var(--bg-4)',
              border: '1px solid var(--border)',
              overflow: 'hidden',
              position: 'relative',
              borderRadius: '4px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}>
            <img
              src="/images/bambulab.jpg"
              alt="Impresoras Bambulab 3DSAN"
              onLoad={() => setImgLoaded(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.6s' }}
            />
            {!imgLoaded && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '40px', height: '40px', border: '2px solid var(--border)', borderTopColor: 'var(--blue)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              </div>
            )}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, transparent 60%)' }} />
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin { to { transform: rotate(360deg); } }
      `}} />
    </section>
  );
}
