import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPreguntas } from '../services/api';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

function AccordionItem({ pregunta, respuesta, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      style={{
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          padding: '1.75rem 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            color: isOpen ? 'var(--text)' : 'var(--text)',
            fontSize: '0.97rem',
            fontWeight: 600,
            lineHeight: 1.4,
            transition: 'color 0.3s',
          }}
        >
          {pregunta}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            width: '28px',
            height: '28px',
            border: '1px solid var(--border-bright)',
            color: isOpen ? 'var(--blue-light)' : 'var(--text-3)',
            fontSize: '1.2rem',
            fontWeight: 300,
            lineHeight: 1,
            transition: 'color 0.3s, border-color 0.3s',
            borderColor: isOpen ? 'var(--blue-dark)' : 'var(--border-bright)',
          }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              style={{
                color: 'var(--text-2)',
                fontSize: '0.9rem',
                lineHeight: 1.8,
                paddingBottom: '1.75rem',
                paddingRight: '3rem',
              }}
            >
              {respuesta}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  useDocumentTitle('Preguntas Frecuentes');
  const [preguntas, setPreguntas] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPreguntas()
      .then((r) => setPreguntas(r.data))
      .catch(() => setPreguntas([]))
      .finally(() => setLoading(false));
  }, []);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-1)' }}>
      {/* Header */}
      <section
        style={{
          padding: '10rem 2rem 6rem',
          background: 'linear-gradient(180deg, var(--bg-2) 0%, var(--bg-1) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Línea decorativa */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--blue), transparent)',
            transformOrigin: 'left',
          }}
        />

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p
              style={{
                color: 'var(--blue-light)',
                letterSpacing: '0.35em',
                fontSize: '0.72rem',
                marginBottom: '1.2rem',
              }}
            >
              SOPORTE
            </p>
            <h1
              style={{
                color: '#fff',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                marginBottom: '1.5rem',
              }}
            >
              Preguntas frecuentes
            </h1>
            <p style={{ color: 'var(--text-2)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '500px' }}>
              Todo lo que necesitás saber sobre nuestros servicios de impresión 3D.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Accordion */}
      <section style={{ padding: '5rem 2rem 8rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '32px',
                  height: '32px',
                  border: '2px solid var(--border)',
                  borderTopColor: 'var(--blue)',
                  borderRadius: '50%',
                }}
              />
            </div>
          ) : preguntas.length === 0 ? (
            <p style={{ color: 'var(--text-3)', textAlign: 'center', padding: '4rem 0' }}>
              No hay preguntas disponibles por el momento.
            </p>
          ) : (
            <div style={{ borderTop: '1px solid var(--border)' }}>
              {preguntas.map((p, i) => (
                <AccordionItem
                  key={p.id}
                  pregunta={p.pregunta}
                  respuesta={p.respuesta}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => toggle(i)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: '5rem 2rem',
          background: 'var(--bg-2)',
          borderTop: '1px solid var(--border)',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p style={{ color: 'var(--text-2)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            ¿No encontraste lo que buscabas?
          </p>
          <motion.a
            href="/#contacto"
            whileHover={{
              background: 'var(--blue)',
              borderColor: 'var(--blue)',
              color: '#fff',
              boxShadow: '0 0 30px var(--blue-glow2)',
            }}
            style={{
              display: 'inline-block',
              border: '1px solid var(--border-bright)',
              color: 'var(--text)',
              padding: '0.9rem 2.25rem',
              fontSize: '0.82rem',
              letterSpacing: '0.12em',
              textDecoration: 'none',
              transition: 'all 0.3s',
            }}
          >
            CONTACTANOS
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
