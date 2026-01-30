# 官网 PC && H5 模板

这是一个基于 Nuxt 4 + Vue 3 + TypeScript 构建的现代化企业官网 PC && H5 模板，支持国际化、响应式设计和多种构建模式。

## 技术栈

### 核心框架

- **Nuxt 4** - Vue 3 全栈框架
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的 JavaScript 超集

### UI 与组件

- **Ant Design Vue 4** - 企业级 UI 组件库
- **Ant Design Icons Vue** - 图标组件库
- **Swiper 11** - 现代化滑动组件
- **@nuxt/ui** - Nuxt 官方 UI 库
- **Tailwind CSS** - 实用优先的 CSS 框架

### 状态管理与工具

- **Pinia 3** - Vue 3 状态管理方案
- **dayjs** - 轻量级日期处理库
- **@nuxtjs/device** - 设备检测与适配

### 国际化

- **@nuxtjs/i18n 9** - Nuxt 国际化解决方案
- **vue-i18n** - Vue 国际化核心库

### 字体与样式

- **@nuxt/fonts** - 字体优化与加载
- **SCSS** - CSS 预处理器
- **postcss-px-to-viewport-8-plugin** - 响应式单位转换

### 代码质量

- **ESLint** - JavaScript/TypeScript 代码检查工具
- **Husky** - Git 钩子工具
- **lint-staged** - 暂存文件检查工具
- **Commitlint** - Git 提交信息检查工具

## 项目结构

```bash
├── app/                      # 应用主目录
│   ├── assets/               # 静态资源
│   │   ├── css/              # CSS 样式文件
│   │   ├── images/           # 图片资源
│   │   │   ├── banner/       # 横幅图片
│   │   │   └── logo/         # Logo 图片
│   │   ├── json/             # JSON 数据文件
│   │   ├── media/            # 媒体文件
│   │   │   └── video/        # 视频文件
│   │   └── scss/             # SCSS 样式文件
│   ├── components/           # Vue 组件
│   │   ├── m/                # 移动端组件
│   │   └── pc/               # PC端组件
│   ├── composables/          # 组合式函数
│   │   └── http/             # HTTP 请求相关组合函数
│   ├── layouts/              # 布局组件
│   │   ├── m/                # 移动端布局
│   │   │   └── _components/  # 移动端布局组件
│   │   │       ├── footer/   # 移动端底部组件
│   │   │       └── header/   # 移动端头部组件
│   │   ├── pc/               # PC端布局
│   │   │   └── _components/  # PC端布局组件
│   │   │       ├── footer/   # PC端底部组件
│   │   │       └── header/   # PC端头部组件
│   │   └── test/             # 测试布局
│   ├── lib/                  # 第三方库封装
│   ├── middleware/           # 路由中间件
│   ├── pages/                # 页面组件
│   │   ├── (pc)/             # PC端页面
│   │   └── m/                # 移动端页面
│   ├── plugins/              # Nuxt 插件
│   ├── stores/               # Pinia 状态管理
│   ├── utils/                # 工具函数
│   ├── app.config.ts         # 应用配置
│   ├── app.vue               # 应用入口组件
│   ├── error.vue             # 错误页面
│   └── spaLoadingTemplate.html # SPA 加载模板
├── build/                    # 构建配置
├── i18n/                     # 国际化配置
│   ├── locales/              # 语言包文件
│   └── i18n.config.ts        # i18n 配置
├── public/                   # 公共静态资源
│   └── images/               # 公共图片资源
│       └── locales/          # 按语言分类的图片
├── server/                   # 服务端配置
├── types/                    # 类型定义
├── .env.development          # 开发环境配置
├── .env.production.spa       # 生产环境SPA配置
├── .env.production.ssg       # 生产环境SSG配置
├── .env.production.ssr       # 生产环境SSR配置
├── .env.test                 # 测试环境配置
├── .husky/                   # Git钩子配置
├── ecosystem.config.cjs        # PM2 部署配置
├── nuxt.config.ts            # Nuxt 核心配置
├── package.json              # 项目依赖与脚本
├── tsconfig.json             # TypeScript 配置
└── README.md                 # 项目说明文档
```

## 快速开始

### 环境要求

- Node.js >= 20.0.0
- pnpm >= 9.0.0

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

项目将在 `http://localhost:4000` 启动开发服务器。

### 构建模式

#### SSR (服务端渲染)

```bash
# 生产环境 SSR 构建
pnpm build:prod:ssr
# 或使用默认构建命令
pnpm build
```

#### SPA (单页应用)

```bash
# 生产环境 SPA 构建
pnpm build:prod:spa
```

#### SSG (静态站点生成)

```bash
# 生产环境 SSG 构建
pnpm build:prod:ssg
# 或使用 generate 命令
pnpm generate
```

### 预览构建结果

```bash
pnpm preview
```

## 环境配置

项目使用 `.env` 文件管理不同环境的配置：

- `.env.development`: 开发环境配置
- `.env.test`: 测试环境配置(SSR)
- `.env.production.spa`: 生产环境配置 (SPA)
- `.env.production.ssr`: 生产环境配置 (SSR)
- `.env.production.ssg`: 生产环境配置 (SSG)

主要环境变量：

| 变量名 | 描述 | 默认值 |
| ------ | ---- | ------ |
| `NUXT_APP_SSR` | 是否启用 SSR 模式 | `true` |
| `NUXT_APP_BASE_URL` | 应用基础 URL | `/` |
| `NUXT_APP_FAVICON_URL` | Favicon 图标 URL | `/favicon.ico` |
| `NUXT_PUBLIC_API_BASE` | API 基础 URL | 空 |
| `NUXT_APP_NITRO_PRESET` | Nitro 预设 | `node-server` |
| `NUXT_I18N_BASE_URL` | 国际化基础 URL | 空 |

## 国际化配置

项目支持三种语言：

- 简体中文 (zh-CN)
- 繁体中文 (zh-HK)
- 英文 (en)

语言包文件位于 `i18n/locales/` 目录下。可以通过 `useI18n()` 组合式函数在组件中使用国际化功能。

### 使用示例

```vue
<template>
  <div>
    <h1>{{ t('home.title') }}</h1>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
```

## 状态管理

使用 Pinia 进行状态管理，状态管理文件位于 `app/stores/` 目录下。

### 定义 Store

```typescript
// app/stores/testStore.ts
export const useTestStore = defineStore('test', () => {
  const count = ref(0)
  const increment = () => count.value++
  return { count, increment }
})
```

### 使用 Store

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup lang="ts">
const testStore = useTestStore()
const { count, increment } = storeToRefs(testStore)
</script>
```

## 设备检测与响应式适配

项目集成了智能设备检测和响应式适配功能，支持移动端和PC端的自动切换：

- 使用 `@nuxtjs/device` 模块进行设备类型检测
- 支持服务端渲染时的设备检测和路由重定向
- 支持客户端窗口大小变化时的动态路由切换
- 移动端断点阈值为 768px

### 设备重定向中间件

通过 `app/middleware/device-redirect.global.ts` 实现全局设备检测和路由重定向：

- 在服务端渲染时根据用户代理进行首次设备类型判断
- 将移动设备用户重定向到 `/m/` 路由前缀
- 将桌面设备用户保持在标准路由

### 窗口大小变化处理

通过 `app/plugins/window-resize.client.ts` 客户端插件实现实时响应：

- 监听窗口大小变化事件
- 当用户调整浏览器窗口大小时，自动跳转到相应的移动端或PC端路由
- 防抖处理避免频繁触发重定向

### 路由约定

- 移动端路由使用 `/m/` 前缀，例如 `/m/home`
- PC端路由使用标准路径，例如 `/home`
- 路由名称按约定区分，如 `m-home` 对应移动端，`home` 对应PC端

## HTTP 请求

HTTP 请求封装在 `app/composables/http/` 目录下，采用模块化设计：

- `useHttp.ts`: 基础 HTTP 请求工具
- `useHomeApi.ts`, `useTestApi.ts`: 按模块划分的 API 调用函数

### HTTP 请求使用示例

```typescript
// app/composables/http/useHomeApi.ts
export const useHomeApi = () => {
  const http = useHttp()
  
  const getHomeData = async () => {
    return await http.get('/api/home/data')
  }
  
  return { getHomeData }
}
```

```vue
<script setup lang="ts">
const { getHomeData } = useHomeApi()

onMounted(async () => {
  const data = await getHomeData()
  console.log(data)
})
</script>
```

## 布局组件

布局组件位于 `app/layouts/` 目录下，采用模块化设计：

- `Default.vue`: 默认布局
- `Header/Header.vue`: 头部组件
- `Footer/Footer.vue`: 底部组件

### 使用布局

```vue
<template>
  <div>
    <Header />
    <main>
      <!-- 页面内容 -->
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/layouts/Header/Header.vue'
import Footer from '@/layouts/Footer/Footer.vue'
</script>
```

## 开发指南

### 代码规范

项目使用 ESLint 进行代码规范检查，提交代码前会自动运行 lint 检查。

```bash
# 手动运行 lint 检查
pnpm lint
```

### Git 提交规范

使用 Husky 和 lint-staged 确保提交的代码符合规范。提交信息应遵循 Conventional Commits 规范：

```text
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

常用 type 包括：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式修改
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建流程或辅助工具的变动

### 组件开发

组件应放置在 `app/components/` 目录下，使用 PascalCase 命名。

### 页面开发

页面应放置在 `app/pages/` 目录下，遵循 Nuxt 的页面路由约定：

- `app/pages/index.vue` -> `/`
- `app/pages/home/index.vue` -> `/home`
- `app/pages/news/index.vue` -> `/news`

对于需要区分移动端和PC端的页面，建议按以下方式组织：

- 移动端页面：`app/pages/m/*.vue` (如 `app/pages/m/index.vue` -> `/m/`)
- PC端页面：`app/pages/*.vue` (如 `app/pages/index.vue` -> `/`)

### 设备适配开发

在开发过程中需要注意设备适配相关的问题：

1. **创建对应路由**：为需要移动端适配的页面创建对应的移动端路由（带 `/m/` 前缀）

2. **使用设备检测**：在组件中可以通过 `useDevice()` 组合式函数检测当前设备类型

```vue
<script setup lang="ts">
const { isMobile, isDesktop } = useDevice()

onMounted(() => {
  if (isMobile) {
    // 移动端特定逻辑
  } else {
    // PC端特定逻辑
  }
})
</script>
```

1. **响应式样式**：项目集成了 `postcss-px-to-viewport-8-plugin`，可以使用px单位编写代码，自动转换为vw单位实现响应式效果

## 部署

根据不同构建模式，部署方式有所不同：

### SSR 模式部署

SSR 模式需要 Node.js 环境运行，适用于需要 SEO 优化的场景。

1. 构建项目：

   ```bash
   pnpm build:prod:ssr
   ```

2. 启动服务：

   ```bash
   pnpm start
   ```

### SSG 模式部署

SSG 模式生成静态文件，适用于托管在 CDN 或静态服务器的场景。

1. 构建项目：

   ```bash
   pnpm build:prod:ssg
   ```

2. 部署 `dist` 目录下的文件到静态服务器。

### SPA 模式部署

SPA 模式生成单页应用，适用于快速部署和简单托管的场景。

1. 构建项目：

   ```bash
   pnpm build:prod:spa
   ```

2. 部署 `dist` 目录下的文件到静态服务器。

### 构建配置说明

- **SSR (服务端渲染)**: `pnpm build:prod:ssr` - 适合需要SEO优化的网站
- **SPA (单页应用)**: `pnpm build:prod:spa` - 适合交互性强的单页应用
- **SSG (静态站点生成)**: `pnpm build:prod:ssg` - 适合内容相对固定的静态网站

根据目标部署环境设置合适的 `NUXT_APP_NITRO_PRESET` 环境变量：

- `node-server`: Node.js 服务器
- `static`: 静态文件部署
- 其他平台预设如 `vercel`, `netlify` 等

## 开发命令

项目提供了丰富的开发命令，涵盖开发、构建、部署等各个环节：

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建项目 (默认SSR模式)
pnpm build

# 预览构建结果
pnpm preview

# 不同环境和模式的构建
pnpm build:dev          # 开发环境构建
pnpm build:test         # 测试环境构建
pnpm build:prod:ssr     # 生产环境SSR模式构建
pnpm build:prod:spa     # 生产环境SPA模式构建
pnpm build:prod:ssg     # 生产环境SSG模式构建
pnpm generate           # 生成静态站点 (等同于 build:prod:ssg)

# 代码检查
pnpm lint

# 清理缓存
pnpm clean:cache

# 其他命令
pnpm start              # 启动已构建的应用
pnpm postinstall        # 安装后准备Nuxt
```

## PM2 部署

使用 PM2 进程管理器部署应用：

1. 配置 `ecosystem.config.cjs` 文件
2. 启动应用：

```bash
pm2 start ecosystem.config.cjs
```

3. 重启应用：

```bash
pm2 reload <app-name>
# 或
pm2 restart <app-name>
```

## 相关文档

- [Nuxt.js 文档](https://nuxt.com/)
- [Vue 3 文档](https://vuejs.org/)
- [Ant Design Vue 文档](https://antdv.com/docs/vue/introduce/)
- [@nuxtjs/i18n 文档](https://i18n.nuxtjs.org/)
- [Swiper 文档](https://swiperjs.com/)
- [@nuxt/ui 文档](https://ui.nuxt.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Pinia 文档](https://pinia.vuejs.org/)
- [@nuxtjs/i18n 文档](https://i18n.nuxtjs.org/)
- [Swiper 文档](https://swiperjs.com/)

## License

MIT
