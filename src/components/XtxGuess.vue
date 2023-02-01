<template>
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>
  <view class="guess">
    <navigator
      v-for="item in guessList"
      :key="item.id"
      class="guess-item"
      hover-class="none"
      :url="`/pages/goods/godds`"
    >
      <image :src="item.picture" mode="aspectFill" class="image"></image>
      <view class="name">{{ item.name }}</view>
      <view class="price">
        <text class="small">¥</text>
        {{ item.price }}
      </view>
    </navigator>
  </view>
  <view class="loading-text">
    {{ finish ? '没有更多了~' : '加载中...' }}
  </view>
</template>

<script lang="ts" setup>
import { PageParams, PageResult } from '@/types/global';
import { GuessItem } from '@/types/home';
import { getGuessLike } from '@/services/home';
import { ref, reactive, onMounted } from 'vue';

export interface GuessExpose {
  getMore: () => Promise<void>;
  reset: () => void;
}

// 分页参数
const pageParams: Required<PageParams> = {
  page: 1,
  pageSize: 10
};

// 猜你喜欢列表
const guessList = ref<GuessItem[]>([]);
// 结束标识
const finish = ref(false);

let result = reactive<PageResult<GuessItem>>({
  items: [],
  counts: -1,
  page: -1,
  pages: -1,
  pageSize: -1
});

// 获取猜你喜欢列表
const getHomeGoodsGuessLikeData = async () => {
  if (finish.value) {
    return;
  }
  if (pageParams.page >= result.pages) {
    finish.value = true;
    uni.showToast({
      title: '没有更多了~',
      icon: 'none'
    });
    return;
  } else {
    pageParams.page++;
    result = await getGuessLike(pageParams);
    guessList.value.push(...result.items);
  }
};

// 组件挂载完毕
onMounted(async () => {
  result = await getGuessLike(pageParams);
  guessList.value.push(...result.items);
});

// 重置数据
const resetData = () => {
  pageParams.page = 1;
  finish.value = false;
  guessList.value = [];
};

// 暴露方法 - 通过 ref 调用
defineExpose({
  getMore: getHomeGoodsGuessLikeData,
  reset: resetData
});
</script>

<style lang="scss">
.caption {
  display: flex;
  justify-content: center;
  padding: 36rpx 0 40rpx;
  font-size: 32rpx;
  color: $gray-10-1;
  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30rpx 0;

    &::before,
    &::after {
      content: '';
      width: 20rpx;
      height: 20rpx;
      background-image: url(@/static/images/bubble.png);
      background-size: contain;
      margin: 0 10rpx;
    }
  }
}

.guess {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 20rpx;
  .guess-item {
    width: 345rpx;
    padding: 24rpx 20rpx 20rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    background-color: $gray-1;
    .image {
      width: 304rpx;
      height: 260rpx;
    }
    .name {
      height: 75rpx;
      margin: 10rpx 0;
      font-size: 26rpx;
      color: $gray-10-1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .price {
      padding-top: 4rpx;
      color: $red-7;
      font-size: 26rpx;
    }
    .small {
      font-size: 20rpx;
    }
  }
}

.loading-text {
  font-size: 28rpx;
  color: $gray-2-6;
  padding: 20rpx 0;
  text-align: center;
}
</style>
