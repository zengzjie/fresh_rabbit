import type { LoginWxMinResult, PostLoginWxMinData } from '@/types/login';
import { http } from '@/utils/http';

/**
 * 小程序登录
 * @param data
 */
export function postLoginWxMin(data: PostLoginWxMinData) {
  return http<LoginWxMinResult>({
    method: 'POST',
    url: '/login/wxMin',
    data: data
  });
}

/**
 * 小程序登录_内测版
 * @param phoneNumber 模拟的手机号码
 */
export function postLoginWxMinSimple(phoneNumber: string) {
  return http<LoginWxMinResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber: phoneNumber
    }
  });
}
