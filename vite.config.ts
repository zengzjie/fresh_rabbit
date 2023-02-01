import { defineConfig, loadEnv, UserConfig } from 'vite';
import * as path from 'path';
import uni from '@dcloudio/vite-plugin-uni';
// import VueSetupExtend from 'vite-plugin-vue-setup-extend'; // 自定义组件名称

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_USER_NODE_ENV } = env;
  // console.log(command, mode, env, VITE_USER_NODE_ENV, 'env');

  const config: UserConfig = {
    plugins: [uni()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: { charset: false, additionalData: `@import "@/styles/variables.scss";` }
      }
    },
    // 依赖预构建
    optimizeDeps: {
      entries: ['@dcloudio/uni-ui']
    }
  };

  if (command === 'serve') {
    // 开发
    return config;
  } else {
    // 生产
    return config;
  }
});
