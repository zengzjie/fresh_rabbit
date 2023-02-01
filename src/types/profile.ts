/**
 * 会员中心-个人信息
 */
export interface GetMemberProfileResult {
  /** 账号名称 */
  account: string;
  /** 头像 */
  avatar: string;
  /** 生日 */
  birthday: string;
  /** 省市区的名称：如山东省济南市里历下区 */
  fullLocation: string;
  /** 性别，男、女、未知 */
  gender: Gender;
  /** 用户Id */
  id: string;
  /** 昵称 */
  nickname: string;
  /** 职业 */
  profession: string;
}

/**
 * 性别，男、女、未知
 */
export type Gender = '未知' | '女' | '男';

/**
 *  个人信息-修改请求参数
 */
export interface PutMemberProfileData {
  /** 生日 YYYY-MM-DD */
  birthday?: string;
  /** 城市编码 */
  cityCode?: string;
  /** 区/县编码 */
  countyCode?: string;
  /** 性别，男、女、未知 */
  gender?: Gender;
  /** 昵称 */
  nickname?: string;
  /** 职业 */
  profession?: string;
  /** 省份编码 */
  provinceCode?: string;
}
