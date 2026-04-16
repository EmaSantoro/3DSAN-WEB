import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getServicios } from '../services/api';

const BASE = 'http://localhost:8090';

export default function SeccionServicios() {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    getServicios().then(r => setServicios(r.data)).catch(() => setServicios([]));
  }, []);

  return (
    <section id="servicios" style={{ padding: '6rem 2rem', background: 'transparent', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '4rem' }}
        >
          <p style={{ color: 'var(--blue-light)', letterSpacing: '0.35em', fontSize: '0.72rem', marginBottom: '1rem' }}>
            COLECCIONES
          </p>
          <h2 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.02em', margin: 0 }}>
            Nuestros Servicios
          </h2>
        </motion.div>

        {servicios.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              style={{ width: '32px', height: '32px', border: '2px solid var(--border)', borderTopColor: 'var(--blue)', borderRadius: '50%' }} />
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1.5rem' }}>
            {servicios.map((s, i) => (
              <ServicioCard key={s.id} servicio={s} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ServicioCard({ servicio, index }) {
  const [hovered, setHovered] = useState(false);
  const hasImg = !!servicio.imagenPortada;
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}
      style={{
        background: 'var(--bg-4)',
        border: '1px solid var(--border)',
        borderRadius: '2px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        transition: 'border-color 0.3s',
        borderColor: hovered ? 'var(--border-bright)' : 'var(--border)',
      }}
    >
      {/* Número de orden */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        zIndex: 2,
        color: 'rgba(255,255,255,0.2)',
        fontSize: '0.68rem',
        fontWeight: 800,
        letterSpacing: '0.08em',
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {num}
      </div>

      {/* Imagen de portada */}
      <div style={{ aspectRatio: '16/9', position: 'relative', overflow: 'hidden', background: 'var(--bg-3)' }}>
        {hasImg ? (
          <motion.img
            src={servicio.imagenPortada}
            alt={servicio.nombre}
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--bg-3), var(--bg-5))' }}>
            <motion.div
              animate={{ rotate: hovered ? 180 : 0, scale: hovered ? 1.2 : 1 }}
              transition={{ duration: 0.5 }}
              style={{ width: '48px', height: '48px', border: '1px solid var(--border-bright)', transform: 'rotate(45deg)', opacity: 0.4 }}
            />
          </div>
        )}
        {/* Overlay gradiente */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-4) 0%, transparent 60%)', pointerEvents: 'none' }} />
        {!hasImg && (
          <div style={{ position: 'absolute', top: '0.6rem', right: '0.6rem', background: 'var(--border)', padding: '0.2rem 0.5rem', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--text-3)' }}>
            SIN IMAGEN
          </div>
        )}
      </div>

      {/* Contenido */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '0.6rem' }}>
          {servicio.nombre}
        </h3>
        <p style={{ color: 'var(--text-2)', fontSize: '0.85rem', lineHeight: 1.65, flex: 1, marginBottom: '1.5rem' }}>
          {servicio.descripcionCorta}
        </p>

        <Link to={`/servicios/${servicio.slug}`} style={{ textDecoration: 'none' }}>
          <motion.div
            animate={{ color: hovered ? 'var(--blue-light)' : 'var(--text-3)', x: hovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: '0.8rem', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            Conocer más
            <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>→</motion.span>
          </motion.div>
        </Link>
      </div>

      {/* Línea inferior animada en hover */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ height: '2px', background: 'linear-gradient(90deg, var(--blue-dark), var(--blue-light))', transformOrigin: 'left', position: 'absolute', bottom: 0, left: 0, right: 0 }}
      />
    </motion.div>
  );
}
