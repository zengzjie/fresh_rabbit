import type {
  DeleteMemberOrderData,
  GetMemberOrderByIdResult,
  GetMemberOrderListData,
  GetMemberOrderListResult,
  GetMemberOrderPreNowData,
  GetMemberOrderPreResult,
  PostMemberOrderData,
  PostMemberOrderResult
} from '@/types/order';
import { http } from '@/utils/http';

/**
 * 获取预付订单(填写订单)
 */
export function getMemberOrderPre() {
  return http<GetMemberOrderPreResult>({
    method: 'GET',
    url: '/member/order/pre'
  });
}

/**
 * 立即购买
 */
export function getMemberOrderPreNow(data: GetMemberOrderPreNowData) {
  return http<GetMemberOrderPreResult>({
    method: 'GET',
    url: '/member/order/pre/now',
    data
  });
}

/**
 * 订单详情接口
 */
export function getMemberOrderList(data: GetMemberOrderListData) {
  return http<GetMemberOrderListResult>({
    method: 'GET',
    url: `/member/order`,
    data
  });
}

/**
 * 订单详情接口
 */
export function getMemberOrderById(id: string) {
  return http<GetMemberOrderByIdResult>({
    method: 'GET',
    url: `/member/order/${id}`
  });
}

/**
 * 提交订单
 */
export function postMemberOrder(data: PostMemberOrderData) {
  return http<PostMemberOrderResult>({
    method: 'POST',
    url: '/member/order',
    data
  });
}

/**
 * 删除订单
 */
export function deleteMemberOrder(data: DeleteMemberOrderData) {
  return http({
    method: 'DELETE',
    url: '/member/order',
    data
  });
}
