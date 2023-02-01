import { useMemberStore } from '@/stores';

// 首选服务器
const baseUrl = 'https://pcapi-xiaotuxian-front-devtest.itheima.net';

// 备选服务器
const backupUrl = 'https://pcapi-xiaotuxian-front.itheima.net';

// https://uniapp.dcloud.net.cn/api/interceptor.html#
// 抽离拦截器配置 request 和 uploadFile 复用
const httpInterceptor = {
  // 拦截前触发
  invoke(args: UniApp.RequestOptions) {
    // 如果不是 http 开头的，我们才需要进行 URL 拼接
    if (args.url.startsWith('http') === false) {
      // request 触发前拼接 url
      args.url = baseUrl + args.url;
    }
    // 小程序端调用，请求头中header中必须添加：source-client：miniapp
    args.header = {
      ...args.header,
      'source-client': 'miniapp' // 添加小程序端调用标识
    };
    // 在非vue文件中，哪里使用 store 就哪里调用
    const memberStore = useMemberStore();
    // 获取token
    const token = memberStore.profile.token;
    // 如果有token，就添加到请求头中
    if (token) {
      args.header.Authorization = token;
    }
  }
};

// 需要添加刚刚写拦截器，拦截 request
uni.addInterceptor('request', httpInterceptor);
// 拦截 uploadFile
uni.addInterceptor('uploadFile', httpInterceptor);

interface ApiREsponse {
  // 业务状态码
  code: string;
  // 响应数据
  result: any;
  // 响应信息
  msg: string;
  // 错误信息
  message?: string;
}

/**
 * @description: 封装通过的请求 http 方法
 * @param {string} options 请求参数
 * @return {*}
 */

export function http<T>(options: UniApp.RequestOptions) {
  // 返回 Promise 对象
  // Promise 的泛型用于确认 resolve 的类型
  return new Promise<T>((resolve, reject) => {
    uni.request({
      // 应用所有的参数
      ...options,
      // success 成功回调
      // 🚨 uni.request 和 axios 的请求成功回调参数不一样：
      // 1. 小程序中 uni.request 收到服务端响应后就代表成功，不管状态码是多少
      // 2. 网页端 axios 收到服务端响应后，只有状态码是 2xx 才代表成功，其他状态码都是失败
      success: (res) => {
        // 业务状态码
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve((res.data as ApiREsponse).result);
        } else if (res.statusCode === 401) {
          // 未登录
          uni.navigateTo({
            url: '/pages/login/index'
          });
          // 标记为失败
          reject(res);
        } else {
          console.log(' ❌失败', res);
          // 通知错误提示
          uni.showToast({
            icon: 'none',
            title: (res.data as ApiREsponse).message || '请求失败'
          });
          // 🎯 标记为失败：reject 可让 await 后面的代码不执行，更符合编程逻辑
          reject(res);
        }
      },
      // 失败（网络）
      fail: (err) => {
        reject(err);
      }
    });
  });
}

// 基于 axios 的封装，使用 adapter 适配小程序
// const http = axios.create({
//   baseURL,
//   withCredentials: true,
//   timeout: 5000
// });

// http.defaults.addpter = function (config: any) {
//   // 返回 Promise
//   return new Promise(( resolve, reject ) => {});
// };

// export { http };
