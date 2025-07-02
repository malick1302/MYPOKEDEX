<script setup>
import { computed } from 'vue'
import { useFavoriteStore } from '@/stores/favoriteStore'

const props = defineProps({
  pokemon: Object,
  isDarkMode: Boolean
})

const favoriteStore = useFavoriteStore()

const isFavorite = computed(() => {
  if (!props.pokemon) return false
  return favoriteStore.isFavorite(props.pokemon.id)
})

const name = props.pokemon?.name || 'Unknown'
const pokemonType = props.pokemon?.types?.[0]?.type?.name || 'unknown'
const id = props.pokemon?.id || 0
</script>

<template>
  <div>
    <h2>{{ name }}</h2>
    <p>Type: {{ pokemonType }}</p>
    <p>Favori: {{ isFavorite ? 'Oui' : 'Non' }}</p>
  </div>
</template>
