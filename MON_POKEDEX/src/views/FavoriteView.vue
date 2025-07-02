<script setup>
import { ref, onMounted, watch } from 'vue'
import { useFavoriteStore } from '@/stores/favoriteStore'
import FavoriteList from '@/components/FavoriteList.vue'
import DDarkmodeToggle from '@/components/DDarkmodeToggle.vue'

const favoriteStore = useFavoriteStore()
const favoritePokemons = ref([])
const isDarkMode = ref(false)

async function fetchFavorites() {
  if (favoriteStore.favorite.length === 0) {
    favoritePokemons.value = []
    return
  }
  const results = await Promise.all(
    favoriteStore.favorite.map(async (name) => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const data = await res.json()
        return {
          id: data.id,
          name: data.name,
          url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
          type: data.types[0].type.name,
          sprite: data.sprites.front_default
        }
      } catch {
        return null
      }
    })
  )
  favoritePokemons.value = results.filter(p => p !== null)
}

onMounted(() => {
  const savedDarkMode = localStorage.getItem('isDarkMode')
  if (savedDarkMode !== null) {
    isDarkMode.value = JSON.parse(savedDarkMode)
    document.documentElement.classList.toggle('dark', isDarkMode.value)
  }
})

watch(() => favoriteStore.favorite, () => {
  fetchFavorites()
}, { immediate: true })

function toggleDarkMode(newDarkMode) {
  isDarkMode.value = newDarkMode
  localStorage.setItem('isDarkMode', JSON.stringify(newDarkMode))
  document.documentElement.classList.toggle('dark', newDarkMode)
}
</script>

<template>
  <main class="p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
  

    <h1 class="text-2xl font-bold mb-4">Mes Pokémon favoris</h1>
    
    <div v-if="favoritePokemons.length > 0">
      <FavoriteList :favoritePokemons="favoritePokemons" />
    </div>

    <div v-else class="text-center text-gray-500 dark:text-gray-400">
      Tu n'as pas encore de favoris ... 
    </div>
  </main>
</template>