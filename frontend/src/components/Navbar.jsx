import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { label: 'Trabajos', href: '#trabajos' },
    { label: 'Destacados', href: '#destacados' },
    { label: 'Acerca de', href: '#acerca' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 2rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(0,0,0,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'background 0.4s, border 0.4s',
      }}
    >
      <Link to="/" style={{ textDecoration: 'none' }}>
        <motion.span
          whileHover={{ scale: 1.05 }}
          style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '0.05em',
          }}
        >
          3D<span style={{ color: '#888' }}>.san</span>
        </motion.span>
      </Link>

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {navLinks.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            whileHover={{ color: '#fff' }}
            style={{
              color: '#aaa',
              textDecoration: 'none',
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              transition: 'color 0.2s',
            }}
          >
            {link.label}
          </motion.a>
        ))}
        {isAdmin ? (
          <>
            <Link
              to="/admin"
              style={{
                color: '#aaa',
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}
            >
              Panel
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: '1px solid #444',
                color: '#aaa',
                padding: '0.4rem 1rem',
                cursor: 'pointer',
                fontSize: '0.85rem',
                borderRadius: '2px',
              }}
            >
              Salir
            </motion.button>
          </>
        ) : (
          <Link
            to="/login"
            style={{
              color: '#aaa',
              textDecoration: 'none',
              fontSize: '0.85rem',
              border: '1px solid #333',
              padding: '0.4rem 1rem',
              borderRadius: '2px',
            }}
          >
            Admin
          </Link>
        )}
      </div>
    </motion.nav>
  );
}
