import { defineStore } from 'pinia'
import api from '@/api/Fetcher.js'
export const useAuthStore = defineStore('Auth', () => {
  const login = async ({ username, password }) => {
    const res = await api.fetchApi('users')
    const user = res.find(user => user.username == username && user.password == password)
    localStorage.setItem('userid', user.id)
    location.reload()
  }
  return { login }
})