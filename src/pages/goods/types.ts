export type Layer = 'helps' | 'sku' | 'shipment' | 'clause';

export const enum SkuMode {
  // 都显示
  Both,
  // 只显示购物车
  Cart,
  // 只显示立即购买
  Buy
}
