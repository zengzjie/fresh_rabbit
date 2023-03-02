<template>
  <scroll-view class="viewport" scroll-y enhanced :show-scrollbar="false" @scrolltolower="onScrollTolower">
    <template v-if="isLogin">
      <!-- 优惠提示 -->
      <view class="tips">
        <text class="label">满减</text>
        <text class="desc">满1件，即可享受9折优惠</text>
      </view>
      <view v-if="carts.length === 0" class="blank">购物车还是空的，快来挑选好货吧！</view>
      <!-- 购物车商品 -->
      <view v-else class="carts">
        <uni-swipe-action>
          <uni-swipe-action-item v-for="item in carts" :key="item.skuId" class="swipe-cell">
            <navigator hover-class="none" :url="'/pages/goods/index?id=' + item.id" class="card">
              <!-- 选择框 -->
              <text
                :class="['checkbox', `icon-${item.selected ? 'checked' : 'ring'}}`]"
                @tap.stop="changeSelected(item.skuId)"
              ></text>
              <!-- 商品图片 -->
              <image :src="item.picture" mode="aspectFit" class="image"></image>
              <!-- 商品信息 -->
              <view class="meta">
                <view class="name ellipsis">{{ item.name }}</view>
                <!-- 商品类型 -->
                <view class="type ellipsis">{{ item.attrsText }}</view>
                <view class="footer">
                  <!-- 商品价格 -->
                  <view class="price">¥{{ item.price }}</view>
                  <!-- 商品数量 需要阻止冒泡 防止跳转到商品信息页 -->
                  <view class="quatity" @tap.stop="() => {}">
                    <text class="text" @tap="changeCount(item.skuId, -1)">-</text>
                    <input
                      v-model="item.count"
                      class="input"
                      type="number"
                      @change="(e) => handleCountChange(e, item.skuId)"
                    />
                    <text class="text" @tap="changeCount(item.skuId, 1)">+</text>
                  </view>
                </view>
              </view>
            </navigator>
            <template #right>
              <view class="swipe-cell-action">
                <button class="collect-button">移入收藏</button>
                <button class="delete-button" @tap="deleteCart([item.skuId])">删除</button>
              </view>
            </template>
          </uni-swipe-action-item>
        </uni-swipe-action>
      </view>
    </template>
    <template v-else>
      <view class="blank">
        <text>登陆后可查看购物车中的商品</text>
        <navigator hover-class="none" url="/pages/login/index">
          <button class="button">去登陆</button>
        </navigator>
      </view>
    </template>

    <XtxGuess ref="guessRef" />
  </scroll-view>

  <!-- 吸底工具栏 -->
  <view v-if="isLogin && carts.length !== 0" class="toolbar">
    <view :class="['all', isAllSelected ? 'checked' : '']" @tap="changeSelectedAll">全选</view>
    <view class="total">
      <text class="text">合计：</text>
      <text class="amount">{{ selectedCartsAmount }}</text>
    </view>
    <view class="buttons">
      <view :class="['button', 'payment', selectedCartsCount === 0 ? 'disabled' : '']" @tap="goToOrderCreate">
        去结算（{{ selectedCartsCount }}）
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useMemberStore } from '@/stores';
import { storeToRefs } from 'pinia';
import XtxGuess, { GuessExpose } from '@/components/XtxGuess.vue';
import { ref, computed } from 'vue';
import { getMemberCart, putMemberCartById, putMemberCartSelected, deleteMemberCart } from '@/services/cart';
import { MemberCartItem } from '@/types/cart';
import { onShow } from '@dcloudio/uni-app';

// 购物车商品列表
const carts = ref<MemberCartItem[]>([]);
const memberStore = useMemberStore();
// 解构保持响应式
const { isLogin, profile } = storeToRefs(memberStore);

const guessRef = ref<GuessExpose>();

const loadMemberCart = async () => {
  carts.value = await getMemberCart();
};

/* 这里需要用onShow, 因为onLoad只会触发一次, 当没有登录的时候切到购物车页面然后去登陆后在回来就不会触发了 */
onShow(() => {
  if (isLogin.value) {
    // 如果已经登录，直接获取购物车数据
    loadMemberCart();
  }
});

// 是否全选
const isAllSelected = computed(() => {
  if (carts.value.length === 0) {
    return false;
  }
  return carts.value.every((item) => item.selected);
});

// 计算以选中的商品数量
const selectedCarts = computed(() => carts.value.filter((item) => item.selected));

// 计算以选中的商品数量总数
const selectedCartsCount = computed(() => selectedCarts.value.reduce((sum, item) => sum + Number(item.count), 0));

// 计算选中商品的总价
const selectedCartsAmount = computed(() =>
  selectedCarts.value.reduce((sum, item) => sum + Number(item.count) * Number(item.price), 0)
);

// 滚动加载猜你喜欢数据
const onScrollTolower = () => {
  guessRef.value?.getMore();
};

// 选择商品
const changeSelected = (skuId: string) => {
  const item = carts.value.find((item) => item.skuId === skuId);
  if (item) {
    item.selected = !item.selected;
    // 发送请求让后端更选中状态
    putMemberCartById(skuId, { selected: item.selected });
  }
};

// 全选
const changeSelectedAll = () => {
  // 先记录下当前的全选状态
  const selected = !isAllSelected.value;
  // 批量更新商品的选中状态
  carts.value.forEach((item) => {
    item.selected = selected;
  });
  // 发送请求让后端更新选中状态
  putMemberCartSelected({ selected: selected });
};

// 改变商品数量
const changeCount = (skuId: string, num: number) => {
  // 根据 skuId 查找出待修改的商品
  const item = carts.value.find((v) => v.skuId === skuId);
  if (item) {
    // 先保存一个临时的数据，用于边界判断
    const temp = Number(item.count) + num;
    if (Number(temp) < 1) {
      uni.showToast({
        title: '商品数量不能小于1',
        icon: 'none'
      });
      return;
    }
    if (Number(temp) > item.stock) {
      uni.showToast({
        title: `商品数量不能大于${item.stock}`,
        icon: 'none'
      });
      return;
    }
    item.count = temp.toString();
    // 发送请求让后端更新商品数量
    putMemberCartById(skuId, { count: Number(item.count) });
  }
};

// 手动输入数量
const handleCountChange = (e: any, skuId: string) => {
  // 根据 skuId 查找出待修改的商品
  const item = carts.value.find((v) => v.skuId === skuId);
  if (e.target.value === '' || e.target.value === '0') {
    if (item) {
      uni.showToast({
        title: '商品数量不能小于1',
        icon: 'none'
      });
      item.count = '1';
      // 发送请求让后端更新商品数量
      putMemberCartById(skuId, { count: Number(item.count) });
    }
    return;
  }
  if (Number(e.target.value) > (item?.stock as number)) {
    uni.showToast({
      title: `商品数量不能大于${item?.stock}`,
      icon: 'none'
    });
    if (item) {
      item.count = item.stock.toString();
      // 发送请求让后端更新商品数量
      putMemberCartById(skuId, { count: Number(item.count) });
    }
    return;
  }
  putMemberCartById(skuId, { count: Number(e.target.value) });
};

// 删除购物车
const deleteCart = (ids: string[]) => {
  uni.showModal({
    title: '提示',
    content: '是否要删除商品',
    success: async function (res) {
      if (res.confirm) {
        await deleteMemberCart({ ids: ids });
        // 删除成功后重新获取购物车列表
        loadMemberCart();
        uni.showToast({
          title: '删除成功',
          icon: 'none'
        });
      }
    }
  });
};

// 去结算
const goToOrderCreate = () => {
  if (selectedCartsCount.value === 0) {
    uni.showToast({
      title: '请选择商品',
      icon: 'none'
    });
    return;
  }
  // 跳转到订单创建页（填写订单）
  uni.navigateTo({ url: '/pages/order/create' });
};
</script>

<style lang="scss">
:host {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.viewport {
  min-height: 400rpx;
  .tips {
    height: 80rpx;
    padding: 30rpx;
    display: flex;
    align-items: center;
    .label {
      padding: 7rpx 15rpx 5rpx;
      border-radius: 5rpx;
      text-align: center;
      font-size: 24rpx;
      color: $gray-1;
      background-color: $green-4-1;
    }
    .desc {
      margin-left: 20rpx;
      font-size: 26rpx;
      color: $gray-2-6;
    }
  }
  .blank {
    padding: 100rpx 0 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26rpx;
    flex-direction: column;
    .button {
      width: 240rpx;
      height: 60rpx;
      line-height: 60rpx;
      margin-top: 25rpx;
      border-radius: 60rpx;
      font-size: 26rpx;
      color: $gray-1;
      background-color: $green-4-1;
    }
  }

  .carts {
    padding: 0 20rpx;
    .swipe-cell {
      display: block;
      margin-top: 20rpx;
      &:first-child {
        margin-top: 0;
      }
      .card {
        display: flex;
        padding: 20rpx 20rpx 20rpx 80rpx;
        border-radius: 10rpx;
        background-color: $gray-1;
        position: relative;
        .checkbox {
          position: absolute;
          top: 0;
          left: 0;
          width: 80rpx;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 40rpx;
          color: $gray-2-4-1;
        }

        .icon-checked {
          color: $green-4-1;
        }

        .image {
          width: 170rpx;
          height: 170rpx;
        }

        .meta {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          flex: 1;
          margin-left: 20rpx;
          .name {
            font-size: 26rpx;
            color: $gray-4-1;
          }
          .type {
            padding: 0 15rpx;
            margin: 20rpx 0;
            align-self: flex-start;
            font-size: 24rpx;
            border-radius: 4rpx;
            color: $gray-2-8-1;
            background-color: $uni-bg-color-grey7-1;
          }
          .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .price {
              font-size: 26rpx;
            }
            .quatity {
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 220rpx;
              height: 48rpx;
              .text {
                height: 100%;
                padding: 0 20rpx;
                font-size: 32rpx;
                color: $gray-4-1;
              }
              .input {
                height: 100%;
                text-align: center;
                border-radius: 4rpx;
                font-size: 24rpx;
                color: $gray-4-1;
                background-color: $uni-bg-color-grey6;
              }
            }
          }
        }
      }
      &-action {
        display: flex;
        height: 100%;
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 15rpx;
          line-height: 1.5;
          border-radius: 0;
          font-size: 26rpx;
          color: $gray-1;
        }
        .collect-button {
          background-color: $blue-5;
        }

        .delete-button {
          width: 100rpx;
          background-color: $red-7;
        }
      }
    }
  }
}

.toolbar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 32rpx 20rpx 28rpx;
  border-top: 1rpx solid #ededed;
  border-bottom: 1rpx solid #ededed;
  background-color: $gray-1;
  .all {
    margin-left: 25rpx;
    font-size: 14px;
    color: $gray-4-1;
    &::before {
      font-family: 'erabbit' !important;
      content: '\e6cd';
      font-size: 36rpx;
      margin-right: 8rpx;
      vertical-align: -4rpx;
      color: $gray-2-4-1;
    }
  }

  .checked::before {
    content: '\e6cc';
    color: $green-4-1;
  }

  .total {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 32rpx;
    .text {
      color: $gray-4-1;
      font-size: 14px;
    }
    .amount {
      color: $red-7;
      font-size: 20px;
      transform: translateY(-1px);
      &::before {
        content: '￥';
        font-size: 12px;
      }
    }
  }

  .buttons {
    position: absolute;
    right: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 72rpx;
    .button {
      width: 240rpx;
      text-align: center;
      border-radius: 72rpx;
      font-size: 26rpx;
      color: $gray-1;
    }

    .payment {
      background-color: $green-4-1;
    }

    .disabled {
      opacity: 0.6;
    }
  }
}
</style>
