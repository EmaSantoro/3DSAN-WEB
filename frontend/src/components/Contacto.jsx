import { useState } from 'react';
import { motion } from 'framer-motion';
import { enviarContacto } from '../services/api';

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [estado, setEstado] = useState(null); // 'ok' | 'error' | null

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await enviarContacto(form);
      setEstado('ok');
      setForm({ nombre: '', email: '', mensaje: '' });
    } catch {
      setEstado('error');
    }
  };

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #333',
    color: '#fff',
    padding: '0.75rem 0',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  return (
    <section id="contacto" style={{ padding: '8rem 2rem', background: '#050505' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '3rem' }}
        >
          <p style={{ color: '#555', letterSpacing: '0.3em', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
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
            <label style={{ color: '#444', fontSize: '0.75rem', letterSpacing: '0.1em' }}>NOMBRE</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ color: '#444', fontSize: '0.75rem', letterSpacing: '0.1em' }}>EMAIL</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ color: '#444', fontSize: '0.75rem', letterSpacing: '0.1em' }}>MENSAJE</label>
            <textarea
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              required
              rows={4}
              style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }}
            />
          </div>

          {estado === 'ok' && (
            <p style={{ color: '#5a5', fontSize: '0.9rem' }}>Mensaje enviado correctamente.</p>
          )}
          {estado === 'error' && (
            <p style={{ color: '#a55', fontSize: '0.9rem' }}>Error al enviar. Intentá de nuevo.</p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, backgroundColor: '#fff', color: '#000' }}
            style={{
              background: 'transparent',
              border: '1px solid #444',
              color: '#fff',
              padding: '1rem 2rem',
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              cursor: 'pointer',
              alignSelf: 'flex-start',
              transition: 'all 0.3s',
            }}
          >
            ENVIAR MENSAJE
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
