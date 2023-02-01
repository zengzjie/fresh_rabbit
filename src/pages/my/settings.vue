<template>
  <view class="viewport">
    <!-- 个人资料 -->
    <navigator v-if="isLogin" url="./profile" hover-class="none" class="profile arrow">
      <image mode="aspectFill" class="avatar" :src="profile.avatar"></image>
      <view class="meta">
        <text class="nickname">芒果🥭</text>
        <text class="level">Lv4 小钻兔</text>
      </view>
    </navigator>
    <!-- 未登录：点击头像跳转登录页 -->
    <navigator v-else url="/pages/login/index" hover-class="none">
      <image
        class="avatar"
        src="https://raw.githubusercontent.com/zengzjie/picgo-image/main/static_files/IMG_6247.JPG"
      ></image>
    </navigator>
    <!-- 已登陆的用户才能修改收获地址 -->
    <template v-if="isLogin">
      <view class="list">
        <navigator url="./address" hover-class="none" class="item arrow">
          <text class="label">收货地址</text>
        </navigator>
        <navigator hover-class="none" class="item arrow">我的尺码</navigator>
        <navigator url="./interest" hover-class="none" class="item arrow">我的兴趣</navigator>
      </view>
      <view class="list">
        <navigator hover-class="none" class="item arrow">会员中心</navigator>
        <navigator url="./account" hover-class="none" class="item arrow">账户与安全</navigator>
      </view>
      <view class="list">
        <button hover-class="none" class="item arrow" open-type="feedback">问题反馈</button>
        <button hover-class="none" class="item arrow" open-type="contact">联系我们</button>
        <navigator hover-class="none" url=" " class="item arrow">关于小兔鲜儿</navigator>
      </view>
    </template>
  </view>
</template>

<script lang="ts" setup>
import { useMemberStore } from '@/stores';

const { isLogin, profile } = useMemberStore();
</script>

<style lang="scss">
page {
  background-color: $gray-2-4;
}

.viewport {
  padding: 20rpx;
  .profile {
    height: 180rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    background-color: $gray-1;
    position: relative;
    &::after {
      right: 25rpx;
    }
    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      float: left;
    }
    .meta {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      margin-left: 140rpx;
      .nickname {
        margin-bottom: 5rpx;
        font-size: 30rpx;
        color: $uni-text-color;
      }
      .level {
        font-size: 27rpx;
        color: $gray-2-6;
      }
    }
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
    .item {
      line-height: 90rpx;
      padding-left: 10rpx;
      font-size: 30rpx;
      color: #333;
      border-top: 1rpx solid #ddd;
      position: relative;
      &:first-child {
        border: none;
      }
      &::after {
        right: 5rpx;
      }
    }

    button {
      border-radius: 0;
      text-align: left;
      background-color: $gray-1;
      &::after {
        // 让按钮箭头宽高等于自身大小
        width: auto;
        height: auto;
        left: auto;
      }
    }
  }
}
</style>
