<template>
  <li class="list-group-item d-flex align-items-center" v-if="info">
    <span class="me-auto">
      {{ info.title }}
    </span>
    <span>
      Price: {{ info.price }}
    </span>
    <input 
      class="form-control 
      form-control-sm" 
      type="number" 
      :value="product.quantity" 
      @input="onChangeQuantity($event)">
    <span>
      Sum: {{ (info.price * product.quantity).toFixed(2) }}
    </span>
    <button type="button" 
      class="btn-close btn-danger" aria-label="Close"
      @click="emit('remove')">
    </button>
    <!-- <pre>{{ info }}</pre> -->
  </li>
</template>

<script setup>
import { useProductsStore } from '@/stores/products.js'
import { ref, computed, onMounted } from 'vue'
const useProducts = useProductsStore()
const { getProduct } = useProducts
const props = defineProps({
  product: {
    typeof: Object
  }
})
const info = ref(null) 
const id = computed(() => {
  return props.product.productId
}) 
const emit = defineEmits(['change-count', 'remove'])
const onChangeQuantity = (e) => {
  if (e.target.value < 1) {
    e.target.value = 1
    emit('change-count', 1)
    return
  }
  emit('change-count', Math.min(info.value.rating.count, +e.target.value))
}
onMounted(() => {
  info.value = getProduct(id.value)
})
</script>

<style lang="sass" scoped>
.form-control
  width: 70px
  margin: 0 20px
  text-align: center
.btn-close
  margin-left: 20px 
</style>