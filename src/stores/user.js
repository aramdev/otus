import { defineStore } from 'pinia'
import api from '@/api/Fetcher.js'
import { ref, computed } from 'vue'
export const useUserStore = defineStore('User', () => {
  const user = ref(null)
  const fullName = computed(() => {
    return user.value?.name.firstname + ' ' + user.value?.name.lastname || ''
  })
  const getUser = async () => {
    const id = localStorage.getItem('userid', user.id)
    try {
      user.value = await api.fetchApi(`users/${id}`)
    } catch (e) {
      console.log(e.message)
    }
  }
  return { getUser, fullName, user }
})