<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <div class="row">
        <div class="col d-flex">
          <a class="navbar-brand" href="#">Shop</a>
          <ul class="navbar-nav d-flex">
            <li class="nav-item">
              <RouterLink class="nav-link" :to="{ 'name': 'catalog' }">Catalog</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" :to="{ 'name': 'carts' }">
                Carts
                <small class="badge bg-info">{{count}}</small>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useCartsStore } from '@/stores/carts.js'
import { storeToRefs } from 'pinia'
const useCart = useCartsStore()
const { count } = storeToRefs(useCart)
</script>

<style lang="sass">
.navbar-nav
  flex-direction: row
.nav-item
  margin-right: 20px
</style>
