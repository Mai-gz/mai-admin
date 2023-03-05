import { createApp } from 'vue'
import App from './App'
import router from '@/router'
// pinia store
import pinia from "@/stores/index";
// 初始化样式
import "reset-css"
// 覆盖关系（1.reset放最前面--2.UI样式--3.全局样式--4.组件样式）
import '@/assets/styles/global.scss'
// element icons
// import * as Icons from "@element-plus/icons-vue";

const app = createApp(App);
// 注册element Icons组件
// Object.keys(Icons).forEach(key => {
// 	app.component(key, Icons[key as keyof typeof Icons]);
// });

app
  .use(router)
  .use(pinia)
  .mount('#app')
