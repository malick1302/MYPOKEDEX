<script setup>
import CardPokemon from '@/components/CardPoke.vue'
import { ref, onMounted, watch } from 'vue'
import { fetchPokemonDetails, fetchPokemonList } from '@/api/pokeapi'
import { useFavoriteStore } from '@/stores/favoriteStore'

const pokemons = ref([])
const offset = ref(0)
const limit = ref(20)
const hasNext = ref(false)
const hasPrev = ref(false)

const favoriteStore = useFavoriteStore()

async function loadPokemons() {
  const data = await fetchPokemonList(offset.value, limit.value)

  hasNext.value = !!data.next && limit.value !== 10000
  hasPrev.value = offset.value > 0

  if (!data.results) {
    pokemons.value = []
    return
  }

  const detailRequests = data.results.map(p => fetchPokemonDetails(p.url))
  pokemons.value = await Promise.all(detailRequests)
}

function nextPage() {
  if (hasNext.value) {
    offset.value += limit.value
    loadPokemons()
  }
}

function prevPage() {
  if (offset.value >= limit.value) {
    offset.value -= limit.value
    loadPokemons()
  }
}

watch(limit, () => {
  offset.value = 0
  loadPokemons()
})

onMounted(loadPokemons)
</script>

<template>
  <main>
    <h1>MON POKEDEX</h1>

    <div class="mb-4">
      <label for="limit-select">Nombre de Pokémon par page :</label>
      <select id="limit-select" v-model.number="limit" class="ml-2 border rounded px-2 py-1">
        <option :value="20">20</option>
        <option :value="50">50</option>
        <option :value="100">100</option>
        <option :value="10000">Tous</option>
      </select>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <CardPokemon
        v-for="p in pokemons"
        :key="p.id"
        :pokemon="p"
        :isDarkMode="false"
      />
    </div>

    <div v-if="limit !== 10000" class="mt-4 flex justify-between">
      <button @click="prevPage" :disabled="!hasPrev">Précédent</button>
      <button @click="nextPage" :disabled="!hasNext">Suivant</button>
    </div>
  </main>
</template>
