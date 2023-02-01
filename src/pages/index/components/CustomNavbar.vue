<template>
  <view class="navbar" :style="{ paddingTop: globalProperties.$safeAreaInsets?.top + 'px' }">
    <view class="logo">
      <image
        class="logo-image"
        src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/logo.png"
      ></image>
      <text class="logo-text">新鲜 · 亲民 · 快捷</text>
    </view>
    <!-- 搜索条 -->
    <view class="search">
      <text class="icon-search">搜索商品</text>
      <text class="icon-scan"></text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import useCurrentInstance from '@/hooks/useCurrentInstance';
// 安全区域
const { globalProperties } = useCurrentInstance();
</script>

<style lang="scss">
/* 自定义导航条 */
.navbar {
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/navigator_bg.png);
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;
  .logo {
    display: flex;
    align-items: center;
    height: 64rpx;
    padding-left: 30rpx;
    .logo-image {
      width: 166rpx;
      height: 39rpx;
    }
    .logo-text {
      flex: 1;
      line-height: 28rpx;
      color: $gray-1;
      margin: 2rpx 0 0 20rpx;
      padding-left: 20rpx;
      border-left: 1rpx solid $gray-1;
      font-size: 26rpx;
    }
  }
  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10rpx 0 26rpx;
    height: 64rpx;
    margin: 16rpx 20rpx;
    color: $gray-1;
    font-size: 28rpx;
    border-radius: 32rpx;
    background-color: rgba(255, 255, 255, 0.5);
  }
  .icon-search {
    &::before {
      margin-right: 10rpx;
    }
  }
  .icon-scan {
    font-size: 30rpx;
    padding: 15rpx;
  }
}
</style>
