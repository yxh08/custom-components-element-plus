import './assets/main.css'
import 'element-plus/dist/index.css'
import ElementPlus  from 'element-plus'

import router  from '@/router/index'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
