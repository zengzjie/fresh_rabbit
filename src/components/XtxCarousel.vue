<template>
  <view class="carousel">
    <swiper circular autoplay :interval="3000" @change="onSwiperChange">
      <swiper-item v-for="item in list" :key="item.id">
        <navigator url="/pages/index/index" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image" :src="item.imgUrl"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <view class="indicator">
      <text v-for="(item, index) in list" :key="item.id" class="dot" :class="{ active: index === activeIndex }"></text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { BannerItem } from '@/types/home';
import { ref } from 'vue';
defineProps<{
  list: BannerItem[];
}>();

const activeIndex = ref<number | undefined>(0);

const onSwiperChange: UniHelper.SwiperOnChange = (ev) => {
  activeIndex.value = ev.detail?.current;
};
</script>

<style lang="scss">
/*
:host伪类选择器，用于选择组件的根元素，即组件的外层元素设置样式（只能生效在 shadow DOM 中）
既父组件中的<carousel></carousel>组件标签
*/
:host {
  display: block;
  height: 280rpx;
}

/* 焦点图 */
.carousel {
  height: 100%;
  position: relative;
  overflow: hidden;
  transform: translateY(0);
  background-color: #efefef;

  .indicator {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 16rpx;
    display: flex;
    justify-content: center;

    .dot {
      width: 30rpx;
      height: 6rpx;
      margin: 0 8rpx;
      border-radius: 6rpx;
      background-color: rgba(255, 255, 255, 0.4);
    }

    .active {
      background-color: $uni-bg-color;
    }
  }

  .navigator,
  .image {
    width: 100%;
    height: 100%;
  }
}
</style>
