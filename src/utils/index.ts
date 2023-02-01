import addUnit from './function/addUnit';

// 工具类方法
const $u = {
  addUnit
};

const install = (Vue: any) => {
  // 挂载到全局 globalProperties
  Vue.config.globalProperties.$u = $u;
};

export default {
  install
};
