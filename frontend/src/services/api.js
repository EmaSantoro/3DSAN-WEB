import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8090',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Trabajos
export const getTrabajosPublicos = () => api.get('/trabajos');
export const getTrabajosByCategoria = (cat) => api.get(`/trabajos?categoria=${cat}`);
export const getDestacados = () => api.get('/trabajos/destacados');
export const getTrabajoById = (id) => api.get(`/trabajos/${id}`);
export const createTrabajo = (data) => api.post('/trabajos', data);
export const updateTrabajo = (id, data) => api.put(`/trabajos/${id}`, data);
export const deleteTrabajo = (id) => api.delete(`/trabajos/${id}`);

// Files
export const uploadImagen = (file) => {
  const form = new FormData();
  form.append('file', file);
  return api.post('/files/imagen', form);
};
export const uploadModelo = (file) => {
  const form = new FormData();
  form.append('file', file);
  return api.post('/files/modelo', form);
};

// Auth
export const login = (username, password) =>
  api.post('/auth/login', { username, password });

// Contacto
export const enviarContacto = (data) => api.post('/contacto', data);

export default api;
