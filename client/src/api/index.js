import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getEvents = (params) => api.get('/events', { params })
export const getEvent = (id) => api.get(`/events/${id}`)
export const createEvent = (data, token) => api.post('/events', data, { headers: { Authorization: `Bearer ${token}` } })
export const updateEvent = (id, data, token) => api.put(`/events/${id}`, data, { headers: { Authorization: `Bearer ${token}` } })
export const deleteEvent = (id, token) => api.delete(`/events/${id}`, { headers: { Authorization: `Bearer ${token}` } })
export const loginAdmin = (creds) => api.post('/auth/login', creds)
export const registerForEvent = (data) => api.post('/registrations', data)
export const getRegistrations = (params, token) => api.get('/registrations', { params, headers: { Authorization: `Bearer ${token}` } })

export default api
