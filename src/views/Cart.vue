<template>
  <div class="container">
    <div class="row">
      <div class="col" v-if="!cart">
        <loader />
      </div>
      <div class="col mt-3" v-else>
        <div class="card mb-3">
          <div class="card-header d-flex justify-content-between">
            <span>User Id: {{ cart.userId }}</span>
            <!-- <span>Date: {{ cart.date }}</span> -->
          </div>
          <ul class="list-group list-group-flush">
            <CartRow :product="p" v-for="(p, i) in cart.products" :key="i"
              @change-count="onChangeQuantity($event, i)"
              @remove="onRemove(i)"/>
          </ul>
        </div>
      </div>
    </div>
    <div class="row" v-if="cart">
      <div class="col text-end">
        <h2>$ {{ sum }}</h2>
        <button class="btn btn-success">Order Now</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import CartRow from '@/components/CartRow.vue'
import { useCartsStore } from '@/stores/carts.js'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useProductsStore } from '@/stores/products.js'
const useProducts = useProductsStore()
const { getProduct } = useProducts
// import { computed, onMounted, ref } from 'vue'
const useCarts = useCartsStore()
const { cart } = storeToRefs(useCarts)
const onChangeQuantity = (e, i) => {
  cart.value.products[i].quantity = +e
}
const onRemove = (i) => {
  cart.value.products.splice(i, 1)
}
const sum = computed(() => {
  let sum = 0
  cart.value.products.forEach(async el => {
    const price = (getProduct(el.productId)).price
    const quantity = el.quantity
    sum += (price * quantity)
  })
  return sum
})
</script>

<style lang="sass" scoped>
.form-control
  width: 100px
  text-align: center
</style>
