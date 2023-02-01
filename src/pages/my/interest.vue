<template>
  <view class="viewport">
    <scroll-view scroll-y>
      <view class="caption">选择兴趣爱好</view>
      <view class="tips">建议多选几个您感兴趣的分类</view>
      <view class="interest">
        <view class="title">您感兴趣的分类是</view>
        <view class="item">
          <image
            class="cover"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/interest_1.jpg"
          />
          <switch type="checkbox" />
        </view>
        <view class="item">
          <image
            class="cover"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/interest_2.jpg"
          />
          <switch type="checkbox" />
        </view>
        <view class="item">
          <image
            class="cover"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/interest_3.jpg"
          />
          <switch type="checkbox" />
        </view>
        <view class="item">
          <image
            class="cover"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/interest_4.jpg"
          />
          <switch type="checkbox" />
        </view>
        <view class="item">
          <image
            class="cover"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/interest_5.jpg"
          />
          <switch type="checkbox" />
        </view>
        <view class="item">
          <image
            class="cover"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/interest_6.jpg"
          />
          <switch type="checkbox" />
        </view>
        <view class="item">
          <image
            class="cover"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/interest_2.jpg"
          />
          <switch type="checkbox" />
        </view>
        <view class="item">
          <image
            class="cover"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/interest_3.jpg"
          />
          <switch type="checkbox" />
        </view>
        <view class="item">
          <image
            class="cover"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/interest_4.jpg"
          />
          <switch type="checkbox" />
        </view>
      </view>
    </scroll-view>
    <view class="button">保存</view>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx;
  background-color: $gray-2-4;
  scroll-view {
    border-radius: 10rpx;
    background-color: $gray-1;
  }
  .caption {
    padding: 30rpx 20rpx 10rpx;
    font-size: 32rpx;
    color: $uni-text-color;
  }

  .tips {
    margin: 0 20rpx;
    font-size: 26rpx;
    color: $gray-2-6;
  }

  .interest {
    padding: 70rpx 55rpx 0;
    overflow: hidden;
    .title {
      text-align: center;
      font-size: 30rpx;
      color: $uni-text-color;
    }
    .item {
      text-align: center;
      margin: 50rpx 20rpx 0;
      float: left;
      .cover {
        width: 160rpx;
        height: 160rpx;
        display: block;
        border-radius: 10rpx;
      }
      switch {
        margin-top: 10rpx;
        transform: scale(0.7);
      }
    }
  }

  .button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: $green-4-1;
  }
}
</style>
