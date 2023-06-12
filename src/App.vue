<template>
  <component :is="layout"></component>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products.js'
import { useCartsStore } from '@/stores/carts.js'
import { useUserStore } from '@/stores/user.js'
const useProducts = useProductsStore()
const { getProducts } = useProducts
const useCarts = useCartsStore()
const { getAllCarts } = useCarts
const useUser = useUserStore()
const { getUser } = useUser
const route = useRoute()
const layout = computed(() => {
  return route.meta.layout === 'default' ? DefaultLayout : EmptyLayout
})
onMounted(() => {
  getProducts()
  getAllCarts()
  getUser()
})
</script>

<style scoped lang="sass">

</style>
