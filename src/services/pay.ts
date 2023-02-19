import type { GetPayWxPayMiniPayResult } from '@/types/pay';
import { http } from '@/utils/http';
/**
 * 支付-微信-小程序
 *    1. 由于微信安全限制，该接口只允许 appid 为申请后的微信的开发者调用。
 *    2. 其他开发者更新订单状态，可调用模拟接口支付接口，调用后订单状态更新为已支付。
 */
export function getPayWxPayMiniPay(orderId: string) {
  return http<GetPayWxPayMiniPayResult>({
    method: 'GET',
    url: '/pay/wxPay/miniPay',
    data: { orderId }
  });
}

/**
 * 模拟支付-更新订单支付状态
 * @param orderId 订单号
 */
export function getPayMock(orderId: string) {
  return http({
    method: 'GET',
    url: '/pay/mock',
    data: { orderId }
  });
}
