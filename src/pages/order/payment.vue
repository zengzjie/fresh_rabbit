<template>
  <XtxHeaderBar title="支付成功" title-color="#000">
    <template #back>
      <view class="icon-left" style="width: 32px; color: #000; transform: translateY(3px)"></view>
    </template>
  </XtxHeaderBar>
  <scroll-view
    id="scrollView"
    class="x-order-payment"
    enhanced
    scroll-y
    :show-scrollbar="false"
    @scrolltolower="handleScrollToLower"
  >
    <!-- 订单状态 -->
    <view class="x-order-payment__overview" :style="{ paddingTop: globalProperties.$safeAreaInsets!!.top + 40 + 'px' }">
      <view class="x-order-payment__overview--status icon-checked">支付成功</view>
      <view class="x-order-payment__overview--buttons">
        <navigator hover-class="none" class="button" url="/pages/index/index">返回首页</navigator>
        <navigator hover-class="none" url="/pages/order/index">查看订单</navigator>
      </view>
    </view>

    <XtxGuess ref="guessRef" />
  </scroll-view>
</template>

<script lang="ts" setup>
import XtxHeaderBar from '@/components/XtxHeaderBar.vue';
import XtxGuess, { GuessExpose } from '@/components/XtxGuess.vue';
import useCurrentInstance from '@/hooks/useCurrentInstance';
import { ref } from 'vue';

const { globalProperties } = useCurrentInstance();

const guessRef = ref<GuessExpose>();
// 滚动到底部触发
const handleScrollToLower = () => {
  guessRef.value?.getMore();
};
</script>

<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.x-order-payment {
  &__overview {
    line-height: 1;
    padding-bottom: 70rpx;
    color: $gray-1;
    background-color: $green-4-1;
    &--status {
      font-size: 36rpx;
      font-weight: 500;
      text-align: center;
      &::before {
        display: block;
        font-size: 110rpx;
        margin-bottom: 20rpx;
      }
    }

    &--buttons {
      height: 60rpx;
      line-height: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 60rpx;
      navigator {
        margin: 0 10rpx;
        font-size: 28rpx;
        text-align: center;
        width: 200rpx;
        border-radius: 64rpx;
        border: 1rpx solid $gray-1;
      }
    }
  }
}
</style>
