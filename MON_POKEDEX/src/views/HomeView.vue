<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const showLogo = ref(false)
const randomPokemons = ref([])
const router = useRouter()

async function fetchRandomPokemons() {
  try {
    const promises = []
    for (let i = 0; i < 7; i++) {
      const randomId = Math.floor(Math.random() * 100) + 1
      promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`).then(res => res.json()))
    }
    const pokemons = await Promise.all(promises)
    randomPokemons.value = pokemons.map(pokemon => ({
      id: pokemon.id,
      name: pokemon.name,
      animatedSprite: pokemon.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default || '',
    }))
  } catch (e) {
    console.error('Erreur lors du chargement des Pokémon', e)
  }
}

onMounted(() => {
  fetchRandomPokemons()
  setTimeout(() => {
    showLogo.value = true
  }, 500)
})

function goToHome() {
  router.push('/pokedex')
}

function goToFavorites() {
  router.push('/favorite')
}
</script>

<template>
  <div class="back relative overflow-hidden h-screen">
    <main class="p-4 max-w-2xl mx-auto">
      <div class="absolute inset-0 flex flex-col items-center justify-center z-10">
        <img
          src="@/assets/logoPokemon.png"
          alt="Logo Pokémon"
          class="w-64 sm:w-80 h-auto mb-8 scale-in"
        />
        <div class="flex flex-wrap gap-6 justify-center">
          <button @click="goToHome" class="bg-blue-500 text-white px-6 py-3 text-lg rounded hover:bg-blue-600">
            Mon Pokédex
          </button>
          <button @click="goToFavorites" class="bg-yellow-500 text-white px-6 py-3 text-lg rounded hover:bg-yellow-600">
            Favoris
          </button>
        </div>
      </div>

      <div v-if="randomPokemons.length" class="absolute inset-0 z-0">
        <div class="relative w-full h-full">
          <div
            v-for="pokemon in randomPokemons"
            :key="pokemon.id"
            class="absolute animate-move"
            :style="{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 1}s` }"
          >
            <img
              :src="pokemon.animatedSprite || 'https://via.placeholder.com/96'"
              :alt="pokemon.name"
              class="w-20 h-20"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>