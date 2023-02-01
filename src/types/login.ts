/**
 * 小程序登录-请求参数
 */
export interface PostLoginWxMinData {
  /** code */
  code: string;
  /** 加密的手机号信息 */
  encryptedData?: string;
  /** 加密相关 */
  iv?: string;
  /** 不传加密信息时，手机号必传 */
  phoneNumber?: string;
  /** 不敏感信息 */
  rawData?: string;
}

/**
 * 小程序登录 用户信息
 */
export interface LoginWxMinResult {
  /** 头像  */
  avatar: string;
  /** 生日 */
  birthday: string;
  /** 城市编码 */
  cityCode: string;
  /** 性别，男、女、未知 */
  gender: string;
  /** 用户ID */
  id: number;
  /** 手机号 */
  mobile: string;
  /** 昵称 */
  nickname: string;
  /** 职业 */
  profession: string;
  /** 省份编码 */
  provinceCode: string;
  /** 用于后续接口调用的token，有效期三天 */
  token: string;
}
