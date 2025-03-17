import axios from 'axios';

const API_URL = 'https://pokemon-api-seyrinian-production.up.railway.app';

export const login = async (email, password) => {
  console.log('Tentative de connexion');
  console.log('URL:', `${API_URL}/login`);
  console.log('Data:', { email, password });
  const response = await axios.post(`${API_URL}/login`, { email, password });
  console.log('Réponse de connexion:', response.data);
  return response.data;
};

export const register = async (email, password) => {
  console.log('Tentative d\'inscription');
  console.log('URL:', `${API_URL}/register`);
  console.log('Data:', { email, password });
  const response = await axios.post(`${API_URL}/register`, { email, password });
  console.log('Réponse d\'inscription:', response.data);
  return response.data;
};
