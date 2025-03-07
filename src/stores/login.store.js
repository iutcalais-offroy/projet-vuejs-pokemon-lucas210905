import { defineStore } from 'pinia';
import { ref } from 'vue';
import { login, register } from '@/api/login.api';

export const useLoginStore = defineStore('login', () => {
  const isAuthenticated = ref(false);
  const user = ref(null);

  const loginUser = async (email, password) => {
    try {
      const data = await login(email, password);
      isAuthenticated.value = true;
      user.value = data.user;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  const registerUser = async (email, password) => {
    try {
      const data = await register(email, password);
      // Rediriger vers le formulaire de connexion après l'inscription
      isAuthenticated.value = false;
      user.value = null;
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
    }
  };

  return { isAuthenticated, user, loginUser, registerUser };
});
