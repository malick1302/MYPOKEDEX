<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchPokemonId, fetchEvolutionChainByName } from '@/api/pokeapi'
import { useFavoriteStore } from '@/stores/favoriteStore'
import pokered from '@/assets/pokered.png'
import pokeball from '@/assets/pokeball.png'

const route = useRoute()
const router = useRouter()
const pokemon = ref(null)
const evolutionChain = ref([])
const evolutionDetails = ref([])

const favoriteStore = useFavoriteStore()

const typeStyles = {
  
  bug: {
    light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(146, 162, 18, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(146, 162, 18, 1) 40%, rgba(0, 0, 0, 1) 100%)',
  },
  dark: {
    light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(69, 69, 74, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(69, 69, 74, 1) 40%, rgba(0, 0, 0, 1) 100%)',
  },
  dragon: {
    light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(78, 95, 226, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(78, 95, 226, 1) 40%, rgba(3, 3, 3, 1) 100%)',
  },
  electric: {
    light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(249, 194, 0, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(249, 194, 0, 1) 40%, rgba(0, 0, 0, 1) 100%)',
  },
  fairy: {
    light:'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(240, 113, 239, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(240, 113, 239, 1) 40%, rgba(0, 0, 0, 1) 100%)',
  },
  fighting: {
    light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 129, 0, 1) 40%, rgba(255, 252, 252, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(255, 129, 0, 1) 40%, rgba(3, 3, 3, 1) 100%)',
  },
  fire: {
    light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(231, 34, 36, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(231, 34, 36, 1) 40%, rgba(0, 0, 0, 1) 100%)',
  },
  flying: {
    light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(129, 186, 240, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(129, 186, 240, 1) 40%, rgba(0, 0, 0, 1) 100%)',
  },
  spectre: {
    light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(78, 62, 60, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(78, 62, 60, 1) 40%, rgba(0, 0, 0, 1) 100%)',
  },
  grass: {
    light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(60, 162, 37, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(60, 162, 37, 1) 40%, rgba(0, 0, 0, 1) 100%)',
  },
  ground: {
    light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(146, 79, 28, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(146, 79, 28, 1) 40%, rgba(0, 0, 0, 1) 100%)',
  },
  ice: {
    light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(61, 217, 255, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(61, 217, 255, 1) 40%, rgba(0, 0, 0, 1) 100%)',
  },
  normal: {
    light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(161, 162, 161, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(161, 162, 161, 1) 40%, rgba(0, 0, 0, 1) 100%)',
  },
  poison: {
    light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(146, 63, 204, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(146, 63, 204, 1) 40%, rgba(0, 0, 0, 1) 100%)',
  },
  psychic: {
    light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(239, 62, 121, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(239, 62, 121, 1) 40%, rgba(0, 0, 0, 1) 100%)',
  },
  rock: {
    light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(176, 171, 129, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(176, 171, 129, 1) 40%, rgba(0, 0, 0, 1) 100%)',
  },
  ghost: {
    light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(113, 62, 113, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(113, 62, 113, 1) 40%, rgba(0, 0, 0, 1) 100%)',
  },
  steel: {
    light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(95, 162, 185, 1) 40%, rgba(255, 252, 252, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(95, 162, 185, 1) 40%, rgba(0, 0, 0, 1) 100%)',
  },
  stellar: {
    light: 'radial-gradient(circle, rgba(95, 162, 185, 1) 0%, rgba(143, 171, 189, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(143, 171, 189, 1) 40%, rgba(0, 0, 0, 1) 100%)',
  },
  unknown: {
    light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(104, 154, 141, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(104, 154, 141, 1) 40%, rgba(0, 0, 0, 1) 100%)',
  },
  water: {
    light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(37, 129, 239, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(37, 129, 239, 1) 40%, rgba(0, 0, 0, 1) 100%)',
  },
}

const isDarkMode = ref(false)

const backgroundStyle = computed(() => {
  const type = pokemon.value?.types?.[0]?.toLowerCase() || 'unknown'
  return isDarkMode.value ? typeStyles[type]?.dark : typeStyles[type]?.light
})

async function fetchEvolutionDetails(chain) {
  const details = await Promise.all(
    chain.map(async (name) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      const data = await res.json()
      return {
        id: data.id,
        name,
        image: data.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default || '',
      }
    })
  )
  evolutionDetails.value = details
}

async function loadData(id) {
  const data = await fetchPokemonId(id)
  pokemon.value = {
    id: data.id,
    name: data.name,
    animatedSprite: data.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default || '',
    types: data.types.map((type) => type.type.name),
    weight: data.weight,
    height: data.height,
  }
  if (pokemon.value?.name) {
    evolutionChain.value = await fetchEvolutionChainByName(pokemon.value.name)
    await fetchEvolutionDetails(evolutionChain.value)
  }
}

onMounted(() => {
  const savedDarkMode = localStorage.getItem('isDarkMode')
  if (savedDarkMode !== null) {
    isDarkMode.value = JSON.parse(savedDarkMode)
  }
  loadData(route.params.id)
})

watch(() => route.params.id, (newId) => {
  loadData(newId)
})

function toggleFavorite() {
  if (pokemon.value) {
    favoriteStore.toggleFavorite(pokemon.value.name)
  }
}

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode.value))
}
</script>

<template>
  <div
    v-if="pokemon"
    :style="{ background: backgroundStyle }"
    class="flex flex-col items-center min-h-screen text-gray-900 dark:text-gray-100 p-4 transition-colors"
  >
    <div class="absolute top-4 left-4">
      <DDarkmodeToggle :isDarkMode="isDarkMode" @update:isDarkMode="toggleDarkMode" />
    </div>

    <div class="flex flex-wrap w-full max-w-6xl">
      <div class="w-full md:w-1/2 flex flex-col items-center justify-center p-12">
        <img
          :src="pokemon.animatedSprite || 'https://via.placeholder.com/96'"
          :alt="`Image animée de ${pokemon.name}`"
          class="w-64 h-64 sm:w-80 sm:h-80  mx-auto transition-transform transform hover:scale-110"
        />
        <h1 class="text-4xl font-bold text-center mt-4 capitalize">{{ pokemon.name }}</h1>
        <button
          @click="toggleFavorite"
          class="mt-4 px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <img
            :src="favoriteStore.isFavorite(pokemon.name) ? pokered : pokeball"
            alt="Favorite status"
            class="w-8 h-8 mx-auto"
          />
        </button>
      </div>

      <div class="w-full md:w-1/2 flex flex-col justify-center p-6 bg-white dark:bg-gray-800 shadow-lg">
        <div class="mb-6">
          <h2 class="text-2xl font-bold mb-4">Informations :</h2>
          <p class="text-gray-700 dark:text-gray-300">ID: {{ pokemon.id }}</p>
          <p class="text-gray-700 dark:text-gray-300">Types: {{ pokemon.types.join(', ') }}</p>
          <p class="text-gray-700 dark:text-gray-300">Poids: {{ pokemon.weight }} kg</p>
          <p class="text-gray-700 dark:text-gray-300">Taille: {{ pokemon.height }} m</p>
        </div>
        <div v-if="evolutionChain.length">
          <h2 class="text-2xl font-bold mb-4">Chaîne d'évolution :</h2>
          <div class="flex flex-wrap justify-center gap-4">
            <div
              v-for="evolution in evolutionDetails"
              :key="evolution.id"
              @click="router.push(`/pokemon/${evolution.id}`)"
              class="cursor-pointer p-4 border rounded-lg shadow-md bg-gray-100 dark:bg-gray-700 hover:scale-105 hover:shadow-lg transition-transform transform"
            >
              <img
                :src="evolution.image"
                :alt="`Image animée de ${evolution.name}`"
                class="w-16 h-16 sm:w-24 sm:h-24 mx-auto transition-transform transform hover:scale-110"
              />
              <p class="text-center font-semibold capitalize mt-2 text-gray-900 dark:text-gray-100">
                {{ evolution.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p v-else class="text-center text-gray-500 dark:text-gray-400">Chargement...</p>
</template>

