<template>
  <!-- 骨架屏是通过微信开发者工具的性能面板中的骨架屏功能生成的，然后通过vue3.x的<template v-if="false">来控制显示隐藏 -->
  <view class="sk-container">
    <view class="viewport" refresher-background="#f7f7f8">
      <!-- vue3.x写法 -->
      <!-- is="vue:components/XtxCarousel" 直接复用渲染 XtxCarousel 的组件, 类名一致的话样式也可复用 -->
      <view is="vue:components/XtxCarousel" style="height: 280rpx">
        <view class="carousel XtxCarousel--carousel">
          <swiper></swiper>
          <view class="indicator XtxCarousel--indicator">
            <text class="dot XtxCarousel--dot"></text>
            <text class="dot XtxCarousel--dot"></text>
            <text class="dot XtxCarousel--dot"></text>
            <text class="dot XtxCarousel--dot active XtxCarousel--active"></text>
            <text class="dot XtxCarousel--dot"></text>
          </view>
        </view>
      </view>
      <view is="vue:pages/index/components/CategoryEntries">
        <view class="category-entries CategoryEntries--category-entries">
          <scroll-view class="scroll-view CategoryEntries--scroll-view">
            <view class="navs CategoryEntries--navs" style="scroll-snap-align: none">
              <view class="navs-item CategoryEntries--navs-item">
                <navigator class="navigator CategoryEntries--navigator" hover-class="none">
                  <image class="icon CategoryEntries--icon sk-image"></image>
                  <text
                    class="text CategoryEntries--text sk-transparent sk-text-14-2857-160 sk-text"
                    style="background-position-x: 50%"
                  >
                    居家
                  </text>
                </navigator>
                <navigator class="navigator CategoryEntries--navigator" hover-class="none">
                  <image class="icon CategoryEntries--icon sk-image"></image>
                  <text
                    class="text CategoryEntries--text sk-transparent sk-text-14-2857-491 sk-text"
                    style="background-position-x: 50%"
                  >
                    美食
                  </text>
                </navigator>
                <navigator class="navigator CategoryEntries--navigator" hover-class="none">
                  <image class="icon CategoryEntries--icon sk-image"></image>
                  <text
                    class="text CategoryEntries--text sk-transparent sk-text-14-2857-157 sk-text"
                    style="background-position-x: 50%"
                  >
                    服饰
                  </text>
                </navigator>
                <navigator class="navigator CategoryEntries--navigator" hover-class="none">
                  <image class="icon CategoryEntries--icon sk-image"></image>
                  <text
                    class="text CategoryEntries--text sk-transparent sk-text-14-2857-104 sk-text"
                    style="background-position-x: 50%"
                  >
                    母婴
                  </text>
                </navigator>
                <navigator class="navigator CategoryEntries--navigator" hover-class="none">
                  <image class="icon CategoryEntries--icon sk-image"></image>
                  <text
                    class="text CategoryEntries--text sk-transparent sk-text-14-2857-826 sk-text"
                    style="background-position-x: 50%"
                  >
                    个护
                  </text>
                </navigator>
                <navigator class="navigator CategoryEntries--navigator" hover-class="none">
                  <image class="icon CategoryEntries--icon sk-image"></image>
                  <text
                    class="text CategoryEntries--text sk-transparent sk-text-14-2857-742 sk-text"
                    style="background-position-x: 50%"
                  >
                    严选
                  </text>
                </navigator>
                <navigator class="navigator CategoryEntries--navigator" hover-class="none">
                  <image class="icon CategoryEntries--icon sk-image"></image>
                  <text
                    class="text CategoryEntries--text sk-transparent sk-text-14-2857-979 sk-text"
                    style="background-position-x: 50%"
                  >
                    数码
                  </text>
                </navigator>
                <navigator class="navigator CategoryEntries--navigator" hover-class="none">
                  <image class="icon CategoryEntries--icon sk-image"></image>
                  <text
                    class="text CategoryEntries--text sk-transparent sk-text-14-2857-288 sk-text"
                    style="background-position-x: 50%"
                  >
                    运动
                  </text>
                </navigator>
                <navigator class="navigator CategoryEntries--navigator" hover-class="none">
                  <image class="icon CategoryEntries--icon sk-image"></image>
                  <text
                    class="text CategoryEntries--text sk-transparent sk-text-14-2857-472 sk-text"
                    style="background-position-x: 50%"
                  >
                    杂项
                  </text>
                </navigator>
                <navigator class="navigator CategoryEntries--navigator" hover-class="none">
                  <image class="icon CategoryEntries--icon sk-image"></image>
                  <text
                    class="text CategoryEntries--text sk-transparent sk-text-14-2857-98 sk-text"
                    style="background-position-x: 50%"
                  >
                    品牌
                  </text>
                </navigator>
              </view>
            </view>
          </scroll-view>
          <view class="scroll-bar CategoryEntries--scroll-bar sk-scroll-bar">
            <view class="cursor CategoryEntries--cursor" style="left: 0%"></view>
          </view>
        </view>
      </view>
      <view is="vue:pages/index/components/HotPanel">
        <view class="panel HotPanel--panel hot HotPanel--hot">
          <view class="item HotPanel--item">
            <view class="title HotPanel--title">
              <text class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-444 sk-text">特惠推荐</text>
              <text class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-916 sk-text">精选全攻略</text>
            </view>
            <navigator class="cards HotPanel--cards" hover-class="none">
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
            </navigator>
          </view>
          <view class="item HotPanel--item">
            <view class="title HotPanel--title">
              <text class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-938 sk-text">爆款推荐</text>
              <text class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-770 sk-text">最受欢迎</text>
            </view>
            <navigator class="cards HotPanel--cards" hover-class="none">
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
            </navigator>
          </view>
          <view class="item HotPanel--item">
            <view class="title HotPanel--title">
              <text class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-751 sk-text">一站买全</text>
              <text class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-513 sk-text">精心优选</text>
            </view>
            <navigator class="cards HotPanel--cards" hover-class="none">
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
            </navigator>
          </view>
          <view class="item HotPanel--item">
            <view class="title HotPanel--title">
              <text class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-750 sk-text">领劵中心</text>
              <text class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-671 sk-text">超值优惠券</text>
            </view>
            <navigator class="cards HotPanel--cards" hover-class="none">
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
            </navigator>
          </view>
        </view>
      </view>
      <view is="vue:pages/index/components/FreshPanel">
        <view class="panel FreshPanel--panel fresh FreshPanel--fresh">
          <view class="title FreshPanel--title sk-transparent sk-text">
            新鲜好物
            <navigator
              class="more FreshPanel--more sk-transparent sk-text"
              style="position: absolute"
              hover-class="none"
            >
              更多
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style scoped>
.sk-transparent {
  color: transparent !important;
}

.sk-scroll-bar {
  width: 100rpx !important;
}

.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}

.sk-text-3-5714-717 {
  background-image: linear-gradient(transparent 3.5714%, #eeeeee 0%, #eeeeee 96.4286%, transparent 0%) !important;
  background-size: 100% 28rpx;
  position: relative !important;
}
.sk-text-14-2857-252 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 39.2rpx;
  position: relative !important;
}
.sk-text-14-2857-160 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-491 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-157 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-104 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-826 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-742 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-979 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-288 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-472 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-98 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-444 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-916 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-938 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-770 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-751 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-513 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-750 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-671 {
  background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
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
/* .sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
} */
</style>
