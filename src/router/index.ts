import { createRouter, createWebHistory } from 'vue-router';
import { staticRouter, errorRouter } from './modules/staticRouter';
import { GlobalStore } from '@/stores';
import { AuthStore } from '@/stores/modules/auth';
import { LOGIN_URL, ROUTER_WHITE_LIST } from '@/config/config';
import NProgress from '@/config/nprogress';
import { initDynamicRouter } from './modules/dynamicRouter';

/**
 * @description 动态路由参数配置
 * @param path ==> 菜单路径
 * @param name ==> 菜单别名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 是否外链
 * @param meta.isHide ==> 是否隐藏
 * @param meta.isFull ==> 是否全屏
 * @param meta.isAffix ==> 是否固定在 tabs nav
 * @param meta.isKeepAlive ==> 是否缓存
 * */
const router = createRouter({
    history: createWebHistory(),
    routes: [...staticRouter, ...errorRouter],
    // 关闭严格模式
    strict: false,
    // 路由跳转滚动条回到顶部
    scrollBehavior: () => ({ left: 0, top: 0 })
});

// 路由拦截
router.beforeEach(async (to, from, next) => {
    const globalStore = GlobalStore();

    // 1.NProgress开始
    NProgress.start();

    // 2.动态设置标题
    const title = import.meta.env.VITE_GLOB_APP_TITLE;
    document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

    // 3.判断当前访问的是否为登录页面，则重置路由，如果有token则从哪来回哪去(跳转到跳转前的路由)
    if (to.path === LOGIN_URL) {
        if (globalStore.token) return next(from.fullPath);
        resetRouter();
        return next();
    }

    // 4.判断当前访问的页面是否存在路由白名单中，如果存在则直接放行
    if (ROUTER_WHITE_LIST.includes(to.path)) return next();

    // 5.判断是否由token，如果没用则重定向至登录页面
    if (!globalStore.token) return next({ path: LOGIN_URL, replace: true });

    // 6.判断是否获取到了动态获取的权限路由，如果没有则重新获取并动态添加路由
    const authStore = AuthStore();
    authStore.setRouteName(to.name as string);
    if (!authStore.authMenuListGet.length) {
        await initDynamicRouter();
        return next({ ...to, replace: true });
    };

    // 7.正常访问页面
    next();
});

// 路由跳转结束
router.afterEach(() => {
    NProgress.done();
});

// 路由跳转发生错误
router.onError(error => {
    NProgress.done();
    console.warn("路由错误", error.message);
});

// 重置路由
export const resetRouter = () => {
    const authStore = AuthStore();
    authStore.flatMenuListGet.forEach(route => {
        const { name } = route;
        // 检查路由是否存在,存在则删除
        if (name && router.hasRoute(name)) router.removeRoute(name);
    });
};

export default router;
