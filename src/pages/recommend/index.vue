<template>
  <view class="viewport">
    <!-- 广告图 -->
    <view class="cover">
      <image :src="bannerPicture"></image>
    </view>
    <!-- Tabs选项卡 -->
    <view class="tabs">
      <view v-for="key in subTypesMap.keys()" :key="key" class="tabs-item">
        <text :class="['text', activeKey === key ? 'active' : '']" @click="handleSwitchTab(key)">
          {{ subTypesMap.get(key).title }}
        </text>
      </view>
    </view>
    <!-- 滚动列表 - Map下的不同key的列表 -->
    <scroll-view
      v-for="item in subTypesMap.values()"
      v-show="activeKey === item.id"
      :key="item.id"
      class="scroll-view"
      scroll-y
      enhanced
      :show-scrollbar="false"
      lower-threshold="150"
      @scrolltolower="onScrolltolower"
    >
      <view class="goods">
        <navigator
          v-for="goods in item.items"
          :key="goods.id"
          class="navigator"
          hover-class="none"
          :url="`/pages/goods/index?id=${goods.id}`"
        >
          <image :src="goods.picture" mode="aspectFill" class="image"></image>
          <view class="name">{{ goods.name }}</view>
          <view class="price">
            <text class="small">¥</text>
            {{ goods.price }}
          </view>
        </navigator>
      </view>
      <view class="loading-text">
        {{ subTypesMap.get(activeKey)?.finish ? '没有更多了~' : '加载中...' }}
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { SubType, RecommendResult, Goods } from '@/types/home';
import { getHomeRecommend } from '@/services/home';
import { reactive, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
// import { ScrollViewOnScroll, ScrollViewOnScrollDetail } from '@uni-helper/uni-app-types';
// import useCurrentInstance from '@/hooks/useCurrentInstance';

// 接收上一个页面传递的参数（url上的参数也可以接收）
const props = defineProps<{
  type: string;
}>();

const parametersPage = {
  page: 30,
  pageSize: 10
};

// const { globalProperties } = useCurrentInstance();

// 广告图
const bannerPicture = ref<string>('');

// Tabs选项卡
const subTypesMap = reactive(new Map());

// 高亮的下标
const activeKey = ref<string>('');

const urlMap = [
  { type: '1', title: '特惠推荐', url: '/home/preference/mutli' },
  { type: '2', title: '爆款推荐', url: '/home/inVogue/mutli' },
  { type: '3', title: '一站买全', url: '/home/oneStop/mutli' },
  { type: '4', title: '领券中心', url: '/home/new/mutli' }, // 后端未提供，暂用新鲜好物url
  { type: '5', title: '新鲜好物', url: '/home/new/mutli' }
];

let currUrl = '';
onLoad(async () => {
  const currUrlMap = urlMap.find((item) => item.type === props.type);
  if (currUrlMap) {
    // 保存当前url
    currUrl = currUrlMap.url;
    const { subTypes, goodsItems, bannerPicture: picture, title } = await getHomeRecommend(currUrlMap.url, {});
    subTypes?.forEach((item: SubType, index: number) => {
      if (goodsItems?.[item.id].pages === 1) {
        subTypesMap.set(item.id, { ...item, ...goodsItems?.[item.id], finish: true, scrollTop: 0 });
      } else {
        subTypesMap.set(item.id, { ...item, ...goodsItems?.[item.id], finish: false, scrollTop: 0 });
      }
    });
    // 动态更新导航标题
    uni.setNavigationBarTitle({
      title
    });
    // 设置广告图
    bannerPicture.value = picture;
    // 设置高亮的下标
    activeKey.value = subTypesMap.keys().next().value || '';
  }
});

// 设置tabs切换
const handleSwitchTab = (key: string) => {
  activeKey.value = key;
};

// 滚动到底部触发
const onScrolltolower = async () => {
  const currSubTypes = subTypesMap.get(activeKey.value);
  // 判断是否已经加载完毕
  if (currSubTypes.finish) {
    uni.showToast({
      title: '没有更多了~',
      icon: 'none'
    });
    return;
  }

  let result: RecommendResult = {
    bannerPicture: '',
    title: '',
    id: ''
  };

  // hack: scroll-view 组件在滚动到底部的时，有时候不会会触发 onScrolltolower 事件，所以这里做了一个 hack
  if (parametersPage.page >= currSubTypes.pages) {
    currSubTypes.finish = true;
    return;
  } else {
    parametersPage.page++;
    // 请求下一页数据
    result = await getHomeRecommend(currUrl, {
      subType: currSubTypes.id,
      page: parametersPage.page,
      pageSize: 10
    });
  }

  // 拿到下一页的 items 数据
  const items = result.goodsItems?.[currSubTypes.id].items as Goods[];

  // 追加到对应 activeKey 的 Map 中
  subTypesMap.set(activeKey.value, {
    ...currSubTypes,
    items: [...currSubTypes.items, ...items]
  });
};

// 记录不同 Tab 的滚动位置
// const onScroll: ScrollViewOnScroll = (ev) => {
//   const { scrollTop } = ev.detail as ScrollViewOnScrollDetail;
//   console.log(scrollTop, 'scrollTop');
//   subTypesMap.set(activeKey.value, {
//     ...subTypesMap.get(activeKey.value),
//     scrollTop
//   });
// };

// 防抖 只需要记录最后一刻的滚动距离
// const debounceOnScroll = globalProperties.$_.debounce(onScroll, 300);
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: $gray-2-4;
}

.viewport {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  // 将 tabs 顶部留出空间
  padding: 180rpx 0 0;
  .cover {
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 0 0 40rpx 40rpx;
    overflow: hidden;
    width: 100%;
    height: 225rpx;
  }

  .tabs {
    position: relative;
    z-index: 10;
    height: 100rpx;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 0 20rpx;
    border-radius: 10rpx;
    box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
    font-size: 28rpx;
    color: $uni-text-color;
    background-color: $gray-1;
    .tabs-item {
      position: relative;
      .text {
        margin: 0 20rpx;
      }
    }

    .active::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -10rpx;
      width: 40rpx;
      height: 4rpx;
      border-radius: 2;
      background-color: $green-4;
      transform: translateX(-50%);
    }
  }

  .scroll-view {
    flex: 1;
    .goods {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 20rpx;
      .navigator {
        width: 345rpx;
        padding: 20rpx;
        margin-bottom: 20rpx;
        border-radius: 10rpx;
        overflow: hidden;
        background-color: $gray-1;
        .image {
          width: 305rpx;
          height: 305rpx;
        }
        .name {
          height: 88rpx;
          font-size: 26rpx;
          padding: 10rpx 0;
        }

        .price {
          padding-top: 4rpx;
          color: $red-7;
          font-size: 26rpx;
          .small {
            font-size: 20rpx;
          }
        }
      }
    }

    .loading-text {
      font-size: 28rpx;
      color: $gray-2-6;
      padding: 20rpx 0;
      text-align: center;
    }
  }
}
</style>
