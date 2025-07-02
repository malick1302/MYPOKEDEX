<script setup>
import { computed } from 'vue'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { RouterLink } from 'vue-router'
import pokered from '@/assets/pokered.png'
import pokeball from '@/assets/pokeball.png'


const computedPokemonType = computed(() => props.pokemon.types?.[0]?.type?.name || 'unknown')

const backgroundStyle = computed(() => {
  const type = pokemonType.value.toLowerCase()
  console.log('Background Style Type:', type)
  if (typeStyles[type]) {
    return props.isDarkMode ? typeStyles[type].dark : typeStyles[type].light
  }
  return props.isDarkMode ? typeStyles.unknown.dark : typeStyles.unknown.light
})
const props = defineProps({
  pokemon: Object,
  isDarkMode: Boolean
})

const store = useFavoriteStore()

const id = computed(() => {
  if (props.pokemon.url) {
    return props.pokemon.url.split('/').filter(Boolean).pop()
  }
  return props.pokemon.id || ''
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
  ghost: {
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

const name = props.pokemon.name
const pokemonType = computed(() => props.pokemon.types?.[0] || 'unknown')
const isFavorite = computed(() => store.isFavorite(name))
console.log('Pokemon Type:', pokemonType.value)
const imageUrl = computed(() => {
  if (!id.value) return ''
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id.value}.png`
})



function toggleFavorite() {
  store.toggleFavorite(name)
}


</script>

<template>
  <div class="relative group">
    <button
    @click.stop="toggleFavorite"
      class="absolute top-2 right-2 text-xl sm:text-2xl z-10 transition-transform transform hover:scale-110"
    >
    <img
        :src="isFavorite ? pokered : pokeball"
        alt="Favorite status"
        class="w-6 h-6 sm:w-8 sm:h-8"
      />
    </button>

    <RouterLink :to="`/pokemon/${name}`">
      <div
        class="p-6 sm:p-12 border-2 border-black card shadow-lg overflow-hidden transition-transform transform group-hover:scale-105 relative"
        :style="{ background: backgroundStyle }"
        @mousemove="handleMouseMove"
        @mouseleave="parallaxStyle.transform = 'translate(0px, 0px)'"
      >
        <div
          class="absolute inset-0 transition-transform"
          :style="parallaxStyle"
        ></div>

        <div class="rounded p-4 sm:p-7 text-center relative">
          <div class="relative overflow-hidden">
            <img
              :src="imageUrl"
              alt="Pokemon image"
              class="w-16 h-16 sm:w-24 sm:h-24 mx-auto transition-transform transform group-hover:translate-y-2 group-hover:scale-10"
            />
          </div>
          <h2 class="text-lg sm:text-xl font-bold capitalize text-white drop-shadow">
            {{ name }}
          </h2>
        </div>
      </div>
    </RouterLink>
  </div>
</template>










