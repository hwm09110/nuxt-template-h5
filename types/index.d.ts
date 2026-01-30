declare module 'windicss/helpers';
declare module '.vue';

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const Component: DefineComponent<{}, {}, any>;
  export default Component;
}

declare module '@ant-design/icons-vue' {
  import type { DefineComponent } from 'vue';
  // 如果需要使用全部图标，可以使用更通用的声明：
  const Icons: { [key: string]: DefineComponent<{}, {}, any> };
  export default Icons;
}
