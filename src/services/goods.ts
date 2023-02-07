import type { GetGoodsRelevantData, GoodsRelevantItem, GoodsResult } from '@/types/goods';
import { http } from '@/utils/http';

/**
 * 商品详情
 * @param id 商品id
 */
export function getGoodsById(id: string) {
  return http<GoodsResult>({
    method: 'GET',
    url: '/goods',
    data: { id }
  });
}

/**
 * 同类推荐(也支持猜你喜欢)
 * @param data 请求参数
 */
export function getGoodsRelevant(data: GetGoodsRelevantData) {
  return http<GoodsRelevantItem[]>({
    method: 'GET',
    url: '/goods/relevant',
    data: data
  });
}
