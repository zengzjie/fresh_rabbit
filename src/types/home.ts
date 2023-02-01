/**
 * 首页-广告区域数据
 */
export interface BannerItem {
  /** 跳转链接 */
  hrefUrl: string;
  /** id */
  id: string;
  /** banner链接 */
  imgUrl: string;
  /** 跳转类型1、页面2、H5 3、小程序（小程序使用） */
  type: number;
}

/**
 * 首页-前台类目-小程序 数据
 */
export interface CategoryItem {
  /** 展示图标 */
  icon: string;
  /** id */
  id: string;
  /** 分类名称 */
  name: string;
  /** 除以哪一页 */
  page: number;
}

/**
 * 首页-人气推荐-小程序和app 数据信息
 */
export interface HotItem {
  /** 说明 */
  alt: string;
  /** id */
  id: string;
  /** 图片[ 移动端支持多个图片 ] */
  pictures: string[];
  /** 跳转地址 */
  target: string;
  /** 标题 */
  title: string;
  /** 推荐类型 */
  type: string;
}

/**
 * 首页-新鲜好物 数据信息
 */
export interface NewItem {
  /** 备注 */
  desc: string;
  /** id */
  id: string;
  /** 商品名称 */
  name: string;
  /** 商品图片链接 */
  picture: string;
  /** 价格 */
  price: number;
}

/**
 * 首页-猜你喜欢-请求参数
 */
export interface GetHomeGoodsGuessLikeData {
  /** 说明：页码默认值1 */
  page?: number;
  /** 说明：页大小默认是10 */
  pageSize?: number;
}

/**
 *  首页-猜你喜欢-返回数据
 */
export interface GetHomeGoodsGuessLikeResult {
  /** 总条数 */
  counts: number;
  /** 当前页数据 */
  items: GuessItem[];
  /** 当前页数 */
  page: number;
  /** 总页数 */
  pages: number;
  /** 每页条数 */
  pageSize: number;
}

export interface GuessItem {
  /** 商品描述 */
  desc: string;
  /** 商品折扣 */
  discount: number;
  /** id */
  id: string;
  /** 商品名称 */
  name: string;
  /** 商品已下单数量 */
  orderNum: number;
  /** 商品图片 */
  picture: string;
  /** 商品价格 */
  price: number;
}

/**
 * 推荐通用 请求参数
 */
export interface RecommendData {
  /** 说明：分页页码 */
  page?: number;
  /** 说明：分页数据每页条数 */
  pageSize?: number;
  /** 说明：Tab 项的 id，默认查询全部 Tab 项的第 1 页数据 */
  subType?: string;
}
/**
 * 推荐通用 响应结果
 */
export interface RecommendResult {
  /** 活动图片 */
  bannerPicture: string;
  /** 活动对应的商品集合 */
  goodsItems?: GoodsItems;
  /** id信息 */
  id: string;
  /** 子类选项 */
  subTypes?: SubType[];
  /** 活动标题：特惠推荐 */
  title: string;
}

export interface GoodsItem {
  /** 商品集合 */
  items: Goods[];
  /** 总数量 */
  counts: number;
  /** 总页数 */
  pages: number;
  /** 页码 */
  page: number;
  /** 页容量 */
  pageSize: number;
}

export interface GoodsItems {
  [key: string]: GoodsItem;
}

export interface Goods {
  desc: string;
  id: string;
  name: string;
  picture: string;
  price: number;
}

export interface SubType {
  /** 子类选项id */
  id: string;
  /** 子类选项名称 */
  title: string;
}

export type SubTypesAndGoods = GoodsItem & SubType;
