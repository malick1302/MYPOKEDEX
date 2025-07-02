<script setup>
import { onMounted } from 'vue'
import lightpoke from '@/assets/lightpoke.svg.png'
import darkpoke from '@/assets/darkpoke.webp'

const props = defineProps({
  isDarkMode: Boolean
})

const emit = defineEmits(['update:isDarkMode'])

function toggleDarkMode() {
  const newDarkMode = !props.isDarkMode
  emit('update:isDarkMode', newDarkMode)
  localStorage.setItem('isDarkMode', JSON.stringify(newDarkMode)) 
}

onMounted(() => {
  const savedDarkMode = localStorage.getItem('isDarkMode')
  if (savedDarkMode !== null) {
    emit('update:isDarkMode', JSON.parse(savedDarkMode)) 
  }
})
</script>

<template>
  <button
    @click="toggleDarkMode"
    class="transition-transform transform hover:scale-105"
  >
    <img
      :src="isDarkMode ? lightpoke : darkpoke"
      :alt="isDarkMode ? 'Mode sombre' : 'Mode clair'"
      class="w-12 h-12"
    />
  </button>
</template>