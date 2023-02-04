<template>
  <view class="capsule" :class="{ checked: checked }" @tap="toggleChecked">{{ text }}</view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
defineProps({
  text: {
    type: String,
    default: ''
  }
});

const checked = ref(false);

const toggleChecked = () => {
  checked.value = !checked.value;
};
</script>

<style lang="scss">
.capsule {
  width: 210rpx;
  height: 62rpx;
  text-align: center;
  line-height: 62rpx;
  margin: 0 30rpx 30rpx 0;
  border: 1rpx solid $gray-2-3;
  border-radius: 58rpx;
  font-size: 24rpx;
  color: $gray-4-1;
  background-color: $gray-2-3;
}

.checked {
  color: rgba(39, 186, 155, 0.8);
  border: 1rpx solid rgba(39, 186, 155, 0.3);
  background-color: rgba(39, 186, 155, 0.1);
}

::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}
</style>
