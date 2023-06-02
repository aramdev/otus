<template>
  <div class="addProduct">
    <div class="close" @click="emit('close')">
      x
    </div>
    <h3 class="mb-2">Order</h3>
    <Form  @submit="addNewProduct" v-slot="{ errors, meta }" :validation-schema="schema">
      <div class="mb-3">
        <label class="form-label">Full Name</label>
        <Field class="form-control" :class="{ 'is-invalid': errors.fullname }" name="fullname" type="text" />
        <ErrorMessage class="text-danger" name="fullname" />
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <Field class="form-control" :class="{ 'is-invalid': errors.email }" name="email" type="email" />
        <ErrorMessage class="text-danger" name="email" />
      </div>
      <div class="mb-3">
        <label class="form-label">Address</label>
        <Field class="form-control" :class="{ 'is-invalid': errors.title }" name="address" type="text" />
        <ErrorMessage class="text-danger" name="address" />
      </div>
      <div class="mb-3">
        <label class="form-label">Card Number</label>
        <Field class="form-control" :class="{ 'is-invalid': errors.title }" name="cardnumber" type="number" />
        <ErrorMessage class="text-danger" name="cardnumber" />
      </div>
      <button
        :disabled="!meta.valid"
        class="btn btn-success me-2"
        type="submit">
        Order Now
      </button>
    </Form >
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage  } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  fullname: yup.string().required().min(3),
  email: yup.string().required().email(),
  address: yup.string().required(),
  cardnumber: yup.number().required().min(16),
})

const emit = defineEmits(['close'])
const addNewProduct = async (values) => {
  alert(JSON.stringify(values))
  emit('close')
}
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