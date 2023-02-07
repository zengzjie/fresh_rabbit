<template>
  <!-- 导航条 -->
  <CustomNavbar />
  <scroll-view
    class="scroll-view"
    scroll-y
    enable-back-to-top
    refresher-enabled
    show-scrollbar
    enhanced
    lower-threshold="150"
    refresher-background="#f7f7f8"
    :refresher-triggered="triggered"
    @refresherrefresh="handleRefresherrefresh"
    @scrolltolower="handleScrolltolower"
  >
    <!-- 骨架屏 -->
    <PageSkeleton v-if="isShowSkeleton" />
    <!-- 正常内容 -->
    <template v-else>
      <!-- 通用轮播图 -->
      <!-- BUG: 设置高度用于解决H5端兼容问题 -->
      <XtxCarousel :list="bannerList" />
      <!-- 首页的分类展示 -->
      <CategoryEntries :category-list="categoryList" />
      <!-- 推荐专区 -->
      <HotPanel :hot-list="hotList" />
      <!-- 新鲜好物 -->
      <FreshPanel :new-list="newList" />
      <!-- 猜你喜欢 -->
      <XtxGuess ref="guessRef" />
    </template>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import CustomNavbar from './components/CustomNavbar.vue';
import PageSkeleton from './components/PageSkeleton.vue';
import CategoryEntries from './components/CategoryEntries.vue';
import HotPanel from './components/HotPanel.vue';
import FreshPanel from './components/FreshPanel.vue';
import XtxCarousel from '@/components/XtxCarousel.vue';
import XtxGuess, { GuessExpose } from '@/components/XtxGuess.vue';
import { getHomeBanner, getHomeCategoryHeadMutli, getHomeMutli, getHomeNewList } from '@/services/home';
import type { BannerItem, CategoryItem, HotItem, NewItem } from '@/types/home';
import { onLoad, onShow } from '@dcloudio/uni-app';

const isShowSkeleton = ref<boolean>(false);
// 猜你喜欢Ref
const guessRef = ref<GuessExpose>(); // 设置组件类型

// 获取轮播图数据
const bannerList = ref<BannerItem[]>([]);
const getBannerList = async () => {
  const res = await getHomeBanner();
  bannerList.value = res;
};

// 获取分类数据
const categoryList = ref<CategoryItem[]>([]);
const getCategoryList = async () => {
  let res: CategoryItem[] = await getHomeCategoryHeadMutli();
  console.log(res, 'res');

  // 跟后端约定好数据的格式, 举个例子
  res = res.map((item) => {
    return {
      icon: item.icon,
      id: item.id,
      name: item.name,
      page: 1
    };
  });
  res.push(
    ...[
      {
        icon: 'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-06/201516e3-25d0-48f5-bcee-7f0cafb14176.png?quality=95&imageView',
        id: '2005000',
        name: '居家',
        page: 2
      },
      {
        icon: 'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-06/cf82e5b4-bf1b-4c68-aa86-96f66e8e5282.png?quality=95&imageView',
        id: '2005002',
        name: '锦鲤',
        page: 2
      },
      {
        icon: 'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-06/33e1f5de-0fdb-4cfa-9ba9-781233024b53.png?quality=95&imageView',
        id: '2010000',
        name: '服饰',
        page: 2
      },
      {
        icon: 'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-06/b514a526-4010-4ce8-8cb9-757ed382f84a.png?quality=95&imageView',
        id: '2011000',
        name: '母婴',
        page: 2
      },
      {
        icon: 'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-06/d38a73b8-cd03-48aa-a60b-e7c4e16667ed.png?quality=95&imageView',
        id: '2013001',
        name: '个护',
        page: 2
      },
      {
        icon: 'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-06/4b02f01f-a365-4b6c-9f7a-8b0f591dda02.png?quality=95&imageView',
        id: '2019000',
        name: '严选',
        page: 2
      },
      {
        icon: 'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-06/9660870d-6a59-4624-8064-b3a8cbf50d5c.png?quality=95&imageView',
        id: '2043000',
        name: '数码',
        page: 2
      },
      {
        icon: 'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-06/7d19752c-baff-49b6-bd02-5ece1d729214.png?quality=95&imageView',
        id: '209243029',
        name: '运动',
        page: 2
      },
      {
        icon: 'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-06/4ff20b9e-8150-4bd3-87a3-0cd6766938dd.png?quality=95&imageView',
        id: '29999999',
        name: '杂项',
        page: 2
      },
      {
        icon: 'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-06/d9ee4919-0d2c-4383-9916-2dd25f12610c.png?quality=95&imageView',
        id: '3999999',
        name: '品牌',
        page: 2
      },
      {
        icon: 'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-06/d9ee4919-0d2c-4383-9916-2dd25f12610c.png?quality=95&imageView',
        id: '4999999',
        name: '麻将',
        page: 3
      }
    ]
  );
  categoryList.value = res;
};

// 获取推荐数据
const hotList = ref<HotItem[]>([]);
const getHotList = async () => {
  const res = await getHomeMutli();
  hotList.value = res;
};

// 获取新鲜好物数据
const newList = ref<NewItem[]>([]);
const getNewList = async () => {
  const res = await getHomeNewList();
  newList.value = res;
};

// 页面加载时
onLoad(() => {
  loadData();
});

// 首页需要请求的数据
const loadData = async () => {
  isShowSkeleton.value = true;
  await Promise.all([getBannerList(), getCategoryList(), getHotList(), getNewList()]);
  isShowSkeleton.value = false;
};

// 下拉刷新状态
const triggered = ref(false);

// 重置数据
const resetData = () => {
  bannerList.value = [];
  categoryList.value = [];
  hotList.value = [];
  newList.value = [];
  // 重置猜你喜欢列表
  guessRef.value?.reset();
};

/**
 * @description: 自定义下拉刷新被触发
 * @return {*}
 */
const handleRefresherrefresh = () => {
  isShowSkeleton.value = true;
  // 开启下拉刷新状态
  triggered.value = true;
  // 重置数据
  resetData();
  nextTick(async () => {
    // 重新请求数据
    await loadData();
    // 关闭下拉刷新状态
    triggered.value = false;
  });
};

/**
 * @description: 滚动到底部/右边时触发
 * @return {*}
 */
const handleScrolltolower = () => {
  guessRef.value?.getMore();
};
</script>

<style lang="scss">
page {
  background-color: $uni-bg-color-grey7;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
}

/* 公共面板 */
// :deep 解决H5端样式穿透问题
:deep(.panel) {
  margin: 20rpx 20rpx 0;
  border-radius: 10rpx;
  background-color: $uni-bg-color;

  .title {
    display: flex;
    align-items: center;
    padding: 15rpx 24rpx 0;
    font-size: 32rpx;
    color: $gray-10-1;
    position: relative;

    &-desc {
      font-size: 24rpx;
      color: $gray-2-7;
      margin-left: 18rpx;
    }

    .more {
      position: absolute;
      right: 24rpx;
      font-size: 26rpx;
      color: $gray-2-7;
    }
  }
  .cards {
    display: flex;
  }
  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
