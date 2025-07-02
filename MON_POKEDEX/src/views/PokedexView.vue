<script setup>
import CardPokemon from '@/components/CardPoke.vue'
import { ref, onMounted } from 'vue'
import { fetchPokemonDetails, fetchPokemonList } from '@/api/pokeapi'
import { useFavoriteStore } from '@/stores/favoriteStore'

const pokemons = ref([])
const offset = ref(0)
const limit = 20
const hasNext = ref(false)
const hasPrev = ref(false)

const favoriteStore = useFavoriteStore()

async function loadPokemons() {
  const data = await fetchPokemonList(offset.value, limit)

  hasNext.value = !!data.next
  hasPrev.value = !!data.previous

  if (!data.results) {
    pokemons.value = []
    return
  }

  const detailRequests = data.results.map(p => fetchPokemonDetails(p.url))
  pokemons.value = await Promise.all(detailRequests)
}

function nextPage() {
  offset.value += limit
  loadPokemons()
}

function prevPage() {
  if (offset.value >= limit) {
    offset.value -= limit
    loadPokemons()
  }
}

onMounted(loadPokemons)
</script>

<template>
  <main>
    <h1>MON POKEDEX</h1>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <CardPokemon
        v-for="p in pokemons"
        :key="p.id"
        :pokemon="p"
        :isDarkMode="false"
      />
    </div>

    <div class="mt-4 flex justify-between">
      <button @click="prevPage" :disabled="!hasPrev">Précédent</button>
      <button @click="nextPage" :disabled="!hasNext">Suivant</button>
    </div>
  </main>
</template>
