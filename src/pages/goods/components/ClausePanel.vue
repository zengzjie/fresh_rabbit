<template>
  <view class="title">服务说明</view>
  <view class="content">
    <view class="item">
      <view class="dt">无忧退货</view>
      <view class="dd">自收到商品之日起30天内，可在线申请无忧退货服务（内 裤、食品等特殊商品除外</view>
    </view>
    <view class="item">
      <view class="dt">快速退款</view>
      <view class="dd">
        收到退货包裹并确认无误后，将在48小时内办理退款， 退款将原路返回，不同银行处理时间不同，预计1-5个工作日到账
      </view>
    </view>
    <view class="item">
      <view class="dt">满88元免邮费</view>
      <view class="dd">单笔订单金额(不含运费)满88元可免邮费，不满88元， 单笔订单收取10元邮费</view>
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
