<template>
  <form class="d-flex" @submit.prevent="onSubmit">
    <input class="form-control me-2" 
      type="search"
      v-model="filters.text" 
      placeholder="Search product" 
      aria-label="Search">
    <select class="form-select me-2" v-model="filters.type">
      <option value="" selected disabled>Select</option>
      <option value="title">By title</option>
      <option value="price">By price</option>
    </select>
    <button 
      class="btn btn-danger"
      v-if="filterActive"
      @click="onClearFilter"
      type="button">
      Clear Filter
    </button>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products.js'
const useProducts = useProductsStore()
const { filters } = storeToRefs(useProducts)
const { onChangeFilter } = useProducts
const  filterActive = computed(() => {
  return filters.value.text !== '' && filters.value.type != ''
})

const onClearFilter = () => {
  onChangeFilter({text: '', type: ''})
}
</script>

<style lang="sass" scoped>
.form-control
  flex: 1 1 auto
.form-select
  width: 150px
.btn-danger
  white-space: nowrap
</style>