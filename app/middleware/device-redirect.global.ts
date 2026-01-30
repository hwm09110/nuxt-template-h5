/**
 * 设备重定向中间件
 * 根据用户代理判断设备类型，并将用户重定向到相应的移动端或PC端路由
 * 注意：此中间件仅在初次访问时生效，窗口大小变化由客户端插件处理
 */
export default defineNuxtRouteMiddleware((to) => {
  // 检查是否是由于窗口大小变化导致的导航
  // 如果是SSR环境或来自窗口大小变化的导航，可以跳过此中间件
  const nuxtApp = useNuxtApp();
  const isClient = typeof window !== 'undefined';

  // 在客户端，如果是因为窗口大小变化而触发的导航，可能需要特殊处理
  if (isClient) {
    // 添加标志以标识这是从窗口大小变化引起的导航
    if (!nuxtApp.$isWindowResizeNavigation) {
      nuxtApp.$isWindowResizeNavigation = false;
    }
  }

  const { $i18n } = useNuxtApp();
  const localePath = useLocalePath();
  const { isMobile } = useDevice();

  // @ts-ignore
  const currentLocale = $i18n.locale.value;
  const isAtMobile =
    to.path.startsWith(`/${currentLocale}/m/`) ||
    to.path.startsWith('/m/') ||
    to.path === '/m' ||
    to.path === `/${currentLocale}/m`;

  // 仅在服务端渲染或非窗口大小变化导航时执行设备检测
  if (import.meta.server || !nuxtApp.$isWindowResizeNavigation) {
    if (isMobile && !isAtMobile) {
      const baseName = to.name?.toString().split('___')[0] || 'index';
      const mobileRouteName = baseName === 'index' ? 'm' : `m-${baseName}`;
      const target = localePath({ name: mobileRouteName, params: to.params, query: to.query });

      if (target && target !== to.path) {
        return navigateTo(target);
      }
    }

    if (!isMobile && isAtMobile) {
      const baseName = to.name?.toString().split('___')[0] || '';
      const pcRouteName = baseName.replace(/^m-?/, '') || 'index';
      const target = localePath({ name: pcRouteName, params: to.params, query: to.query });

      if (target) return navigateTo(target);
    }
  }
});
