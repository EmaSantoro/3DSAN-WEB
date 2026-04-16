import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getServicioBySlug, getTrabajosByCategoria, API_BASE } from '../services/api';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const BASE_URL = API_BASE;

export default function ServicioDetalle() {
  const { slug } = useParams();
  const [servicio, setServicio] = useState(null);
  const [trabajos, setTrabajos] = useState([]);
  const [loading, setLoading] = useState(true);

  useDocumentTitle(servicio?.nombre);

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
      <div style={{ minHeight: '100vh', background: 'var(--bg-1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          style={{ width: '32px', height: '32px', border: '2px solid var(--border)', borderTopColor: 'var(--blue)', borderRadius: '50%' }}
        />
      </div>
    );
  }

  if (!servicio) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem' }}>
        <p style={{ color: 'var(--text-2)', fontSize: '0.95rem' }}>Servicio no encontrado.</p>
        <Link to="/" style={{ color: 'var(--blue-light)', fontSize: '0.85rem', textDecoration: 'none', letterSpacing: '0.08em' }}>
          ← Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-1)' }}>

      {/* Header del servicio */}
      <div
        style={{
          padding: '10rem 2rem 6rem',
          background: 'linear-gradient(180deg, var(--bg-2) 0%, var(--bg-1) 100%)',
          borderBottom: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Línea decorativa animada */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--blue), transparent)',
            transformOrigin: 'left',
          }}
        />

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Link
              to="/"
              style={{ color: 'var(--text-3)', textDecoration: 'none', fontSize: '0.78rem', letterSpacing: '0.1em', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--text-2)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-3)'}
            >
              INICIO
            </Link>
            <span style={{ color: 'var(--border-bright)', fontSize: '0.78rem' }}>/</span>
            <span style={{ color: 'var(--text-2)', fontSize: '0.78rem', letterSpacing: '0.1em' }}>
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
              color: 'var(--text-2)',
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
          <p style={{ color: 'var(--text-3)', letterSpacing: '0.3em', fontSize: '0.72rem', marginBottom: '3rem' }}>
            TRABAJOS REALIZADOS — {trabajos.length} {trabajos.length === 1 ? 'PROYECTO' : 'PROYECTOS'}
          </p>
        </motion.div>

        {trabajos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-3)', fontSize: '0.95rem' }}>
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
          borderTop: '1px solid var(--border)',
          background: 'var(--bg-2)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p style={{ color: 'var(--blue-light)', letterSpacing: '0.3em', fontSize: '0.72rem', marginBottom: '1rem' }}>
            ¿TE INTERESA?
          </p>
          <h3 style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '2rem' }}>
            Pedinos un presupuesto sin costo
          </h3>
          <motion.div
            whileHover={{ background: 'var(--blue)', borderColor: 'var(--blue)', boxShadow: '0 0 30px var(--blue-glow2)' }}
            style={{ display: 'inline-block', border: '1px solid var(--border-bright)', transition: 'all 0.3s' }}
          >
            <Link
              to="/#contacto"
              style={{
                display: 'block',
                color: 'var(--text)',
                padding: '0.9rem 2.5rem',
                fontSize: '0.82rem',
                letterSpacing: '0.12em',
                textDecoration: 'none',
              }}
            >
              CONTACTAR
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function TrabajoCard({ trabajo, index }) {
  const [hovered, setHovered] = useState(false);
  const imagen = trabajo.imagenes?.[0] ? `${BASE_URL}${trabajo.imagenes[0]}` : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,0,0,0.4)' }}
      style={{
        background: 'var(--bg-3)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        transition: 'border-color 0.3s',
        borderColor: hovered ? 'var(--border-bright)' : 'var(--border)',
      }}
    >
      {/* Imagen */}
      <div style={{ aspectRatio: '4/3', background: 'var(--bg-2)', overflow: 'hidden', position: 'relative' }}>
        {imagen ? (
          <motion.img
            src={imagen}
            alt={trabajo.titulo}
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              animate={{ rotate: hovered ? 90 : 45 }}
              transition={{ duration: 0.4 }}
              style={{ width: '40px', height: '40px', border: '1px solid var(--border-bright)', opacity: 0.5 }}
            />
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
        <p style={{ color: 'var(--text-2)', fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>
          {trabajo.descripcion}
        </p>
      </div>
    </motion.div>
  );
}
