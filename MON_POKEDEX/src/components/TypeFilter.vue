<script setup>
const props = defineProps({
  allTypes: Array,
  selectedTypes: Array,
  typeStyles: Object
})



const emit = defineEmits(['toggle-type'])
</script>

<template>
  <div class="flex flex-wrap gap-2 mb-4">
    <button
      v-for="type in allTypes" :key="type"
      @click="emit('toggle-type', type)"
      :style="{ background: typeStyles[type]?.light || '#888' }"
      :class="[
        'px-3 py-1 rounded text-white',
        selectedTypes.includes(type) ? 'opacity-100' : 'opacity-60'
      ]"
    >
      {{ type }}
    </button>
  </div>
</template>

