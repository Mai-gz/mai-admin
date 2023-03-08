import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
// pinia store
import pinia from "@/stores/index";
// 初始化样式
import "reset-css";
// 覆盖关系（1.reset放最前面--2.UI样式--3.全局样式--4.组件样式）
import "@/assets/styles/global.scss";
// 自定义公用 css
import "@/styles/common.scss";
// 自定义 element css
import "@/styles/element.scss";
// element dark(内置暗黑模式)
import "element-plus/theme-chalk/dark/css-vars.css";
// 自定义element暗黑模式
import "@/styles/theme/element-dark.scss";
// iconfont css
import "@/assets/iconfont/iconfont.scss";
// vue i18n
import I18n from "@/languages/index";
// element icons
import * as Icons from "@element-plus/icons-vue";

const app = createApp(App);
// 注册element Icons组件
Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons]);
});

app
  .use(router)
  .use(pinia)
  .use(I18n)
  .mount('#app')
