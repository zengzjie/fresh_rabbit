import type {
  DeleteMemberCartData,
  MemberCartItem,
  PostMemberCartData,
  PutMemberCartData,
  PutMemberCartSelectedData
} from '@/types/cart';
import { http } from '@/utils/http';

/**
 * 加入购物车
 */
export function postMemberCart(data: PostMemberCartData) {
  return http({
    method: 'POST',
    url: '/member/cart',
    data
  });
}

/**
 * 获取购物车列表接口
 */
export function getMemberCart() {
  return http<MemberCartItem[]>({
    method: 'GET',
    url: '/member/cart'
  });
}

/**
 * 删除/清空购物车商品
 */
export function deleteMemberCart(data: DeleteMemberCartData) {
  return http({
    method: 'DELETE',
    url: '/member/cart',
    data
  });
}

/**
 * 修改购物车商品
 */
export function putMemberCartById(skuId: string, data: PutMemberCartData) {
  return http({
    method: 'PUT',
    url: `/member/cart/${skuId}`,
    data
  });
}

/**
 * 购物车全选/取消全选
 */
export function putMemberCartSelected(data: PutMemberCartSelectedData) {
  return http({
    method: 'PUT',
    url: '/member/cart/selected',
    data
  });
}
