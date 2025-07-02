<script setup>
const props = defineProps({
  offset: Number,
  limit: Number,
  total: Number
})
const emit = defineEmits(['prev','next'])
</script>

<template>
  <div v-if="props.limit !== 10000" class="flex justify-between mt-4">
    <button @click="emit('prev')" :disabled="props.offset === 0">Précédent</button>
    <button @click="emit('next')" :disabled="props.offset + props.limit >= props.total">Suivant</button>
  </div>
</template>
