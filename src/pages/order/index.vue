<template>
  <view class="x-order">
    <view class="x-order-header">
      <view class="x-order-header__tabs">
        <view
          v-for="item in orderTabs"
          :key="item.tabsStatus"
          class="x-order-header__tabs__item"
          @tap="tabsChange(item.tabsStatus)"
        >
          <text class="label">{{ item.title }}</text>
        </view>
        <!-- 小绿导航 -->
        <view class="x-order-header__tabs__activeUnderline"></view>
      </view>
    </view>
    <view class="x-order-list">
      <swiper class="x-order-list__swiper" :current="activeIndex" @change="handleSwiperChange">
        <swiper-item v-for="(orders, index) in orderList" :key="index">
          <scroll-view enhanced scroll-y :show-scrollbar="false" @scrolltolower="handleScrollTolower">
            <view v-for="item in orders.items" :key="item.id" class="x-order-list__swiper__card">
              <!-- 订单相关 -->
              <view class="x-order-list__swiper__card__status">
                <text class="x-order-list__swiper__card__status__date">{{ item.createTime }}</text>
                <text class="x-order-list__swiper__card__status__primary">
                  {{ OrderStateOptions[item.orderState]?.label }}
                </text>
                <text
                  class="icon-delete x-order-list__swiper__card__status__delete"
                  @tap="handleDelectOrder(item.id)"
                ></text>
              </view>
              <!-- 商品信息 -->
              <navigator
                v-for="sku in item.skus"
                :key="sku.id"
                class="x-order-list__swiper__card__goods"
                :url="`/pages/order/detail?id=${item.id}`"
                hover-class="none"
              >
                <view class="x-order-list__swiper__card__goods__cover">
                  <image :src="sku.image"></image>
                </view>
                <view class="x-order-list__swiper__card__goods__meta">
                  <view class="x-order-list__swiper__card__goods__meta--name ellipsis">{{ sku.name }}</view>
                  <view class="x-order-list__swiper__card__goods__meta--type">{{ sku.attrsText }}</view>
                </view>
              </navigator>
              <!-- 支付信息 -->
              <view class="x-order-list__swiper__card__payment">
                <text class="x-order-list__swiper__card__payment__quantity">共{{ item.totalNum }}件商品</text>
                <text>实付</text>
                <text class="x-order-list__swiper__card__payment__amount">
                  <text class="x-order-list__swiper__card__payment__amount__symbol">¥</text>
                  {{ item.payMoney }}
                </text>
              </view>
              <!-- 订单操作 -->
              <view class="x-order-list__swiper__card__action">
                <view v-if="item.orderState >= 5" class="x-order-list__swiper__card__action__button primary">
                  再次购买
                </view>
                <navigator
                  v-if="item.orderState === 1"
                  :url="`/pages/order/detail?id=${item.id}`"
                  class="x-order-list__swiper__card__action__button primary"
                >
                  去付款
                </navigator>
                <view v-if="item.orderState === 3" class="x-order-list__swiper__card__action__button primary">
                  确认收货
                </view>
                <view v-if="item.orderState < 3" class="x-order-list__swiper__card__action__button">取消订单</view>
                <template v-if="item.orderState > 4">
                  <view v-if="item.orderState === 5" class="x-order-list__swiper__card__action__button primary">
                    去评价
                  </view>
                  <view class="x-order-list__swiper__card__action__button" @tap="handleDelectOrder(item.id)">
                    删除订单
                  </view>
                </template>
              </view>
            </view>
            <view v-if="orders.items.length === 0" class="x-order-list__swiper__blank">
              <image
                class="x-order-list__swiper__blank--image"
                mode="widthFix"
                src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/blank.png"
              ></image>
              <text class="x-order-list__swiper__blank--text">暂无数据</text>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { GetMemberOrderListResult, OrderStateOptions } from '@/types/order';
import { getMemberOrderList, deleteMemberOrder } from '@/services/order';
import { onShow } from '@dcloudio/uni-app';

const orderTabs = [
  {
    tabsStatus: 0,
    title: '全部'
  },
  {
    tabsStatus: 1,
    title: '待付款'
  },
  {
    tabsStatus: 2,
    title: '待发货'
  },
  {
    tabsStatus: 3,
    title: '待收货'
  },
  {
    tabsStatus: 4,
    title: '待评价'
  }
];

// 多个订单列表的大集合，提供初始值防止滑动的BUG
const orderList = ref<GetMemberOrderListResult[]>([
  {
    items: [],
    counts: 0,
    page: 1,
    pageSize: 10,
    pages: 1
  },
  {
    items: [],
    counts: 0,
    page: 1,
    pageSize: 10,
    pages: 1
  },
  {
    items: [],
    counts: 0,
    page: 1,
    pageSize: 10,
    pages: 1
  },
  {
    items: [],
    counts: 0,
    page: 1,
    pageSize: 10,
    pages: 1
  },
  {
    items: [],
    counts: 0,
    page: 1,
    pageSize: 10,
    pages: 1
  }
]);

const props = defineProps<{
  type: number;
}>();

onShow(() => {
  loadOrderList();
});

// swiper的下标
const activeIndex = ref(props.type);
// tabs的下标
const tabsIndex = ref(props.type);
const tabsChange = (num: number) => {
  tabsIndex.value = num;
  activeIndex.value = num;
};

const left = computed(() => {
  return `${tabsIndex.value * 20 + 7}%`;
});

// 加载订单列表
const loadOrderList = async () => {
  uni.showLoading({ title: '加载中...' });
  // 获取当前订单列表
  const currOrderList = orderList.value[activeIndex.value];
  const res = await getMemberOrderList({
    page: currOrderList.page,
    pageSize: currOrderList.pageSize,
    orderState: OrderStateOptions[activeIndex.value].value
  });
  // 隐藏加载提示
  uni.hideLoading();
  // 列表数据追加，用于分页
  currOrderList.items.push(...res.items);
  // 记录总数，用于分页
  currOrderList.counts = res.counts;
  // 🔔如果 总记录数量 比 页容量还小，说明没分页数据了，页码无需累加
  if (res.counts < res.pageSize) return;
  // 页码累加，用于分页
  currOrderList.page++;
};

// swiper切换
const handleSwiperChange = (e: any) => {
  tabsIndex.value = e.detail.current;
  activeIndex.value = e.detail.current;
  // 🔔优化：在滑动切换的时候，如果没有数据，才需要发送请求
  if (orderList.value[activeIndex.value].items.length === 0) {
    // 加载订单列表数据
    loadOrderList();
  }
};

// 滚动到底部触发
const handleScrollTolower = () => {
  // 获取当前订单列表
  const currOrderList = orderList.value[activeIndex.value];
  // 如果 已加载数量 小于 总记录数量
  if (currOrderList.items.length < currOrderList.counts) {
    // 获取订单数据
    loadOrderList();
  }
};

// 删除订单
const handleDelectOrder = async (id: string) => {
  await deleteMemberOrder({ ids: [id] });
  uni.showToast({ title: '删除成功' });
};
</script>

<style lang="scss">
page {
  height: 100%;
}
.x-order {
  display: flex;
  flex-direction: column;
  height: 100%;
  &-header {
    padding: 20rpx;
    background-color: $gray-1;
    &__tabs {
      display: flex;
      justify-content: space-between;
      position: relative;
      &__item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        .label {
          font-size: 28rpx;
          color: $gray-10-1;
        }
      }
      &__activeUnderline {
        content: '';
        position: absolute;
        left: v-bind(left);
        bottom: -8rpx;
        width: 36rpx;
        height: 4rpx;
        border-radius: 4rpx;
        background-color: $green-4-1;
        transition: all 0.3s;
      }
    }
  }

  &-list {
    flex: 1;
    &__swiper {
      height: 100%;
      &__card {
        min-height: 100rpx;
        padding: 20rpx;
        margin: 20rpx 20rpx 0;
        border-radius: 10rpx;
        background-color: $gray-1;
        &:last-child {
          padding-bottom: 40rpx;
        }
        &__status {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 28rpx;
          color: $uni-text-color-grey;
          margin-bottom: 15rpx;
          &__date {
            color: $gray-2-6;
            flex: 1;
          }
          &__primary {
            color: $orange-4;
          }
          &__delete {
            line-height: 1;
            margin-left: 10rpx;
            padding-left: 10rpx;
            border-left: 1rpx solid $gray-2-3-3;
          }
        }

        &__goods {
          display: flex;
          margin-bottom: 20rpx;
          &__cover {
            width: 170rpx;
            height: 170rpx;
            margin-right: 20rpx;
            border-radius: 10rpx;
            overflow: hidden; // 配合border-radius使用
            position: relative;
          }

          &__meta {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            &--name {
              margin-bottom: 10rpx;
              font-size: 26rpx;
              color: $gray-4-1;
            }
            &--type {
              line-height: 1.8;
              padding: 0 15rpx;
              margin-top: 10rpx;
              font-size: 24rpx;
              align-self: flex-start;
              border-radius: 4rpx;
              color: $gray-2-8-1;
              background-color: $gray-2-7-1;
            }
          }
        }

        &__payment {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          line-height: 1;
          padding: 20rpx 0;
          text-align: right;
          color: $uni-text-color-grey;
          font-size: 28rpx;
          border-bottom: 1rpx solid $uni-text-color-grey1;
          &__quantity {
            font-size: 24rpx;
            margin-right: 16rpx;
          }
          &__amount {
            color: $gray-4-1;
            margin-left: 6rpx;
            &__symbol {
              font-size: 20rpx;
            }
          }
        }

        &__action {
          display: flex;
          flex-direction: row-reverse;
          justify-content: flex-start;
          padding-top: 20rpx;
          &__button {
            width: 200rpx;
            height: 60rpx;
            text-align: center;
            line-height: 60rpx;
            margin-left: 20rpx;
            border-radius: 60rpx;
            border: 1rpx solid $gray-2-4-1;
            font-size: 26rpx;
            color: $gray-4-1;
          }
          .primary {
            color: $green-4-1;
            border-color: $green-4-1;
          }
        }
      }
      &__blank {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100%;
        font-size: 28rpx;
        color: $gray-10-1;
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
    }
  }
}
</style>
