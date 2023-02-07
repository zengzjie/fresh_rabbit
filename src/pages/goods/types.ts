export type Layer = 'helps' | 'shipment' | 'clause';

export const enum SkuMode {
  // 都显示
  Both = 1,
  // 只显示购物车
  Cart,
  // 只显示立即购买
  Buy
}
