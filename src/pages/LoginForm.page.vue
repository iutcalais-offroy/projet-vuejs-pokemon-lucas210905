<template>
  <div class="login-form">
    <div class="tabs">
      <button :class="{ active: isLogin }" @click="isLogin = true">Connexion</button>
      <button :class="{ active: !isLogin }" @click="isLogin = false">Inscription</button>
    </div>
    <form @submit.prevent="handleSubmit">
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
      <button type="submit">{{ isLogin ? 'Se connecter' : "S'inscrire" }}</button>
    </form>
    <p>
      <span v-if="isLogin">Pas de compte ? <a @click="isLogin = false">S'inscrire</a></span>
      <span v-else>Déjà inscrit ? <a @click="isLogin = true">Se connecter</a></span>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isLogin = ref(true);
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleSubmit = () => {
  if (!isLogin.value && password.value !== confirmPassword.value) {
    alert("Les mots de passe ne correspondent pas");
    return;
  }
  // Logique de soumission du formulaire
  console.log('Email:', email.value);
  console.log('Password:', password.value);
  if (!isLogin.value) {
    console.log('Confirm Password:', confirmPassword.value);
  }
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
  background: none;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  font-size: 1em;
}

.tabs button.active {
  border-bottom: 2px solid green;
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
</style>