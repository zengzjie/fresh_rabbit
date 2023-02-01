import type { GetMemberProfileResult, PutMemberProfileData } from '@/types/profile';
import { http } from '@/utils/http';

/**
 * 获取个人信息
 */
export function getMemberProfile() {
  return http<GetMemberProfileResult>({
    method: 'GET',
    url: '/member/profile'
  });
}

/**
 * 个人信息-修改
 */
export function putMemberProfile(data: PutMemberProfileData) {
  return http<GetMemberProfileResult>({
    method: 'PUT',
    url: '/member/profile',
    data: data
  });
}
