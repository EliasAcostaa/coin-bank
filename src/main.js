import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'

const pinia = createPinia()

createApp(App).use(store).use(pinia).use(router).use(axios).mount('#app')
