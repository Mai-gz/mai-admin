import {createRouter, createWebHistory} from 'vue-router'
import Login from '../views/login/index'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/login",
            component: Login
        }
    ]
})

export default router;