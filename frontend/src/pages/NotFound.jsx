import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Página no encontrada');

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Número fantasma de fondo */}
      <div
        style={{
          position: 'absolute',
          fontSize: 'clamp(12rem, 35vw, 24rem)',
          fontWeight: 900,
          color: '#fff',
          opacity: 0.03,
          letterSpacing: '-0.05em',
          userSelect: 'none',
          pointerEvents: 'none',
          lineHeight: 1,
        }}
      >
        404
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <p
          style={{
            color: 'var(--blue-light)',
            letterSpacing: '0.35em',
            fontSize: '0.72rem',
            marginBottom: '1.5rem',
          }}
        >
          ERROR 404
        </p>
        <h1
          style={{
            color: '#fff',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
          }}
        >
          Página no encontrada
        </h1>
        <p
          style={{
            color: 'var(--text-2)',
            marginBottom: '3rem',
            fontSize: '0.95rem',
            lineHeight: 1.7,
          }}
        >
          La ruta que buscás no existe o fue movida.
        </p>
        <motion.div
          whileHover={{
            background: 'var(--blue)',
            borderColor: 'var(--blue)',
            boxShadow: '0 0 30px var(--blue-glow2)',
          }}
          style={{
            display: 'inline-block',
            border: '1px solid var(--border-bright)',
            transition: 'all 0.3s',
          }}
        >
          <Link
            to="/"
            style={{
              display: 'block',
              color: 'var(--text)',
              padding: '0.9rem 2.25rem',
              fontSize: '0.82rem',
              letterSpacing: '0.12em',
              textDecoration: 'none',
            }}
          >
            VOLVER AL INICIO
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
