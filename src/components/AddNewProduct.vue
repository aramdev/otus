<template>
  <div class="addProduct">
    <div class="close" @click="emit('close')">
      x
    </div>
    <h3 class="mb-2">Add new product</h3>
    <Form  @submit="addNewProduct" v-slot="{ errors, meta }" :validation-schema="schema">
      <div class="mb-3">
        <label class="form-label">Categories</label>
        <Field 
          class="form-select"
          :class="{ 'is-invalid': errors.categoty }" 
          name="categoty"
          as="select">
          <option value="" selected disabled> Select category</option>
          <option :value="item" v-for="(item, i) in categories" :key="i">{{ item }}</option>
        </Field>
        <ErrorMessage class="text-danger" name="categoty" />
      </div>
      <div class="mb-3">
        <label class="form-label">Title</label>
        <Field class="form-control" :class="{ 'is-invalid': errors.title }" name="title" type="text" />
        <ErrorMessage class="text-danger" name="title" />
      </div>
      <div class="mb-3">
        <label class="form-label">Price</label>
        <div class="input-group">
          <span class="input-group-text">$</span>
          <Field class="form-control" :class="{ 'is-invalid': errors.price }" name="price" type="number" />
        </div>
        <ErrorMessage class="text-danger" name="price" />
      </div>
      <div class="mb-3">
        <label class="form-label">Image URL</label>
        <div class="input-group mb-3">
          <span class="input-group-text">https://domain.com/xx.jpg</span>
          <Field class="form-control" :class="{ 'is-invalid': errors.image }" name="image" type="text" />
        </div>
        <ErrorMessage class="text-danger" name="image" />
      </div>
      <div class="mb-3">
        <label class="form-label">Description</label>
        <Field 
          class="form-control" 
          :class="{ 'is-invalid': errors.description }" 
          name="description"
          as="textarea"
          row="3" />
        <ErrorMessage class="text-danger" name="description" />
      </div>
      <button
        :disabled="!meta.valid"
        class="btn btn-success me-2"
        type="submit">
        Add Product
      </button>
    </Form >
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/Fetcher.js'
import { Form, Field, ErrorMessage  } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  categoty: yup.string().required(),
  title: yup.string().required(),
  price: yup.number().required(),
  image: yup.string().required().url(),
  description: yup.string().required()
})

const categories = ref([])
const getAllCategories = async () => {
  categories.value = await api.fetchApi('products/categories')
}
const emit = defineEmits(['close', 'add-product'])
const addNewProduct = async (values) => {
  const res =  await api.fetchApi('products', 'POST', values)
  emit('add-product', res)
  
}
onMounted(() => {
  getAllCategories()
})
</script>

<style lang="sass" scoped>
.addProduct
  position: fixed
  height: 100%
  width: 600px
  background: #fff
  z-index: 9
  top: 0
  left: 0
  padding: 30px
  overflow: auto
  box-shadow: 0 0 6px 1px rgba(0,0,0,0.3)
  overflow: auto
.close
  position: absolute
  top: 20px
  right: 30px
  font-size: 20px
  cursor: pointer
  z-index: 9
</style>