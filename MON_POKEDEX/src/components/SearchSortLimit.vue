<script setup>
const props = defineProps({
  searchQuery: String,
  sortMode: String,
  limit: Number
})
const emit = defineEmits(['update:searchQuery','update:sortMode','update:limit'])
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-4 mb-4">
    <input
      type="text"
      placeholder="Recherche..."
      :value="props.searchQuery"
      @input="emit('update:searchQuery', $event.target.value)"
      class="border rounded px-3 py-1 flex-grow"
    />

    <select
      :value="props.sortMode"
      @change="emit('update:sortMode', $event.target.value)"
      class="border rounded px-3 py-1"
    >
      <option value="id">ID</option>
      <option value="name">Nom</option>
    </select>

    <select
      :value="props.limit"
      @change="emit('update:limit', Number($event.target.value))"
      class="border rounded px-3 py-1"
    >
      <option :value="20">20</option>
      <option :value="50">50</option>
      <option :value="100">100</option>
      <option :value="10000">Tous</option>
    </select>
  </div>
</template>
