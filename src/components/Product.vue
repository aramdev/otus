<template>
  <div class="card">
    <span class="badge bg-primary mb-3">category: {{ category }}</span> 
    <img :src="image" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">
        {{ title }}
      </h5>
      <p class="card-text">
        {{ description }}
      </p>
      <span class="badge bg-info text-dark">id: {{ id }}</span> |
      <span class="badge bg-info text-dark">price: {{ price }}</span> |
      <span class="badge bg-info text-dark">coun: {{ rating.rate }}</span> |
      <span class="badge bg-info text-dark">coun: {{ rating.count }}</span>
      <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
    </div>
  </div>
</template>

<script setup>
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
</script>

<style lang="sass" scoped>
.card
  height: 100%
</style>