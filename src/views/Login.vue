<template>
  <div class="login">
    <div class="content">
      <Form  @submit="onLogin" v-slot="{ errors, meta }" :validation-schema="schema" class="form">
        <h3>Login</h3>
        <div class="mb-3">
          <label class="form-label">Username</label>
          <Field class="form-control" :class="{ 'is-invalid': errors.username }" name="username" type="text" />
          <ErrorMessage class="text-danger" name="username" />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <Field class="form-control" :class="{ 'is-invalid': errors.password }" name="password" type="password" />
          <ErrorMessage class="text-danger" name="password" />
        </div>
        <!-- <pre>
          {{ users }}
        </pre> -->
        <button
          :disabled="!meta.valid"
          class="btn btn-success me-2"
          type="submit">
          Login
        </button>
      </Form>
      <div class="alert alert-warning" role="alert">
        <h5>Проект создан для демонстрации.</h5>
        <p>Api проекта является 
          <a href="https://fakestoreapi.com" target="_blank">
            <strong>https://fakestoreapi.com</strong>
          </a>
        </p>
        <p>
          Для логина можете использовать следующих пользователей
        </p>
        <p>
          <strong>Username: </strong> johnd
          <br>
          <strong>Password: </strong> m38rmF$
        </p>
        <p>
          <strong>Username: </strong> mor_2314
          <br>
        <strong>Password: </strong> 83r5^_
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useAuthStore } from '@/stores/auth.js'
import { Form, Field, ErrorMessage  } from 'vee-validate'
import api from '@/api/Fetcher.js'
import * as yup from 'yup'
const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required().min(6),
})
const users = ref([])
const useAuth = useAuthStore()
const { login } = useAuth
const onLogin = (value) => {
  console.log(value)
  login(value)
}
onMounted(async () => {
  users.value = await api.fetchApi('users')
})
</script>

<style lang="sass">
.login
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  width: 100%
  min-height: 100vh
.content
  width: 100%
  max-width: 500px
  padding: 30px
.form
  width: 100%
.text-danger
  font-size: 10px
.alert
  margin-top: 30px
</style>