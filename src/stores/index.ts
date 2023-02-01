import { createPinia } from 'pinia';
// pinia 持久化存储
import persist from 'pinia-plugin-persistedstate';

// 创建 pinia 实例
const pinia = createPinia();
// 为 pinia 添加持久化存储插件
pinia.use(persist);

export default pinia;

// 统一导出
export * from './modules/user';
