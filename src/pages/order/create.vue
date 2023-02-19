<template>
  <scroll-view scroll-y :show-scrollbar="false" class="x-order-create">
    <!-- 收货地址 -->
    <navigator
      v-if="selectedAddress.id"
      class="x-order-create__shipment"
      hover-class="none"
      url="/pages/my/address/index?from=order"
    >
      <view class="user">{{ selectedAddress.receiver }} {{ selectedAddress.contact }}</view>
      <view class="address">{{ selectedAddress.fullLocation }} {{ selectedAddress.address }}</view>
      <text class="icon icon-right"></text>
    </navigator>

    <!-- 没有收货地址 -->
    <navigator v-else class="x-order-create__shipment" hover-class="none" url="/pages/my/address/index?from=order">
      <view class="address">请选择收货地址</view>
      <text class="icon icon-right"></text>
    </navigator>

    <!-- 商品信息 -->
    <view class="x-order-create__goods">
      <navigator
        v-for="item in orderPre.goods"
        :key="item.skuId"
        :url="`/pages/goods/index?id=${item.id}`"
        class="x-order-create__goods__item"
        hover-class="none"
      >
        <image class="x-order-create__goods__item--cover" :src="item.picture"></image>
        <view class="x-order-create__goods__item--meta">
          <view class="name ellipsis">
            {{ item.name }}
          </view>
          <view class="type">{{ item.attrsText }}</view>
          <view class="price">
            <view class="actual">
              <text class="symbol">¥</text>
              {{ item.payPrice }}
            </view>
            <view class="original">
              <text class="symbol">¥</text>
              {{ item.price }}
            </view>
          </view>
          <view class="quantity">x{{ item.count }}</view>
        </view>
      </navigator>
    </view>

    <!-- 配送及支付方式 -->
    <view class="x-order-create__related">
      <view class="x-order-create__related--item" @tap="handlePayToggle">
        <text class="text">配送时间</text>
        <text class="picker icon-fonts">{{ payment.text }}</text>
      </view>
      <view class="x-order-create__related--item" @tap="handleShipmentToggle">
        <text class="text">支付方式</text>
        <text class="picker icon-fonts">{{ shipment.text }}</text>
      </view>
      <view class="x-order-create__related--item">
        <text class="text">买家备注</text>
        <input :cursor-spacing="30" placeholder="建议留言前先与商家沟通确认" />
      </view>
    </view>

    <!-- 支付金额 -->
    <view class="x-order-create__settlement">
      <view class="x-order-create__settlement--item">
        <text class="text">商品总价:</text>
        <text class="number">
          <text class="symbol">¥</text>
          {{ orderPre.summary?.totalPrice.toFixed(2) }}
        </text>
      </view>
      <view class="x-order-create__settlement--item">
        <text class="text">运费:</text>
        <text class="number">
          <text class="symbol">¥</text>
          {{ orderPre.summary?.postFee.toFixed(2) }}
        </text>
      </view>
      <!-- 如果有折扣，渲染折扣金额，没有折扣就不渲染了，免得用户伤心 -->
      <view v-if="orderPre.summary?.discountPrice > 0" class="x-order-create__settlement--item">
        <text class="text">折扣:</text>
        <text class="number danger">
          <text class="symbol">-¥</text>
          {{ orderPre.summary?.discountPrice }}
        </text>
      </view>
    </view>
  </scroll-view>

  <view class="x-order__toolbar">
    <view class="x-order__toolbar--amount">
      <text class="symbol">¥</text>
      <text class="number">
        {{ orderPre.summary?.totalPayPrice.toFixed(2) }}
      </text>
    </view>
    <view class="x-order__toolbar--button" :class="{ disabled: !selectedAddress.id }" @tap="submitForm">提交订单</view>
  </view>

  <uni-popup ref="shipmentRef" type="bottom" background-color="#fff" safe-area is-mask-click>
    <view class="popup-root">
      <view class="title">配送时间</view>
      <view class="list">
        <view v-for="item in shipments" :key="item.id" class="item">
          <view class="text">{{ item.text }}</view>
          <text class="icon" :class="[true ? 'icon-checked' : 'icon-ring']"></text>
        </view>
      </view>
      <view class="footer">
        <view class="button primary" @tap="handleShipmentConfirm">确认</view>
      </view>
    </view>
  </uni-popup>

  <uni-popup ref="paymentRef" type="bottom" background-color="#fff" safe-area is-mask-click>
    <view class="popup-root">
      <view class="title">支付方式</view>
      <view class="list">
        <view v-for="item in payments" :key="item.id" class="item">
          <view class="text">{{ item.text }}</view>
          <text class="icon" :class="true ? 'icon-checked' : 'icon-ring'"></text>
        </view>
      </view>
      <view class="footer">
        <view class="button primary" @tap="handlePayConfirm">确认</view>
      </view>
    </view>
  </uni-popup>
</template>

<script lang="ts" setup>
import { getMemberOrderPre, getMemberOrderPreNow, postMemberOrder } from '@/services/order';
import { useAddressStore } from '@/stores';
import { GetMemberOrderPreResult } from '@/types/order';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

const payments = [
  {
    id: 1,
    text: '时间不限 (周一至周日)'
  },
  {
    id: 2,
    text: '工作日送 (周一至周五)'
  },
  {
    id: 3,
    text: '周末配送 (周六至周日)'
  }
];

const shipments = [
  {
    id: 1,
    text: '在线支付'
  },
  {
    id: 2,
    text: '货到付款'
  }
];

const shipmentRef = ref();
const paymentRef = ref();

const shipment = ref(shipments[0]);
const payment = ref(payments[0]);

const props = defineProps<{
  skuId: string;
  count: number;
  addressId: string;
}>();

// 预付订单信息
const orderPre = ref({} as GetMemberOrderPreResult);

// 获取收货地址Store
const addressStore = useAddressStore();
const { selectedAddress } = storeToRefs(addressStore);

onLoad(async () => {
  if (props.skuId) {
    // 如果有页面参数，调用立即购买
    orderPre.value = await getMemberOrderPreNow(props);
  } else {
    // 没有页面参数，普通预付订单
    orderPre.value = await getMemberOrderPre();
  }
});

const handlePayToggle = () => {
  paymentRef.value.open('bottom');
};

const handleShipmentToggle = () => {
  shipmentRef.value.open('bottom');
};

const handleShipmentConfirm = () => {
  shipmentRef.value.close();
};

const handlePayConfirm = () => {
  paymentRef.value.close();
};

// 提交订单
const submitForm = async () => {
  // 从 Store 中获取选中的收货地址
  const addressId = selectedAddress.value.id;
  // 如果没有收货地址
  if (!addressId) {
    // 退出函数并弹窗提示
    return uni.showToast({ icon: 'none', title: '请选择收货地址~' });
  }
  // 调用创建订单的接口，获取订单id
  const { id } = await postMemberOrder({
    goods: orderPre.value.goods.map((v) => ({
      skuId: v.skuId,
      count: v.count
    })),
    addressId,
    deliveryTimeType: 1,
    payType: 1,
    payChannel: 2,
    buyerMessage: ''
  });
  // 跳转到订单详情页，并传递订单id
  uni.navigateTo({ url: `/pages/order/detail?id=${id}` });
};
</script>

<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.x-order-create {
  padding-top: 20rpx;
  &__shipment {
    padding: 30rpx 30rpx 25rpx 84rpx;
    margin: 0 20rpx;
    font-size: 26rpx;
    border-radius: 10rpx;
    background: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png) 20rpx center / 50rpx
      no-repeat;
    position: relative;
    .user {
      margin-bottom: 5rpx;
      color: $uni-text-color;
    }

    .addresee {
      color: $gray-2-6;
    }

    .icon {
      font-size: 36rpx;
      color: $uni-text-color;
      transform: translateY(-50%);
      position: absolute;
      top: 50%;
      right: 20rpx;
    }
  }

  &__goods {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    &__item {
      display: flex;
      padding: 30rpx 0;
      border-top: 1rpx solid $uni-text-color-grey1;
      &:first-child {
        border-top: none;
      }
      &--cover {
        width: 170rpx;
        height: 170rpx;
        border-radius: 10rpx;
        margin-right: 20rpx;
      }

      &--meta {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        .name {
          margin-bottom: 10rpx;
          font-size: 26rpx;
          color: $gray-4-1;
        }

        .type {
          line-height: 1.8;
          padding: 0 15rpx;
          margin-top: 6rpx;
          font-size: 24rpx;
          align-self: flex-start;
          border-radius: 4rpx;
          color: $gray-2-8-1;
          background-color: $gray-2-7-1;
        }

        .price {
          display: flex;
          align-items: baseline;
          margin-top: 6rpx;
          font-size: 28rpx;
          .actual {
            margin-right: 10rpx;
            color: $red-7;
            .symbol {
              font-size: 20rpx;
            }
          }

          .original {
            font-size: 24rpx;
            color: $uni-text-color-grey;
            text-decoration: line-through;
            .symbol {
              font-size: 20rpx;
            }
          }
        }

        .quantity {
          position: absolute;
          bottom: 0;
          right: 0;
          font-size: 26rpx;
          color: $gray-4-1;
        }
      }
    }
  }

  &__related {
    padding: 0 20rpx;
    margin: 20rpx 20rpx 0;
    border-radius: 10rpx;
    &--item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 80rpx;
      font-size: 26rpx;
      color: $uni-text-color;
      .text {
        width: 125rpx;
      }

      .picker {
        color: $gray-2-6;
        &::after {
          content: '\e6c2';
        }
      }

      input {
        flex: 1;
        text-align: right;
        margin: 20rpx 0;
        padding-right: 20rpx;
        font-size: 26rpx;
        color: $uni-text-color-grey;
      }
    }
  }

  &__settlement {
    padding: 0 20rpx;
    margin: 20rpx 20rpx 0;
    border-radius: 10rpx;
    &--item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80rpx;
      font-size: 26rpx;
      color: $uni-text-color;

      .danger {
        color: $red-7;
      }

      .number {
        .symbol {
          font-size: 80%;
        }
      }
    }
  }
}

.x-order__toolbar {
  height: 120rpx;
  padding: 0 40rpx;
  border-top: 1rpx solid $gray-2-3-2;
  background-color: $gray-1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &--amount {
    font-size: 40rpx;
    color: $red-7;
    .symbol {
      font-size: 75%;
    }

    .number {
      font-size: 75%;
    }
  }

  &--button {
    width: 220rpx;
    text-align: center;
    line-height: 72rpx;
    font-size: 26rpx;
    color: $gray-1;
    border-radius: 72rpx;
    background-color: $green-4-1;
  }

  .disabled {
    opacity: 0.6;
  }
}

.popup-root {
  .list {
    padding: 20rpx 0 40rpx 10rpx !important;
    .item {
      padding: 30rpx 60rpx 30rpx 10rpx;
      position: relative;
      .text {
        font-size: 28rpx;
        color: $gray-4-1;
      }
      .icon {
        color: $uni-text-color-grey;
        font-size: 40rpx;
        transform: translateY(-50%);
        position: absolute;
        top: 50%;
        right: 10rpx;
      }
      .icon-checked {
        color: $green-4-1;
      }
    }
  }
}
</style>
