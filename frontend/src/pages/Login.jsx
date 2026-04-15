import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { saveLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login(form.username, form.password);
      saveLogin(res.data.token, res.data.username);
      navigate('/admin');
    } catch {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%',
          maxWidth: '400px',
          border: '1px solid #1a1a1a',
          padding: '3rem',
          background: '#050505',
        }}
      >
        <h1 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem' }}>
          3D<span style={{ color: '#444' }}>.san</span> — Admin
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ color: '#555', fontSize: '0.75rem', letterSpacing: '0.1em' }}>USUARIO</label>
            <input
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              style={{
                display: 'block',
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid #333',
                color: '#fff',
                padding: '0.6rem 0',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <label style={{ color: '#555', fontSize: '0.75rem', letterSpacing: '0.1em' }}>CONTRASEÑA</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              style={{
                display: 'block',
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid #333',
                color: '#fff',
                padding: '0.6rem 0',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {error && <p style={{ color: '#a55', fontSize: '0.85rem' }}>{error}</p>}

          <motion.button
            type="submit"
            whileHover={{ backgroundColor: '#fff', color: '#000' }}
            style={{
              background: 'transparent',
              border: '1px solid #444',
              color: '#fff',
              padding: '0.85rem',
              cursor: 'pointer',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              marginTop: '0.5rem',
              transition: 'all 0.2s',
            }}
          >
            INGRESAR
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
