import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function SeccionPersonalizados() {
  const navigate = useNavigate();

  return (
    <section
      style={{ padding: '6rem 2rem', background: 'transparent', overflow: 'hidden' }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '5rem',
          alignItems: 'center',
        }}
      >
        {/* Imagen lado izquierdo */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ order: 0 }}
        >
          <div
            style={{
              aspectRatio: '1/1',
              background: '#080808',
              border: '1px solid #1a1a1a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <img
              src="/productos/personalizados.jpeg"
              alt="Diseños personalizados 3DSAN"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            {/* Placeholder visual */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: `${60 - i * 15}px`,
                    height: `${60 - i * 15}px`,
                    border: '1px solid #1f1f1f',
                    transform: `rotate(${i * 15}deg)`,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p style={{ color: 'var(--blue-light)', letterSpacing: '0.35em', fontSize: '0.72rem', marginBottom: '1.2rem' }}>
            A MEDIDA
          </p>
          <h2
            style={{
              color: '#fff',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            Productos y diseños personalizados
          </h2>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.85, marginBottom: '1.25rem', fontSize: '0.97rem' }}>
            ¿Tenés una idea, un diseño propio o una necesidad específica? Trabajamos con vos desde el boceto hasta el objeto terminado.
          </p>
          <p style={{ color: 'var(--text-3)', lineHeight: 1.85, marginBottom: '2.5rem', fontSize: '0.95rem' }}>
            Envianos tu archivo STL, OBJ, plano o simplemente describinos qué necesitás. Modelamos, imprimimos y entregamos. Sin mínimos para unidades, sin límites de complejidad.
          </p>

          <motion.a
            href="#contacto"
            whileHover={{ background: 'var(--blue)', borderColor: 'var(--blue)', color: '#fff', boxShadow: '0 0 30px var(--blue-glow2)' }}
            style={{
              display: 'inline-block',
              border: '1px solid var(--border-bright)',
              color: 'var(--text)',
              padding: '0.85rem 2rem',
              fontSize: '0.82rem',
              letterSpacing: '0.12em',
              textDecoration: 'none',
              transition: 'all 0.3s',
            }}
          >
            SOLICITAR PRESUPUESTO
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
