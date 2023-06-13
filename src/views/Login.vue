<template>
  <div class="login">
    <div class="content">
      <div class="alert alert-danger" v-if="errorShow">login or password is invalid</div>
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
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" v-model="role" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">
            Login as admin
          </label>
        </div>
        <button
          :disabled="!meta.valid || disabled"
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
import { useAuthStore } from '@/stores/auth.js'
import { Form, Field, ErrorMessage  } from 'vee-validate'
import { ref } from 'vue'
import * as yup from 'yup'
const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required().min(6),
})
const useAuth = useAuthStore()
const errorShow = ref(false)
const disabled = ref(false)
const role = ref(false)
const { login } = useAuth
const onLogin = async (value) => {
  try {
    errorShow.value = false
    disabled.value = true
    await login(value)
    if (role.value) {
      localStorage.setItem('role', 'admin')
    }
  } catch (e) {
    errorShow.value = true
    disabled.value = false
  }
}
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