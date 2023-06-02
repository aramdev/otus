<template>
  <main>
    <!-- <pre> 
      {{ products[0] }}
    </pre> -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button> -->
        <div class="navbar-collapse" id="navbarSupportedContent">
          <div class="me-auto mb-2 mb-lg-0">
            <button class="btn btn-outline-success me-2"
              @click="showProductFrom = true">
              Add new Product
            </button>
            <button class="btn btn-outline-success me-2"
              @click="showOrderFrom = true">
              Order
            </button>
          </div>
          <!-- <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li>
          </ul> -->
          <Search class="me-4"
            @search="onSearch($event)"
            v-bind="filterOption"
            @clear="onClear"/>
        </div>
      </div>
    </nav>
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
import Search from '@/components/Search.vue'
const showProductFrom = ref(false)
const showOrderFrom = ref(false)
const products = ref([])
const filterOption = reactive({
  type: '',
  text: ''
})
const proxyProducts = computed(() => {
  if (filterOption.type === '') {
    return products.value
  }
  return products.value.filter(item => {
    const value = item[filterOption.type].toString().toLowerCase() || ''
    return value.includes(filterOption.text) ? item : ''
  })
})
const getProducts = async () => {
  products.value = await api.fetchApi('products')
}
const onSearch = ({ type, text }) => {
  filterOption.type = type
  filterOption.text = text
}
const onAddProduct = (e) => {
  showProductFrom.value = false
  console.log(e)
  products.value.push(e)
}
const onClear = () => {
  filterOption.type = ''
  filterOption.text = ''
}

onMounted(() => {
  getProducts()
})
</script>