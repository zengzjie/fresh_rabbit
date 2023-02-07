<template>
  <view class="title">配送至</view>
  <view class="shipment">
    <view class="item">
      <view class="user">李明 13824686868</view>
      <view class="address">北京市顺义区后沙峪地区安平北街6号院</view>
      <text class="icon icon-checked"></text>
    </view>
    <view class="item">
      <view class="user">王东 13824686868</view>
      <view class="address">北京市顺义区后沙峪地区安平北街6号院</view>
      <text class="icon icon-ring"></text>
    </view>
    <view class="item">
      <view class="user">张三 13824686868</view>
      <view class="address">北京市朝阳区孙河安平北街6号院</view>
      <text class="icon icon-ring"></text>
    </view>
  </view>
  <view class="footer">
    <view class="button primary" @tap="handleAddRess">新建地址</view>
    <view v-if="false" class="button primary">确定</view>
  </view>
</template>

<script lang="ts" setup>
const handleAddRess = () => {
  uni.navigateTo({
    url: '/pages/my/address/index'
  });
};
</script>

<style lang="scss">
.shipment {
  min-height: 300rpx;
  max-height: 540rpx;
  overflow: auto;
  padding: 20rpx 10rpx !important;
  .item {
    padding: 30rpx 50rpx 30rpx 60rpx;
    background-size: 40rpx;
    background-repeat: no-repeat;
    background-position: 0 center;
    background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png);
    position: relative;
    .icon {
      color: $uni-text-color-grey;
      font-size: 40rpx;
      transform: translateY(-50%);
      position: absolute;
      top: 50%;
      right: 0;
    }
    .icon-checked {
      color: $green-4-1;
    }
    .icon-ring {
      color: $gray-4-1;
    }
    .user {
      font-size: 28rpx;
      color: $gray-4-1;
      font-weight: 500;
    }
    .address {
      font-size: 26rpx;
      color: $gray-2-6;
    }
  }
}
</style>
