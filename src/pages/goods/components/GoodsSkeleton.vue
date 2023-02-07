<template name="skeleton">
  <view class="sk-container">
    <scroll-view
      enhanced="true"
      :scroll-with-animation="true"
      :scroll-y="true"
      class="goods"
      :enable-back-to-top="true"
    >
      <view style="height: 20px"></view>
      <view class="goods-info" style="scroll-snap-align: none">
        <view class="goods-info-preview">
          <swiper :circular="true" :current="0" :autoplay="false">
            <swiper-item
              style="position: absolute; width: 100%; height: 100%; transform: translate(0%, 0px) translateZ(0px)"
            >
              <image class="sk-image"></image>
            </swiper-item>
          </swiper>
          <view class="goods-info-preview--indicator">
            <text class="goods-info-preview--indicator__current sk-transparent sk-opacity">1</text>
            <text class="goods-info-preview--indicator__split sk-transparent sk-opacity">/</text>
            <text class="goods-info-preview--indicator__total sk-transparent sk-opacity">5</text>
          </view>
        </view>
        <view class="goods-info-meta">
          <view class="goods-info-meta--price">
            <text class="goods-info-meta--price__symbol sk-transparent sk-opacity">¥</text>
            <text class="goods-info-meta--price__number sk-transparent sk-text-14-2857-458 sk-text">166.00</text>
          </view>
          <view class="goods-info-meta--name ellipsis sk-transparent sk-text-14-2857-178 sk-text">
            极光限定 珠光蓝珐琅锅
          </view>
          <view class="goods-info-meta--remarks"></view>
        </view>
        <view class="goods-info-related">
          <view class="goods-info-related--item arrow sk-pseudo sk-pseudo-circle">
            <text class="goods-info-related--item__label sk-transparent sk-text-14-2857-753 sk-text">选择</text>
            <text class="goods-info-related--item__text ellipsis sk-transparent sk-text-14-2857-475 sk-text">
              请选择商品规格
            </text>
          </view>
          <view class="goods-info-related--item arrow sk-pseudo sk-pseudo-circle">
            <text class="goods-info-related--item__label sk-transparent sk-text-14-2857-449 sk-text">送至</text>
            <text class="goods-info-related--item__text ellipsis sk-transparent sk-text-14-2857-793 sk-text">
              广州市天河区xxx路
            </text>
          </view>
          <view class="goods-info-related--item arrow sk-pseudo sk-pseudo-circle">
            <text class="goods-info-related--item__label sk-transparent sk-text-14-2857-207 sk-text">服务</text>
            <text class="goods-info-related--item__text ellipsis sk-transparent sk-text-14-2857-893 sk-text">
              无忧退 快速退款 免费包邮
            </text>
          </view>
        </view>
      </view>
      <view class="goods-detail panel" style="scroll-snap-align: none">
        <view class="panel-title"></view>
      </view>
    </scroll-view>
    <view class="actionbar safe-area-inset-bottom">
      <view class="actionbar-icons">
        <button class="actionbar-icons-collect sk-transparent sk-button sk-pseudo sk-pseudo-circle">
          <text class="icon-heart sk-pseudo sk-pseudo-circle"></text>
          收藏
        </button>
        <button class="actionbar-icons-contact sk-transparent sk-button sk-pseudo sk-pseudo-circle" open-type="contact">
          <text class="icon-handset sk-pseudo sk-pseudo-circle"></text>
          客服
        </button>
        <button class="actionbar-icons-cart sk-transparent sk-button sk-pseudo sk-pseudo-circle">
          <text class="icon-cart sk-pseudo sk-pseudo-circle"></text>
          购物车
          <text class="actionbar-icons-cart__number sk-transparent sk-opacity" style="--tright: 10px">1</text>
        </button>
      </view>
      <view class="actionbar-buttons">
        <view
          class="actionbar-buttons-addcart sk-transparent sk-text-31-9444-887 sk-text"
          style="background-position-x: 50%"
        >
          加入购物车
        </view>
        <view
          class="actionbar-buttons-payment sk-transparent sk-text-31-9444-910 sk-text"
          style="background-position-x: 50%"
        >
          立即购买
        </view>
      </view>
    </view>
  </view>
</template>

<style>
.sk-transparent {
  color: transparent !important;
}
.sk-opacity {
  opacity: 0 !important;
}
.sk-text-14-2857-458 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 78.4rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-14-2857-178 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-753 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-475 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-449 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-793 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-207 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-893 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-31-9444-887 {
  background-image: linear-gradient(transparent 31.9444%, #eeeeee 0%, #eeeeee 68.0556%, transparent 0%) !important;
  background-size: 100% 72rpx;
  position: relative !important;
}
.sk-text-31-9444-910 {
  background-image: linear-gradient(transparent 31.9444%, #eeeeee 0%, #eeeeee 68.0556%, transparent 0%) !important;
  background-size: 100% 72rpx;
  position: relative !important;
}
.sk-button {
  color: #efefef !important;
  background: #efefef !important;
  border: none !important;
  box-shadow: none !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
