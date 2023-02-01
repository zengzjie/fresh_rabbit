import type { MemberAddressItem, PostMemberAddressData } from '@/types/address';
import { http } from '@/utils/http';

/**
 * 添加收货地址
 */
export function postMemberAddress(data: PostMemberAddressData) {
  return http({
    method: 'POST',
    url: '/member/address',
    data: data
  });
}

/**
 * 获取收货地址列表
 */
export function getMemberAddress() {
  return http<MemberAddressItem[]>({
    method: 'GET',
    url: '/member/address'
  });
}

/**
 * 更新收货地址
 * @param id  收货地址 id
 * @param data 收货地址请求体参数
 */
export function putMemberAddress(id: string, data: PostMemberAddressData) {
  // PS: 修改成功的返回值如果业务中没用，可以不指定类型
  return http({
    method: 'PUT',
    // 注意模板字符串 ${id} 的拼接
    url: `/member/address/${id}`,
    data: data
  });
}

/**
 * 查询收货地址详情
 * @param id  收货地址 id
 * @param data 收货地址请求体参数
 */
export function getMemberAddressById(id: string) {
  // 注意：类型为单个收货地址，不要写成数组格式
  return http<MemberAddressItem>({
    method: 'GET',
    // 注意模板字符串 ${id} 的拼接
    url: `/member/address/${id}`
  });
}

/**
 * 删除收货地址
 * @param id  收货地址 id
 */
export function deleteMemberAddressById(id: string) {
  // 注意：类型为单个收货地址，不要写成数组格式
  return http({
    method: 'DELETE',
    // 注意模板字符串 ${id} 的拼接
    url: `/member/address/${id}`
  });
}
