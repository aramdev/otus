import { defineStore } from 'pinia'
import api from '@/api/Fetcher.js'

export const useCategoriesStore = defineStore('Categories', () => {
  const getAllCategories = async () => {
    const res = await api.fetchApi('products/categories')
    return res
  }

  return { getAllCategories }
})
