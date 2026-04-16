import { useState } from 'react';
import { motion } from 'framer-motion';

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
    color: 'var(--text)',
    padding: '0.75rem 0',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box',
  };

  return (
    <section id="contacto" style={{ padding: '6rem 2rem', background: 'transparent' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '3rem' }}
        >
          <p style={{ color: 'var(--blue-light)', letterSpacing: '0.3em', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
            HABLEMOS
          </p>
          <h2 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, margin: 0 }}>
            Contacto
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          <div>
            <label style={{ color: 'var(--text-3)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>NOMBRE</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ color: 'var(--text-3)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>MENSAJE</label>
            <textarea
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              required
              rows={4}
              style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }}
            />
          </div>

          {enviado && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: '#4ade80', fontSize: '0.9rem' }}
            >
              ¡WhatsApp abierto! Si no se abrió,{' '}
              <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue-light)' }}>
                tocá acá
              </a>.
            </motion.p>
          )}

          <motion.button
            type="submit"
            whileHover={{ background: 'var(--blue)', borderColor: 'var(--blue)', boxShadow: '0 0 30px var(--blue-glow2)' }}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-bright)',
              color: 'var(--text)',
              padding: '1rem 2.5rem',
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              cursor: 'pointer',
              alignSelf: 'flex-start',
              transition: 'all 0.3s',
              minWidth: '180px',
            }}
          >
            ENVIAR POR WHATSAPP
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
