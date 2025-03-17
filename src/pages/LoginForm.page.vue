<template>
  <div class="login-form">
    <div class="tabs" v-if="!isAuthenticated">
      <button :class="{ active: isLogin }" @click="isLogin = true">Connexion</button>
      <button :class="{ active: !isLogin }" @click="isLogin = false">Inscription</button>
    </div>
    <form v-if="!isAuthenticated" @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" placeholder="Entrez votre email" required />
      </div>
      <div>
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" placeholder="Entrez votre mot de passe" required />
      </div>
      <div v-if="!isLogin">
        <label for="confirmPassword">Confirmer le mot de passe</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="Confirmez votre mot de passe" required />
      </div>
      <div v-if="errorMessage">
        <p class="error">{{ errorMessage }}</p>
      </div>
      <button type="submit">{{ isLogin ? 'Se connecter' : "S'inscrire" }}</button>
    </form>
    <div v-else>
      <p>Vous êtes connecté en tant que {{ email }}</p>
      <button @click="handleLogout">Se déconnecter</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/login.store'; // Utilisation de useAuthStore

const { register, login, logout, token } = useAuthStore();

const isLogin = ref(true);
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const isAuthenticated = ref(!!token);

const handleSubmit = async () => {
  console.log('Soumission du formulaire');
  if (!isLogin.value && password.value !== confirmPassword.value) {
    alert("Les mots de passe ne correspondent pas");
    return;
  }
  try {
    let success;
    if (isLogin.value) {
      console.log('Tentative de connexion avec:', email.value, password.value);
      success = await login(email.value, password.value);
    } else {
      console.log('Tentative d\'inscription avec:', email.value, password.value);
      success = await register(email.value, password.value);
    }
    if (success) {
      isAuthenticated.value = true;
    } else {
      errorMessage.value = "Erreur lors de la soumission du formulaire";
    }
  } catch (error) {
    console.error("Erreur lors de la soumission du formulaire:", error);
    errorMessage.value = "Erreur lors de la soumission du formulaire";
  }
};

const handleLogout = () => {
  logout();
  isAuthenticated.value = false;
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1em;
}

.tabs button {
  background-color: #f0f0f0; /* Couleur de fond pour rendre les boutons visibles */
  border: 1px solid #ccc; /* Ajout d'une bordure */
  padding: 0.5em 1em;
  cursor: pointer;
  font-size: 1em;
  border-radius: 5px; /* Ajout de coins arrondis */
}

.tabs button.active {
  background-color: green; /* Couleur de fond pour le bouton actif */
  color: white; /* Couleur du texte pour le bouton actif */
}

form div {
  margin-bottom: 1.5em; 
}

form label {
  display: block;
  margin-bottom: 0.5em;
}

form input {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button[type="submit"] {
  width: 100%;
  padding: 0.5em;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1em; 
}

button[type="submit"]:hover {
  background-color: darkgreen;
}

p {
  text-align: center;
  margin-top: 1em;
}

.error {
  color: red;
  text-align: center;
  margin-top: 1em;
}

button {
  width: 100%;
  padding: 0.5em;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1em; 
}

button:hover {
  background-color: darkgreen;
}
</style>