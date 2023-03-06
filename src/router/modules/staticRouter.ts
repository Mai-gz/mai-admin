import { RouteRecordRaw } from 'vue-router'
import { HOME_URL, LOGIN_URL } from '@/config/config'

// 静态路由
export const staticRouter: RouteRecordRaw[] = [                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  {
    path: "/",
    redirect: HOME_URL
  },
  {
    path: LOGIN_URL,
    name: "login",
    component: () => import("@/views/login/index"),
    meta: {
      title: "登录"
    }
  },
  {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    path: "/layout",
    name: "layout",
    component: () => import("@/layout/index.vue"),
    // component: () => import("@/layouts/indexAsync.vue"),
    redirect: HOME_URL,
    children: []
  }
];

// 错误页面路由
export const errorRouter: RouteRecordRaw[] = [
  // {
  // 	path: "/500",·
  // 	name: "500",
  // 	component: () => import("@/components/ErrorMessage/500.vue"),
  // 	meta: {
  // 		title: "500页面"
  // 	}
  // },
  // // 解决刷新页面，路由警告
  // {
  // 	path: "/:pathMatch(.*)*",
  // 	component: () => import("@/components/ErrorMessage/404.vue")
  // }
]
