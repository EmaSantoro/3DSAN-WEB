export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-4)',
        padding: '4rem 2rem 2.5rem',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}
      >
        {/* Logo + descripción */}
        <div>
          <img
            src="/images/logo.png"
            alt="3DSAN"
            style={{
              height: '36px',
              width: 'auto',
              marginBottom: '1rem',
              display: 'block',
              filter: 'brightness(0) invert(1)',
              opacity: 0.75,
            }}
          />
          <p style={{ color: 'var(--text-2)', fontSize: '0.82rem', lineHeight: 1.65 }}>
            Impresiones 3D profesionales. Del concepto al objeto.
          </p>
        </div>

        {/* Redes y contacto */}
        <div>
          <p style={{ color: 'var(--text-3)', fontSize: '0.7rem', letterSpacing: '0.2em', marginBottom: '1.25rem' }}>
            CONTACTO
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <a
              href="https://www.instagram.com/3d.san"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-2)', textDecoration: 'none', fontSize: '0.83rem', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--blue-light)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-2)'}
            >
              Instagram — @3d.san
            </a>
            <a
              href="mailto:impresiones3dsan@gmail.com"
              style={{ color: 'var(--text-2)', textDecoration: 'none', fontSize: '0.83rem', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--blue-light)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-2)'}
            >
              impresiones3dsan@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <p style={{ color: 'var(--text-3)', fontSize: '0.75rem', margin: 0 }}>
          © {year} 3DSAN — Impresiones 3D Profesionales
        </p>
        <p style={{ color: 'var(--text-3)', fontSize: '0.75rem', margin: 0 }}>
          Desarrollado por{' '}
          <a
            href="https://www.linkedin.com/in/emanuel-santoro-063615164/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-2)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => e.target.style.color = 'var(--blue-light)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text-2)'}
          >
            Emanuel Santoro
          </a>
        </p>
      </div>
    </footer>
  );
}
