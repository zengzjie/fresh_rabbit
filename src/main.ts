import { createSSRApp } from 'vue';
import App from './App.vue';
import pinia from './stores';
import _ from 'lodash';
import xUtils from './utils';

export function createApp() {
  const app = createSSRApp(App);
  // 挂载 lodash 到全局
  app.config.globalProperties.$_ = _;
  uni.getSystemInfo({
    success: function (e: any) {
      // 挂载到全局中，通过 const { proxy, ctx } = getcurrentInstance(); 获取，建议使用 proxy 去获取挂载的属性，ctx 打包后内容可能拿不到
      // #ifndef MP
      app.config.globalProperties.$StatusBar = e.statusBarHeight;
      if (e.platform == 'android') {
        app.config.globalProperties.$CustomBar = e.statusBarHeight + 50;
      } else {
        app.config.globalProperties.$CustomBar = e.statusBarHeight + 45;
      }
      // #endif

      // #ifdef MP-WEIXIN
      app.config.globalProperties.$StatusBar = e.statusBarHeight;
      const custom = uni.getMenuButtonBoundingClientRect();
      app.config.globalProperties.$Custom = custom;
      app.config.globalProperties.$CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      // #endif

      //窗口高度
      app.config.globalProperties.$windowHeight = e.windowHeight;
      //获取导航高度
      app.config.globalProperties.$navHeight = e.statusBarHeight * (750 / e.windowWidth) + 91;
      // 在竖屏正方向下的安全区域插入位置
      app.config.globalProperties.$safeAreaInsets = e.safeAreaInsets;
      app.config.globalProperties.$SystemInfo = e;
    }
  });
  app.use(pinia);
  app.use(xUtils);

  return {
    app
  };
}
