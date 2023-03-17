import { App } from "vue";
import auth from "./modules/auth";
import copy from "./modules/copy";
import waterMarker from "./modules/waterMarker";
import draggable from "./modules/draggable";
import debounce from "./modules/debounce";
import throttle from "./modules/throttle";
import longpress from "./modules/longpress";

const directivesList: any = {
  // 自定义指令
  auth, // 按钮权限
  copy, // 复制某个值至剪贴板
  waterMarker, // 页面添加背景水印
  draggable, // 可在父元素区域任意拖拽元素
  debounce, // 按钮防抖
  throttle, // 防止按钮在短时间内被多次点击，使用节流函数限制规定时间内只能点击一次
  longpress // 长按指令，长按时触发事件
};

const directives = {
  install: (app: App<Element>) => {
    Object.keys(directivesList).forEach(key => {
      // 注册所有自定义指令
      app.directive(key, directivesList[key]);
    });
  }
};

export default directives;
