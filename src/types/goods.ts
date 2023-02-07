/** 商品信息 */
export interface GoodsResult {
  /** 品牌信息 */
  brand: Brand;
  /** 所属分类，多级以数组形式体现，如[一级分类，二级分类，三级分类][ 分类信息 ] */
  categories: Category[];
  /** 收藏数量 */
  collectCount: number;
  /** 评价数量 */
  commentCount: number;
  /** 备注 */
  desc: string;
  /** 商品详情 */
  details: Details;
  /** 折扣信息，当折扣信息大于0时有效 */
  discount: number;
  /** 评价信息 */
  evaluationInfo: EvaluationInfo;
  /** 24小时热销[ 商品信息 ] */
  hotByDay: HotByDay[];
  /** id */
  id: string;
  /** 库存 */
  inventory: number;
  /** 是否已收藏 */
  isCollect: boolean;
  /** 是否为预售商品 */
  isPreSale: boolean;
  /** 主图图片集合[ 主图图片链接 ] */
  mainPictures: string[];
  /** 主图视频集合[ 主图视频链接 ] */
  mainVideos: string[];
  /** 商品名称 */
  name: string;
  /** 原价 */
  oldPrice: number;
  /** 当前价格 */
  price: number;
  /** 推荐商品集合，仅APP有此数据[ 商品数据 ] */
  recommends: Recommend[];
  /** 销量 */
  salesCount: number;
  /** 同类商品[ 商品信息 ] */
  similarProducts: SimilarProduct[];
  /** sku集合[ sku信息 ] */
  skus: Skus[];
  /** 可选规格集合备注：规格集合一定要和skus集合下的specs 顺序保持一致[ 可选规格信息 ] */
  specs: ResultSpec[];
  /** spu编码 */
  spuCode: string;
  /** 用户地址列表[ 地址信息 ] */
  userAddresses: UserAddress[];
  /** 主图视频比例,1为1:1/16:9，2为3:4 */
  videoScale: number;
}

/** 品牌信息 */
export interface Brand {
  /** 品牌id */
  id: string;
  /** 品牌名称 */
  name: string;
  /** 品牌英文名称 */
  nameEn: string;
  /** 图片 */
  picture: string;
}

/** 分类信息 */
export interface Category {
  /** 分类id */
  id: string;
  /** 分类名称 */
  name: string;
}

/** 商品详情 */
export interface Details {
  /** 商品详情图片集合[ 图片链接 ] */
  pictures: string[];
  /** 商品属性集合[ 属性信息 ] */
  properties: Property[];
}

/** 属性信息 */
export interface Property {
  /** 属性名称 */
  name: string;
  /** 属性值 */
  value: string;
}

/** 评价信息 */
export interface EvaluationInfo {
  /** 评论正文 */
  content: string;
  /** 评论时间 */
  createTime: string;
  /** 评价用户信息 */
  member: Member;
  /** 订单信息 */
  orderInfo: OrderInfo;
  /** 评论晒图集合 */
  pictures: string;
  /** 好评率 */
  praisePercent: number;
  /** 评分，取值范围0-5 */
  score: number;
}

/** 评价用户信息 */
export interface Member {
  /** 用户头像 */
  avatar: string;
  /** 用户id */
  id: string;
  /** 用户昵称 */
  nickname: string;
}

/** 订单信息 */
export interface OrderInfo {
  /** 下单时间 */
  createTime: string;
  /** 购买数量 */
  quantity: string;
  /** 规格信息集合 */
  specs: OrderInfoSpec[];
}

/** 规格信息 */
export interface OrderInfoSpec {
  /** 规格名称 */
  name: string;
  /** 值 */
  valueName: string;
}

/** 商品信息 */
export interface HotByDay {
  /** 备注 */
  desc: string;
  /** id */
  id: string;
  /** 商品名称 */
  name: string;
  /** 销量 */
  orderNum: number;
  /** 商品图片链接 */
  picture: string;
  /** 价格 */
  price: number;
}

/** 商品数据 */
export interface Recommend {
  /** 备注 */
  desc: string;
  /** 折扣信息 */
  discount: number;
  /** 商品id */
  id: string;
  /** 商品名称 */
  name: string;
  /** 商品图片 */
  picture: string;
  /** 商品价格 */
  price: number;
}

/** 商品信息 */
export interface SimilarProduct {
  /** 备注 */
  desc: string;
  /** id */
  id: string;
  /** 商品名称 */
  name: string;
  /** 销量 */
  orderNum: number;
  /** 商品图片链接 */
  picture: string;
  /** 价格 */
  price: number;
}

/** sku信息 */
export interface Skus {
  /** id */
  id: string;
  /** 库存 */
  inventory: number;
  /** 原价 */
  oldPrice: number;
  /** sku图片 */
  picture: string;
  /** 当前价格 */
  price: number;
  /** sku编码 */
  skuCode: string;
  /** 规格集合(和详情中specs的顺序一定要保持一致)[ 规格信息 ] */
  specs: SkusSpec[];
}

/** 规格信息 */
export interface SkusSpec {
  /** 规格名称 */
  name: string;
  /** 可选值名称 */
  valueName: string;
}

/** 可选规格信息 */
export interface ResultSpec {
  /** 规格名称 */
  name: string;
  /** 可选值集合[ 可选值信息 ] */
  values: Value[];
}

/** 可选值信息 */
export interface Value {
  /** 是否可售 */
  available: boolean;
  /** 可选值备注 */
  desc: string;
  /** 可选值名称 */
  name: string;
  /** 可选值图片链接 */
  picture: string;
}

/** 地址信息 */
export interface UserAddress {
  /** 详细地址 */
  address: string;
  /** 城市编码 */
  cityCode: string;
  /** 所在区/县编码 */
  countyCode: string;
  /** 省市区地址的名字 */
  fullLocation: string;
  /** 地址id */
  id: string;
  /** 是否为默认，1为是，0为否 */
  isDefault: number;
  /** 省份编码 */
  provinceCode: string;
}

/** 同类推荐请求参数
 */
export interface GetGoodsRelevantData {
  /** 说明：商品ID（传入代表查询相关商品，不传代表查询猜你喜欢） */
  id?: string;
  /** 说明：数量限制 */
  limit?: number;
}

/** 同类推荐数据信息
 */
export interface GoodsRelevantItem {
  /** 备注 */
  desc: string;
  /** 折扣信息 */
  discount: number | null;
  /** id */
  id: string;
  /** 商品名称 */
  name: string;
  /** 商品图片 */
  picture: string;
  /** 商品价格 */
  price: string;
}
