<script setup>
const props = defineProps({
  isDarkMode: Boolean
})
</script>

<template>
  <div :class="['min-h-screen', isDarkMode ? 'bg-slate-950 text-white' : 'bg-lime-100 text-black']">
    <slot />
  </div>
</template>