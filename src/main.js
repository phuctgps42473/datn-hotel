// import './assets/main.css'
// import './assets/main.css'
// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// createApp(App).mount('#app')

import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Đã có file router

createApp(App).use(router).mount('#app')

