import router from '@/router';
import { LOGIN_URL } from '@/config/config';
import { ElNotification } from 'element-plus';
import { AuthStore } from '@/stores/modules/auth';
import { GlobalStore } from '@/stores';
import { isType } from '@/utils/index';

// import.meta.glob引入views文件夹下的所有vue文件
const modules = import.meta.glob("@/views/**/*.vue");

// 动态路由
export const initDynamicRouter = async () => {
  const authStore = AuthStore();
  const globalStore = GlobalStore();
  try {
    // 1.获取菜单列表 按钮权限列表
    await authStore.getAuthMenuList();
    await authStore.getAuthButtonList();

    // 2.判断当前用户有没有菜单权限,如果没有则退出到登录页面
    if (!authStore.authMenuListGet.length) {
      ElNotification({
        title: "无权限访问",
        message: "当前账号无任何菜单权限，请联系系统管理员！",
        type: "warning",
        duration: 3000
      });
      globalStore.setToken("");
      router.replace(LOGIN_URL);
      return Promise.reject("No permission");
    };

    // 3.添加动态路由
    authStore.flatMenuListGet.forEach((item: any) => {
      item.children && delete item.children;
      if (item.component && isType(item.component) === "string") {
        item.component = modules["/src/views" + item.component + ".vue"];
      };
      // 根据当前路由isFull来判断是否全屏显示来添加路由
      item.meta.isFull ? router.addRoute(item) : router.addRoute("layout", item);
    })
  }
  catch (error) {
    // 当获取按钮或菜单权限出错，重定向至登录页面
    globalStore.setToken("");
    router.replace(LOGIN_URL);
    return Promise.reject(error);
  }
}
