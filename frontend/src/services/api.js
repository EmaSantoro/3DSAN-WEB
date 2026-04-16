import axios from 'axios';

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8090';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Servicios
export const getServicios = () => api.get('/servicios');
export const getServicioBySlug = (slug) => api.get(`/servicios/${slug}`);

// Trabajos
export const getTrabajosPublicos = () => api.get('/trabajos');
export const getTrabajosByCategoria = (cat) => api.get(`/trabajos?categoria=${cat}`);
export const getDestacados = () => api.get('/trabajos/destacados');
export const getTrabajoById = (id) => api.get(`/trabajos/${id}`);

// Preguntas frecuentes
export const getPreguntas = () => api.get('/preguntas');


export default api;
