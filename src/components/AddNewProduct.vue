<template>
  <div class="addProduct">
    <div class="close" @click="emit('close')">
      x
    </div>
    <h3 class="mb-2">Add new product</h3>
    <form @submit.prevent="addNewProduct">
      <div class="mb-3">
        <label class="form-label">Categories</label>
        <select class="form-select" v-model="category">
          <option value="" selected disabled> Select category</option>
          <option :value="item" v-for="(item, i) in categories" :key="i">{{ item }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input type="text" class="form-control" v-model="title">
      </div>
      <div class="mb-3">
        <label class="form-label">Price</label>
        <div class="input-group">
          <span class="input-group-text">$</span>
          <input type="number" class="form-control" v-model.number="price">
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">Image URL</label>
        <div class="input-group mb-3">
          <span class="input-group-text">https://domain.com/xx.jpg</span>
          <input type="text" class="form-control" v-model="image">
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">Description</label>
        <textarea class="form-control" rows="3" v-model="description"></textarea>
      </div>
      <button 
        class="btn btn-success me-2"
        type="submit">
        Add Product
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/Fetcher.js'
const title = ref('')
const price = ref('')
const description = ref('')
const image = ref('')
const categories = ref([])
const category = ref('')
const getAllCategories = async () => {
  categories.value = await api.fetchApi('products/categories')
}
const emit = defineEmits(['close'])
const addNewProduct = () => {
  alert(5)
}
onMounted(() => {
  getAllCategories()
})
</script>

<style lang="sass" scoped>
.addProduct
  position: fixed
  height: 100%
  background: #fff
  z-index: 9
  top: 0
  left: 0
  padding: 30px
  box-shadow: 0 0 6px 1px rgba(0,0,0,0.3)
.close
  position: absolute
  top: 20px
  right: 30px
  font-size: 20px
  cursor: pointer
  z-index: 9
</style>