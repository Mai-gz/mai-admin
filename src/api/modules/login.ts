import qs from 'qs';
import http from '@/api/index';
import { Login } from '@/api/interface/index';

/**
 * @name 登录模块
 */
// * 用户登录
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>(
    `/login`,
    params,
    {
      headers: { noLoading: true }
    }
  ); // 正常 post json 请求  ==>  application/json
};

/**
 * @name 菜单模块
 */
// * 获取菜单
export const menuApi = () => {
  return http.get<Menu.MenuOptions[]>(`/menu`);
};

/**
 * @name 按钮权限模块
 */
// * 获取菜单
export const buttonApi = () => {
  return http.get<Login.ResAuthButtons>(`/button`);
};
