import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTrabajosPublicos, getTrabajosByCategoria } from '../services/api';
import TrabajoCard from './TrabajoCard';

const CATEGORIAS = [
  { label: 'Todos',    value: null },
  { label: 'Jarras',   value: 'jarras-personalizadas' },
  { label: 'Llaveros', value: 'llaveros-negocios' },
  { label: 'Piezas',   value: 'piezas-funcionales' },
  { label: 'Essen',    value: 'productos-essen' },
];

export default function Galeria() {
  const [trabajos, setTrabajos] = useState([]);
  const [categoriaIdx, setCategoriaIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  const categoriaActual = CATEGORIAS[categoriaIdx];

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = categoriaActual.value
          ? await getTrabajosByCategoria(categoriaActual.value)
          : await getTrabajosPublicos();
        setTrabajos(res.data.slice(0, 6));
      } catch {
        setTrabajos([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [categoriaIdx]);

  return (
    <section id="trabajos" style={{ padding: '6rem 2rem', background: 'transparent' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '3rem' }}
        >
          <p style={{ color: 'var(--blue-light)', letterSpacing: '0.35em', fontSize: '0.72rem', marginBottom: '1rem' }}>
            PORTFOLIO
          </p>
          <h2 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.02em', margin: 0 }}>
            Nuestros Trabajos
          </h2>
        </motion.div>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {CATEGORIAS.map((cat, i) => (
            <motion.button
              key={cat.label}
              whileHover={{ scale: 1.02 }}
              onClick={() => setCategoriaIdx(i)}
              style={{
                background: categoriaIdx === i ? '#fff' : 'transparent',
                color: categoriaIdx === i ? '#000' : 'var(--text-3)',
                border: '1px solid',
                borderColor: categoriaIdx === i ? '#fff' : 'var(--border)',
                padding: '0.4rem 1.2rem',
                cursor: 'pointer',
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                transition: 'all 0.2s',
              }}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              style={{ width: '32px', height: '32px', border: '2px solid var(--border)', borderTopColor: 'var(--blue)', borderRadius: '50%' }}
            />
          </div>
        ) : trabajos.length === 0 ? (
          <div style={{ color: 'var(--text-3)', textAlign: 'center', padding: '4rem', fontSize: '0.95rem' }}>
            Sin trabajos en esta categoría aún.
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={categoriaIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {trabajos.map((t, i) => (
                <TrabajoCard key={t.id} trabajo={t} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
