<template>
  <view class="viewport">
    <XtxHeaderBar
      title="个人信息"
      title-color="#fff"
      :bg-attribute="bgAttribute"
      :bg-height="globalProperties.$StatusBar + 392"
    >
      <template #back>
        <view class="icon-left" style="width: 32px; transform: translateY(3px)"></view>
      </template>
    </XtxHeaderBar>
    <view class="avatar" @tap="changeAvatar">
      <image :src="personalInfo.avatar" mode="aspectFill"></image>
      <text>点击修改头像</text>
    </view>
    <scroll-view scroll-y enhanced>
      <!-- 用户信息 -->
      <view class="form">
        <view class="form-item">
          <text class="label">账号</text>
          <!-- 账号不可编辑，用text展示 -->
          <text>{{ personalInfo.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input v-model="personalInfo.nickname" />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="genderChange">
            <label class="radio">
              <radio value="男" color="#27ba9b" :checked="personalInfo.gender === '男'" />
              男
            </label>
            <label class="radio">
              <radio value="女" color="#27ba9b" :checked="personalInfo.gender === '女'" />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">出生日期</text>
          <picker mode="date" start="1900-01-01" end="2022-01-01" @change="birthdayChange">
            <view>{{ personalInfo.birthday || '请选择日期' }}</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <picker mode="region" @change="fullLocationChange">
            <view>{{ personalInfo.fullLocation || '请选择城市' }}</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input v-model="personalInfo.profession" placeholder="请填写职业" />
        </view>
      </view>

      <!-- 提交按钮 -->
      <button class="button" @tap="submitForm">提交</button>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useMemberStore } from '@/stores';
import XtxHeaderBar from '@/components/XtxHeaderBar.vue';
import useCurrentInstance from '@/hooks/useCurrentInstance';
import { onLoad } from '@dcloudio/uni-app';
import { getMemberProfile, putMemberProfile } from '@/services/profile';
import { GetMemberProfileResult, Gender } from '@/types/profile';

const { globalProperties } = useCurrentInstance();

const { setProfileInfo, profile } = useMemberStore();

// 背景属性
const bgAttribute = ref(
  `url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png) no-repeat 0 / auto ${
    globalProperties.$StatusBar + 392
  }rpx`
);

const personalInfo = ref({} as GetMemberProfileResult);
// 获取用户信息
onLoad(async () => {
  personalInfo.value = await getMemberProfile();
  // 🐛 同步修改本地 Store 的头像昵称
  setProfileInfo({
    ...profile,
    avatar: personalInfo.value.avatar,
    nickname: personalInfo.value.nickname
  });
});

// 修改头像
const changeAvatar = () => {
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    sourceType: ['album'],
    success: function (res) {
      console.log(JSON.stringify(res), 'JSONres');
      const filePath = res.tempFiles[0].tempFilePath;
      uni.uploadFile({
        url: '/member/profile/avatar', // 接口地址
        name: 'file',
        filePath: filePath,
        success(uploadFileRes) {
          // 更新当前页面的头像
          personalInfo.value.avatar = filePath;
          // 同步修改本地 Store 的头像
          setProfileInfo({
            ...profile,
            avatar: filePath
          });
          // 提示用户
          uni.showToast({ icon: 'success', title: '头像更新成功~' });
        }
      });
    }
  });
};

// 性别改变
const genderChange = (e: any) => {
  personalInfo.value.gender = e.detail.value as Gender;
};

// 出生日期改变
const birthdayChange = (e: any) => {
  personalInfo.value.birthday = e.detail.value as string;
};

// 城市改变
let fullLocationCode: string[] = [];
const fullLocationChange = (e: any) => {
  console.log(e, 'eee');
  personalInfo.value.fullLocation = (e.detail.value as string[]).join('') as string;
  fullLocationCode = e.detail.code;
};

// 提交表单
const submitForm = async () => {
  // 获取后端修改所需字段
  const { birthday, gender, nickname, profession } = personalInfo.value;
  // 🔔 数组按下标解构 省 市 区 的编码
  const [provinceCode, cityCode, countyCode] = fullLocationCode;
  console.log(birthday, gender, nickname, profession, provinceCode, cityCode, countyCode, 'personalInfo');
  // 调用修改个人信息接口
  await putMemberProfile({
    birthday,
    gender,
    nickname,
    profession,
    provinceCode,
    cityCode,
    countyCode
  });
  // 提示用户
  uni.showToast({ icon: 'success', title: '保存成功' });
  // 🐛 同步更新 Store 的昵称和职业
  setProfileInfo({
    ...profile,
    nickname,
    profession
  });
  // 后退返回上一页（正常的流程：个人中心点击修改资料跳转到当前页，修改完成后退回去）
  uni.navigateBack();
};
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: $gray-2-4;
}
.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;

  .avatar {
    position: absolute;
    left: 52%;
    top: 19%;
    transform: translate(-52%, -50%);
    text-align: center;
    padding: 20rpx 0 40rpx;
    image {
      width: 160rpx;
      height: 160rpx;
      border-radius: 50%;
    }
    text {
      display: block;
      padding-top: 20rpx;
      font-size: 26rpx;
      line-height: 1;
      color: $gray-1;
    }
  }

  .form {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: $gray-1;
    &-item {
      display: flex;
      align-items: center;
      height: 96rpx;
      padding: 25rpx 10rpx;
      color: $uni-text-color;
      font-size: 32rpx;
      border-top: 1rpx solid #ddd;
      &:first-child {
        border-top: none;
      }

      input {
        display: block;
        height: 46rpx;
      }

      radio {
        transform: scale(0.7) translateY(-2px);
      }

      .label {
        display: inline-block;
        width: 180rpx;
        & + input,
        & + radio-group,
        & + picker {
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }

  .button {
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    margin: 30rpx 20rpx;
    border-radius: 80rpx;
    font-size: 30rpx;
    color: $gray-1;
    background-color: $green-4-1;
  }
}
</style>
