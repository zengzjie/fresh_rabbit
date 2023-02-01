<script setup lang="ts">
import { onLaunch, onShow, onHide, onLoad } from '@dcloudio/uni-app';
onLoad((options) => {
  // console.log('App Load');
});
onLaunch(() => {
  // console.log('App Launch');
  // #ifdef APP-PLUS
  // 锁定竖屏
  // plus.screen.lockOrientation('portrait-primary');
  // #endif
});
onShow(() => {
  // console.log('App Show');
});
onHide(() => {
  // console.log('App Hide');
});
</script>
<style lang="scss">
@import './styles/fonts.scss';

view,
navigator,
input,
scroll-view {
  box-sizing: border-box;
}

button::after {
  border: none;
}

swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.popup-root {
  padding: 0 30rpx;
  border-radius: 10rpx 10rpx 0 0;
}

.popup-root view {
  height: auto;
  padding: 0;
}

.popup-root .title {
  line-height: 1;
  padding: 40rpx 0;
  text-align: center;
  font-size: 32rpx;
  font-weight: normal;
  border-bottom: 1rpx solid #ddd;
  color: #444;
}

.popup-root {
  position: relative;
}

.popup-root .close {
  position: absolute;
  right: 24rpx;
  top: 24rpx;
}

.popup-root .footer {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 0 40rpx;
  font-size: 28rpx;
  color: #444;
}

.popup-root .footer .button {
  flex: 1;
  height: 72rpx;
  text-align: center;
  line-height: 72rpx;
  margin: 0 20rpx;
  color: $uni-text-color-inverse;
  border-radius: 72rpx;
}

.popup-root .footer .primary {
  color: $uni-text-color-inverse;
  background-color: #27ba9b;
}

.popup-root .footer .secondary {
  background-color: #ffa868;
}

.x-flex {
  // 除了 APP-NVUE 平台之外使用这个样式
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
}
</style>
