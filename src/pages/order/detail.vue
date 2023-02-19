<template>
  <XtxHeaderBar title="订单详情" title-color="#000">
    <template #back>
      <view class="icon-left" style="width: 32px; color: #000; transform: translateY(3px)"></view>
    </template>
  </XtxHeaderBar>
  <scroll-view
    id="scrollView"
    class="x-order-detail__wrapper"
    enhanced
    scroll-y
    :show-scrollbar="false"
    @scrolltolower="handleScrollToLower"
  >
    <!-- 订单状态 -->
    <view
      class="x-order-detail__wrapper__overview"
      :style="{ paddingTop: globalProperties.$safeAreaInsets!!.top + 40 + 'px' }"
    >
      <template v-if="order.orderState === OrderState.DaiFuKuan">
        <view class="x-order-detail__wrapper__overview--status icon-clock">等待付款</view>
        <view class="x-order-detail__wrapper__overview__tips">
          <text>应付金额: ¥{{ order.payMoney }}</text>
          <text class="x-order-detail__wrapper__overview__tips--countdown">
            支付剩余
            <!-- 🔔 通过 unix 方法把秒数转换成 dayjs 对象，再调用 format 格式化时间 -->
            {{ unix(order.countdown).format('mm分ss秒') }}
          </text>
        </view>
        <view class="x-order-detail__wrapper__overview--button" @tap="handleOrderPay">去支付</view>
      </template>
      <template v-else>
        <view class="x-order-detail__wrapper__overview--status icon-clock">
          {{ OrderStateOptions[order.orderState]?.label }}
        </view>
      </template>
    </view>

    <!-- 配送状态 -->
    <view v-if="order.orderState === OrderState.DaiShouHuo" class="x-order-detail__wrapper__shipment">
      <!-- 物流信息 -->
      <navigator class="x-order-detail__wrapper__shipment__logistics" hover-class="none" url="/pages/order/logistics">
        <view class="x-order-detail__wrapper__shipment__logistics--message">
          您已在北京顺义后沙峪智慧城7号楼店完成取件，感谢使用菜鸟驿站，期待再次为您服务。
        </view>
        <view class="x-order-detail__wrapper__shipment__logistics--date">2020-11-21 09:15:09</view>
      </navigator>
      <!-- 收货地址 -->
      <view class="x-order-detail__wrapper__shipment__locate">
        <view class="x-order-detail__wrapper__shipment__locate--user">张无忌 13824686868</view>
        <view class="x-order-detail__wrapper__shipment__locate--address">北京市顺义区后沙峪地区安平北街6号院</view>
      </view>
    </view>

    <!-- 商品信息 -->
    <view class="x-order-detail__wrapper__goods">
      <view class="x-order-detail__wrapper__goods__item">
        <navigator
          v-for="item in order.skus"
          :key="item.id"
          :url="`/pages/goods/index?id=${item.spuId}`"
          hover-class="none"
        >
          <image class="x-order-detail__wrapper__goods__item--cover" :src="item.image"></image>
          <view class="x-order-detail__wrapper__goods__item__meta">
            <view class="x-order-detail__wrapper__goods__item__meta--name ellipsis">{{ item.name }}</view>
            <view class="x-order-detail__wrapper__goods__item__meta--type">{{ item.attrsText }}</view>
            <view class="x-order-detail__wrapper__goods__item__meta--price">
              <view class="original">
                <text class="symbol">¥</text>
                <text>{{ item.curPrice }}</text>
              </view>
              <view class="actual">
                <text class="text">实付:</text>
                <text class="symbol">¥</text>
                <text>{{ item.realPay }}</text>
              </view>
            </view>
            <view class="x-order-detail__wrapper__goods__item__meta--quantity">x{{ item.quantity }}</view>
          </view>
        </navigator>
        <view v-if="order.orderState === OrderState.YiWanCheng" class="x-order-detail__wrapper__goods__item--action">
          <view class="button primary">申请售后</view>
          <navigator url="/pages/comments/publish/index" class="button">去评价</navigator>
        </view>
      </view>
      <!-- 合计 -->
      <view class="x-order-detail__wrapper__goods__total">
        <view class="x-order-detail__wrapper__goods__total--row">
          <view class="text">商品总价:</view>
          <view class="symbol">{{ order.totalMoney }}</view>
        </view>
        <view class="x-order-detail__wrapper__goods__total--row">
          <view class="text">运费:</view>
          <view class="symbol">{{ order.postFee }}</view>
        </view>
        <view class="x-order-detail__wrapper__goods__total--row paid">
          <view class="text">实付:</view>
          <view class="symbol primary">{{ order.payMoney }}</view>
        </view>
      </view>
    </view>

    <!-- 订单信息 -->
    <view class="x-order-detail__wrapper__detail">
      <view class="x-order-detail__wrapper__detail--title">订单信息</view>
      <view class="x-order-detail__wrapper__detail--row">
        <view>订单编号: {{ order.id }}</view>
        <view>下单时间: {{ order.createTime }}</view>
        <view v-if="order.payType === PayType.Online">支付方式: 在线支付</view>
        <view v-if="order.payChannel == PayChannel.WxPay">支付渠道: 微信支付</view>
      </view>
    </view>

    <XtxGuess ref="guessRef" />
  </scroll-view>
  <!-- order.orderState === OrderState.DaiFuKuan -->
  <view v-if="true" class="x-order-detail__toobar">
    <view class="x-order-detail__toobar--primary" @tap="handleOrderPay">去支付</view>
    <view class="x-order-detail__toobar--default">取消订单</view>
  </view>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import XtxHeaderBar from '@/components/XtxHeaderBar.vue';
import XtxGuess, { GuessExpose } from '@/components/XtxGuess.vue';
import useCurrentInstance from '@/hooks/useCurrentInstance';
import { onLoad, onReady } from '@dcloudio/uni-app';
import { getMemberOrderById } from '@/services/order';
import { getPayMock, getPayWxPayMiniPay } from '@/services/pay';
import { OrderState, OrderStateOptions, GetMemberOrderByIdResult, PayType, PayChannel } from '@/types/order';
import { unix } from 'dayjs';

const { globalProperties, proxy } = useCurrentInstance();

const props = defineProps<{
  id: string;
}>();

// 标题动画
onReady(() => {
  proxy?.$scope.animate('x-order-detail--header', [
    { opacity: 0 },
    { opacity: 1 },
    500,
    {
      scrollSource: '#scrollView',
      timeRange: 600,
      startScrollOffset: 0,
      endScrollOffset: 120
    }
  ]);
});

const guessRef = ref<GuessExpose>();
const order = ref({} as GetMemberOrderByIdResult);

onLoad(async () => {
  if (props.id) {
    order.value = await getMemberOrderById(props.id);
    // 如果当前订单状态为待付款，则开启倒计时
    if (order.value.orderState === OrderState.DaiFuKuan) {
      let timerId = setInterval(() => {
        // 计算剩余时间
        order.value.countdown--;
        // 如果剩余时间小于0，则订单状态为已取消
        if (order.value.countdown < 0) {
          clearInterval(timerId);
          order.value.orderState = OrderState.YiQuXiao;
        }
      }, 1000);
    }
  }
});

// 去支付
const handleOrderPay = async () => {
  try {
    // 正式接口：根据订单号获取微信支付所需参数
    // const payInfo = await getPayWxPayMiniPay(order.value.id);
    // 调用微信支付API
    // await uni.requestPayment({
    //   provider: 'wxpay', // 微信支付
    //   orderInfo: payInfo // 微信支付参数
    // });
    // 模拟接口：模拟支付接口-更新订单支付状态为已支付
    await getPayMock(order.value.id);
    // 成功提示
    uni.showToast({ icon: 'success', title: '支付成功' });
    // 支付成功，跳转到支付成功页
    setTimeout(() => {
      uni.navigateTo({ url: '/pages/order/payment' });
    }, 1000);
  } catch (error) {
    // 失败提示
    uni.showToast({ icon: 'error', title: '支付失败' });
    // 支付失败，跳转到订单列表页
    setTimeout(() => {
      uni.navigateTo({ url: '/pages/order/index' });
    }, 1000);
  }
};

// 滚动到底部触发
const handleScrollToLower = () => {
  guessRef.value?.getMore();
};
</script>

<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.x-order-detail__wrapper {
  &__overview {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1;
    padding-bottom: 30rpx;
    color: $gray-1;
    background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
    background-size: cover;
    &--status {
      font-size: 36rpx;
      &::before {
        margin-right: 6rpx;
        font-weight: 500;
      }
    }
    &__tips {
      margin-top: 30rpx;
      font-size: 24rpx;
      &--countdown {
        margin-left: 10rpx;
      }
    }
    &--button {
      width: 260rpx;
      height: 64rpx;
      text-align: center;
      line-height: 64rpx;
      margin-top: 30rpx;
      font-size: 28rpx;
      color: $green-4-1;
      border-radius: 68rpx;
      background-color: #fff;
    }
  }

  &__shipment {
    line-height: 1.4;
    padding: 0 20rpx;
    margin: 20rpx 20rpx 0;
    border-radius: 10rpx;
    background-color: $gray-1;

    &__logistics,
    &__locate {
      min-height: 120rpx;
      padding: 30rpx 30rpx 25rpx 75rpx;
      background-size: 50rpx;
      background-repeat: no-repeat;
      background-position: 0;
    }

    &__logistics {
      background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/car.png);
      border-bottom: 1rpx solid $uni-text-color-grey1;
      position: relative;
      &::after {
        position: absolute;
        right: 10rpx;
        top: 50%;
        transform: translateY(-50%);
        content: '\e6c2';
        font-family: 'erabbit' !important;
        font-size: 32rpx;
        color: $gray-2-6;
      }
      &--message {
        font-size: 26rpx;
        color: $gray-4-1;
      }
      &--date {
        font-size: 24rpx;
        color: $gray-2-6;
      }
    }

    &__locate {
      background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png);
      &--user {
        font-size: 26rpx;
        color: $gray-4-1;
      }
      &--address {
        font-size: 24rpx;
        color: $gray-2-6;
      }
    }
  }

  &__goods {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    &__item {
      padding: 30rpx 0;
      border-bottom: 1rpx solid $uni-text-color-grey1;
      navigator {
        display: flex;
      }
      &--cover {
        width: 170rpx;
        height: 170rpx;
        border-radius: 10rpx;
        margin-right: 20rpx;
      }
      &__meta {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        &--name {
          height: 80rpx;
          font-size: 26rpx;
          color: $gray-4-1;
        }
        &--type {
          line-height: 1.8;
          padding: 0 15rpx;
          margin-top: 6rpx;
          font-size: 24rpx;
          align-self: flex-start;
          border-radius: 4rpx;
          color: $gray-2-8-1;
          background-color: $gray-2-7-1;
        }
        &--price {
          display: flex;
          margin-top: 6rpx;
          font-size: 24rpx;
          .original {
            color: $uni-text-color-grey;
            text-decoration: line-through;
            .symbol {
              font-size: 20rpx;
            }
          }
          .actual {
            margin-left: 10rpx;
            color: $gray-4-1;
            .symbol {
              font-size: 20rpx;
            }
          }
        }
        &--quantity {
          position: absolute;
          bottom: 0;
          right: 0;
          font-size: 24rpx;
          color: $gray-4-1;
        }
      }

      &--action {
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-start;
        padding: 30rpx 0 0;
        .button {
          width: 200rpx;
          height: 60rpx;
          text-align: center;
          justify-content: center;
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

    &__total {
      line-height: 1;
      font-size: 26rpx;
      padding: 20rpx 0;
      color: $gray-2-6;
      &--row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10rpx 0;
        .text {
        }
        .symbol {
          &::before {
            content: '¥';
            font-size: 20rpx;
          }
        }
      }
    }
  }

  &__detail {
    line-height: 1;
    padding: 30rpx 20rpx 0;
    margin: 20rpx 20rpx 0;
    font-size: 26rpx;
    color: $gray-2-6;
    border-radius: 10rpx;
    &--title {
      font-size: 30rpx;
      color: $gray-4-1;
    }
    &--row {
      padding: 20rpx;
    }

    &--row > view {
      display: block;
      padding: 10rpx 0;
    }
  }
}

.x-order-detail__toobar {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  padding: 30rpx 20rpx;
  box-shadow: 0 -4rpx 6rpx rgba(240, 240, 240, 0.6);
  position: relative;
  z-index: 9;
  & > view {
    width: 200rpx;
    height: 72rpx;
    text-align: center;
    line-height: 72rpx;
    margin-left: 15rpx;
    font-size: 26rpx;
    border-radius: 72rpx;
  }
  &--default {
    color: $gray-4-1;
    border: 1rpx solid $gray-2-4-1;
  }

  &--primary {
    color: $gray-1;
    background-color: $green-4-1;
  }
}
</style>
