<template>
  <view class="viewport">
    <scroll-view v-if="!loading && addressList.length > 0" scroll-y enhanced>
      <view class="address">
        <uni-swipe-action>
          <uni-swipe-action-item v-for="item in addressList" :key="item.id" class="swipe-cell">
            <view class="item" @tap="changeAddress(item)">
              <view class="user">
                {{ item.receiver }}
                <text>{{ item.contact }}</text>
                <text v-if="item.isDefault === 1" class="badge">默认</text>
              </view>
              <view class="locate">{{ item.fullLocation }}{{ item.address }}</view>
              <!-- 🐛 添加阻止冒泡 -->
              <navigator :url="`./form?id=${item.id}`" class="edit" hover-class="none" @tap.stop="() => {}">
                修改
              </navigator>
            </view>
            <template #right>
              <view class="swipe-cell--action">
                <button class="swipe-cell--action__delete" @tap="deleteAddressBtn(item.id)">删除</button>
              </view>
            </template>
          </uni-swipe-action-item>
        </uni-swipe-action>
      </view>
    </scroll-view>
    <view v-if="!loading && addressList.length === 0" class="empty">
      <uni-icons type="location" size="60" color="rgb(192, 196, 204)"></uni-icons>
      <text class="blank">收获地址为空</text>
    </view>
    <view v-if="!loading" class="footer" :class="{ 'safe-area-inset-bottom': true }">
      <button class="button" @tap="handleAddress">新建地址</button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { MemberAddressItem } from '@/types/address';
import { getMemberAddress, deleteMemberAddressById } from '@/services/address';
import { useAddressStore } from '@/stores';
import { onShow } from '@dcloudio/uni-app';

const props = defineProps({
  from: {
    type: String,
    default: ''
  }
});

const { changeSelectedAddress } = useAddressStore();

// 页面加载
const loading = ref(true);

// 地址列表
const addressList = ref<MemberAddressItem[]>([]);
// 🎯 onShow 页面显示的时候触发的生命周期钩子（可触发多次）
// 🐛 onLoad 页面加载的时候触发一次，新增或修改地址成功后，后退回来列表页不会触发第二次列表请求
onShow(async () => {
  uni.showLoading({ title: '加载中' });
  const res = await getMemberAddress();
  uni.hideLoading();
  loading.value = false;
  addressList.value = res;
});

// 选择收获地址
const changeAddress = (item: MemberAddressItem) => {
  // 只有从订单页面跳转过来选择地址后需要回退
  if (props.from === 'order') {
    // 更新 Stores 里的收获地址
    changeSelectedAddress(item);
    uni.navigateBack();
  }
};

// 删除
const deleteAddressBtn = async (id: string) => {
  // 调用删除接口
  await deleteMemberAddressById(id);
  // 删除成功提示
  uni.showToast({ title: '删除成功', icon: 'none' });
  // 重新获取收获列表
  addressList.value = await getMemberAddress();
};

const handleAddress = () => {
  uni.navigateTo({
    url: './form'
  });
};
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: $gray-1;

  .address {
    padding: 0 20rpx;
    margin: 0 20rpx;
    border-radius: 10rpx;
    .item {
      line-height: 1;
      padding: 40rpx 10rpx 38rpx;
      border-bottom: 1rpx solid #ddd;
      position: relative;
      .user {
        font-size: 28rpx;
        margin-bottom: 20rpx;
        color: $uni-text-color;
        text {
          color: $gray-2-6;
        }
        .badge {
          display: inline-block;
          padding: 4rpx 10rpx 2rpx 14rpx;
          margin: 2rpx 0 0 10rpx;
          font-size: 26rpx;
          color: $green-4-1;
          border-radius: 6rpx;
          border: 1rpx solid $green-4-1;
        }
      }

      .locate {
        line-height: 1.6;
        font-size: 26rpx;
        color: $uni-text-color;
      }

      .edit {
        position: absolute;
        top: 36rpx;
        right: 30rpx;
        padding: 2rpx 0 2rpx 20rpx;
        border-left: 1rpx solid $gray-2-6;
        font-size: 26rpx;
        color: $gray-2-6;
        line-height: 1;
      }
    }
    .swipe-cell:last-child .item {
      border: none;
    }
    .swipe-cell--action {
      height: 100%;
      &__delete {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 100%;
        font-size: 28rpx;
        color: $gray-1;
        border-radius: 0;
        padding: 0;
        background-color: $red-7 !important;
      }
    }
  }

  .empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding-bottom: 80rpx;
    .blank {
      color: rgb(192, 196, 204);
      font-size: 13px;
      margin-top: 5px;
    }
  }

  .footer {
    position: relative;
    bottom: 0;
    left: 5%;
    width: 90%;
    .button {
      height: 80rpx;
      text-align: center;
      line-height: 80rpx;
      margin: 30rpx 0;
      color: $gray-1;
      border-radius: 80rpx;
      font-size: 30rpx;
      background-color: $green-4-1;
    }
  }

  .safe-area-inset-bottom {
    padding-bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
