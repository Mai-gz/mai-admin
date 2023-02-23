import { createRouter, createWebHistory } from 'vue-router'
import { HOME_URL, LOGIN_URL } from '@/config/config'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: HOME_URL
        },
        {
            path: "/login",
            component: () => import('@/views/login/index')
        },
        // 解决刷新页面，路由警告
        // {
        // 	path: "/:pathMatch(.*)*",
        // 	component: () => import("@/components/ErrorMessage/404.vue")
        // }
    ]
})

export default router;
