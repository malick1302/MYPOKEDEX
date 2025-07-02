<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import CardPoke from '@/components/CardPoke.vue'
import PaginationControls from '@/components/PaginationControls.vue'
import TypeFilter from '@/components/TypeFilter.vue'
import SearchSortLimit from '@/components/SearchSortLimit.vue'
import { fetchPokemonDetails } from '@/api/pokeapi'

const pokemons = ref([])
const allPokemonsList = ref([])
const limit = ref(20)
const offset = ref(0)
const sortMode = ref('id')
const searchQuery = ref('')
const selectedTypes = ref([])

const allTypes = [
  'bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire', 'flying',
  'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock',
  'steel', 'water'
]

const typeStyles = {
  bug: { light: 'radial-gradient(circle, #fff, #92a212, #fff)' },
  dark: { light: 'radial-gradient(circle, #fff, #45454a, #fff)' },
  dragon: { light: 'radial-gradient(circle, #fff, #4e5fe2, #fff)' },
  electric: { light: 'radial-gradient(circle, #fff, #f9c200, #fff)' },
  fairy: { light: 'radial-gradient(circle, #fff, #f071ef, #fff)' },
  fighting: { light: 'radial-gradient(circle, #fff, #ff8100, #fff)' },
  fire: { light: 'radial-gradient(circle, #fff, #e72224, #fff)' },
  flying: { light: 'radial-gradient(circle, #fff, #81baf0, #fff)' },
  ghost: { light: 'radial-gradient(circle, #fff, #713e71, #fff)' },
  grass: { light: 'radial-gradient(circle, #fff, #3ca225, #fff)' },
  ground: { light: 'radial-gradient(circle, #fff, #924f1c, #fff)' },
  ice: { light: 'radial-gradient(circle, #fff, #3dd9ff, #fff)' },
  normal: { light: 'radial-gradient(circle, #fff, #a1a2a1, #fff)' },
  poison: { light: 'radial-gradient(circle, #fff, #923fcc, #fff)' },
  psychic: { light: 'radial-gradient(circle, #fff, #ef3e79, #fff)' },
  rock: { light: 'radial-gradient(circle, #fff, #b0ab81, #fff)' },
  steel: { light: 'radial-gradient(circle, #fff, #5fa2b9, #fff)' },
  water: { light: 'radial-gradient(circle, #fff, #2581ef, #fff)' }
}

async function loadAllPokemonsList() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000')
  const data = await res.json()
  allPokemonsList.value = data.results || []
}

async function loadPokemonsDetails(pokemonSubset) {
  if (!pokemonSubset?.length) {
    pokemons.value = []
    return
  }
  const details = await Promise.all(pokemonSubset.map(p => fetchPokemonDetails(p.url)))
  pokemons.value = details
}

const filteredPokemonsList = computed(() => {
  if (selectedTypes.value.length) return []
  if (!searchQuery.value.trim()) {
    return allPokemonsList.value.slice(offset.value, offset.value + limit.value)
  }
  const query = searchQuery.value.toLowerCase()
  return allPokemonsList.value.filter(p => p.name.includes(query)).slice(0, limit.value)
})

watch([filteredPokemonsList, selectedTypes], async () => {
  if (selectedTypes.value.length === 0) {
    await loadPokemonsDetails(filteredPokemonsList.value)
  } else {
    let sets = await Promise.all(selectedTypes.value.map(async type => {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
      const data = await res.json()
      return data.pokemon.map(p => p.pokemon)
    }))
    let common = sets.reduce((acc, list) =>
      acc.filter(p => list.some(x => x.name === p.name))
    )
    const subset = common.slice(0, limit.value)
    await loadPokemonsDetails(subset)
  }
})

function toggleType(type) {
  if (selectedTypes.value.includes(type)) {
    selectedTypes.value = selectedTypes.value.filter(t => t !== type)
  } else {
    selectedTypes.value.push(type)
  }
  offset.value = 0
}

function nextPage() {
  if (offset.value + limit.value < allPokemonsList.value.length) {
    offset.value += limit.value
  }
}

function prevPage() {
  if (offset.value >= limit.value) {
    offset.value -= limit.value
  }
}

const sortedPokemons = computed(() => {
  const list = [...pokemons.value]
  if (sortMode.value === 'id') {
    return list.sort((a, b) => a.id - b.id)
  }
  if (sortMode.value === 'name') {
    return list.sort((a, b) => a.name.localeCompare(b.name))
  }
  return list
})

onMounted(async () => {
  await loadAllPokemonsList()
  await loadPokemonsDetails(allPokemonsList.value.slice(0, limit.value))
})
</script>

<template>
  <main>
    <h1>MON POKEDEX</h1>

    <SearchSortLimit
      :searchQuery="searchQuery"
      :sortMode="sortMode"
      :limit="limit"
      @update:searchQuery="searchQuery = $event"
      @update:sortMode="sortMode = $event"
      @update:limit="limit = $event"
    />

    <TypeFilter
      :allTypes="allTypes"
      :selectedTypes="selectedTypes"
      :typeStyles="typeStyles"
      @toggle-type="toggleType"
    />

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <CardPoke v-for="poke in sortedPokemons" :key="poke.id" :pokemon="poke" />
    </div>

    <PaginationControls
      :offset="offset"
      :limit="limit"
      :total="allPokemonsList.length"
      @prev="prevPage"
      @next="nextPage"
    />
  </main>
</template>