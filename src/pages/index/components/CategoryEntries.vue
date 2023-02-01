<template>
  <view class="category-entries">
    <scroll-view class="scroll-view" scroll-x enhanced @scroll="onScroll">
      <view class="navs" :style="{ width: navsWidth }">
        <view v-for="i in navs" :key="i" class="navs-item">
          <navigator
            v-for="item in map.get(i)"
            :key="item.id"
            url="/pages/goods/list/index"
            class="navigator"
            hover-class="none"
          >
            <image :src="item.icon" class="icon" mode="aspectFill" />
            <view class="title">{{ item.name }}</view>
          </navigator>
        </view>
      </view>
    </scroll-view>
    <view class="scroll-bar">
      <view class="cursor" :style="{ width: cursorWidth, left: currentLeft }"></view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { CategoryItem } from '@/types/home';
import { ScrollViewOnScroll, ScrollViewOnScrollDetail } from '@uni-helper/uni-app-types';
import { computed, ref, reactive } from 'vue';

const props = defineProps<{
  categoryList: CategoryItem[];
}>();

const currentLeft = ref<string>('');
const map = reactive(new Map());

if (props.categoryList.length > 0) {
  props.categoryList.forEach((item) => {
    if (map.has(item.page)) {
      map.set(item.page, [...map.get(item.page), item]);
    } else {
      map.set(item.page, [item]);
    }
  });
}

// 监听map的变化, 不加 immediate 会不触发 watch 的回调
// watch(
//   () => props.categoryList,
//   (val) => {
//     // 以 page 为 key，将 categoryList 分组
//     console.log(val, 'val');

//     val.forEach((item) => {
//       if (map.has(item.page)) {
//         map.set(item.page, [...map.get(item.page), item]);
//       } else {
//         map.set(item.page, [item]);
//       }
//     });
//     console.log(map, 'map');
//   },
//   { deep: true, immediate: true }
// );

/**
 * @description: navs容器的宽度 = map的key长度 * 100%
 * @param {*} computed
 * @return {*} %宽度
 */
const navsWidth = computed(() => {
  return map.size * 100 + '%';
});

/**
 * @description: 光标的宽度 = 100 / map的key长度的百分比
 * @param {*} computed
 * @return {*} %宽度
 */
const cursorWidth = computed(() => {
  return 100 / map.size + '%';
});

// 以 categoryList 的长度为基准，长度为 10 的倍数时， navs加1
const navs = computed(() => {
  return map.size;
});

const onScroll: ScrollViewOnScroll = (ev) => {
  const { scrollLeft, scrollWidth } = ev.detail as ScrollViewOnScrollDetail;
  // scroll-bar移动的距离 = scrollLeft / scrollWidth * 100%
  currentLeft.value = `${(scrollLeft / scrollWidth) * 100}%`;
};
</script>

<style lang="scss">
.category-entries {
  margin: 20rpx 0 0;
  padding: 10rpx 0;
  .navs {
    display: flex;
    .navs-item {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      text-align: center;
      min-height: 328rpx;
      box-sizing: border-box;
      .navigator {
        width: 150rpx;
        margin-bottom: 28rpx;
        .icon {
          width: 100rpx;
          height: 100rpx;
        }
        .title {
          font-size: 26rpx;
          color: $gray-9;
        }
      }
    }
  }
  .scroll-bar {
    width: 200rpx;
    height: 6rpx;
    margin: auto;
    border-radius: 6rpx;
    background-color: $gray-2-2;
    position: relative;
    .cursor {
      width: 50%;
      height: 100%;
      background-color: $green-4;
      border-radius: 6rpx;
      position: absolute;
      left: 0;
    }
  }
}
</style>
