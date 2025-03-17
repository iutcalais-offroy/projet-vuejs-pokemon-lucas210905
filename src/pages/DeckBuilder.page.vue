<template>
  <div class="deck-builder">
    <n-input v-model="searchQuery" placeholder="Rechercher un Pokémon..." clearable />
    <div class="collection">
      <h2>Collection</h2>
      <div class="cards">
        <n-card v-for="pokemon in filteredPokemons" :key="pokemon.id" class="pokemon-card">
          <img :src="pokemon.imageUrl" :alt="pokemon.name" class="pokemon-image" />
          <div class="card-content">
            <h3>{{ pokemon.name }}</h3>
            <p class="pokemon-hp">PV: {{ pokemon.lifePoints }}</p>
            <n-tag :style="{ backgroundColor: typeColors[pokemon.type.name] }">{{ pokemon.type.name }}</n-tag>
            <p class="pokemon-details">Taille: {{ pokemon.height }}m | Poids: {{ pokemon.weight }}kg</p>
            <div class="pokemon-attacks">
              <p v-for="attack in pokemon.attacks" :key="attack.id">{{ attack.name }} - {{ attack.damage }} PV</p>
            </div>
          </div>
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { NCard, NTag, NInput } from 'naive-ui';
import axios from 'axios';

const searchQuery = ref('');
const pokemons = ref([]);

const typeColors = {
  Grass: '#78C850',
  Fire: '#F08030',
  Water: '#6890F0',
  Electric: '#F8D030',
  Psychic: '#F85888',
  Ice: '#98D8D8',
  Dragon: '#7038F8',
  Dark: '#705848',
  Fairy: '#EE99AC',
  Normal: '#A8A878',
  Fighting: '#C03028',
  Flying: '#A890F0',
  Poison: '#A040A0',
  Ground: '#E0C068',
  Rock: '#B8A038',
  Bug: '#A8B820',
  Ghost: '#705898',
  Steel: '#B8B8D0'
};

const fetchPokemons = async () => {
  try {
    const response = await axios.get('https://pokemon-api-seyrinian-production.up.railway.app/pokemon-cards');
    pokemons.value = response.data;
    console.log('Pokémons récupérés:', pokemons.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des Pokémon:', error);
  }
};

const filteredPokemons = computed(() => {
  console.log('Recherche:', searchQuery.value);
  return pokemons.value.filter(pokemon => 
    pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(() => {
  fetchPokemons();
});
</script>

<style scoped>
.deck-builder {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
}

.collection {
  width: 100%;
  max-width: 1200px;
  margin-bottom: 2em;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
}

.pokemon-card {
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s;
}

.pokemon-card:hover {
  transform: scale(1.05);
}

.pokemon-image {
  width: 100%;
  height: auto;
}

.card-content {
  padding: 1em;
  text-align: center;
}

.pokemon-hp {
  color: red;
  font-weight: bold;
}

.pokemon-details {
  margin-top: 0.5em;
  font-size: 0.9em;
  color: #666;
}

.pokemon-attacks {
  margin-top: 1em;
  font-size: 0.9em;
  color: #333;
}
</style>