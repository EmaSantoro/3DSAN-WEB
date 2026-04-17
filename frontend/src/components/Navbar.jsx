import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { label: 'Servicios',  href: '/#servicios' },
  { label: 'Nosotros',   href: '/#fabricacion' },
  { label: 'Contacto',   href: '/#contacto' },
];

const MOBILE_LINKS = [
  ...LINKS,
  { label: 'Preguntas Frecuentes', to: '/faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, x: "-50%" }}
        animate={{ y: 0, x: "-50%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: scrolled ? '1rem' : '1.5rem',
          left: '50%',
          width: '90%',
          maxWidth: scrolled ? '680px' : '1200px',
          height: '64px',
          borderRadius: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: scrolled ? '0 1.5rem' : '0 2rem',
          zIndex: 100,
          transition: 'max-width 0.6s cubic-bezier(0.22, 1, 0.36, 1), background 0.4s, top 0.4s, padding 0.6s',
          border: '1px solid rgba(255,255,255,0.1)',
          backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.85)' : 'rgba(10, 10, 10, 0.3)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}
        >
          <motion.img
            src="/images/3DSANlogoblanco.png"
            alt="3DSAN"
            whileHover={{ scale: 1.05 }}
            style={{ height: '30px', width: 'auto', display: 'block' }}
          />
        </Link>

        {/* Desktop Links */}
        <div className="nav-desktop-links" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              whileHover={{ color: '#fff', y: -2 }}
              style={{
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                fontSize: '0.8rem',
                fontWeight: 500,
                letterSpacing: '0.05em',
                transition: 'color 0.3s'
              }}
            >
              {link.label}
            </motion.a>
          ))}
          <Link
            to="/faq"
            style={{
              background: '#2563eb',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.5rem 1.2rem',
              borderRadius: '20px',
              transition: 'background 0.3s'
            }}
          >
            FAQ
          </Link>
        </div>

        {/* Hamburger - Breakpoint corregido para evitar choque */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            zIndex: 101,
          }}
        >
          <div style={{ width: '22px', height: '2px', background: '#fff', marginBottom: '5px', transition: '0.3s', transform: menuOpen ? 'rotate(45deg) translateY(10px)' : 'none' }} />
          <div style={{ width: '22px', height: '2px', background: '#fff', marginBottom: '5px', opacity: menuOpen ? 0 : 1 }} />
          <div style={{ width: '22px', height: '2px', background: '#fff', transition: '0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-10px)' : 'none' }} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'rgba(5,5,5,0.98)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5rem',
            }}
          >
            {MOBILE_LINKS.map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                {link.to ? (
                  <Link to={link.to} onClick={() => setMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '2rem', fontWeight: 800 }}>{link.label}</Link>
                ) : (
                  <a href={link.href} onClick={() => setMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '2rem', fontWeight: 800 }}>{link.label}</a>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1050px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}} />
    </>
  );
}
