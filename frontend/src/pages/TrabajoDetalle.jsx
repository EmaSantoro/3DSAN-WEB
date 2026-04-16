import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getTrabajoById, API_BASE } from '../services/api';
import Viewer3D from '../components/Viewer3D';

const BASE_URL = API_BASE;

export default function TrabajoDetalle() {
  const { id } = useParams();
  const [trabajo, setTrabajo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgActiva, setImgActiva] = useState(0);

  useEffect(() => {
    setLoading(true);
    getTrabajoById(id)
      .then((r) => setTrabajo(r.data))
      .catch(() => setTrabajo(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#444' }}>Cargando...</p>
      </div>
    );
  }

  if (!trabajo) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem' }}>
        <p style={{ color: '#444' }}>Trabajo no encontrado.</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', padding: '6rem 2rem 4rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ marginBottom: '2rem' }}
        >
          <Link to="/#trabajos" style={{ color: '#444', textDecoration: 'none', fontSize: '0.85rem' }}>
            ← Trabajos
          </Link>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          {/* Galería de imágenes */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            {trabajo.imagenes?.length > 0 ? (
              <>
                <img
                  src={`${BASE_URL}${trabajo.imagenes[imgActiva]}`}
                  alt={trabajo.titulo}
                  style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block', marginBottom: '0.75rem' }}
                />
                {trabajo.imagenes.length > 1 && (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {trabajo.imagenes.map((img, i) => (
                      <img
                        key={i}
                        src={`${BASE_URL}${img}`}
                        onClick={() => setImgActiva(i)}
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          cursor: 'pointer',
                          border: i === imgActiva ? '1px solid #fff' : '1px solid #222',
                          opacity: i === imgActiva ? 1 : 0.5,
                          transition: 'all 0.2s',
                        }}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div style={{ aspectRatio: '4/3', background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '3rem' }}>
                ◈
              </div>
            )}

            {/* Viewer 3D */}
            {trabajo.modelo3DPath && (
              <div style={{ marginTop: '1.5rem' }}>
                <p style={{ color: '#555', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                  MODELO 3D — Rotá con el mouse
                </p>
                <Viewer3D url={`${BASE_URL}${trabajo.modelo3DPath}`} height="350px" />
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p style={{ color: '#555', letterSpacing: '0.2em', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
              {trabajo.categoria?.toUpperCase()}
            </p>
            <h1 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>
              {trabajo.titulo}
            </h1>
            <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1rem' }}>{trabajo.descripcion}</p>

            {trabajo.fecha && (
              <p style={{ color: '#333', fontSize: '0.8rem', marginTop: '2rem' }}>
                {new Date(trabajo.fecha).toLocaleDateString('es-AR', { year: 'numeric', month: 'long' })}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
