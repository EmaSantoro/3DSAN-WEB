import { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';

const WA_NUMBER = '541138606451';

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const texto = `Hola! Soy *${form.nombre}*.\n\n${form.mensaje}`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
    setEnviado(true);
    setForm({ nombre: '', mensaje: '' });
  };

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--border)',
    color: '#fff',
    padding: '1rem 0',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
    boxSizing: 'border-box',
  };

  return (
    <section id="contacto" style={{ padding: '10rem 2rem', background: 'transparent' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <Reveal>
            <p style={{ color: 'var(--blue-light)', letterSpacing: '0.4em', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              Hablemos
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.02em', margin: 0 }}>
              ¿Tenés un proyecto?
            </h2>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass"
          style={{ 
            padding: '4rem 3rem', 
            borderRadius: '12px', 
            border: '1px solid rgba(255,255,255,0.05)',
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div>
              <label style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', letterSpacing: '0.15em', fontWeight: 600 }}>NOMBRE</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = 'var(--blue-light)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            <div>
              <label style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', letterSpacing: '0.15em', fontWeight: 600 }}>MENSAJE</label>
              <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                required
                rows={4}
                style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--blue-light)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            {enviado && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: '#4ade80', fontSize: '0.9rem', fontWeight: 500 }}
              >
                ¡WhatsApp abierto! Redirigiendo...
              </motion.p>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, backgroundColor: 'var(--blue-light)', color: '#000' }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: 'transparent',
                border: '1px solid var(--blue-light)',
                color: 'var(--blue-light)',
                padding: '1.2rem 3rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                borderRadius: '2px'
              }}
            >
              ENVIAR POR WHATSAPP
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
