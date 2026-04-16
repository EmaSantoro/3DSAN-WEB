import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const HASH_LINKS = [
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Nosotros', href: '/#fabricacion' },
  { label: 'Contacto', href: '/#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const linkStyle = {
    color: 'var(--text-2)',
    textDecoration: 'none',
    fontSize: '0.82rem',
    letterSpacing: '0.1em',
    transition: 'color 0.2s',
  };

    const handleLogoClick = (e) => {
        if (location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

  return (
    <>
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
          background: scrolled || menuOpen ? 'rgba(8,8,8,0.95)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
          borderBottom: scrolled && !menuOpen ? '1px solid var(--border)' : 'none',
          transition: 'background 0.4s, border 0.4s',
        }}
      >
          {/* Logo con ruta al landing inicio y scroll top */}
          <Link
              to="/"
              onClick={handleLogoClick}
              style={{ textDecoration: 'none', zIndex: 101 }}
          >
              <motion.img
                  src="/images/3DSANlogoblanco.png"
                  alt="3DSAN"
                  whileHover={{ scale: 1.05 }}
                  style={{
                      height: '36px',
                      width: 'auto',
                      display: 'block',
                  }}
              />
          </Link>

        {/* Links desktop */}
        <div className="nav-desktop-links" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
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
          <motion.div whileHover={{ color: 'var(--blue-light)' }}>
            <Link
              to="/faq"
              style={{
                ...linkStyle,
                color: location.pathname === '/faq' ? 'var(--blue-light)' : 'var(--text-2)',
              }}
            >
              Preguntas Frecuentes
            </Link>
          </motion.div>
        </div>

        {/* Botón hamburguesa — mobile */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px',
            width: '40px',
            height: '40px',
            zIndex: 101,
          }}
          aria-label="Menú"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'block', width: '22px', height: '1.5px', background: '#fff', transformOrigin: 'center' }}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'block', width: '22px', height: '1.5px', background: '#fff' }}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'block', width: '22px', height: '1.5px', background: '#fff', transformOrigin: 'center' }}
          />
        </button>
      </motion.nav>

      {/* Menú overlay mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'var(--bg-1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.25rem',
            }}
          >
            {[...HASH_LINKS, { label: 'Preguntas Frecuentes', to: '/faq' }].map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {link.to ? (
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'block',
                      color: location.pathname === link.to ? 'var(--blue-light)' : '#fff',
                      textDecoration: 'none',
                      fontSize: 'clamp(2.2rem, 9vw, 3.5rem)',
                      fontWeight: 900,
                      letterSpacing: '-0.02em',
                      padding: '0.4rem 2rem',
                      textAlign: 'center',
                    }}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'block',
                      color: '#fff',
                      textDecoration: 'none',
                      fontSize: 'clamp(2.2rem, 9vw, 3.5rem)',
                      fontWeight: 900,
                      letterSpacing: '-0.02em',
                      padding: '0.4rem 2rem',
                      textAlign: 'center',
                    }}
                  >
                    {link.label}
                  </a>
                )}
              </motion.div>
            ))}

            {/* Info de contacto */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              style={{
                position: 'absolute',
                bottom: '2.5rem',
                color: 'var(--text-3)',
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                textAlign: 'center',
              }}
            >
              @3d.san — impresiones3dsan@gmail.com
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
