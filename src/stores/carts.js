import { defineStore } from 'pinia'
import api from '@/api/Fetcher.js'
import { computed, ref } from 'vue'
export const useCartsStore = defineStore('Carts', () => {
  const cart = ref(null)
  const getAllCarts = async () => {
    const userid = localStorage.getItem('userid')
    if (userid) {
      const res = await api.fetchApi(`carts/user/${userid}`)
      cart.value = res[0]
    }
  }

  const count = computed(() => {
    return cart.value?.products.length || 0
  }) 
  
  const getQuantityById = (id) => {
    return cart.value?.products.find(p => p.productId == id)?.quantity || 0
  }

  const addToCart = (id) => {
    const pInCart = cart.value.products.find(p => p.productId == id)
    if (pInCart) {
      pInCart.quantity++
      return
    }
    cart.value.products.push({
      productId: id,
      quantity: 1
    })
  }
  return { getAllCarts, cart, addToCart, getQuantityById, count }
})
