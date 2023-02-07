<template>
  <view class="viewport">
    <!-- 搜索框 -->
    <view class="search">
      <view class="input">
        <text class="icon-search">篮球</text>
      </view>
    </view>
    <!-- 分类 -->
    <view class="categories">
      <!-- 主分类（一级类目） -->
      <scroll-view scroll-y enhanced class="primary" :show-scrollbar="false">
        <view
          v-for="(item, index) in categoryTopList"
          :key="item.id"
          :class="['item', activeIndex === index ? 'active' : '']"
          @tap="activeIndex = index"
        >
          {{ item.name }}
        </view>
      </scroll-view>
      <!-- 二级类目 -->
      <scroll-view scroll-y enhanced class="secondary" :show-scrollbar="false">
        <!-- 轮播图 -->
        <XtxCarousel :list="bannerData" class="carousel" />
        <!-- 二级类目列表 -->
        <view v-for="item in categorySubList" :key="item.id" class="panel">
          <view class="title">
            {{ item.name }}
            <navigator class="more" hover-class="none" url="/pages/goods/list">全部</navigator>
          </view>
          <view class="section">
            <navigator
              v-for="good in item.goods"
              :key="good.id"
              hover-class="none"
              class="navigator"
              :url="`/pages/goods/index?id=${good.id}`"
            >
              <image :src="good.picture" class="image"></image>
              <view class="name ellipsis">{{ good.name }}</view>
              <view class="price">
                <text class="symbol">¥</text>
                <text class="number">{{ good.price }}</text>
              </view>
            </navigator>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { BannerItem } from '@/types/home';
import { CategoryTopItem } from '@/types/category';
import XtxCarousel from '@/components/XtxCarousel.vue';
import { getHomeBanner } from '@/services/home';
import { getCategoryList } from '@/services/category';
import { onLoad } from '@dcloudio/uni-app';

// 轮播图数据
const bannerData = ref<BannerItem[]>([]);
// 一级分类数据
const categoryTopList = ref<CategoryTopItem[]>([]);
// 高亮下标
const activeIndex = ref(0);

// 获取轮播图数据
const getBannerList = async () => {
  const res = await getHomeBanner(2);
  bannerData.value = res;
};

// 获取一级分类数据
const getCategoryTopList = async () => {
  const res = await getCategoryList();
  console.log(res, 'ellipsis');

  categoryTopList.value = res;
};

const categorySubList = computed(() => {
  return categoryTopList.value[activeIndex.value]?.children || [];
});

onLoad(() => {
  getBannerList();
  getCategoryTopList();
});
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;

  .search {
    padding: 0 30rpx 20rpx;
    background-color: $gray-1;
    .input {
      display: flex;
      align-items: center;
      height: 64rpx;
      padding-left: 26rpx;
      border-radius: 32rpx;
      font-size: 28rpx;
      color: $gray-2-8;
      background-color: $gray-2-3;
    }
    .icon-search::before {
      margin-right: 10rpx;
    }
  }

  .categories {
    display: flex;
    flex: 1;
    min-height: 400rpx;
    .primary {
      width: 180rpx;
      flex: none;
      background-color: $uni-bg-color-grey6;
      .item {
        position: relative;
        height: 96rpx;
        line-height: 96rpx;
        text-align: center;
        font-size: 26rpx;
        color: $gray-11;
        &::after {
          content: '';
          position: absolute;
          left: 42rpx;
          top: 0;
          width: 96rpx;
          border-top: 1rpx solid $gray-2-3-1;
        }
        &:first-child::after {
          border-top: none;
        }
      }

      .active {
        background-color: $gray-1;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 6rpx;
          height: 100%;
          background-color: $uni-color-success;
        }
      }

      // 激活状态下取消自身和相邻的边框
      .active + .item::after,
      .active::after {
        border-top: none;
      }
    }

    .secondary {
      padding: 20rpx;
      background-color: $gray-1;
      .carousel {
        height: 200rpx;
        margin-bottom: 40rpx;
        border-radius: 10rpx;
        overflow: hidden;
      }
      .panel {
        .title {
          display: flex;
          justify-content: space-between;
          padding-bottom: 10rpx;
          color: $uni-text-color;
          font-size: 28rpx;
          border-bottom: 1rpx solid #f7f7f8;
          .more {
            padding-left: 20rpx;
            font-size: 24rpx;
            color: $uni-text-color-grey;
            &::after {
              font-family: 'erabbit' !important;
              content: '\e6c2';
            }
          }
        }
        .section {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          padding: 20rpx 0;
          .navigator {
            width: 150rpx;
            margin: 0rpx 30rpx 20rpx 0;
            &:nth-child(3n) {
              margin-right: 0;
            }

            .image {
              width: 126rpx;
              height: 126rpx;
            }
            .name {
              font-size: 26rpx;
              color: $uni-text-color;
              margin: 10rpx 0;
            }
            .price {
              font-size: 18rpx;
              color: #cf4444;
            }
            .number {
              font-size: 24rpx;
              margin-left: 2rpx;
            }
          }
        }
      }
    }
  }
}
</style>
