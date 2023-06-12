import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import component from 'src/App.vue'
import { setActivePinia, createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

describe('App component', () => {
  let router
  beforeEach(() => {
    setActivePinia(createPinia())
    router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          meta: { layout: 'default' } // Add your desired layout here
        }
      ]
    })
  })
  it('mount app', () => {
    const wrapper = mount(component, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.exists()).toBeTruthy()
    // expect(wrapper.text()).toContain('Hello Vitest')
  })
})
