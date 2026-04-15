import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:8090';

export default function TrabajoCard({ trabajo, index = 0 }) {
  const imagen = trabajo.imagenes?.[0]
    ? `${BASE_URL}${trabajo.imagenes[0]}`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      style={{ cursor: 'pointer' }}
    >
      <Link to={`/trabajos/${trabajo.id}`} style={{ textDecoration: 'none' }}>
        <div
          style={{
            background: '#0d0d0d',
            border: '1px solid #1a1a1a',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Imagen */}
          <div
            style={{
              aspectRatio: '4/3',
              background: '#111',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {imagen ? (
              <motion.img
                src={imagen}
                alt={trabajo.titulo}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#333',
                  fontSize: '2rem',
                }}
              >
                ◈
              </div>
            )}

            {/* Badge 3D */}
            {trabajo.modelo3DPath && (
              <div
                style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  background: '#fff',
                  color: '#000',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '0.25rem 0.5rem',
                  letterSpacing: '0.1em',
                }}
              >
                3D
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ padding: '1.25rem' }}>
            <p
              style={{
                color: '#555',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                marginBottom: '0.4rem',
                textTransform: 'uppercase',
              }}
            >
              {trabajo.categoria || 'Sin categoría'}
            </p>
            <h3
              style={{
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 600,
                margin: 0,
              }}
            >
              {trabajo.titulo}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
