<template>
  <view v-if="false">骨架</view>
  <template v-else>
    <scroll-view scroll-y enhanced :bounces="false" :show-scrollbar="false" scroll-with-animation class="goods">
      <view :style="{ height: globalProperties.$safeAreaInsets?.top + 'px' }"></view>
      <!-- 商品信息 -->
      <view class="goods-info anchor" data-anchor-index="0">
        <view class="goods-info-preview">
          <swiper circular @change="handleSwiperChange">
            <swiper-item v-for="(url, index) in goods.mainPictures" :key="index">
              <image :src="url" @tap="previewImage(url)" />
            </swiper-item>
          </swiper>
          <view class="goods-info-preview--indicator">
            <text class="goods-info-preview--indicator__current">{{ current + 1 }}</text>
            <text class="goods-info-preview--indicator__split">/</text>
            <text class="goods-info-preview--indicator__total">{{ goods.mainPictures?.length }}</text>
          </view>
        </view>

        <view class="goods-info-meta">
          <view class="goods-info-meta--price">
            <text class="goods-info-meta--price__symbol">¥</text>
            <text class="goods-info-meta--price__number">{{ goods.price }}</text>
          </view>
          <view class="goods-info-meta--name ellipsis">
            {{ goods.name }}
          </view>
          <view class="goods-info-meta--remarks">{{ goods.desc }}</view>
        </view>
        <view class="goods-info-related">
          <view class="goods-info-related--item arrow" @tap="openSkuPopup(SkuMode.Both)">
            <text class="goods-info-related--item__label">选择</text>
            <text class="goods-info-related--item__text ellipsis">
              {{ selectArrText || '请选择商品规格' }}
            </text>
          </view>
          <view class="goods-info-related--item arrow" @tap="showHalfDialog('shipment')">
            <text class="goods-info-related--item__label">送至</text>
            <text class="goods-info-related--item__text ellipsis">广州市天河区xxx路</text>
          </view>
          <view class="goods-info-related--item arrow" @tap="showHalfDialog('clause')">
            <text class="goods-info-related--item__label">服务</text>
            <text class="goods-info-related--item__text ellipsis">无忧退 快速退款 免费包邮</text>
          </view>
        </view>
      </view>
      <!-- 商品详情 -->
      <view class="goods-detail panel anchor" data-anchor-index="2">
        <view class="panel-title">
          <text class="panel-title__text">商品详情</text>
        </view>
        <view class="goods-detail--content">
          <view class="goods-detail--content__properties">
            <!-- 商品详情属性 -->
            <view
              v-for="item in goods.details?.properties"
              :key="item.name"
              class="goods-detail--content__properties__item"
            >
              <text class="goods-detail--content__properties__item__label">{{ item.name }}</text>
              <text class="goods-detail--content__properties__item__value">{{ item.value }}</text>
            </view>
          </view>

          <!-- 商品详情图片 -->
          <image v-for="(item, index) in goods.details?.pictures" :key="index" mode="widthFix" :src="item"></image>
        </view>
      </view>
      <!-- 常见问题 -->
      <view class="goods-help arrow" @tap="showHalfDialog('helps')">
        <text class="icon-help"></text>
        <navigator hover-class="none">常见问题</navigator>
      </view>
      <!-- 推荐 -->
      <view class="goods-recommend panel anchor" data-anchor-index="3">
        <view class="panel-title">
          <text class="panel-title__text">商品推荐</text>
        </view>
        <view class="goods-recommend--content">
          <navigator
            v-for="item in goodsRelevants"
            :key="item.id"
            :url="`/pages/goods/index?id=${item.id}`"
            hover-class="none"
          >
            <image class="goods-recommend--content__image" mode="aspectFit" :src="item.picture"></image>
            <view class="goods-recommend--content__name ellipsis">
              {{ item.name }}
            </view>
            <view class="goods-recommend--content__price">
              <text class="goods-recommend--content__price__symbol">¥</text>
              <text class="goods-recommend--content__price__number">{{ item.price }}</text>
            </view>
          </navigator>
        </view>
      </view>
    </scroll-view>

    <!-- 底部操作栏 -->
    <view class="actionbar safe-area-inset-bottom">
      <view class="actionbar-icons">
        <button class="actionbar-icons-collect">
          <text class="icon-heart"></text>
          收藏
        </button>
        <button class="actionbar-icons-contact" open-type="contact">
          <text class="icon-handset"></text>
          客服
        </button>
        <button class="actionbar-icons-cart" @tap="goToCart">
          <text class="icon-cart"></text>
          购物车
          <text class="actionbar-icons-cart__number" :style="{ '--tright': cartRight }">
            {{ totalCartNum }}
          </text>
        </button>
      </view>
      <view class="actionbar-buttons">
        <view class="actionbar-buttons-addcart" @tap="openSkuPopup(SkuMode.Cart)">加入购物车</view>
        <view class="actionbar-buttons-payment" @tap="openSkuPopup(SkuMode.Buy)">立即购买</view>
      </view>
    </view>

    <!-- popup弹窗 -->
    <uni-popup ref="popup" type="bottom" background-color="#fff" safe-area is-mask-click>
      <view class="popup-root">
        <text class="close icon-close" @tap="hideHalfDialog"></text>
        <ShipmentPanel v-if="layer === 'shipment'" />
        <ClausePanel v-if="layer === 'clause'" />
        <HelpsPanel v-if="layer === 'helps'" />
      </view>
    </uni-popup>

    <!-- SKU 弹窗组件 -->
    <VkDataGoodsSkuPopup
      ref="skuRef"
      v-model="isShowSku"
      :mode="skuMode"
      :localdata="goodsSku"
      add-cart-background-color="#FFA868"
      buy-now-background-color="#28BA9A"
      price-color="#cf4444"
      :actived-style="{
        color: 'rgba(39, 186, 155)',
        borderColor: 'rgba(39, 186, 155)',
        backgroundColor: 'rgba(39, 186, 155, 0.1)'
      }"
      @add-cart="handleAddCart"
      @buy-now="handleBuyNow"
    />

    <!-- 用于获取购物车数量文本宽度 -->
    <canvas type="2d" canvas-id="myCanvas" style="display: none"></canvas>
  </template>
</template>

<script lang="ts" setup>
import { GoodsSku } from '@/components/vk-data-goods-sku-popup/types';
import { SkuMode, Layer } from './types';
import { getGoodsById, getGoodsRelevant } from '@/services/goods';
import { GoodsRelevantItem, GoodsResult } from '@/types/goods';
import VkDataGoodsSkuPopup from '@/components/vk-data-goods-sku-popup/vk-data-goods-sku-popup.vue';
import HelpsPanel from '@/pages/goods/components/HelpsPanel.vue';
import ShipmentPanel from '@/pages/goods/components/ShipmentPanel.vue';
import ClausePanel from '@/pages/goods/components/ClausePanel.vue';
import { onLoad, onReady } from '@dcloudio/uni-app';
import { reactive, ref, computed } from 'vue';
import useCurrentInstance from '@/hooks/useCurrentInstance';
import { getMemberCart } from '@/services/cart';

const props = defineProps<{
  id: string;
}>();

const { instance, globalProperties } = useCurrentInstance();

const totalCartNum = ref('99+');
const canvasTextWidth = ref(0);
// 这里是为了获取当前用户的购物车数量，用于显示在购物车图标上
onReady(async () => {
  // 获取购物车数量长度
  const carts = await getMemberCart();
  if (carts.length > 99) {
    totalCartNum.value = '99+';
  } else {
    totalCartNum.value = String(carts.length);
  }
  const context = uni.createCanvasContext('myCanvas', instance);
  canvasTextWidth.value = context.measureText(totalCartNum.value).width;
});

const cartRight = computed(() => {
  // 0-9  cartRight 范围4 <= x <= 6
  // 10-99+ cartRight x = 0;
  let width = 0;
  if (4 <= canvasTextWidth.value && canvasTextWidth.value <= 6) {
    width = 20;
  } else {
    width = 0;
  }
  return `${width}rpx`;
});

// 存储 sku 组件实例
const skuRef = ref();
// 用于 SKU 展示的规格文本
const selectArrText = computed(() => skuRef.value?.selectArr.join(' ').trim());

// 是否显示 SKU 组件
const isShowSku = ref(false);

// SKU 组件按钮模式
const skuMode = ref(SkuMode.Both);
// SKU 组件数据源
const goodsSku = ref({} as GoodsSku);

let goods = reactive({} as GoodsResult);
let goodsRelevants = reactive<GoodsRelevantItem[]>([]);

onLoad(async () => {
  if (props.id) {
    // 根据商品id获取商品详情
    goods = await getGoodsById(props.id);
    // 根据商品id获取相关推荐商品列表
    goodsRelevants = await getGoodsRelevant({ id: props.id, limit: 6 });
    // 🎯🎯🎯 基于后端返回的数据，处理成 SKU 组件所需的数据格式
    goodsSku.value = {
      _id: goods.id,
      name: goods.name,
      goods_thumb: goods.mainPictures[0],
      sku_list: goods.skus.map((item) => {
        return {
          _id: item.id,
          goods_id: goods.id,
          goods_name: goods.name,
          image: goods.mainPictures[0],
          price: item.price * 100,
          sku_name_arr: item.specs.map((v) => v.valueName),
          stock: item.inventory
        };
      }),
      spec_list: goods.specs.map((item) => {
        return {
          name: item.name,
          list: item.values.map((v) => ({ name: v.name }))
        };
      })
    };
  }
});

// 当前 Swiper 的下标
const current = ref(0);
// 🔔 轮播图切换时会触发 change 事件，常用于自定义轮播图指示器
const handleSwiperChange: UniHelper.SwiperOnChange = (e) => {
  // 保存当前轮播图下标
  current.value = e.detail?.current as number;
};

// 点击大图预览
const previewImage = (url: string) => {
  uni.previewImage({
    current: url,
    urls: goods.mainPictures
  });
};

// 弹窗
const popup = ref<{
  open(): void;
  close(): void;
}>();

const layer = ref<Layer>('helps');

// 点击规格
const openSkuPopup = (mode: number) => {
  console.log(mode, 'modemode');
};

// 显示弹层
const showHalfDialog = (str: Layer) => {
  layer.value = str;
  popup.value?.open();
};

// 关闭弹层
const hideHalfDialog = () => {
  popup.value?.close();
};

// 前往购物车
const goToCart = () => {
  uni.navigateTo({
    url: '/pages/cart/default'
  });
};

// 点击添加购物车
const handleAddCart = () => {};

// 点击立即购买
const handleBuyNow = () => {};
</script>

<style lang="scss">
page {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.goods {
  &-info {
    background-color: #fff;
    &-preview {
      height: 750rpx;
      position: relative;
      &--indicator {
        position: absolute;
        bottom: 30rpx;
        right: 30rpx;
        height: 40rpx;
        line-height: 40rpx;
        border-radius: 30rpx;
        padding: 0 24rpx;
        color: $gray-1;
        background-color: rgba(0, 0, 0, 0.3);
        &__current {
          font-size: 26rpx;
        }
        &__split {
          font-size: 24rpx;
          margin: 0 1rpx 0 2rpx;
        }
        &__total {
          font-size: 24rpx;
        }
      }
    }

    &-meta {
      position: relative;
      border-bottom: 1rpx solid $gray-2-3-2;
      &--price {
        height: 130rpx;
        padding: 25rpx 30rpx 0;
        color: $gray-1;
        font-size: 34rpx;
        box-sizing: border-box;
        background-color: $green-3-1;
        &__number {
          font-size: 56rpx;
        }
      }
      &--name {
        max-height: 88rpx;
        line-height: 1.4;
        margin: 20rpx;
        font-size: 32rpx;
        color: $uni-text-color;
      }
      &--remarks {
        line-height: 1;
        padding: 0 20rpx 30rpx;
        font-size: 24rpx;
        color: $red-7;
      }
    }

    &-related {
      padding-left: 12rpx;
      &--item {
        height: 90rpx;
        padding-right: 60rpx;
        border-bottom: 1rpx solid $gray-2-3-2;
        font-size: 26rpx;
        color: $uni-text-color;
        position: relative;
        display: flex;
        align-items: center;
        &__label {
          width: 60rpx;
          color: $gray-2-8-3;
          margin: 0 16rpx 0 10rpx;
        }
        &__text {
          flex: 1;
          -webkit-line-clamp: 1; // 一行省略
        }
      }

      .arrow::after {
        position: absolute;
        top: 50%;
        right: 30rpx;

        content: '\e6c2';
        color: $gray-2-4-1;
        font-family: 'erabbit' !important;
        font-size: 32rpx;
        transform: translateY(-50%);
      }
    }
  }

  &-detail {
    padding-left: 20rpx;
    &--content {
      margin-left: -20rpx;
      &__properties {
        padding: 0 20rpx;
        margin-bottom: 30rpx;
        &__item {
          display: flex;
          flex: 0 0 auto;
          padding: 10rpx;
          line-height: 2;
          font-size: 26rpx;
          color: $uni-text-color;
          border-bottom: 1rpx dashed $gray-2-4-1;
          &__label {
            width: 200rpx;
          }
          &__value {
            flex: 1;
            flex-wrap: wrap;
            word-break: break-all;
          }
        }
      }
    }
  }

  &-help {
    display: flex;
    align-items: center;
    padding: 20rpx 0 20rpx 20rpx;
    margin-top: 20rpx;
    font-size: 28rpx;
    color: $uni-text-color;
    background-color: $gray-1;
    position: relative;
    .icon-help {
      font-size: 34rpx;
      margin-right: 6rpx;
      color: $orange-4-1;
    }
  }

  &-recommend {
    padding-left: 20rpx;
    &--content {
      padding: 0 20rpx 20rpx;
      margin-left: -20rpx;
      background-color: $gray-2-4;
      navigator {
        display: inline-block;
        width: 345rpx;
        padding: 24rpx 20rpx 20rpx;
        margin: 20rpx 20rpx 0 0;
        border-radius: 10rpx;
        background-color: $gray-1;
      }
      navigator:nth-child(even) {
        margin-right: 0;
      }
      &__image {
        height: 260rpx;
      }
      &__name {
        height: 80rpx;
        margin: 10rpx 0;
        font-size: 26rpx;
        color: $gray-10-1;
      }
      &__price {
        line-height: 1;
        font-size: 20rpx;
        color: $red-7;
        &__number {
          font-size: 26rpx;
          margin-left: 2rpx;
        }
      }
    }
  }

  .panel {
    margin-top: 20rpx;
    background-color: $gray-1;
    &-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 90rpx;
      line-height: 1; // 与字体大小一致
      padding: 30rpx 60rpx 30rpx 6rpx;
      position: relative;
      &__text {
        padding-left: 10rpx;
        font-size: 28rpx;
        color: $uni-text-color;
        font-weight: 600;
        border-left: 4rpx solid $green-4-1;
      }
    }

    navigator {
      font-size: 24rpx;
      color: $gray-2-6;
    }
  }
}

.actionbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100rpx;
  padding: 0 20rpx;
  border-top: 1rpx solid #ddd;
  background-color: $gray-1;
  &-icons {
    display: flex;
    align-items: center;
    flex: 1;
    padding-right: 10rpx;
    button {
      margin: 0;
      padding: 0;
      border-radius: 0;
      line-height: 1.3;
      font-size: 24rpx;
      color: $uni-text-color;
      background-color: $gray-1;
    }
    &-collect {
      margin-right: 40rpx !important;
      text {
        display: block;
        font-size: 34rpx;
      }
    }
    &-contact {
      margin-right: 25rpx !important;
      text {
        display: block;
        font-size: 34rpx;
      }
    }
    &-cart {
      width: 100rpx;
      position: relative;
      &__number {
        position: absolute;
        right: var(--tright);
        top: 0;
        z-index: 9;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 1px 3px;
        border-radius: 41px;
        line-height: 9px;
        font-size: 9px !important;
        color: $gray-1;
        background-color: $red-7;
      }
      text {
        display: block;
        font-size: 34rpx;
      }
    }
  }
  &-buttons {
    display: flex;
    &-addcart {
      background-color: $orange-4-1;
      border-top-left-radius: 72rpx;
      border-bottom-left-radius: 72rpx;
    }
    &-payment {
      background-color: $green-4-1;
      border-top-right-radius: 72rpx;
      border-bottom-right-radius: 72rpx;
    }
  }

  &-buttons > view {
    width: 220rpx;
    text-align: center;
    line-height: 72rpx;
    font-size: 26rpx;
    color: $gray-1;
  }
}

.safe-area-inset-bottom {
  padding-bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
