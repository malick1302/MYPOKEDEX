import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useFavoriteStore = defineStore('favorite', () => {
  const favorite = ref([])

  const stored = localStorage.getItem('favorite')
  if (stored) {
    try {
      favorite.value = JSON.parse(stored)
    } catch(e) {
      favorite.value = []
    }
  }

  function addFavorite(name) {
    if (!favorite.value.includes(name)) {
      favorite.value.push(name)
    }
  }

  function removeFavorite(name) {
    favorite.value = favorite.value.filter(fav => fav !== name)
  }

  function toggleFavorite(name) {
    if (favorite.value.includes(name)) {
      removeFavorite(name)
    } else {
      addFavorite(name)
    }
  }

  const isFavorite = (name) => favorite.value.includes(name)

  watch(favorite, (val) => {
    localStorage.setItem('favorite', JSON.stringify(val))
  }, { deep: true })




  return { favorite, addFavorite, removeFavorite, toggleFavorite, isFavorite }
})
