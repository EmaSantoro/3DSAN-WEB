import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { API_BASE } from '../services/api';
const BASE_URL = API_BASE;

export default function TrabajoCard({ trabajo, index = 0 }) {
    const getImagenUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        if (path.startsWith('/productos') || path.startsWith('/images')) return path;
        return `${BASE_URL}${path}`;
    };

    const imagen = getImagenUrl(trabajo.imagenes?.[0]);

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
