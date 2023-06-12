<template>
  <div class="card mb-3 mt-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img @error="handleImageError" :src="imageRef" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-header text-white bg-info">
          {{category}}
          {{ id }}
        </div>
        <div class="card-body">
          <h5 class="card-title">{{title}}</h5>
          <p class="card-text">{{ description }}</p>
          <p class="card-text">
            <strong>$ {{ price }}</strong>
          </p>
          <p class="card-text">
            <template  v-if="rating">
              <small class="badge bg-info">Rate {{ rating.rate}}</small> | 
              <small class="badge bg-info">Count {{ rating.count}}</small> |
            </template>
            <small class="badge bg-danger">In Cart {{ inCart }}</small>
          </p>
          <slot name="link" :toProduct="link"></slot>
          <button 
            class="btn btn-warning"
            :disabled="rating.count <= inCart" 
            @click="addToCart(id)">
              Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, toRef } from 'vue'
import { useCartsStore } from '@/stores/carts.js'
const useCart = useCartsStore()
const { addToCart, getQuantityById } = useCart
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  rating: {
    type: Object,
    required: true
  }
})
const imageRef = toRef(props.image)
const handleImageError = () => {
  imageRef.value = 'https://fakeimg.pl/350x200/ff0000/000'
}
const link = computed(() =>{
  return { 
    name: 'product',
    params: {id: props.id}
  }
})
const inCart = computed(() => {
  return getQuantityById(props.id)
})
// const { quantity } = storeToRefs(useCart)
// console.log(quantity.value(props.value))
</script>

<style lang="sass" scoped>
.card
  height: 100%
.img-fluid
  padding: 30px
</style>