<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from "vue-router"
import { fetchPokemonId } from '@/api/pokeapi'

const route = useRoute()
const pokemon = ref(null)

onMounted(async () => {
  pokemon.value = await fetchPokemonId(route.params.id)
})

</script>


<template>
  <div v-if="pokemon">
  <h1>{{ pokemon.name }}</h1>
  <img :src="pokemon.sprites.front_default" alt="Image ou Gif de {{ pokemon.name }}" />
  <p>ID: {{ pokemon.id}}</p>
  <p>Types: <span v-for="typeInfo in pokemon.types" :key="typeInfo.slot">
    {{ typeInfo.type.name }}<span v-if="typeInfo.slot < pokemon.types.length">, </span>
  </span>
  </p>
  <p> Poids: {{ pokemon.weight }} </p>
    <p>Taille: {{ pokemon.height }}</p>
</div>
  <p v-else>Chargement...</p>


</template>



