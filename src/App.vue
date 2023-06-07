<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Shop</a>
        <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button> -->
        <div class="navbar-collapse" id="navbarSupportedContent">
          <!-- <div class="me-auto mb-2 mb-lg-0">
            <button class="btn btn-outline-success me-2"
              @click="showProductFrom = true">
              Add new Product
            </button>
            <button class="btn btn-outline-success me-2"
              @click="showOrderFrom = true">
              Order
            </button>
          </div> -->
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <!-- <a class="nav-link active" aria-current="page" href="#">Catalof</a> -->
              <RouterLink class="nav-link" :to="{ 'name': 'catalog' }">Catalog</RouterLink>
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link" href="#">Link</a> -->
              <RouterLink class="nav-link" :to="{ 'name': 'cart' }">Cart</RouterLink>
            </li>
          </ul>
          <Search class="me-4"
            @search="onSearch($event)"
            v-bind="filterOption"
            @clear="onClear"/>
        </div>
      </div>
    </nav>
  <RouterView :filterOption="filterOption"/>
</template>

<script setup>
import { reactive } from 'vue' 
import { RouterView } from 'vue-router' // RouterLink
import Search from '@/components/Search.vue'
const filterOption = reactive({
  type: '',
  text: ''
})
const onSearch = ({ type, text }) => {
  filterOption.type = type
  filterOption.text = text
}
const onClear = () => {
  filterOption.type = ''
  filterOption.text = ''
}
</script>

<style scoped lang="sass">
header 
  line-height: 1.5
  max-height: 100vh
@media (min-width: 1024px) 
  header 
    display: flex
    place-items: center
    padding-right: calc(var(--section-gap) / 2)
</style>
