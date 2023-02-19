/**
 * 支付信息
 */
export interface GetPayWxPayMiniPayResult {
  /** appId */
  appId?: string;
  /** 随机字符串，长度为32个字符以下 */
  nonceStr: string;
  /** 统一下单接口返回的 prepay_id 参数值 */
  package: string;
  /** 微信支付签名 */
  paySign: string;
  /** 签名算法 */
  signType: 'MD5' | 'HMAC-SHA256' | 'RSA';
  /** 时间戳，即当前的时间 */
  timeStamp: string;
}
