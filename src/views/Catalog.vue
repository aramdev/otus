<template>
  <main>
    <AddNewProduct v-if="showProductFrom" 
      @close="showProductFrom = false"
      @add-product="onAddProduct($event)"
    />
    <Order v-if="showOrderFrom" 
      @close="showOrderFrom = false"
    />
    <div class="container">
      <!-- <div class="row">
        <div class="col">
          {{ products }}
        </div>
      </div> -->
      <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4">
        <template v-if="proxyProducts.length > 0">
          <div class="col mb-3 mt-3" v-for="product in proxyProducts" :key="product.id">
            <Product v-bind="product"/>
          </div>    
        </template>
        <div class="col-lg-12 col-sm-12 mt-3" v-else>
          <div class="alert alert-warning" role="alert">
            По запроу товаров не найдено
          </div>
        </div>
      </div>
    </div>
    <!-- <TheWelcome /> -->
  </main>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
// import TheWelcome from '../components/TheWelcome.vue'
import api from '@/api/Fetcher.js'
import Product from '@/components/Product.vue'
import Order from '@/components/Order.vue'
import AddNewProduct from '@/components/AddNewProduct.vue'
const props = defineProps({
  filterOption: {
    type: Object,
    required: true
  }
})
const showProductFrom = ref(false)
const showOrderFrom = ref(false)
const products = ref([])
const proxyProducts = computed(() => {
  if (props.filterOption.type === '') {
    return products.value
  }
  return products.value.filter(item => {
    const value = item[props.filterOption.type].toString().toLowerCase() || ''
    return value.includes(props.filterOption.text) ? item : ''
  })
})
const getProducts = async () => {
  products.value = await api.fetchApi('products')
}
const onAddProduct = (e) => {
  showProductFrom.value = false
  console.log(e)
  products.value.push(e)
}

onMounted(() => {
  getProducts()
})
</script>