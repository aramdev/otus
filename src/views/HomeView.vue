<template>
  <main>
    <!-- <pre> 
      {{ products[0] }}
    </pre> -->
    <div class="container">
      <div class="row">
        <div class="col-3 mb-3 mt-3" v-for="(product, i) in products" :key="i">
          <Product v-bind="product"/>
        </div>
      </div>
    </div>
    <!-- <TheWelcome /> -->
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import TheWelcome from '../components/TheWelcome.vue'
import Product from '@/components/Product.vue'
const products = ref(null)
const getProducts = async () => {
  const res = await fetch('https://fakestoreapi.com/products')
  products.value = await res.json()
}
onMounted(() => {
  getProducts()
})
</script>