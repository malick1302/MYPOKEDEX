<script setup>
defineProps({
  evolutionDetails: Array 
})
</script>


<template>
    <div class="flex items-center space-x-4">
      <template v-for="(evolution, index) in evolutionDetails" :key="evolution.id">
        <router-link :to="`/pokemon/${evolution.id}`" class="flex flex-col items-center">
          <img :src="evolution.image" :alt="evolution.name" class="w-16 h-16 object-contain" />
          <span class="mt-1 text-sm">{{ evolution.name }}</span>
        </router-link>
        
        <template v-if="index < evolutionDetails.length - 1">
          <span class="text-lg font-bold">→</span>
        </template>
      </template>
    </div>
  </template>
  
  