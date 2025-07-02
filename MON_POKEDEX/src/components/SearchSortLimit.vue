<script setup>
const props = defineProps({
  searchQuery: String,
  sortMode: String,
  limit: Number
})
const emit = defineEmits(['update:searchQuery','update:sortMode','update:limit'])
</script>

<template>
<div class="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between">   
  
  <div class="flex-grow w-full sm:w-auto">
      <input
        type="text"
        placeholder="Recherche..."
        :value="props.searchQuery"
        @input="emit('update:searchQuery', $event.target.value)"
        class="border rounded-lg px-4 py-2 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-indigo-950"
      />
    </div>

    <div class="w-full sm:w-auto">
      <select
        :value="props.sortMode"
        @change="emit('update:sortMode', $event.target.value)"
        class="border rounded-lg px-4 py-2 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-white  text-indigo-950"
      >
        <option value="id">ID</option>
        <option value="name">Nom</option>
      </select>
    </div>

    <div class="w-full sm:w-auto">
      <select
        :value="props.limit"
        @change="emit('update:limit', Number($event.target.value))"
        class="border rounded-lg px-4 py-2 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-white  text-indigo-950"
      >
        <option :value="20">20</option>
        <option :value="50">50</option>
        <option :value="100">100</option>
        <option :value="10000">Tous</option>
      </select>
    </div>
  </div>
</template>
