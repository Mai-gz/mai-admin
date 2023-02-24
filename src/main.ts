import { createApp } from 'vue'
import App from './App'
import router from '@/router'
// pinia store
import pinia from "@/stores/index";
// 初始化样式
import "reset-css"
// 覆盖关系（1.reset放最前面--2.UI样式--3.全局样式--4.组件样式）
import '@/assets/styles/global.scss'

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')
