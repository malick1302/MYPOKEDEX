<script setup>
import { ref } from 'vue'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { computed } from 'vue'

const isFavorite = computed(() => store.isFavorite(name))
const store = useFavoriteStore()


const props = defineProps({
  pokemon: Object,
  isDarkMode: Boolean
})

const isRotating = ref(false)

const name = props.pokemon.name
const pokemonType = props.pokemon.types?.[0]?.type?.name || 'unknown'
const id = props.pokemon.id

const imageUrl = computed(() => {
  return props.pokemon.sprite || ''
})

const backgroundStyle = computed(() => {
  const type = pokemonType.toLowerCase()
  const mode = props.isDarkMode ? 'dark' : 'light'
  return typeStyles[type]?.[mode] || typeStyles.unknown[mode]
})


const typeStyles = {
    bug: {
      light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(146, 162, 18, 1) 40%, rgba(255, 255, 255, 1) 100%)',
      dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(146, 162, 18, 1) 40%, rgba(0, 0, 0, 1) 100%)',
    },
    dark: {
      light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(69, 69, 74, 1) 40%, rgba(255, 255, 255, 1) 100%)',
      dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(69, 69, 74, 1) 40%, rgba(0, 0, 0, 1) 100%)',
    },
    dragon: {
      light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(78, 95, 226, 1) 40%, rgba(255, 255, 255, 1) 100%)',
      dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(78, 95, 226, 1) 40%, rgba(3, 3, 3, 1) 100%)',
    },
    electric: {
      light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(249, 194, 0, 1) 40%, rgba(255, 255, 255, 1) 100%)',
      dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(249, 194, 0, 1) 40%, rgba(0, 0, 0, 1) 100%)',
    },
    fairy: {
      light:'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(240, 113, 239, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(240, 113, 239, 1) 40%, rgba(0, 0, 0, 1) 100%)',
    },
    fighting: {
      light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 129, 0, 1) 40%, rgba(255, 252, 252, 1) 100%)',
      dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(255, 129, 0, 1) 40%, rgba(3, 3, 3, 1) 100%)',
    },
    fire: {
      light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(231, 34, 36, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(231, 34, 36, 1) 40%, rgba(0, 0, 0, 1) 100%)',
    },
    flying: {
      light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(129, 186, 240, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(129, 186, 240, 1) 40%, rgba(0, 0, 0, 1) 100%)',
    },
  
    spectre: {
      light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(78, 62, 60, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(78, 62, 60, 1) 40%, rgba(0, 0, 0, 1) 100%)',
    },
  
    grass: {
      light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(60, 162, 37, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(60, 162, 37, 1) 40%, rgba(0, 0, 0, 1) 100%)',
    },
  
    ground: {
      light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(146, 79, 28, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(146, 79, 28, 1) 40%, rgba(0, 0, 0, 1) 100%)',
    },
  
    ice: {
      light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(61, 217, 255, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(61, 217, 255, 1) 40%, rgba(0, 0, 0, 1) 100%)',
    },
  
    normal: {
      light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(161, 162, 161, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(161, 162, 161, 1) 40%, rgba(0, 0, 0, 1) 100%)',
    },
  
    poison: {
      light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(146, 63, 204, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(146, 63, 204, 1) 40%, rgba(0, 0, 0, 1) 100%)',
    },
  
    psychic: {
      light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(239, 62, 121, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(239, 62, 121, 1) 40%, rgba(0, 0, 0, 1) 100%)',
    },
  
    rock: {
      light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(176, 171, 129, 1) 40%, rgba(255, 255, 255, 1) 100%)',
    dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(176, 171, 129, 1) 40%, rgba(0, 0, 0, 1) 100%)',
    },
  
    ghost : {
      light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(113, 62, 113, 1) 40%, rgba(255, 255, 255, 1) 100%)',
      dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(113, 62, 113, 1) 40%, rgba(0, 0, 0, 1) 100%)',
     },
  
    steel: {
      light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(95, 162, 185, 1) 40%, rgba(255, 252, 252, 1) 100%)',
      dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(95, 162, 185, 1) 40%, rgba(0, 0, 0, 1) 100%)',
      },
    stellar: {
      light: 'radial-gradient(circle, rgba(95, 162, 185, 1) 0%, rgba(143, 171, 189, 1) 40%, rgba(255, 255, 255, 1) 100%)',
      dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(143, 171, 189, 1) 40%, rgba(0, 0, 0, 1) 100%)',
      },
    unknown: {
      light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(104, 154, 141, 1) 40%, rgba(255, 255, 255, 1) 100%)',
      dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(104, 154, 141, 1) 40%, rgba(0, 0, 0, 1) 100%)',
      },
    water: {
      light: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(37, 129, 239, 1) 40%, rgba(255, 255, 255, 1) 100%)',
      dark: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(37, 129, 239, 1) 40%, rgba(0, 0, 0, 1) 100%)',
      },
  }
  
  function toggleFavorite() {
  store.toggleFavorite(name)
}
  </script>

<template>
  <div class="relative">
    <button
      @click.stop="toggleFavorite"
      class="absolute top-2 right-2 text-2xl z-10"
    >
      <img
        :src="isFavorite ? 'src/assets/pokered.png' : 'src/assets/pokeball.png'"
        alt="Favorite status"
        class="w-8 h-8"
      />
    </button>

    <RouterLink :to="`/pokemon/${name}`">
  <div
    class="p-12 border-2 border-black"
    :style="{ background: backgroundStyle }"
  >
    <div class="rounded p-7 text-center">
        <img
  :src="imageUrl"
  alt="Pokemon image"
  class="w-24 h-24 mx-auto"
/>

      <h2 class="text-xl font-bold capitalize text-white drop-shadow">{{ name }}</h2>
    </div>
  </div>
</RouterLink>

  </div>
</template>