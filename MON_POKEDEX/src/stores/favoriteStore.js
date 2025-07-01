import { defineStore } from 'pinia'

export const useFavoritePoke = defineStore('FavoritePoke', {
    state: () => ({
        favorites: []
    })
})