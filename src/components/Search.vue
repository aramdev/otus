<template>
  <form class="d-flex" @submit.prevent="onSubmit">
    <input class="form-control me-2" 
      type="search"
      v-model="textRef" 
      placeholder="Search product" 
      aria-label="Search">
    <select class="form-select me-2" v-model="typeRef">
      <option value="" selected disabled>Select</option>
      <option value="title">By title</option>
      <option value="price">By price</option>
    </select>
    <button 
      class="btn btn-success me-2"
      :disabled="!disabled"
      type="submit">
      Filter
    </button>
    <button 
      class="btn btn-link"
      v-if="filterActive"
      @click="onClearFilter"
      type="button">
      Clear Filter
    </button>
  </form>
</template>

<script setup>
import { ref, computed, toRef } from 'vue'
const props = defineProps({
  type: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})
const typeRef = ref(props.type)
const textRef = ref(props.text)
const filterActive = ref(false)
const disabled = computed(() => {
  return typeRef.value !== '' && textRef.value != ''
})
const emit = defineEmits(['search', 'clear'])
const onSubmit = () => {
  emit('search', {
    type: typeRef.value,
    text: textRef.value
  })
  filterActive.value = true
}
const onClearFilter = () => {
  emit('clear')
  filterActive.value = false
}
</script>

<style lang="sass" scoped>
.form-control
  width: 300px
.form-select
  width: 150px
</style>