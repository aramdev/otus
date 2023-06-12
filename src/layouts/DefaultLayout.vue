<template>
  <nav class="navbar-light bg-light">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="d-flex align-items-center">
            <a class="navbar-brand me-3" href="#">
              Shop
            </a>
            <ul class="navbar-nav d-flex me-auto">
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
            <strong class="user" v-if="user">{{ fullName }}</strong>
          </div>
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
import { useUserStore } from '@/stores/user.js'
const useUser = useUserStore()
const { fullName, user } = storeToRefs(useUser)
const useCart = useCartsStore()
const { count } = storeToRefs(useCart)
</script>

<style lang="sass">
.navbar-nav
  flex-direction: row
.nav-item
  margin-right: 20px
.navbar-brand
  text-transform: uppercase
  font-weight: bold
.user
  text-transform: capitalize
</style>
