import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'


import axios from 'axios'

import App from './App.vue'
import router from './router'

//pinia持久化
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(ElementPlus)

// 挂载全局方法
const globalFunc = () => {
  console.log('要挂载在全局的方法')
}
// 将globalFunc方法挂载在全局
app.provide('globalFunc', globalFunc)

app.config.globalProperties.$axios = axios

app.mount('#app')
