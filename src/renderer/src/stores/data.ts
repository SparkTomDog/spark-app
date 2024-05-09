import { defineStore } from 'pinia'

const useDataStore = defineStore("data", {
    state: () => ({}),
    actions: {},
    persist: true
})

export {
    useDataStore
}