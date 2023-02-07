// 获取全局属性
import { AppContext, ComponentInternalInstance, ComponentPublicInstance, getCurrentInstance } from 'vue';
export default function useCurrentInstance() {
  const instance = getCurrentInstance() as ComponentInternalInstance;
  const appContext: AppContext = instance.appContext;
  const proxy: (ComponentPublicInstance & Record<string, any>) | null = instance.proxy;
  const globalProperties = appContext.config.globalProperties;
  return {
    instance,
    proxy,
    globalProperties
  };
}
