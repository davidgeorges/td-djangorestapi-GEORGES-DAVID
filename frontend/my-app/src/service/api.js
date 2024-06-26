// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const getChercheurs = () => api.get('chercheurs/');
export const getProjets = () => api.get('projets/');
export const getPublications = () => api.get('publications/');
export const createChercheur = (data) => api.post('chercheurs/', data);
export const createProjet = (data) => api.post('projets/', data);
export const createPublication = (data) => api.post('publications/', data);
export const updateChercheur = (id, data) => api.put(`chercheurs/${id}/`, data);
export const updateProjet = (id, data) => api.put(`projets/${id}/`, data);
export const updatePublication = (id, data) => api.put(`publications/${id}/`, data);
export const deleteChercheur = (id) => api.delete(`chercheurs/${id}/`);
export const deleteProjet = (id) => api.delete(`projets/${id}/`);
export const deletePublication = (id) => api.delete(`publications/${id}/`);
