<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  isDarkMode: Boolean,
  favoriteCount: Number 
})



const emit = defineEmits(['update:isDarkMode'])
</script>

<template>
  <header class="flex items-center justify-between px-4 sm:px-8 py-4 bg-blue-100 dark:bg-blue-950 shadow-md">
    <RouterLink to="/pokedex" class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white hover:underline">
      Mon Pokédex
    </RouterLink>


    <RouterLink to="/favorite" class="flex items-center gap-2 text-gray-900 dark:text-white hover:underline">
      <span class="font-semibold">Favoris</span>
    </RouterLink>
  </header>
</template>