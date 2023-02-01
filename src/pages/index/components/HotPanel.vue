<template>
  <view class="panel hot">
    <view v-for="item in hotList" :key="item.id" class="item">
      <view class="title">
        <text class="title-text">{{ item.title }}</text>
        <text class="title-desc">{{ item.alt }}</text>
      </view>
      <navigator hover-class="none" :url="`/pages/recommend/index?type=${item.type}`" class="cards">
        <image v-for="src in item.pictures" :key="src" class="iamge" mode="aspectFit" :src="src"></image>
      </navigator>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { HotItem } from '@/types/home';

const props = defineProps<{
  hotList: HotItem[];
}>();
</script>

<style lang="scss">
.hot {
  display: flex;
  flex-wrap: wrap;
  min-height: 508rpx;
  .item {
    width: 50%;
    display: flex;
    flex-direction: column;
    height: 254rpx;
    border-right: 1rpx solid $uni-text-color-grey1;
    border-top: 1rpx solid $uni-text-color-grey1;
    .title {
      // 公共样式提取到 index.vue 中
      justify-content: start;
      &-desc {
        font-size: 24rpx;
        color: $gray-2-7;
        margin-left: 18rpx;
      }
    }

    .cards {
      flex: 1;
      padding: 15rpx 20rpx;
      justify-content: space-between;
      align-items: center;
      gap: 5rpx;
      .image {
        width: 150rpx;
        height: 150rpx;
      }
    }

    // 偶数列
    &:nth-child(2n) {
      border-right: 0 none;
    }

    // 获取前两个item
    &:nth-child(-n + 2) {
      border-top: 0 none;
    }
  }
}
</style>
