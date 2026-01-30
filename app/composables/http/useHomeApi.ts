import { useHttp } from './useHttp';
export const useHomeApi = () => {
  const http = useHttp();

  const getMsgListSSR = () => {
    return useAsyncData('getMsgListSSR', () => http('/index/Operate/getMsgList'));
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
