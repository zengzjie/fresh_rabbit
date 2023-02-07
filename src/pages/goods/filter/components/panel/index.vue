<template>
  <view class="panel">
    <view class="panel-title">
      {{ title }}
      <view class="panel-title__more" @tap="toggleMore">
        更多
        <text :class="[defaultCollapsed ? 'icon-up' : 'icon-down']"></text>
      </view>
    </view>
    <view v-show="defaultCollapsed" class="panel-section x-flex">
      <Capsule v-for="item in source" :key="(item as string)" :text="(item as string)" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import Capsule from '../capsule/index.vue';
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  source: {
    type: Array,
    default: () => {
      return [];
    }
  },
  collapsed: {
    type: Boolean,
    default: true
  }
});

// 默认展开收起状态
const defaultCollapsed = ref(props.collapsed);

// 点击更多切换展开收起状态
const toggleMore = () => {
  defaultCollapsed.value = !defaultCollapsed.value;
};

watch(
  () => props.collapsed,
  (val) => {
    defaultCollapsed.value = val;
  },
  {
    immediate: true
  }
);
</script>

<style lang="scss">
.panel {
  margin: 0 30rpx;
  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100rpx;
    border-top: 1rpx solid #ddd;
    font-size: 30rpx;
    color: $gray-10-1;
    font-weight: 400;
    &__more {
      display: flex;
      align-items: center;
      padding: 13rpx 0 13rpx 13rpx;
      font-size: 26rpx;
      color: $gray-2-5-1;
      .icon-up,
      .icon-down {
        font-size: 30rpx;
      }
    }
  }
  &-section {
    width: 95vw;
    justify-content: flex-start;
    padding-bottom: 10rpx;
    overflow-x: auto;
  }
}
</style>
