<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from "vue-router"
import { fetchPokemonId, fetchEvolutionChainByName} from '@/api/pokeapi'

const route = useRoute()
const pokemon = ref(null)
const evolutionChain = ref([])
const evolutionDetails = ref([])

async function fetchEvolutionDetails(chain) {
  const details = await Promise.all(chain.map(async (name) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const data = await res.json()
    return {
      name,
      sprite: data.sprites.front_default
    }
  }))
  evolutionDetails.value = details
}

onMounted(async () => {

  pokemon.value = await fetchPokemonId(route.params.id)
  if (pokemon.value?.name) {
    evolutionChain.value = await fetchEvolutionChainByName(pokemon.value.name)
    await fetchEvolutionDetails(evolutionChain.value)
  }

})



</script>


<template>
  <div v-if="pokemon">
  <h1>{{ pokemon.name }}</h1>
  <img :src="pokemon.sprites.front_default" alt="Image ou Gif de {{ pokemon.name }}" />
  
  
  <div v-if="evolutionChain.length">
    <h2>Chaîne d'évolution :</h2>
  <ul>
    <li v-for="evo in evolutionDetails" :key="evo.name">
      <p>{{ evo.name }}</p>
      <img :src="evo.sprite" :alt="`Image de ${evo.name}`" />
    </li>
  </ul>
</div>


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

 