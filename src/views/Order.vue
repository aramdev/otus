<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="addProduct mt-3">
          <h3 class="mb-2" v-if="sum">Order - SUM: ${{ sum }}</h3>
          <Form  @submit="addNewProduct" v-slot="{ errors, meta }" :validation-schema="schema" v-if="user && cart">
            <div class="row">
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">Fisrt Name</label>
                <Field class="form-control" 
                  :class="{ 'is-invalid': errors.firstname }" 
                  :value="user.name.firstname"
                  name="firstname" type="text" />
                <ErrorMessage class="text-danger" name="firstname" />
              </div>
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">Last Name</label>
                <Field class="form-control" 
                  :class="{ 'is-invalid': errors.lastname }" 
                  :value="user.name.lastname"
                  name="lastname" type="text" />
                <ErrorMessage class="text-danger" name="lastname" />
              </div>
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">Email</label>
                <Field class="form-control" 
                  :class="{ 'is-invalid': errors.email }"
                  :value="user.email"
                  name="email" type="email" />
                <ErrorMessage class="text-danger" name="email" />
              </div>
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">Phone</label>
                <Field class="form-control" 
                  :class="{ 'is-invalid': errors.phone }" 
                  :value="user.phone"
                  name="phone" type="text" />
                <ErrorMessage class="text-danger" name="phone" />
              </div>
              <div class="col-12 col-lg-4 mb-3">
                <label class="form-label">City</label>
                <Field class="form-control" 
                  :class="{ 'is-invalid': errors.city }" 
                  :value="user.address.city"
                  name="city" type="text" />
                <ErrorMessage class="text-danger" name="city" />
              </div>
              <div class="col-12 col-lg-4 mb-3">
                <label class="form-label">Street</label>
                <Field class="form-control" 
                  :class="{ 'is-invalid': errors.street }" 
                  :value="user.address.street"
                  name="street" type="text" />
                <ErrorMessage class="text-danger" name="street" />
              </div>
              <div class="col-12 col-lg-4 mb-3">
                <label class="form-label">Building Number</label>
                <Field class="form-control" 
                  :class="{ 'is-invalid': errors.number }" 
                  :value="user.address.number"
                  name="number" type="number" />
                <ErrorMessage class="text-danger" name="number" />
              </div>
              <!-- <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">Address</label>
                <Field class="form-control" :class="{ 'is-invalid': errors.title }" name="address" type="text" />
                <ErrorMessage class="text-danger" name="address" />
              </div>
              <div class="col-12 col-lg-6 mb-3">
                <label class="form-label">Card Number</label>
                <Field class="form-control" :class="{ 'is-invalid': errors.title }" name="cardnumber" type="number" />
                <ErrorMessage class="text-danger" name="cardnumber" />
              </div> -->
              <div class="col-12 col-lg-6 mb-3">
                <button
                  :disabled="!meta.valid"
                  class="btn btn-success me-2"
                  type="submit">
                  Order Now
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
import { Form, Field, ErrorMessage  } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useSum } from '@/hooks/sum.js'
import { useCartsStore } from '@/stores/carts.js'
const schema = yup.object({
  firstname: yup.string().required().min(2),
  lastname: yup.string().required().min(2),
  email: yup.string().required().email(),
  phone: yup.string().required(),
  city: yup.string().required(),
  street: yup.string().required(),
  number: yup.number().required().min(0)
})
const useUser = useUserStore()
const { user } = storeToRefs(useUser)
const { sum } = useSum()
const useCarts = useCartsStore()
const { cart } = storeToRefs(useCarts)
const addNewProduct = async (values) => {
  const { products } = cart.value
  const order = {
    ...values,
    products: JSON.stringify(products)
  }
  alert('Order is done')
  console.log(order)
}
</script>

<style lang="sass" scoped>

</style>

