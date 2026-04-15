import { motion } from 'framer-motion';

const RAZONES = [
  {
    num: '01',
    titulo: 'Calidad garantizada',
    desc: 'Cada pieza pasa por control de calidad antes de ser entregada. Trabajamos con los mejores filamentos y ajustes de impresión.',
  },
  {
    num: '02',
    titulo: 'Entrega rápida',
    desc: 'Producción express en 48hs para pedidos estándar. Envíos a todo el país con seguimiento en tiempo real.',
  },
  {
    num: '03',
    titulo: 'Personalización total',
    desc: 'Sin límites de diseño. Podés traernos tu archivo, un boceto o solo una idea y nosotros lo hacemos realidad.',
  },
  {
    num: '04',
    titulo: 'Atención directa',
    desc: 'Hablás directamente con quien fabrica tu producto. Sin intermediarios, sin respuestas automáticas.',
  },
  {
    num: '05',
    titulo: 'Precios accesibles',
    desc: 'Optimizamos cada trabajo para que obtengas la mejor relación calidad-precio del mercado.',
  },
  {
    num: '06',
    titulo: 'Tecnología de punta',
    desc: 'Impresoras Bambu Lab de última generación: velocidad, precisión y consistencia en cada impresión.',
  },
];

export default function SeccionPorQueElegirnos() {
  return (
    <section style={{ padding: '6rem 2rem', background: 'transparent' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '4rem', textAlign: 'center' }}
        >
          <p style={{ color: 'var(--blue-light)', letterSpacing: '0.35em', fontSize: '0.72rem', marginBottom: '1rem' }}>
            NUESTRA PROPUESTA
          </p>
          <h2
            style={{
              color: '#fff',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            ¿Por qué elegirnos?
          </h2>
        </motion.div>

        {/* Grid 3×2 perfectamente simétrico via clase CSS */}
        <div className="por-que-grid">
          {RAZONES.map((r, i) => (
            <motion.div
              key={r.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              whileHover={{ background: 'rgba(59,130,246,0.05)' }}
              style={{ padding: '2.5rem', transition: 'background 0.3s' }}
            >
              <div style={{ color: 'var(--border-bright)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1 }}>
                {r.num}
              </div>
              <h3 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.7rem' }}>
                {r.titulo}
              </h3>
              <p style={{ color: 'var(--text-2)', fontSize: '0.86rem', lineHeight: 1.72, margin: 0 }}>
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
