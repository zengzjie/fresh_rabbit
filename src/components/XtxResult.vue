<template>
  <view class="x-result" :class="[selecting ? 'x-fixed' : '']">
    <view class="x-result-header">
      <view class="x-result-header__tabs">
        <view class="x-result-header__tabs__item" :class="{ active: tabIndex === 0 }" @tap="handleComprehensive">
          <text class="label">{{ comprehensiveLabel }}</text>
          <text :class="[selecting ? 'icon-up' : 'icon-down']"></text>
        </view>
        <view class="x-result-header__tabs__item" :class="{ active: tabIndex === 1 }" @tap="byPrice">
          <text class="label">价格</text>
          <text :class="iconSort"></text>
        </view>
        <view class="x-result-header__tabs__item" :class="{ active: tabIndex === 2 }" @tap="bySale">
          <text class="label">销售</text>
        </view>
        <view class="x-result-header__tabs__item" @tab="handleFilter">
          <text class="label">筛选</text>
          <text class="icon-filter"></text>
        </view>
      </view>
    </view>

    <view class="x-result__select" :class="[selecting ? 'x-select__height' : '']" @tap="handleChange">
      <view class="x-result__select__option" data-index="1" data-option="最新" :class="{ active: optionIndex === 1 }">
        最新上架
      </view>
      <view class="x-result__select__option" data-index="2" data-option="评价" :class="{ active: optionIndex === 2 }">
        评价最多
      </view>
      <view class="x-result__select__option" data-index="3" data-option="折扣" :class="{ active: optionIndex === 3 }">
        折扣优先
      </view>
    </view>

    <scroll-view enhanced scroll-y :show-scrollbar="false">
      <!-- 商品列表 -->
      <view v-if="true" class="x-result-cards">
        <navigator
          v-for="item in goodsList"
          :key="item.id"
          hover-class="none"
          class="x-result-cards--navigator"
          url="/pages/goods/index"
        >
          <image class="x-result-cards--image" mode="aspectFit" :src="item.path"></image>
          <view class="x-result-cards--name">{{ item.name }}</view>
          <view class="x-result-cards--wish">{{ item.wish }}人已拼</view>
          <view class="x-result-cards--extra">
            <view class="x-result-cards--extra__present">
              <text class="x-result-cards--extra__present__small">¥</text>
              {{ item.present }}
              <text class="x-result-cards--extra__present__small">.00</text>
            </view>
            <view class="x-result-cards--extra__original">
              <text class="x-result-cards--extra__original__small">¥</text>
              {{ item.original }}
              <text class="x-result-cards--extra__original__small">.00</text>
            </view>
            <view class="x-result-cards--extra__label">包邮</view>
          </view>
        </navigator>
      </view>
      <!-- 无搜索结果 -->
      <view v-if="false" class="x-result-blank">
        <image
          class="x-result-blank--image"
          mode="widthFix"
          src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/blank.png"
        ></image>
        <text class="x-result-blank--text">亲, 暂无搜索结果</text>
      </view>
    </scroll-view>

    <!-- 遮罩 -->
    <!-- ❗️ 这里实际是最好是后端返回的筛选数据，而不是像目前写死的利用 data-xx 的形式去传递数据（性能不好） -->
    <view class="mask" :class="[selecting ? 'mask-show' : '']" @tap="handleOffMask"></view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const goods = [
  {
    id: 1,
    path: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_2.jpg',
    name: '荣耀Play3 6.39英寸魅眼全视屏 4000mAh大电池 全新机型',
    wish: 2146,
    present: 899,
    original: 999
  },
  {
    id: 2,
    path: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_2.jpg',
    name: '荣耀Play3 6.39英寸魅眼全视屏 4000mAh大电池 全新机型',
    wish: 2146,
    present: 899,
    original: 999
  },
  {
    id: 3,
    path: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_3.jpg',
    name: '荣耀Play3 6.39英寸魅眼全视屏 4000mAh大电池 全新机型',
    wish: 2146,
    present: 899,
    original: 999
  },
  {
    id: 4,
    path: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_4.jpg',
    name: '荣耀Play3 6.39英寸魅眼全视屏 4000mAh大电池 全新机型',
    wish: 2146,
    present: 899,
    original: 999
  },
  {
    id: 5,
    path: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_2.jpg',
    name: '荣耀Play3 6.39英寸魅眼全视屏 4000mAh大电池 全新机型',
    wish: 2146,
    present: 899,
    original: 999
  },
  {
    id: 6,
    path: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_2.jpg',
    name: '荣耀Play3 6.39英寸魅眼全视屏 4000mAh大电池 全新机型',
    wish: 2146,
    present: 899,
    original: 999
  }
];

const props = defineProps({
  offMask: {
    type: Boolean,
    default: true
  },
  disablePageScroll: {
    type: Boolean,
    default: true
  }
});

// 商品列表
const goodsList = ref(goods);
// 当前选中的 tab
const tabIndex = ref(0);
// 综合选择里的选项
const optionIndex = ref(0);
// 是否正在选择综合
const selecting = ref(false);
// 综合选择的 label
const comprehensiveLabel = ref('综合');
// 价格排序的 icon
const iconSort = ref('icon-sort');

// 综合选择
const handleComprehensive = () => {
  selecting.value = !selecting.value;
};

// 价格排序
const byPrice = () => {};

// 销售
const bySale = () => {};

// 下拉选择
const handleChange = (e: MouseEvent) => {
  const { index = '0', option = '' } = (e.target as HTMLElement).dataset;
  optionIndex.value = parseInt(index);
  comprehensiveLabel.value = option;
  selecting.value = false;
};

// 是否可以通过点击遮罩层关闭
const handleOffMask = () => {
  if (props.offMask) {
    selecting.value = false;
  }
};

// 筛选
const handleFilter = () => {
  uni.navigateTo({
    url: '/pages/filter/index'
  });
};
</script>

<style lang="scss">
:host {
  display: block;
}
.x-fixed {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
}
.x-result {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: $gray-2-7-1;
  &-header {
    display: flex;
    flex-direction: column;
    border-bottom: 1rpx solid #e7e7e7;
    background-color: #fff;
    padding: 20rpx;
    &__tabs {
      display: flex;
      justify-content: space-between;
      &__item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        .label {
          font-size: 28rpx;
          color: $gray-10-1;
          position: relative;
        }
      }
      .active {
        .label::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -10rpx;
          width: 40rpx;
          height: 4rpx;
          border-radius: 4rpx;
          background-color: $green-4-1;
          transform: translateX(25%);
        }
      }
    }
  }

  &__select {
    position: absolute;
    top: 82rpx;
    z-index: 10;
    width: 100%;
    max-height: 0;
    overflow: auto;
    padding: 15rpx 45rpx;
    transition: max-height 0.3s;
    background-color: $gray-1;
    &__option {
      font-size: 28rpx;
      color: $gray-10-1;
      margin: 20rpx 0;
    }
    .active {
      position: relative;
      color: $green-4-1;
    }

    .active::after {
      content: '\e6ca';
      font-family: 'erabbit' !important;
      transform: translateY(-50%);
      font-size: 40rpx;
      position: absolute;
      right: 0;
      top: 50%;
    }
  }

  .x-select__height {
    max-height: 50vh;
  }

  /* 商品信息 */
  &-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20rpx 20rpx 0;
    &--navigator {
      width: 345rpx;
      height: 510rpx;
      padding: 20rpx 15rpx;
      margin-bottom: 20rpx;
      background-color: $gray-1;
      border-radius: 10rpx;
    }
    &--image {
      width: 315rpx;
      height: 315rpx;
    }
    &--name {
      height: 75rpx;
      font-size: 26rpx;
      color: $gray-10-1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    &--wish {
      margin: 8rpx 0 2rpx;
      font-size: 22rpx;
      color: $gray-2-7;
    }
    &--extra {
      display: flex;
      font-size: 26rpx;
      color: $red-7;
      position: relative;
      &__present {
        &__small {
          font-size: 22rpx;
          margin-right: 5rpx;
        }
      }
      &__original {
        margin-left: 10rpx;
        color: $gray-2-8-2;
        text-decoration: line-through;
      }
      &__label {
        position: absolute;
        right: 0;
        bottom: 3rpx;
        line-height: 1;
        color: $gray-1;
        font-size: 24rpx;
        padding: 8rpx 16rpx;
        border-radius: 40rpx;
        background-color: $green-4-1;
      }
    }
  }

  /* 无搜索结果 */
  &-blank {
    width: 100%;
    height: 100%;
    text-align: center;
    padding-top: 200rpx;
    background-color: $gray-1;
    &--image {
      width: 200rpx;
    }
    &--text {
      font-size: 26rpx;
      color: $gray-2-5-1;
      margin-top: 10rpx;
      display: block;
    }
  }

  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 82rpx;
    bottom: 0;
    z-index: 9;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
    // 🎯 遮罩层是一直在页面中的只是设置了透明度为0，需要使用 pointer-events: none; 禁用掉遮罩层的自身的点击事件
    pointer-events: none;
  }

  .mask-show {
    // 🎯 遮罩层显示的时候，设置透明度为1，pointer-events: auto; 开启遮罩层的自身的点击事件
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
