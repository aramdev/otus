import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Loader from '@/components/Loader.vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('loader', Loader)
app.use(createPinia())
app.use(router)

app.mount('#app')
