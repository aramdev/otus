<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-9 mt-3">
          <Search />
        </div>
        <div class="col-3 mt-3 d-flex justify-content-end" v-if="role == 'admin'">
          <router-link :to="{name: 'addNewProduct'}" class="btn btn-success">Add new product</router-link>
        </div>
      </div>
      <div class="row" v-if="products.length == 0">
        <div class="col">
          <loader />
        </div>
      </div>
      <div class="row row-cols-1 row-cols-sm-1 row-cols-lg-2" v-else>
        <template v-if="productsByFilter.length > 0">
          <div class="col mb-3 mt-3" v-for="product in productsByFilter" :key="product.id">
            <Product v-bind="product">
              <template #link="{ toProduct }">
                <router-link :to="toProduct" class="btn btn-primary">Go product</router-link> |
              </template>
            </Product>
          </div>    
        </template>
        <div class="col-lg-12 col-sm-12 mt-3" v-else>
          <div class="alert alert-warning" role="alert">
            No products found by request
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import Product from '@/components/Product.vue'
import Search from '@/components/Search.vue'
import Loader from '@/components/Loader.vue'
import { useProductsStore } from '@/stores/products.js'
const useProducts = useProductsStore()
const { products, productsByFilter } = storeToRefs(useProducts)
// const products = computed(() => useProducts.products)
const role = ref(localStorage.getItem('role'))
</script>