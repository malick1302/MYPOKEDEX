<script setup>
import CardPoke from './CardPoke.vue'

defineProps({
  favoritePokemons: Array
})
</script>


<template>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <router-link
        v-for="poke in favoritePokemons"
        :key="poke.id"
        :to="`/pokemon/${poke.id}`"
        class="block"
      >
        <CardPoke :pokemon="poke" />
      </router-link>
    </div>
  </template>