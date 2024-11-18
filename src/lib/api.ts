import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const login = async (email: string, password: string, role: string) => {
  const response = await api.post('/login', { email, password, role });
  return response.data;
};