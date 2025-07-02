<script setup>
import CardPoke from '@/components/CardPoke.vue'
import { ref, onMounted, computed, watch } from 'vue'
import { fetchPokemonDetails, fetchPokemonList, fetchPokemonByType } from '@/api/pokeapi' 

const pokemons = ref([])
const offset = ref(0)
const limit = ref(20)
const hasNext = ref(false)
const hasPrev = ref(false)
const sortMode = ref('id')

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

const selectedTypes = ref([])

async function loadPokemons() {
  if (selectedTypes.value.length === 0) {
    const data = await fetchPokemonList(offset.value, limit.value)
    hasNext.value = !!data.next && limit.value !== 10000
    hasPrev.value = offset.value > 0
    if (!data.results) {
      pokemons.value = []
      return
    }
    const detailRequests = data.results.map(p => fetchPokemonDetails(p.url))
    pokemons.value = await Promise.all(detailRequests)
  } else {
    // On charge par type, on fait une intersection
    let sets = await Promise.all(selectedTypes.value.map(async (type) => {
      const data = await fetchPokemonByType(type)
      return data.pokemon.map(p => p.pokemon) // [{name, url}, ...]
    }))
    // Intersection
    let common = sets.reduce((acc, list) =>
      acc.filter(p => list.some(x => x.name === p.name))
    )
    // On charge les détails des pokemons communs
    const detailRequests = common.map(p => fetchPokemonDetails(p.url))
    pokemons.value = await Promise.all(detailRequests)
    hasNext.value = false
    hasPrev.value = false
  }
}

function toggleType(type) {
  if (selectedTypes.value.includes(type)) {
    selectedTypes.value = selectedTypes.value.filter(t => t !== type)
  } else {
    selectedTypes.value.push(type)
  }
  offset.value = 0
  loadPokemons()
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

const filteredPokemons = computed(() => pokemons.value)

const sortedPokemons = computed(() => {
  const list = [...filteredPokemons.value]
  if (sortMode.value === 'id') {
    return list.sort((a,b) => a.id - b.id)
  } else if (sortMode.value === 'name') {
    return list.sort((a,b) => a.name.localeCompare(b.name))
  } else if (sortMode.value === 'type') {
    return list.sort((a,b) => {
      const aType = a.types?.[0]?.type?.name || ''
      const bType = b.types?.[0]?.type?.name || ''
      return aType.localeCompare(bType)
    })
  }
  return list
})

watch(limit, () => {
  offset.value = 0
  if (selectedTypes.value.length === 0) loadPokemons()
})

onMounted(loadPokemons)
</script>

<template>
  <main>
    <h1>MON POKEDEX</h1>

    <div class="mb-4 flex flex-wrap gap-2 items-center">
      <label class="mr-2">Filtrer par type :</label>
      <button
        v-for="type in allTypes"
        :key="type"
        @click="toggleType(type)"
        :style="{ background: typeStyles[type]?.light || '#eee' }"
        :class="{
          'border-2 border-black': selectedTypes.includes(type),
          'opacity-60': !selectedTypes.includes(type)
        }"
        class="rounded px-3 py-1 cursor-pointer text-sm"
        type="button"
      >
        {{ type }}
      </button>
    </div>

    <div class="mb-4 flex items-center gap-4" v-if="selectedTypes.length === 0">
      <label for="limit-select">Nombre de Pokémon par page :</label>
      <select id="limit-select" v-model.number="limit" class="border rounded px-2 py-1">
        <option :value="20">20</option>
        <option :value="50">50</option>
        <option :value="100">100</option>
        <option :value="10000">Tous</option>
      </select>

      <label for="sort-select">Trier par :</label>
      <select id="sort-select" v-model="sortMode" class="border rounded px-2 py-1">
        <option value="id">ID</option>
        <option value="name">Nom</option>
      </select>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <CardPoke
        v-for="p in sortedPokemons"
        :key="p.id"
        :pokemon="p"
        :isDarkMode="false"
      />
    </div>

    <div v-if="limit !== 10000 && selectedTypes.length === 0" class="mt-4 flex justify-between">
      <button @click="prevPage" :disabled="!hasPrev">Précédent</button>
      <button @click="nextPage" :disabled="!hasNext">Suivant</button>
    </div>
  </main>
</template>
