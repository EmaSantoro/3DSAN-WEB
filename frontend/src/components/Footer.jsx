import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid #111',
        padding: '3rem 2rem',
        background: '#000',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <span style={{ color: '#333', fontSize: '1.2rem', fontWeight: 800 }}>
        3D<span style={{ color: '#222' }}>.san</span>
      </span>
      <p style={{ color: '#333', fontSize: '0.8rem', margin: 0 }}>
        © {new Date().getFullYear()} 3D.san — Impresiones 3D Profesionales
      </p>
    </footer>
  );
}
