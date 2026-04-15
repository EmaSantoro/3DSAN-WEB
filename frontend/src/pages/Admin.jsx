import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getTrabajosPublicos, createTrabajo, updateTrabajo, deleteTrabajo,
  uploadImagen, uploadModelo,
} from '../services/api';
import { useAuth } from '../hooks/useAuth';

const EMPTY = {
  titulo: '', descripcion: '', categoria: '', imagenes: [],
  modelo3DPath: '', destacado: false, fecha: '',
};

export default function Admin() {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [trabajos, setTrabajos] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!isAdmin) navigate('/login');
    else load();
  }, [isAdmin]);

  const load = () =>
    getTrabajosPublicos().then((r) => setTrabajos(r.data)).catch(() => {});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadImagen(file);
      setForm((f) => ({ ...f, imagenes: [...f.imagenes, res.data] }));
      setMsg('Imagen subida');
    } catch {
      setMsg('Error subiendo imagen');
    } finally {
      setUploading(false);
    }
  };

  const handleModeloUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadModelo(file);
      setForm((f) => ({ ...f, modelo3DPath: res.data }));
      setMsg('Modelo 3D subido');
    } catch {
      setMsg('Error subiendo modelo');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateTrabajo(editId, form);
        setMsg('Trabajo actualizado');
      } else {
        await createTrabajo(form);
        setMsg('Trabajo creado');
      }
      setForm(EMPTY);
      setEditId(null);
      load();
    } catch {
      setMsg('Error al guardar');
    }
  };

  const handleEdit = (t) => {
    setForm({
      titulo: t.titulo || '',
      descripcion: t.descripcion || '',
      categoria: t.categoria || '',
      imagenes: t.imagenes || [],
      modelo3DPath: t.modelo3DPath || '',
      destacado: t.destacado || false,
      fecha: t.fecha || '',
    });
    setEditId(t.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este trabajo?')) return;
    await deleteTrabajo(id);
    setMsg('Eliminado');
    load();
  };

  const inputStyle = {
    width: '100%',
    background: '#0a0a0a',
    border: '1px solid #222',
    color: '#fff',
    padding: '0.6rem 0.8rem',
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box',
    borderRadius: '2px',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', padding: '5rem 2rem 4rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: '1.8rem' }}>
            Panel Admin
          </h1>
          <button
            onClick={() => { logout(); navigate('/'); }}
            style={{ background: 'transparent', border: '1px solid #333', color: '#666', padding: '0.5rem 1rem', cursor: 'pointer' }}
          >
            Cerrar sesión
          </button>
        </div>

        {/* Formulario */}
        <div style={{ border: '1px solid #1a1a1a', padding: '2rem', marginBottom: '3rem', background: '#050505' }}>
          <h2 style={{ color: '#fff', fontWeight: 600, marginBottom: '1.5rem', fontSize: '1.1rem' }}>
            {editId ? 'Editar trabajo' : 'Nuevo trabajo'}
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
            <input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required style={inputStyle} />
            <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} rows={3} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input name="categoria" placeholder="Categoría" value={form.categoria} onChange={handleChange} style={inputStyle} />
              <input name="fecha" type="date" value={form.fecha} onChange={handleChange} style={inputStyle} />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#aaa', fontSize: '0.9rem', cursor: 'pointer' }}>
              <input type="checkbox" name="destacado" checked={form.destacado} onChange={handleChange} />
              Destacado
            </label>

            {/* Upload imagen */}
            <div>
              <label style={{ color: '#555', fontSize: '0.75rem', letterSpacing: '0.1em', display: 'block', marginBottom: '0.5rem' }}>
                SUBIR IMAGEN
              </label>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ color: '#666', fontSize: '0.85rem' }} />
              {form.imagenes.length > 0 && (
                <p style={{ color: '#555', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                  {form.imagenes.length} imagen(es) cargada(s)
                </p>
              )}
            </div>

            {/* Upload modelo 3D */}
            <div>
              <label style={{ color: '#555', fontSize: '0.75rem', letterSpacing: '0.1em', display: 'block', marginBottom: '0.5rem' }}>
                SUBIR MODELO 3D (STL / OBJ)
              </label>
              <input type="file" accept=".stl,.obj" onChange={handleModeloUpload} style={{ color: '#666', fontSize: '0.85rem' }} />
              {form.modelo3DPath && (
                <p style={{ color: '#555', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                  Modelo: {form.modelo3DPath.split('/').pop()}
                </p>
              )}
            </div>

            {msg && <p style={{ color: '#777', fontSize: '0.85rem' }}>{msg}</p>}

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="submit"
                disabled={uploading}
                style={{
                  background: '#fff',
                  color: '#000',
                  border: 'none',
                  padding: '0.75rem 2rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  letterSpacing: '0.05em',
                }}
              >
                {editId ? 'ACTUALIZAR' : 'CREAR'}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={() => { setForm(EMPTY); setEditId(null); }}
                  style={{ background: 'transparent', border: '1px solid #333', color: '#666', padding: '0.75rem 1.5rem', cursor: 'pointer' }}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Listado */}
        <h2 style={{ color: '#fff', fontWeight: 600, marginBottom: '1.5rem', fontSize: '1.1rem' }}>
          Trabajos ({trabajos.length})
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {trabajos.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 1.25rem',
                border: '1px solid #1a1a1a',
                background: '#050505',
              }}
            >
              <div>
                <span style={{ color: '#fff', fontWeight: 500 }}>{t.titulo}</span>
                <span style={{ color: '#444', fontSize: '0.8rem', marginLeft: '1rem' }}>{t.categoria}</span>
                {t.destacado && <span style={{ color: '#666', fontSize: '0.75rem', marginLeft: '0.75rem' }}>★ destacado</span>}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => handleEdit(t)} style={{ background: 'transparent', border: '1px solid #333', color: '#888', padding: '0.35rem 0.8rem', cursor: 'pointer', fontSize: '0.8rem' }}>
                  Editar
                </button>
                <button onClick={() => handleDelete(t.id)} style={{ background: 'transparent', border: '1px solid #3a1a1a', color: '#855', padding: '0.35rem 0.8rem', cursor: 'pointer', fontSize: '0.8rem' }}>
                  Eliminar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
