import { useHttp } from './useHttp';
export const useTestApi = () => {
  const http = useHttp();

  const getMsgListSSR = () => {
    return useAsyncData(() => http('/index/Operate/getMsgList'));
  };

  const getMsgList = (query: any) => {
    return http('/index/Operate/getMsgList', {
      method: 'get',
      query,
    });
  };

  const postMsg = (body: any) => {
    return http('/index/Operate/getMsgList', {
      method: 'post',
      body,
    });
  };

  return {
    getMsgListSSR,
    getMsgList,
    postMsg,
  };
};
