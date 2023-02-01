// 获取全局属性
import { ComponentInternalInstance, getCurrentInstance } from 'vue';
export default function useCurrentInstance() {
  const { appContext, proxy } = getCurrentInstance() as ComponentInternalInstance;
  const globalProperties = appContext.config.globalProperties;
  const _proxy = proxy as any;
  return {
    _proxy,
    globalProperties
  };
}
