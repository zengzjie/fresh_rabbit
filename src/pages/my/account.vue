<template>
  <view class="viewport">
    <!-- 操作列表 -->
    <view class="list">
      <navigator hover-class="none" url=" " class="item arrow">设置登录密码</navigator>
      <navigator hover-class="none" url=" " class="item arrow">更改手机号</navigator>
      <navigator hover-class="none" url=" " class="item">
        密码支付
        <switch color="#27ba9b" />
      </navigator>
    </view>
    <!-- 操作按钮 -->
    <view class="action">
      <view class="button">切换账户</view>
      <view class="button" @tap="logout">退出登录</view>
    </view>
  </view>
</template>

<script setup lang="ts">
// import { useAddressStore } from '@/stores';
import { useMemberStore } from '@/stores';
const memberStore = useMemberStore();
// const addressStore = useAddressStore();

// 退出登录
const logout = () => {
  // 显示模态框
  uni.showModal({
    content: '是否退出登录',
    success(res) {
      // 如果点击了确定
      if (res.confirm) {
        // 清理用户信息
        memberStore.clearProfileInfo();
        // 清理收获地址
        // addressStore.clearSelectedAddress();
        // 后退两级
        uni.navigateBack({ delta: 2 });
      }
    }
  });
};
</script>

<style lang="scss">
page {
  background-color: $gray-2-4;
}

.viewport {
  padding: 20rpx;
}

.arrow::after {
  position: absolute;
  top: 50%;

  content: '\e6c2';
  color: $gray-2-4-1;
  font-family: 'erabbit' !important;
  font-size: 32rpx;
  transform: translateY(-50%);
}

.list {
  padding: 0 20rpx;
  background-color: $gray-1;
  margin-bottom: 20rpx;
  border-radius: 10rpx;
}

.list .item {
  line-height: 90rpx;
  padding-left: 10rpx;
  font-size: 30rpx;
  color: $uni-text-color;
  border-top: 1rpx solid #ddd;
  position: relative;
}

.list .item:first-child {
  border: none;
}

.list .item::after {
  right: 5rpx;
}

.list .item switch {
  position: absolute;
  right: -10rpx;
  transform: scale(0.7) translateY(-2px);
}

.action {
  text-align: center;
  line-height: 90rpx;
  margin-top: 40rpx;
  font-size: 32rpx;
  color: $uni-text-color;
}

.action .button {
  background-color: $gray-1;
  margin-bottom: 20rpx;
  border-radius: 10rpx;
}

.action .button:last-child {
  margin-bottom: 0;
}
</style>
