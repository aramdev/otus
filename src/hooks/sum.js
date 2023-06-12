import { computed } from "vue"
import { useProductsStore } from '@/stores/products.js'
import { storeToRefs } from 'pinia'
import { useCartsStore } from '@/stores/carts.js'

export function useSum () {
  const useCarts = useCartsStore()
  const { cart } = storeToRefs(useCarts)
  const useProducts = useProductsStore()
  const { getProduct } = useProducts

  const sum = computed(() => {
    let sum = 0
    cart.value?.products.forEach(async el => {
      const price = (getProduct(el.productId)).price
      const quantity = el.quantity
      sum += (price * quantity)
    })
    return sum
  })
  return { sum }
}