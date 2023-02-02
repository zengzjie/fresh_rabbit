import { MemberAddressItem } from '@/types/address';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAddressStore = defineStore(
  'address',
  () => {
    // 选择的地址
    const selectedAddress = ref<MemberAddressItem>({} as MemberAddressItem);

    // 改变选择的地址
    const changeSelectedAddress = (val: MemberAddressItem) => {
      selectedAddress.value = val;
    };

    // 清空选择的地址
    const clearSelectedAddress = () => {
      selectedAddress.value = {} as MemberAddressItem;
    };

    return {
      selectedAddress,
      changeSelectedAddress,
      clearSelectedAddress
    };
  },
  {
    // 兼容小程序中的本地存储
    persist: {
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value);
        },
        getItem(key) {
          return uni.getStorageSync(key);
        }
      }
    }
  }
);
