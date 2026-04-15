import { useState } from 'react';
import { motion } from 'framer-motion';
import { enviarContacto } from '../services/api';

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' });
  const [estado, setEstado] = useState(null); // 'ok' | 'error' | null
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEstado(null);
    try {
      await enviarContacto(form);
      setEstado('ok');
      setForm({ nombre: '', email: '', telefono: '', mensaje: '' });
    } catch {
      setEstado('error');
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
              style={inputStyle}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <label style={{ color: 'var(--text-3)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>EMAIL</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                disabled={loading}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ color: 'var(--text-3)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>TELÉFONO <span style={{ opacity: 0.5 }}>(opcional)</span></label>
              <input
                name="telefono"
                type="tel"
                value={form.telefono}
                onChange={handleChange}
                disabled={loading}
                style={inputStyle}
              />
            </div>
          </div>
          <div>
            <label style={{ color: 'var(--text-3)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>MENSAJE</label>
            <textarea
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              required
              disabled={loading}
              rows={4}
              style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }}
            />
          </div>

          {estado === 'ok' && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: '#4ade80', fontSize: '0.9rem' }}
            >
              Mensaje enviado correctamente. Te respondemos a la brevedad.
            </motion.p>
          )}
          {estado === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: '#f87171', fontSize: '0.9rem' }}
            >
              Error al enviar. Intentá de nuevo o escribinos a impresiones3dsan@gmail.com
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { background: 'var(--blue)', borderColor: 'var(--blue)', boxShadow: '0 0 30px var(--blue-glow2)' } : {}}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-bright)',
              color: loading ? 'var(--text-3)' : 'var(--text)',
              padding: '1rem 2.5rem',
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              cursor: loading ? 'not-allowed' : 'pointer',
              alignSelf: 'flex-start',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              minWidth: '180px',
              justifyContent: 'center',
            }}
          >
            {loading ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{
                    display: 'block',
                    width: '14px',
                    height: '14px',
                    border: '2px solid var(--border-bright)',
                    borderTopColor: 'var(--text)',
                    borderRadius: '50%',
                    flexShrink: 0,
                  }}
                />
                ENVIANDO...
              </>
            ) : (
              'ENVIAR MENSAJE'
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
