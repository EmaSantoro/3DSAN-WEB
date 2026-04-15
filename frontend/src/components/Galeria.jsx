import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTrabajosPublicos, getTrabajosByCategoria } from '../services/api';
import TrabajoCard from './TrabajoCard';

const CATEGORIAS = ['Todos', 'Decoración', 'Industria', 'Arte', 'Prototipo', 'Personalizado'];

export default function Galeria() {
  const [trabajos, setTrabajos] = useState([]);
  const [categoria, setCategoria] = useState('Todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = categoria === 'Todos'
          ? await getTrabajosPublicos()
          : await getTrabajosByCategoria(categoria);
        setTrabajos(res.data);
      } catch {
        setTrabajos([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [categoria]);

  return (
    <section
      id="trabajos"
      style={{ padding: '8rem 2rem', background: '#000', minHeight: '100vh' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '3rem' }}
        >
          <p style={{ color: '#555', letterSpacing: '0.3em', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
            PORTFOLIO
          </p>
          <h2 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, margin: 0 }}>
            Nuestros Trabajos
          </h2>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}
        >
          {CATEGORIAS.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.02 }}
              onClick={() => setCategoria(cat)}
              style={{
                background: categoria === cat ? '#fff' : 'transparent',
                color: categoria === cat ? '#000' : '#555',
                border: '1px solid',
                borderColor: categoria === cat ? '#fff' : '#333',
                padding: '0.4rem 1.2rem',
                cursor: 'pointer',
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div style={{ color: '#444', textAlign: 'center', padding: '4rem' }}>Cargando...</div>
        ) : trabajos.length === 0 ? (
          <div style={{ color: '#333', textAlign: 'center', padding: '4rem', fontSize: '1.2rem' }}>
            Sin trabajos en esta categoría aún.
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={categoria}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
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
