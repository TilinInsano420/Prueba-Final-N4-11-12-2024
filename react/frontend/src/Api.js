import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// EL COSO DE API PARA LOS USUARIOS
export const getUsers = () => axios.get(`${API_URL}/users/`);
export const getUser = (id) => axios.get(`${API_URL}/users/${id}/`);
export const createUser = (data) => axios.post(`${API_URL}/users/`, data);
export const updateUser = (id, data) => axios.put(`${API_URL}/users/${id}/`, data);
export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}/`);

// EL COSO DE API PARA LAS MASCOTAS
export const getMascotas = () => axios.get(`${API_URL}/mascotas/`);
export const getMascota = (id) => axios.get(`${API_URL}/mascotas/${id}/`);
export const createMascota = (data) => axios.post(`${API_URL}/mascotas/`, data);
export const updateMascota = (id, data) => axios.put(`${API_URL}/mascotas/${id}/`, data);
export const deleteMascota = (id) => axios.delete(`${API_URL}/mascotas/${id}/`);

// EL COSO DE API PARA LAS CONSULTAS
export const getConsultas = () => axios.get(`${API_URL}/consultas/`);
export const getConsulta = (id) => axios.get(`${API_URL}/consultas/${id}/`);
export const createConsulta = (data) => axios.post(`${API_URL}/consultas/`, data);
export const updateConsulta = (id, data) => axios.put(`${API_URL}/consultas/${id}/`, data);
export const deleteConsulta = (id) => axios.delete(`${API_URL}/consultas/${id}/`);
