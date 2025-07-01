<script setup>
import { ref, onMounted } from 'vue'
import { fetchPokemonList, fetchPokemonDetails } from '@/api/pokeapi'

const pokemons = ref([])

onMounted(async () => {
  const list = await fetchPokemonList(0, 10)
  const pokemonDetailRequests = list.map(p => fetchPokemonDetails(p.url))
  pokemons.value = await Promise.all(pokemonDetailRequests)
})
</script>

<template>
  <main>
<h1>MON POKEDEX</h1>

<ul>
  <li v-for="p in pokemons" :key="p.id">
    <img :src="p.sprite" alt="sprite" />
    {{ p.name }}
  </li>
</ul>
  </main>
</template>
