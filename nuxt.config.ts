// https://nuxt.com/docs/api/configuration/nuxt-config
import { loadEnv } from './build';
loadEnv();

export default defineNuxtConfig({
  compatibilityDate: '2025-12-01',
  ssr: process.env.NUXT_APP_SSR ? (process.env.NUXT_APP_SSR === 'false' ? false : true) : true,
  devServer: {
    port: 4000,
  },
  nitro: {
    preset: process.env.NUXT_APP_NITRO_PRESET || 'node-server', // static | node-server
    devProxy: {
      '/api': {
        target: 'http://www.gzhtedu.cn',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  spaLoadingTemplate: './spaLoadingTemplate.html',
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: process.env.NUXT_APP_FAVICON_URL || '/favicon.ico',
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '',
      // apiBase: '', // 自动映射.env NUXT_PUBLIC_API_BASE
    },
  },
  imports: {
    dirs: ['composables/*/index.{ts,js,mjs,mts}', 'utils/**'],
  },
  // $env: {
  //   development: {
  //     app: {
  //       baseURL: "/develop/",
  //     },
  //   },
  //   test: {
  //     app: {
  //       baseURL: "/test/",
  //     },
  //   },
  //   production: {
  //     app: {
  //       baseURL: "/public/",
  //     },
  //   },
  // },
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@ant-design-vue/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/device',
  ],
  // device: {
  //   refreshOnResize: true, // 是否在窗口大小改变时重新检测（默认 false）
  // },
  css: ['~/assets/css/main.css'],
  vite: {
    server: {
      hmr: {
        port: 4000,
        clientPort: 4000,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/index.scss" as *;`,
        },
      },
    },
  },
  // @ts-ignore
  fonts: {
    providers: {
      google: false,
      googleicons: false,
    },
  },
  antd: {
    extractStyle: true, // 开启 SSR 样式抽取（防止闪烁）
  },
  // pinia: {
  //   autoImports: ['defineStore', 'storeToRefs'],
  //   storesDirs: ['app/stores/**'],
  // },
  i18n: {
    baseUrl: process.env.NUXT_I18N_BASE_URL,
    lazy: true,
    locales: [
      { code: 'zh-CN', name: '简体中文', file: 'zh-CN.json', dir: 'ltr', language: 'zh-CN' },
      { code: 'zh-HK', name: '繁体中文', file: 'zh-HK.json', dir: 'ltr', language: 'zh-HK' },
      { code: 'en', name: 'English', file: 'en.json', dir: 'ltr', language: 'en-US' },
    ],
    langDir: 'locales',
    defaultLocale: 'zh-HK',
    // strategy: 'no_prefix',
    strategy: 'prefix_and_default', // 繁体路由显示为 /zh-HK/xxx
    vueI18n: './i18n.config.ts',
    // 启用浏览器语言检测，以便在访问者第一次访问您的站点时自动将其重定向到首选语言环境。
    // nuxt-i18n 会在 cookie 中添加一个用于存储当前语言环境的变量，当我们修改语言时，nuxt-i18n 会更新它
    detectBrowserLanguage: {
      // 启动 cookie
      useCookie: true,
      // 用于存储当前语言环境的变量名
      cookieKey: 'i18n_redirected',
      // (建议用于改进SEO) -仅检测站点根路径(/)上的浏览器区域设置。只有当使用策略而不是“no_prefix”时才有效。
      redirectOn: 'root',
    },
  },
  postcss: {
    plugins: {
      'postcss-px-to-viewport-8-plugin': {
        viewportWidth: 750,
        unitPrecision: 3,
        viewportUnit: 'vw',
        fontViewportUnit: 'vw',
        propList: ['*'],
        selectorBlackList: ['.ignore', '.hairlines'],
        minPixelValue: 1,
        mediaQuery: false,
        exclude: [
          /node_modules\/ant-design-vue/,
          /app\/pages\/\(pc\)/,
          /app\/layouts\/pc/,
          /app\/components\/pc/,
        ],
        include: [/app\/pages\/m/, /app\/layouts\/m/, /app\/components\/m/],
      },
    },
  },
});
