<script setup>
import { ref, onMounted, watch } from 'vue'
import { useFavoriteStore } from '@/stores/favoriteStore'
import FavoriteList from '@/components/FavoriteList.vue'

const favoriteStore = useFavoriteStore()
const favoritePokemons = ref([])

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
  fetchFavorites()
})

watch(() => favoriteStore.favorite, () => {
  fetchFavorites()
}, { immediate: true })
</script>

<template>
  <main class="p-4">
    <h1 class="text-2xl font-bold mb-4">Mes Pokémon favoris</h1>
    
    <div v-if="favoritePokemons.length > 0">
      <FavoriteList :favoritePokemons="favoritePokemons" />
    </div>

    <div v-else class="text-center text-gray-500">
      Tu n'as pas de favoris pour le moment ... 
    </div>
  </main>
</template>
