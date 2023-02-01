<template>
  <view class="viewport">
    <scroll-view scroll-y enhanced>
      <view v-for="item in addressList" :key="item.id" class="item">
        <view class="info">
          <view class="name">{{ item.receiver }}</view>
          <view class="phone">{{ item.contact }}</view>
          <view v-if="item.isDefault" class="tag">默认</view>
        </view>
        <view class="address">{{ item.address }}</view>
        <!-- 🐛 添加阻止冒泡 -->
        <navigator :url="`./form?id=${item.id}`" class="edit" hover-class="none" @tap.stop="() => {}">修改</navigator>
      </view>
    </scroll-view>
    <button class="button" @tap="handleAddress">新建地址</button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { MemberAddressItem } from '@/types/address';
import { getMemberAddress } from '@/services/address';
import { onLoad } from '@dcloudio/uni-app';

const addressList = ref<MemberAddressItem[]>([]);
onLoad(async () => {
  addressList.value = await getMemberAddress();
});

const handleAddress = () => {
  uni.navigateTo({
    url: './form'
  });
};
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx;
  background-color: $gray-2-4;
  scroll-view {
    border-radius: 10rpx;
    background-color: $gray-1;
  }
  .item {
    position: relative;
    padding: 40rpx 20rpx;
    margin: 0 20rpx;
    border-top: 1rpx solid #ddd;
    &:first-child {
      border-top: none;
    }
    .info {
      display: flex;
      align-items: center;
      .name {
        margin-right: 15rpx;
        font-size: 32rpx;
        color: $uni-text-color;
      }
      .phone {
        margin-right: 15rpx;
        font-size: 30rpx;
        color: $uni-text-color;
      }
      .tag {
        padding: 0 10rpx;
        border-radius: 4rpx;
        font-size: 24rpx;
        color: $green-4-1;
        border: 1rpx solid $green-4-1;
      }
    }

    .address {
      margin-top: 10rpx;
      font-size: 30rpx;
      color: $uni-text-color;
    }

    .edit {
      position: absolute;
      right: 30rpx;
      top: 40rpx;
      font-size: 26rpx;
      color: $gray-2-7;
      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        right: 70rpx;
        top: 5rpx;
        width: 2rpx;
        height: 35rpx;
        background-color: $gray-2-7;
      }
    }
  }
  .button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: $gray-1;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: $green-4-1;
  }
}
</style>
