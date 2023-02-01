<template>
  <view class="panel fresh">
    <view class="title">
      新鲜好物
      <navigator class="more" hover-class="none" url="/pages/recommend/index?type=5">更多</navigator>
    </view>
    <view class="cards">
      <navigator
        v-for="item in newList"
        :key="item.id"
        class="cards-item"
        hover-class="none"
        :url="`/pages/goods/index?id=${item.id}`"
      >
        <image :src="item.picture" mode="aspectFit" class="image"></image>
        <view class="name">{{ item.name }}</view>
        <view class="price">
          <text class="small">¥</text>
          {{ item.price }}
        </view>
      </navigator>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { NewItem } from '@/types/home';

defineProps<{
  newList: NewItem[];
}>();
</script>

<style lang="scss">
.fresh {
  min-height: 320rpx;
  .cards {
    &-item {
      width: 178rpx;
      padding: 15rpx 20rpx 20rpx;
      text-align: center;

      .image {
        width: 126rpx;
        height: 126rpx;
      }

      .name {
        font-size: 24rpx;
        color: $gray-10-1;
        margin-top: 20rpx;
      }

      .price {
        text-align: left;
        font-size: 26rpx;
        color: $red-7;
        .small {
          font-size: 20rpx;
        }
      }
    }
  }
}
</style>
