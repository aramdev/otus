<template>
  <div class="container">
    <div class="row">
      <div class="col" v-if="!cart">
        <loader />
      </div>
      <div class="col mt-3" v-else>
        <div class="card mb-3">
          <div class="card-header d-flex justify-content-between">
            <span>User Id: {{ cart.userId }} | {{ fullName }}</span>
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
        <router-link class="btn btn-success" :to="{ name: 'order' }" v-if="cart.products.length > 0">Order Now</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import CartRow from '@/components/CartRow.vue'
import { useCartsStore } from '@/stores/carts.js'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user.js'
import { useSum } from '@/hooks/sum.js'
const useCarts = useCartsStore()
const { cart } = storeToRefs(useCarts)
const { sum } = useSum()
const useUser = useUserStore()
const { fullName } = storeToRefs(useUser)
const onChangeQuantity = (e, i) => {
  cart.value.products[i].quantity = +e
}
const onRemove = (i) => {
  cart.value.products.splice(i, 1)
}

</script>

<style lang="sass" scoped>
.form-control
  width: 100px
  text-align: center
</style>
