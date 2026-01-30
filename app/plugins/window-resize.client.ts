/**
 * 窗口大小变化监听插件
 * 当用户调整浏览器窗口大小时，根据屏幕宽度自动跳转到相应的移动端或PC端路由
 */
export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window === 'undefined') return;

  // 移动端断点阈值（像素）
  const MOBILE_BREAKPOINT = 768;

  /**
   * 检查当前是否为移动设备访问
   * @param width - 屏幕宽度
   * @returns 是否为移动设备
   */
  const checkIsMobileByWidth = (width: number): boolean => {
    return width <= MOBILE_BREAKPOINT;
  };

  /**
   * 获取对应的路由名称
   * @param currentName - 当前路由名称
   * @param targetDeviceType - 目标设备类型 ('pc' | 'mobile')
   * @returns 对应的路由名称
   */
  const getCorrespondingRouteName = (
    currentName: string,
    targetDeviceType: 'pc' | 'mobile',
  ): string => {
    const baseName = currentName.toString().split('___')[0] || 'index';

    if (targetDeviceType === 'mobile') {
      // 如果当前已经在移动端路由，不需要加前缀
      if (baseName.startsWith('m-')) {
        return baseName;
      }
      return baseName === 'index' ? 'm' : `m-${baseName}`;
    } else {
      // 转到PC端，移除移动端前缀
      return baseName.replace(/^m-?/, '') || 'index';
    }
  };

  /**
   * 获取当前视口宽度
   * @returns 当前视口宽度
   */
  const getViewportWidth = () => {
    return (
      window.visualViewport?.width || document.documentElement.clientWidth || window.innerWidth
    );
  };

  /**
   * 处理窗口大小变化
   */
  const handleResize = async () => {
    const currentWidth = getViewportWidth();
    const shouldUseMobile = checkIsMobileByWidth(currentWidth);

    const route = useRoute();
    const { $i18n } = useNuxtApp();
    // @ts-ignore
    const currentLocale = $i18n.locale.value;
    const localePath = useLocalePath();

    const isCurrentlyOnMobile =
      route.path.startsWith(`/${currentLocale}/m/`) ||
      route.path.startsWith('/m/') ||
      route.path === '/m' ||
      route.path === `/${currentLocale}/m`;

    console.log('Window resize check:', {
      currentWidth,
      shouldUseMobile,
      isCurrentlyOnMobile,
      path: route.path,
    });

    // 如果当前设备类型与实际显示的页面类型不匹配，则进行重定向
    if ((shouldUseMobile && !isCurrentlyOnMobile) || (!shouldUseMobile && isCurrentlyOnMobile)) {
      try {
        // 设置标志，通知中间件这是窗口大小变化引起的导航
        nuxtApp.$isWindowResizeNavigation = true;

        const targetRouteName = getCorrespondingRouteName(
          route.name as string,
          shouldUseMobile ? 'mobile' : 'pc',
        );
        const targetPath = localePath({
          name: targetRouteName,
          params: route.params,
          query: route.query,
        });

        console.log('Window resize navigation:', {
          currentPath: route.path,
          targetRouteName,
          targetPath,
          shouldUseMobile,
          isCurrentlyOnMobile,
        });

        // 避免无限重定向循环
        if (targetPath && targetPath !== route.fullPath && targetPath !== route.path) {
          await navigateTo(targetPath, { replace: true });
        }

        // 导航完成后重置标志
        setTimeout(() => {
          nuxtApp.$isWindowResizeNavigation = false;
        }, 1000); // 延迟重置，确保导航完成
      } catch (error) {
        console.warn('Window resize navigation failed:', error);
        // 出错时也要重置标志
        nuxtApp.$isWindowResizeNavigation = false;
      }
    }
  };

  // 监听窗口大小变化
  let resizeTimeout: NodeJS.Timeout | null = null;
  const debouncedHandleResize = () => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }
    // 防抖处理，避免频繁触发
    resizeTimeout = setTimeout(handleResize, 300);
  };

  // 在组件挂载后添加事件监听器
  nuxtApp.hook('app:mounted', () => {
    window.addEventListener('resize', debouncedHandleResize);

    // 初始检查一次，确保初始状态正确
    setTimeout(handleResize, 100);

    // 注册清理函数，在页面卸载时清理事件监听器
    const cleanup = () => {
      window.removeEventListener('resize', debouncedHandleResize);
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };

    // 页面卸载时清理事件监听器
    window.addEventListener('beforeunload', cleanup, { once: true });
  });

  return {
    provide: {
      windowResizeHandler: {
        handleResize,
        checkIsMobileByWidth,
      },
    },
  };
});
