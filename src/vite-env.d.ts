/// <reference types="vite/client" />
// declare module "*.vue" {
//   import { DefineComponent } from "vue";
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
//   const component: DefineComponent<{}, {}, any>;
//   export default component;
// }

import { AxiosInstance } from 'axios';
declare module 'element-plus/dist/locale/zh-cn.mjs'
declare module 'element-plus/dist/locale/en.mjs'

declare module 'axios' {
  interface AxiosInstance {
      (config: AxiosRequestConfig): Promise<any>
  }
}
