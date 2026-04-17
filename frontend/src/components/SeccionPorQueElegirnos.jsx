import { motion } from 'framer-motion';
import Reveal from './Reveal';

const RAZONES = [
  {
    num: '01',
    titulo: 'Calidad garantizada',
    desc: 'Cada pieza pasa por control de calidad antes de ser entregada. Trabajamos con los mejores filamentos y ajustes de impresión.',
  },
  {
    num: '02',
    titulo: 'Entrega rápida',
    desc: 'Producción express para pedidos estándar. Envíos a todo el país con seguimiento en tiempo real.',
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
    <section style={{ padding: '10rem 2rem', background: 'transparent' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '5rem', textAlign: 'center' }}>
          <Reveal>
            <p style={{ color: 'var(--blue-light)', letterSpacing: '0.4em', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              Nuestra Propuesta
            </p>
          </Reveal>
          <Reveal delay={0.2}>
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
          </Reveal>
        </div>

        {/* Grid 3×2 perfectamente simétrico via clase CSS */}
        <div className="por-que-grid">
          {RAZONES.map((r, i) => (
            <motion.div
              key={r.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ backgroundColor: 'rgba(59,130,246,0.08)' }}
              style={{ padding: '3rem 2.5rem', transition: 'background-color 0.4s' }}
            >
              <div style={{ 
                color: 'rgba(255,255,255,0.05)', 
                fontSize: '3rem', 
                fontWeight: 900, 
                marginBottom: '1rem', 
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums'
              }}>
                {r.num}
              </div>
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>
                {r.titulo}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0 }}>
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
