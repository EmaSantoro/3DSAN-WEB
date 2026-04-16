export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        background: '#111111',
        padding: '2rem',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
        }}
      >
        {/* Logo + descripción — centrado */}
        <div style={{ textAlign: 'center' }}>
          <img
            src="/images/3DSANlogoblanco.png"
            alt="3DSAN"
            style={{ height: '36px', width: 'auto', marginBottom: '0.75rem', display: 'inline-block', opacity: 0.85 }}
          />
          <p style={{ color: 'var(--text-2)', fontSize: '0.82rem', lineHeight: 1.65, margin: 0 }}>
            Impresiones 3D profesionales. Del concepto al objeto.
          </p>
        </div>

        {/* Contacto */}
        <div>
          <p style={{ color: 'var(--text-3)', fontSize: '0.7rem', letterSpacing: '0.2em', marginBottom: '1rem' }}>
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

      {/* Bottom bar — todo centrado */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.3rem',
        }}
      >
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
        <p style={{ color: 'var(--text-3)', fontSize: '0.75rem', margin: 0 }}>
          © 2020–2026 3DSAN
        </p>
      </div>
    </footer>
  );
}
