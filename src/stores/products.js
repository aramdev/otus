import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/Fetcher.js'

export const useProductsStore = defineStore('Products', () => {
  // const loadList = ref(false)
  const products = ref([])
  const filters = ref({
    type: '',
    text: ''
  })
  const productsByFilter = computed(() => {
    if (filters.value.type === '' || filters.value.text === '') {
      return products.value
    }
    return products.value.filter(item => {
      const value = item[filters.value.type].toString().toLowerCase() || ''
      return value.includes(filters.value.text) ? item : ''
    })
  })

  const getProducts = async () => {
    products.value = await api.fetchApi('products')
  }
  
  const getProduct = (id) => {
    const res = products.value.find(p => p.id == id)
    return res
  }

  const addNewProduct = async (values) => {
    const { rate, count } = values
    const res =  await api.fetchApi('products', 'POST', values)
    products.value.unshift({
      ...res,
      id: Date.now(),
      rating: { rate, count }
    })
  }

  const onChangeFilter = (data) => {
    filters.value = { ...data }
  }
  return { 
    products,
    productsByFilter,
    filters,
    getProducts, 
    getProduct, 
    onChangeFilter,
    addNewProduct
  }
})
