import { LoginWxMinResult } from '@/types/login';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useMemberStore = defineStore(
  'user',
  () => {
    // 会员信息
    const profile = ref<LoginWxMinResult>({} as LoginWxMinResult);

    /**
     * @description: 设置会员信息
     * @param {LoginWxMinResult} 会员信息
     * @return {*}
     */
    const setProfileInfo = (val: LoginWxMinResult) => {
      profile.value = val;
    };

    /**
     * @description: 清空会员信息
     * @return {*}
     */
    const clearProfileInfo = () => {
      profile.value = {} as LoginWxMinResult;
    };

    // 是否登陆
    const isLogin = computed(() => Boolean(profile.value.token));

    return {
      profile,
      setProfileInfo,
      clearProfileInfo,
      isLogin
    };
  },
  {
    //persist: true // 这种写法在小程序中是不生效的，因为小程序的本地存储跟H5的api不同
    persist: {
      // storage: localStorage,
      // 🎯 改造成小程序的 api
      storage: {
        // 设置
        setItem(key, value) {
          uni.setStorageSync(key, value);
        },
        // 获取
        getItem(key) {
          return uni.getStorageSync(key);
        }
      }
    }
  }
);
