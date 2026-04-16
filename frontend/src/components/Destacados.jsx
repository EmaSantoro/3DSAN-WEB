import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getDestacados } from '../services/api';
import TrabajoCard from './TrabajoCard';

export default function Destacados() {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    getDestacados()
      .then((r) => setDestacados(r.data.slice(0, 6)))
      .catch(() => setDestacados([]));
  }, []);

  if (destacados.length === 0) return null;

  return (
    <section
      id="destacados"
      style={{ padding: '6rem 2rem', background: 'transparent' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '3rem' }}
        >
          <p style={{ color: '#555', letterSpacing: '0.3em', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
            SELECCIÓN
          </p>
          <h2 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, margin: 0 }}>
            Destacados
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {destacados.map((t, i) => (
            <TrabajoCard key={t.id} trabajo={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
