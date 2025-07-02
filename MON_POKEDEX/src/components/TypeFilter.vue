<script setup>
const props = defineProps({
  allTypes: Array,
  selectedTypes: Array,
  typeStyles: Object,
  isDarkMode: Boolean
})



const emit = defineEmits(['toggle-type'])
</script>

<template>
  <div class="flex flex-wrap gap-3 mb-6">
    <button
      v-for="type in allTypes" :key="type"
      @click="emit('toggle-type', type)"
      :style="{ background: typeStyles[type]?.light || '#888' }"
      :class="[
        'px-4 py-2 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105',
        selectedTypes.includes(type) ? 'opacity-100 border-2 border-indigo-500' : 'opacity-60 border border-gray-300',
        isDarkMode ? 'text-gray-900' : 'text-gray-900'
      ]"
    >
      {{ type }}
    </button>
  </div>
</template>

