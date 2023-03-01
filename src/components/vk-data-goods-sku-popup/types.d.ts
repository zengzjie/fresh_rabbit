/**
 * 商品对应的sku列表的字段名
 */
export interface SkuItem {
  /**
   * 商品保存库存控制的最小可用单位 sku_id
   */
  _id: string;
  /**
   * 商品id
   */
  goods_id: string;
  /**
   * 商品名称
   */
  goods_name: string;
  /**
   * 商品图片
   */
  image: string;
  /**
   * 商品价格，注意：这里需要乘以 100
   */
  price: number;
  /**
   * 商品规格名称集合
   */
  sku_name_arr: string[];
  /**
   * 商品库存
   */
  stock: number;
}

/**
 * 事件对象：当前选择的sku数据，继承于 SkuItem
 */
export interface SkuEvent extends SkuItem {
  /**
   * 商品购买数量
   */
  buy_num: number;
}

/**
 * 商品规格名称的集合
 */
export interface SpecItem {
  /**
   * 规格可选值集合
   */
  list: { name: string }[];
  /**
   * 规格名称
   */
  name: string;
}

/**
 * 多组规格商品格式
 */
export interface GoodsSku {
  /**
   * 保存库存控制的最小可用单位 sku_id
   */
  _id: string;
  /**
   * 商品名称
   */
  name: string;
  /**
   * 商品图片
   */
  goods_thumb: string;
  /**
   * 字段名 - 商品对应的sku列表的字段名
   */
  sku_list: SkuItem[];
  /**
   * 字段名 - 商品规格名称的字段名
   */
  spec_list: SpecItem[];
}
