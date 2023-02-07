<template>
  <view class="title">常见问题</view>
  <view class="content">
    <view class="item">
      <view class="dt">购买运费如何收取</view>
      <view class="dd">
        单笔订单金额（不含运费）满88元免邮；不满88元，每单收取10元运费。（港澳台地区需满500元免邮费；不满500元，每单收取30元运费）
      </view>
    </view>
    <view class="item">
      <view class="dt">使用什么快递发货</view>
      <view class="dd">默认使用顺丰快递发货（个别商品使用其它快递）</view>
      <view class="dd">配送范围覆盖全国大部分地区（港澳台地区除外）</view>
    </view>
    <view class="item">
      <view class="dt">如何申请退货</view>
      <view class="dd">
        1. 自收到商品之日起30日内，客户可申请无忧退货，退款将原路返还，不同的银行处理时间不同，预计1-5个工作日到账；
      </view>
      <view class="dd">
        2.
        因小兔鲜儿产生的退货，如质量问题，退货邮费由小兔鲜儿承担，退款完成后会以现金券的形式报销，因客户个人原因产生的退货，购买和寄回运费由客户个人承担
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.content {
  padding: 20rpx 10rpx 100rpx 20rpx !important;
}

.item {
  margin-top: 20rpx;
  .dt {
    margin-bottom: 10rpx;
    font-size: 28rpx;
    color: $uni-text-color;
    font-weight: 500;
    position: relative;
  }
  .dd {
    line-height: 1.6;
    font-size: 26rpx;
    color: $uni-text-color-grey;
  }
}

.dt::before {
  content: '';
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background-color: $gray-2-3-2;
  transform: translateY(-50%);

  position: absolute;
  top: 50%;
  left: -20rpx;
}
</style>
