<template>
  <view class="viewport">
    <view class="logo">
      <image src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/logo_icon.png"></image>
    </view>
    <view class="login">
      <!-- <button class="button phone" open-type="getPhoneNumber" @getphonenumber="onGetphonenumber">
        <text class="icon icon-phone"></text>
        手机号快捷登录
      </button> -->
      <button style="margin-top: 20rpx" class="button phone" @tap="onGetphonenumberSimple">
        <text class="icon icon-phone"></text>
        手机号快捷登录-内测版
      </button>
      <view class="extra">
        <view class="caption">
          <text>其它登录方式</text>
        </view>
        <view class="options">
          <button>
            <text class="icon icon-weixin">微信</text>
          </button>
          <!-- <button open-type="getPhoneNumber">
            <text class="icon icon-phone">手机</text>
          </button> -->
          <button @tap="nextVersion">
            <text class="icon icon-mail">邮箱</text>
          </button>
        </view>
      </view>
      <view class="tips">登录/注册即视为你同意《服务条款》和《小兔鲜儿隐私协议》</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { postLoginWxMin, postLoginWxMinSimple } from '@/services/login';
import { useMemberStore } from '@/stores';
import { LoginWxMinResult } from '@/types/login';
import { onLoad } from '@dcloudio/uni-app';

// 提示消息
const nextVersion = () => {
  uni.showToast({ title: '等下一个版本哦', icon: 'none' });
};

const memberStore = useMemberStore();

// 页面加载时，获取微信登录凭证
let code = '';
onLoad(() => {
  // 获取微信登录凭证
  uni.login({
    success(res) {
      code = res.code;
    }
  });
});

// 获取用户手机号
const onGetphonenumber = async (ev: any) => {
  try {
    // 获取 encryptedData, iv 参数
    const { encryptedData, iv } = ev.detail;
    console.log(encryptedData, iv, 'encryptedData, iv');
    // 调用发送微信登录请求
    const profile = await postLoginWxMin({
      code, // 必填参数：需通过 wx.login() 获取的 code
      encryptedData,
      iv
    });
    // 授权登录成功后续逻辑
    loginSuccess(profile);
  } catch {
    // 登录或注册失败
    uni.showToast({ title: '登录失败!', icon: 'none' });
  }
};

// 小程序登录_内测版
const onGetphonenumberSimple = async () => {
  try {
    // 调用模拟的登录接口
    const profile = await postLoginWxMinSimple('13535353535');
    // 模拟:授权登录成功后续逻辑
    loginSuccess(profile);
  } catch (error) {
    // 登录或注册失败
    uni.showToast({ title: '登录失败!', icon: 'none' });
  }
};

const loginSuccess = async (profile: LoginWxMinResult) => {
  // 保存用户信息到 Store 中
  memberStore.setProfileInfo(profile);
  // 登录成功提示
  uni.showToast({ icon: 'success', title: '登录成功' });
  setTimeout(() => {
    // 后退回到上一页
    uni.navigateBack({});
  }, 500);
};
</script>

<style lang="scss">
page {
  height: 100%;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx 40rpx;
}

.logo {
  flex: 1;
  text-align: center;
}

.logo image {
  width: 220rpx;
  height: 220rpx;
  margin-top: 100rpx;
}

.login {
  display: flex;
  flex-direction: column;
  height: 600rpx;
  padding: 40rpx 20rpx 20rpx;
}

.login .button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80rpx;
  font-size: 28rpx;
  border-radius: 72rpx;
  color: $gray-1;
}

.login .button .icon {
  font-size: 40rpx;
  margin-right: 6rpx;
}

.login .phone {
  background-color: $green-4;
}

.login .wechat {
  background-color: $green-3;
}

.login .extra {
  flex: 1;
  padding: 70rpx 70rpx 0;
}

.login .extra .caption {
  width: 440rpx;
  line-height: 1;
  border-top: 1rpx solid #ddd;
  font-size: 26rpx;
  color: $uni-text-color-grey;
  position: relative;
}

.login .caption text {
  transform: translate(-40%);
  background-color: $gray-1;
  position: absolute;
  top: -12rpx;
  left: 50%;
}

.login .extra .options {
  display: flex;
  justify-content: center;
  margin-top: 70rpx;
}

.login .options button {
  line-height: 1; // 与当前字体大小一致
  padding: 0;
  margin: 0 40rpx;
  background-color: transparent;
}

.login .extra .icon {
  text-align: center;
  font-size: 28rpx;
  color: $gray-4-1;
}

.login .extra .icon::before {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 6rpx;
  font-size: 40rpx;
  border: 1rpx solid $gray-4-1;
  border-radius: 50%;
}

.login .extra .icon-weixin::before {
  border-color: $green-3;
  color: $green-3;
}

.login .tips {
  position: absolute;
  bottom: 80rpx;
  left: 20rpx;
  right: 20rpx;
  font-size: 22rpx;
  color: $uni-text-color-grey;
  text-align: center;
}
</style>
