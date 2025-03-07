import axios from 'axios';

const API_URL = 'https://pokemon-api-seyrinian-production.up.railway.app/';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error;
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}register`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    throw error;
  }
};
