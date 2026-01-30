export const useHttp = () => {
  const config = useRuntimeConfig();

  return $fetch.create({
    baseURL: config.public.apiBase as string,
    timeout: 1000 * 60,

    async onRequest({ options }) {
      // const token = '123456';
      // if (token) {
      //   options['headers'] = {
      //     ...options.headers,
      //     token,
      //   };
      // }
      options.headers = { ...options.headers };
    },

    async onResponse({ response }) {
      console.log('🚀 ~ onResponse ~ response:', response);
      // 可以在这里处理全局逻辑，比如根据业务状态码抛错
      // if (response._data?.code !== 200 && response._data?.message) {
      // }
    },

    // 错误处理
    async onResponseError({ response }) {
      console.log('🚀 ~ onResponseError ~ response:', response);
      // const status = response.status;
      // if (status === 401) {
      // }
      // 抛出错误供 UI 层捕获
      throw new Error(response._data?.message || '网络请求错误');
    },
  });
};
