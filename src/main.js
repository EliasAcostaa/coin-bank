import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createPinia } from 'pinia'
import '@/assets/bootstrap.min.css' // linkeo bootstrap de js
// import '@/assets/bootstrap.bundle.min.js'                 <--- ESTE ENLACE ANTERIOR NO FUNCIONABA (ERRORES)

// Import Bootstrap and BootstrapVue CSS files (order is important)    <---- este SÍ funciona!!! (bootstrap para VUE)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/custom.code.css' // importamos el archivo de estilos propios (no predeterminados de bootstrap)
import { Tooltip, Toast, Popover } from 'bootstrap'; // importamos comportamientos JS de bootstrap para animar.
                                                
// BOOTSTRAP COMUN != BOOTSTRAP PARA VUE


const pinia = createPinia()

createApp(App).use(store).use(pinia).use(router).mount('#app')
