import { defineStore } from 'pinia'
import api from '@/api/Fetcher.js'
import { ref } from 'vue'
export const useUserStore = defineStore('User', () => {
  const user = ref(null)
  const getUser = async () => {
    const id = localStorage.getItem('userid', user.id)
    user.value = await api.fetchApi(`users/${id}`)
    console.log(user.value)
  }
  return { getUser }
})