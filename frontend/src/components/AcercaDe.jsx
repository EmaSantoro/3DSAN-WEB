import { motion } from 'framer-motion';

const pasos = [
  { num: '01', titulo: 'Diseño', desc: 'Recibimos tu idea o archivo 3D. Asesoramos en el diseño para lograr el mejor resultado.' },
  { num: '02', titulo: 'Impresión', desc: 'Utilizamos tecnología FDM y resina con los mejores filamentos del mercado.' },
  { num: '03', titulo: 'Acabado', desc: 'Post-procesado, lijado y pintura según requiera el proyecto.' },
  { num: '04', titulo: 'Entrega', desc: 'Empaque seguro y entrega en tiempo y forma, a todo el país.' },
];

export default function AcercaDe() {
  return (
    <section id="acerca" style={{ padding: '8rem 2rem', background: '#000' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '5rem',
            alignItems: 'center',
          }}
        >
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p style={{ color: '#555', letterSpacing: '0.3em', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
              QUIÉNES SOMOS
            </p>
            <h2
              style={{
                color: '#fff',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 800,
                marginBottom: '1.5rem',
                lineHeight: 1.1,
              }}
            >
              Impresión 3D con propósito
            </h2>
            <p style={{ color: '#666', lineHeight: 1.8, marginBottom: '1rem' }}>
              Somos un estudio especializado en impresión 3D profesional. Transformamos ideas en objetos reales
              con la máxima precisión y calidad.
            </p>
            <p style={{ color: '#555', lineHeight: 1.8 }}>
              Cada proyecto es único. Trabajamos con particulares, diseñadores, ingenieros y empresas
              que buscan materializar sus ideas de forma rápida y confiable.
            </p>
          </motion.div>

          {/* Proceso */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {pasos.map((paso, i) => (
              <motion.div
                key={paso.num}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}
              >
                <span
                  style={{
                    color: '#222',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    minWidth: '2.5rem',
                    lineHeight: 1,
                  }}
                >
                  {paso.num}
                </span>
                <div>
                  <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '0.3rem', fontSize: '1rem' }}>
                    {paso.titulo}
                  </h4>
                  <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                    {paso.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
