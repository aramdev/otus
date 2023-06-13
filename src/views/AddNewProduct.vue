<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="addProduct mt-3">
          <h3 class="mb-2">Add new product</h3>
          <Form  @submit="onSubmitProduct" v-slot="{ errors, meta }" :validation-schema="schema">
            <div class="row">
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">Categories</label>
                <Field 
                  class="form-select"
                  :class="{ 'is-invalid': errors.category }" 
                  name="category"
                  as="select">
                  <option value="" selected disabled> Select category</option>
                  <option :value="item" v-for="(item, i) in categories" :key="i">{{ item }}</option>
                </Field>
                <ErrorMessage class="text-danger" name="category" />
              </div>
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">Title</label>
                <Field class="form-control" :class="{ 'is-invalid': errors.title }" name="title" type="text" />
                <ErrorMessage class="text-danger" name="title" />
              </div>
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">Price</label>
                <div class="input-group">
                  <span class="input-group-text">$</span>
                  <Field class="form-control" :class="{ 'is-invalid': errors.price }" name="price" type="number" />
                </div>
                <ErrorMessage class="text-danger" name="price" />
              </div>
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">Image URL</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">https://domain.com/xx.jpg</span>
                  <Field class="form-control" :class="{ 'is-invalid': errors.image }" name="image" type="text" />
                </div>
                <ErrorMessage class="text-danger" name="image" />
              </div>
              <div class="col-12 col-lg-6 mb-3">
                <div class="col-12 mb-3">
                  <label class="form-label">Rate</label>
                  <Field class="form-control" :class="{ 'is-invalid': errors.rate }" name="rate" type="number" />
                  <ErrorMessage class="text-danger" name="rate" />
                </div>
                <div class="col-12 mb-3">
                  <label class="form-label">Count</label>
                  <Field class="form-control" :class="{ 'is-invalid': errors.count }" name="count" type="number" />
                  <ErrorMessage class="text-danger" name="count" />
                </div>
              </div>
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">Description</label>
                <Field 
                  class="form-control" 
                  :class="{ 'is-invalid': errors.description }" 
                  name="description"
                  as="textarea"
                  row="6" />
                <ErrorMessage class="text-danger" name="description" />
              </div>
              <div class="col-12 align-self-end">
                <button
                  :disabled="!meta.valid"
                  class="btn btn-success me-2"
                  type="submit">
                  Add Product
                </button>
              </div>
            </div>
          </Form >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCategoriesStore } from '@/stores/categories'
import { useProductsStore } from '@/stores/products.js'
import { Form, Field, ErrorMessage  } from 'vee-validate'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
const useCategories = useCategoriesStore()
const useProducts = useProductsStore()
const { getAllCategories } = useCategories
const { addNewProduct } = useProducts
const schema = yup.object({
  category: yup.string().required(),
  title: yup.string().required(),
  price: yup.number().required().min(1),
  image: yup.string().url(),
  description: yup.string().required().min(10),
  rate: yup.number().required().min(0),
  count: yup.number().required().min(1)
})
const categories = ref([])
const router = useRouter()
const onSubmitProduct = async (values, { resetForm }) => {
  await addNewProduct({
    ...values
  })
  resetForm()
  router.push('/')
}

onMounted( async () => {
  categories.value = await getAllCategories()
})
</script>

<style lang="sass" scoped>
</style>