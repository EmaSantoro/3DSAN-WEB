import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const HASH_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#fabricacion' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkStyle = {
    color: 'var(--text-2)',
    textDecoration: 'none',
    fontSize: '0.82rem',
    letterSpacing: '0.1em',
    transition: 'color 0.2s',
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '0 2.5rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'background 0.4s, border 0.4s',
      }}
    >
      {/* Logo — blanco sobre fondo oscuro */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <motion.img
          src="/images/logo.png"
          alt="3DSAN"
          whileHover={{ scale: 1.05 }}
          style={{
            height: '36px',
            width: 'auto',
            display: 'block',
            filter: 'brightness(0) invert(1)',
          }}
        />
      </Link>

      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {HASH_LINKS.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            whileHover={{ color: 'var(--blue-light)' }}
            style={linkStyle}
          >
            {link.label}
          </motion.a>
        ))}

        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/faq"
            style={{
              ...linkStyle,
              color: location.pathname === '/faq' ? 'var(--blue-light)' : 'var(--text-2)',
              border: '1px solid var(--border-bright)',
              padding: '0.4rem 1.1rem',
              borderRadius: '2px',
            }}
          >
            FAQ
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
}
