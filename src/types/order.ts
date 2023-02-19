/**
 * 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消
 */
export enum OrderState {
  DaiFuKuan = 1,
  DaiFaHuo = 2,
  DaiShouHuo = 3,
  DaiPingJia = 4,
  YiWanCheng = 5,
  YiQuXiao = 6
}

/**
 * 配送时间类型，1为不限，2为工作日，3为双休或假日
 */
export enum DeliveryTimeType {
  Everyday = 1,
  Workday = 2,
  Holiday = 3
}

/**
 * 支付方式，1为在线支付，2为货到付款
 */
export enum PayType {
  Online = 1,
  Delivery = 2
}

/**
 * 支付渠道，1支付宝、2微信
 */
export enum PayChannel {
  AliPay = 1,
  WxPay = 2
}

interface Options {
  label: string;
  value: number;
}

/** 订单状态 */
export const OrderStateOptions: Options[] = [
  { label: '', value: 0 },
  { label: '待付款', value: OrderState.DaiFuKuan },
  { label: '待发货', value: OrderState.DaiFaHuo },
  { label: '待收货', value: OrderState.DaiShouHuo },
  { label: '待评价', value: OrderState.DaiPingJia },
  { label: '已完成', value: OrderState.YiWanCheng },
  { label: '已取消', value: OrderState.YiQuXiao }
];

/**
 * 获取预付订单 返回信息
 */
export interface GetMemberOrderPreResult {
  /** 商品集合[ 商品信息 ] */
  goods: Goods[];
  /** 结算信息 */
  summary: Summary;
  /** 用户地址列表    [ 地址信息 ] */
  userAddresses: UserAddress[];
}

/**
 * 商品信息
 */
export interface Goods {
  /** 属性文字，例如“颜色:瓷白色 尺寸：8寸” */
  attrsText: string;
  /** 数量 */
  count: number;
  /** id */
  id: string;
  /** 商品名称 */
  name: string;
  /** 实付单价 */
  payPrice: number;
  /** 图片 */
  picture: string;
  /** 原单价 */
  price: number;
  /** SKUID */
  skuId: string;
  /** 实付价格小计 */
  totalPayPrice: number;
  /** 小计总价 */
  totalPrice: number;
}

/**
 * 结算信息
 */
export interface Summary {
  /** 折扣总计 */
  discountPrice: number;
  /** 商品件数 */
  goodsCount: number;
  /** 邮费 */
  postFee: number;
  /** 应付总计 */
  totalPayPrice: number;
  /** 价格总计 */
  totalPrice: number;
}

/**
 * 地址信息
 */
export interface UserAddress {
  /** 详细地址 */
  address: string;
  /** 城市编码 */
  cityCode: string;
  /** 联系方式 */
  contact: string;
  /** 所在区/县编码 */
  countyCode: string;
  /** 完整行政区 */
  fullLocation: string;
  /** id */
  id: string;
  /** 是否为默认，1为是，0为否 */
  isDefault: number;
  /** 邮编 */
  postalCode: string;
  /** 省份编码 */
  provinceCode: string;
  /** 收货人 */
  receiver: string;
}

/**
 * 立即购买 请求参数
 */
export interface GetMemberOrderPreNowData {
  /** 商品skuId */
  skuId: string;
  /** 购买商品的数量 */
  count: number;
  /** 下单时已经选择好的地址id */
  addressId: string;
}

/**
 * 提交订单 请求参数
 */
export interface PostMemberOrderData {
  /** 所选地址Id */
  addressId: string;
  /** 买家留言 */
  buyerMessage: string;
  /** 配送时间类型，1为不限，2为工作日，3为双休或假日 */
  deliveryTimeType: number;
  /** 商品集合[ 商品信息 ] */
  goods: {
    /** 数量 */
    count: number;
    /** skuId */
    skuId: string;
  }[];
  /** 支付渠道：支付渠道，1支付宝、2微信--支付方式为在线支付时，传值，为货到付款时，不传值 */
  payChannel: number;
  /** 支付方式，1为在线支付，2为货到付款 */
  payType: number;
}

/**
 * 返回信息
 */
export interface PostMemberOrderResult {
  /** 订单Id */
  id: string;
  /** 支付渠道，1支付宝、2微信 */
  payChannel: PayChannel;
  /** 支付方式，1为在线支付，2为货到付款 */
  payType: string;
}

/**
 * 订单详情接口返回信息
 */
export interface GetMemberOrderByIdResult {
  /** 预计到货时间 */
  arrivalEstimatedTime: string;
  /** 交易关闭时间 */
  closeTime: string;
  /** 发货时间 */
  consignTime: string;
  /** 倒计时--剩余的秒数 -1 表示已经超时，正数表示倒计时未结束 */
  countdown: number;
  /** 下单时间 */
  createTime: string;
  /** 配送时间类型，1为不限，2为工作日，3为双休或假日 */
  deliveryTimeType: DeliveryTimeType;
  /** 交易完成时间 */
  endTime: string;
  /** 完成评价时间 */
  evaluationTime: string;
  /** 订单编号 */
  id: string;
  /** 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消 */
  orderState: OrderState;
  /** 支付渠道，1支付宝、2微信 */
  payChannel: PayChannel;
  /** 付款截止时间：剩余的秒数，前台转换成分钟：秒数 */
  payLatestTime: number;
  /** 实付金额 */
  payMoney: string;
  /** 付款时间 */
  payTime: string;
  /** 支付方式，1为在线支付，2为货到付款 */
  payType: PayType;
  /** 邮费 */
  postFee: string;
  /** 收货人地址 */
  receiverAddress: string;
  /** 收货人 */
  receiverContact: string;
  /** 收货人手机 */
  receiverMobile: string;
  /** 商品集合 */
  skus: Skus[];
  /** 金额合计 */
  totalMoney: string;
  /** 数量合计 */
  totalNum: string;
}

/**
 * 商品信息
 */
export interface Skus {
  /** 单价 */
  curPrice: number;
  /** sku id */
  id: string;
  /** 图片地址 */
  image: string;
  /** 商品名称 */
  name: string;
  /** 属性集合 */
  properties: Property[];
  /** 数量 */
  quantity: number;
  /** 实付金额 */
  realPay: number;
  /** spu id */
  spuId: string;
  /** 小计 */
  totalMoney: number;
  /** 商品属性文字 */
  attrsText: string;
}

/**
 * 属性信息
 */
export interface Property {
  /** 属性名称，如 颜色 */
  propertyMainName: string;
  /** 属性值名称，如 黑色 */
  propertyValueName: string;
}

/**
 * 订单详情请求参数
 */
export interface GetMemberOrderListData {
  /** 页码 */
  page: number;
  /** 页尺寸 */
  pageSize: number;
  /** 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部 */
  orderState: OrderState;
}

/**
 * 订单详情返回信息
 */
export interface GetMemberOrderListResult {
  /** 总记录数 */
  counts: number;
  /** 数据集合    [ 订单信息 ] */
  items: Item[];
  /** 当前页码 */
  page: number;
  /** 总页数 */
  pages: number;
  /** 页尺寸 */
  pageSize: number;
}

/**
 * 订单信息
 */
export interface Item {
  /** 倒计时--剩余的秒数 -1 表示已经超时，正数表示倒计时未结束 */
  countdown: number;
  /** 下单时间 */
  createTime: string;
  /** 订单编号 */
  id: string;
  /** 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消 */
  orderState: OrderState;
  /** 付款截止时间 */
  payLatestTime: string;
  /** 实付金额 */
  payMoney: number;
  /** 支付方式，1为在线支付，2为货到付款 */
  payType: number;
  /** 邮费 */
  postFee: number;
  /** 商品集合[ 商品信息 ] */
  skus: Skus[];
  /** 金额合计 */
  totalMoney: number;
  /** 数量合计 */
  totalNum: string;
}

/**
 * 删除订单
 */
export interface DeleteMemberOrderData {
  /** 订单集合[ 订单id ] */
  ids: string[];
}
