<template>
  <scroll-view scroll-y class="x-order-logistics">
    <view class="x-order-logistics__timeline">
      <view class="x-order-logistics__timeline--item icon-checked">
        <view class="label">已签收</view>
        <view class="text">收货地址：北京市昌平区龙泽园街道 荣苑小区</view>
        <view class="time">2020-10-15 16:37:28</view>
      </view>
      <view class="x-order-logistics__timeline--item dotted">
        <view class="label">派送中</view>
        <view class="text">由【北京昌平龙溪公司】派送，派送员电话13012349876</view>
        <view class="time">2020-10-15 16:37:28</view>
      </view>
      <view class="x-order-logistics__timeline--item dotted">
        <view class="text">到达【北京市分拣中心】发往【北京昌平龙溪公司】</view>
        <view class="time">2020-10-15 16:37:28</view>
      </view>
      <view class="x-order-logistics__timeline--item dotted">
        <view class="text">到达【北京中转站】，发往【北京市分拣中心】</view>
        <view class="time">2020-10-15 16:37:28</view>
      </view>
      <view class="x-order-logistics__timeline--item dotted">
        <view class="text">由【广州太和公司】发往北京中转站</view>
        <view class="time">2020-10-15 16:37:28</view>
      </view>
      <view class="x-order-logistics__timeline--item dotted">
        <view class="label">已发货</view>
        <view class="text">您的订单已发货</view>
        <view class="time">2020-10-15 16:37:28</view>
      </view>
      <view class="x-order-logistics__timeline--item dotted">
        <view class="text">您提交了订单</view>
        <view class="time">2020-10-15 16:37:28</view>
      </view>
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
//
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

.x-order-logistics {
  padding: 20rpx 0;
  &__timeline {
    padding: 60rpx 20rpx 50rpx 70rpx;
    margin: 0 20rpx;
    border-radius: 10rpx;
    background-color: $gray-1;
    position: relative;
    &::before {
      content: '';
      display: block;
      width: 2rpx;
      background-color: $gray-2-3-2;
      position: absolute;
      top: 60rpx;
      bottom: 50rpx;
      left: 40rpx;
    }
    &--item {
      margin-top: 30rpx;
      color: $gray-2-6;
      font-size: 26rpx;
      position: relative;
      &:first-child {
        color: $uni-text-color;
        margin-top: 0;
      }

      .label {
        font-weight: 600;
      }
    }

    .dotted {
      &::before {
        content: '';
        display: block;
        width: 14rpx;
        height: 14rpx;
        border-radius: 50%;
        background-color: $gray-2-3-2;
        position: absolute;
        left: -37rpx;
        top: 12rpx;
      }
    }

    .icon-checked::before {
      font-size: 30rpx;
      color: $green-4-1;
      position: absolute;
      left: -44rpx;
      top: -4rpx;
    }
  }
}
</style>
