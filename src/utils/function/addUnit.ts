import validation from './test';

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
export default function addUnit(value = 'auto', unit = 'rpx') {
  value = String(value);
  // 用正则判断是否为数值
  return validation.number(value) ? `${value}${unit}` : value;
}
