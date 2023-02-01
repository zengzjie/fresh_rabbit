<template>
  <view class="header" :style="style">
    <view
      class="header-box"
      :style="[
        {
          height: props.bgHeight + 'rpx' || customBarHeight + 'px',
          paddingTop: statusBarHeight + 'px',
          color: titleColor,
          background: bgAttribute
        }
      ]"
    >
      <view @tap="goBack">
        <slot name="back">返回</slot>
      </view>
      <view>{{ title }}</view>
      <view style="width: 32px"></view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref, computed } from 'vue';
import useCurrentInstance from '@/hooks/useCurrentInstance';

const { globalProperties } = useCurrentInstance();

const props = defineProps({
  // 标题名称
  title: {
    type: String,
    default: '',
    required: false
  },
  // 标题颜色
  titleColor: {
    type: String,
    default: '#000',
    required: false
  },
  // 背景颜色
  bgAttribute: {
    type: String,
    default: '#fff',
    required: false
  },
  // 背景高度
  bgHeight: {
    type: Number,
    default: 0,
    required: false
  }
});

// 自定义条形图高度
const customBarHeight = ref(0);
// 状态栏高度
const statusBarHeight = ref(0);

const style = computed(() => `height: ${props.bgHeight + 'rpx' || customBarHeight.value + 'px'}`);

onLoad(() => {
  statusBarHeight.value = globalProperties.$StatusBar + 10;
  customBarHeight.value = globalProperties.$CustomBar;
});

const goBack = () => {
  uni.navigateBack();
};
</script>

<style lang="scss">
.header {
  width: 100vw;
  &-box {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
  }
}
</style>
