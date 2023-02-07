<template>
  <view class="viewport">
    <view class="header">
      <view class="title">价格区间（元）</view>
      <view class="section">
        <input
          type="digit"
          placeholder-style="color: #999"
          placeholder="最低价"
          class="minimum"
          @input="handleMinimum"
        />
        <text class="middle">-</text>
        <input
          type="digit"
          placeholder-style="color: #999"
          placeholder="最高价"
          class="highest"
          @input="handleHighest"
        />
      </view>
    </view>
    <scroll-view scroll-y :show-scrollbar="false" enhanced>
      <template v-for="(item, index) in filters" :key="index">
        <Panel :title="item.title" :source="item.source" :collapsed="item.collapsed" />
      </template>
    </scroll-view>
    <view class="footer" :class="{ 'safe-area-inset-bottom': true }">
      <button class="reset" @tap="handleReset">重置</button>
      <button class="result" @tap="handleResult">确认（{{ 999 }}个商品）</button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Panel from './components/panel/index.vue';
const filters = [
  {
    title: '品类',
    source: ['男下装', '男上装', '手表', '运动服', '服饰配件', '中大童装'],
    collapsed: true
  },
  {
    title: '款式',
    source: ['假两件', '开衫', '连帽', '日常便服', '双面穿', '套头'],
    collapsed: true
  },
  {
    title: '颜色',
    source: ['黑色', '白色', '灰色', '米色', '杏色', '卡其色', '棕色', '驼色'],
    collapsed: true
  },
  {
    title: '版型',
    source: ['紧身', '修身', '常规', '直筒', '宽松', '收腰'],
    collapsed: true
  }
];

const handleMinimum = (event: any) => {};

const handleHighest = (event: any) => {};

// 重置
const handleReset = () => {};

// 确认
const handleResult = () => {};
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
}
.header {
  height: 200rpx;
  .title {
    font-size: 28rpx;
    padding: 30rpx;
  }
  .section {
    display: flex;
    align-items: center;
    .minimum,
    .highest {
      flex: 1;
      height: 72rpx;
      text-align: center;
      padding: 0 40rpx;
      margin: 0 30rpx;
      border-radius: 10rpx;
      font-size: 26rpx;
      color: $gray-4-1;
      background-color: $gray-2-3;
    }
  }
}

.footer {
  display: flex;
  align-items: center;
  position: relative;
  bottom: 0;
  width: 100%;
  height: 200rpx;
  border-top: 1rpx solid #ddd;
  .reset {
    width: 240rpx;
    height: 72rpx;
    line-height: 72rpx;
    border-radius: 72rpx;
    border: 1rpx solid #ddd;
    font-size: 28rpx;
    color: $gray-2-6;
    background-color: $gray-1;
  }
  .result {
    width: 420rpx;
    height: 72rpx;
    line-height: 72rpx;
    border-radius: 72rpx;
    font-size: 28rpx;
    color: $gray-1;
    background-color: $green-4-1;
  }
}

.safe-area-inset-bottom {
  padding-bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
