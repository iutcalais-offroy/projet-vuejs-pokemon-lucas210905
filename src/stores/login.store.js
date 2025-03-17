import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("userId") || null,
  }),
  actions: {
    async register(email, password) {
      try {
        console.log('Appel de register avec:', email, password);
        const response = await axios.post("https://pokemon-api-seyrinian-production.up.railway.app/users", {
          email,
          password,
        }, {
          headers: {
            Authorization: `Bearer ${this.token}` // Ajoutez un en-tête d'autorisation si nécessaire
          }
        });
        console.log('Réponse de register:', response.data);
        alert("Inscription réussie !");
        return true; 
      } catch (error) {
        console.error('Erreur dans register:', error);
        alert(error.response?.data?.message || "Erreur d'inscription");
        return false;
      }
    },

    async login(email, password) {
      try {
        console.log('Appel de login avec:', email, password);
        const response = await axios.post("https://pokemon-api-seyrinian-production.up.railway.app/users/login", {
          email,
          password,
        });
        console.log('Réponse de login:', response.data);
        this.token = response.data.token;
        this.userId = response.data.userId;

        localStorage.setItem("token", this.token);
        localStorage.setItem("userId", this.userId);

        alert("Connexion réussie !");
        return true; 
      } catch (error) {
        console.error('Erreur dans login:', error);
        alert(error.response?.data?.message || "Erreur de connexion");
        return false;
      }
    },

    logout() {
      console.log('Appel de logout');
      this.token = null;
      this.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      alert("Déconnexion réussie !");
    },
  },
});