<template>
  <div class="container">
    <div class="row">
      <div class="col" v-if="!product">
        <loader />
      </div>
      <div class="col" v-else>
        <router-link to="/" class="btn btn-link">Back to catalog</router-link>
        <Product v-bind="product"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import Product from '@/components/Product.vue'
import { useRoute, RouterLink} from 'vue-router'
import { useProductsStore } from '@/stores/products.js'
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
const route = useRoute()
const useProducts = useProductsStore()
const { getProduct } = useProducts
const { products } = storeToRefs(useProducts)
const id = computed(() => route.params.id)
const product = ref(null)
watch(products, async (val) => {
  if(val.length > 0) {
    product.value = await getProduct(id.value)
  }
}, {immediate: true})

</script>

<style lang="sass" scoped>
.img-fluid
  padding: 30px
</style>