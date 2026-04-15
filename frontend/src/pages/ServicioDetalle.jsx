import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getServicioBySlug, getTrabajosByCategoria } from '../services/api';

const BASE_URL = 'http://localhost:8090';

export default function ServicioDetalle() {
  const { slug } = useParams();
  const [servicio, setServicio] = useState(null);
  const [trabajos, setTrabajos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [sRes, tRes] = await Promise.all([
          getServicioBySlug(slug),
          getTrabajosByCategoria(slug),
        ]);
        setServicio(sRes.data);
        setTrabajos(tRes.data);
      } catch {
        setServicio(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#333', letterSpacing: '0.2em', fontSize: '0.8rem' }}>CARGANDO...</p>
      </div>
    );
  }

  if (!servicio) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ color: '#555' }}>Servicio no encontrado.</p>
        <Link to="/" style={{ color: '#444', fontSize: '0.85rem' }}>← Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>

      {/* Header del servicio */}
      <div
        style={{
          padding: '10rem 2rem 6rem',
          background: '#000',
          borderBottom: '1px solid #111',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Fondo sutil */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.02) 0%, transparent 60%)',
          }}
        />

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginBottom: '1.5rem' }}
          >
            <Link
              to="/"
              style={{ color: '#333', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em' }}
            >
              ← INICIO
            </Link>
            <span style={{ color: '#222', margin: '0 0.75rem' }}>/</span>
            <span style={{ color: '#444', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
              {servicio.nombre.toUpperCase()}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              color: '#fff',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              marginBottom: '2rem',
            }}
          >
            {servicio.nombre}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              color: '#666',
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              lineHeight: 1.8,
              maxWidth: '680px',
            }}
          >
            {servicio.descripcionDetalle}
          </motion.p>
        </div>
      </div>

      {/* Trabajos de este servicio */}
      <div style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p style={{ color: '#333', letterSpacing: '0.3em', fontSize: '0.72rem', marginBottom: '3rem' }}>
            TRABAJOS REALIZADOS — {trabajos.length} {trabajos.length === 1 ? 'PROYECTO' : 'PROYECTOS'}
          </p>
        </motion.div>

        {trabajos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem', color: '#2a2a2a', fontSize: '1rem' }}>
            Próximamente...
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {trabajos.map((t, i) => (
              <TrabajoCard key={t.id} trabajo={t} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* CTA Contacto */}
      <div
        style={{
          padding: '6rem 2rem',
          textAlign: 'center',
          borderTop: '1px solid #0f0f0f',
          background: '#000',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p style={{ color: '#444', letterSpacing: '0.3em', fontSize: '0.72rem', marginBottom: '1rem' }}>
            ¿TE INTERESA?
          </p>
          <h3 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>
            Pedinos un presupuesto sin costo
          </h3>
          <Link
            to="/#contacto"
            style={{
              display: 'inline-block',
              border: '1px solid #444',
              color: '#ccc',
              padding: '0.9rem 2.5rem',
              fontSize: '0.82rem',
              letterSpacing: '0.12em',
              textDecoration: 'none',
            }}
          >
            CONTACTAR
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function TrabajoCard({ trabajo, index }) {
  const imagen = trabajo.imagenes?.[0] ? `${BASE_URL}${trabajo.imagenes[0]}` : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
      style={{
        background: '#080808',
        border: '1px solid #141414',
        overflow: 'hidden',
      }}
    >
      {/* Imagen */}
      <div style={{ aspectRatio: '4/3', background: '#0d0d0d', overflow: 'hidden', position: 'relative' }}>
        {imagen ? (
          <img
            src={imagen}
            alt={trabajo.titulo}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1a1a', fontSize: '2.5rem' }}>
            ◈
          </div>
        )}
        {trabajo.destacado && (
          <div style={{
            position: 'absolute', top: '0.75rem', left: '0.75rem',
            background: '#fff', color: '#000', fontSize: '0.6rem', fontWeight: 700,
            padding: '0.2rem 0.5rem', letterSpacing: '0.1em',
          }}>
            DESTACADO
          </div>
        )}
      </div>

      {/* Contenido */}
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.6rem' }}>
          {trabajo.titulo}
        </h3>
        <p style={{ color: '#444', fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>
          {trabajo.descripcion}
        </p>
      </div>
    </motion.div>
  );
}
