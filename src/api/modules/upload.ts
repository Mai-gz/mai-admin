import http from '@/api/index';

/**
 * @name 上传图片模块
 */
// * 上传图片
export const uploadImg = (params: object) => {
  return http.post(
    `/upload`,
    params,
    {
      headers: { noLoading: true }
    }
  );
};
