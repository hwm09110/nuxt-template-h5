<template>
  <div class="w-full h-16 bg-white">
    <div
      class="fixed top-0 left-0 w-full h-16 border-b border-gray-200 box-border z-50 bg-white flex items-center"
    >
      <div class="w-full max-w-[1150px] mx-auto flex justify-between items-center">
        <div class="flex items-center">
          <img :src="$t('logo')" class="h-12" />
        </div>
        <div>
          <div class="hidden sm:flex items-center">
            <div
              v-for="item in navItems"
              :key="item.path"
              class="relative text-gray-800 text-base mr-12"
            >
              <NuxtLink
                :to="localePath(item.path)"
                :class="[
                  'block py-1.5 px-0.5 relative after:absolute after:content-\'\' after:h-0.5 after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:rounded after:bg-current after:bg-gradient-to-t after:from-current after:via-current after:to-transparent after:bg-[length:100%_80%] after:transition-all after:duration-600 hover:after:w-full after:w-0',
                  isNavItemActive(item.path)
                    ? 'font-bold after:w-full text-blue-600'
                    : 'font-medium ',
                ]"
              >
                {{ $t(item.label) }}
              </NuxtLink>
            </div>
            <div class="flex items-center">
              <span
                v-for="(locale, index) in locales"
                :key="index"
                class="cursor-pointer text-sm text-gray-800"
                @click="handleChangeLang(locale.code)"
              >
                {{ locale.name }}<span v-if="index < locales.length - 1" class="mx-4">|</span>
              </span>
            </div>
          </div>
          <UButton
            class="sm:hidden"
            icon="i-lucide-menu"
            color="neutral"
            variant="outline"
            @click="visibleMobileNav = true"
          />
          <UDropdownMenu class="sm:hidden mr-2 ml-2" :items="locales">
            <template #item="{ item }">
              <div
                :class="['w-full', { 'text-blue-600': item.code === locale }]"
                @click="handleChangeLang(item.code)"
                >{{ item.name }}</div
              >
            </template>
            <UButton icon="i-uil-language" color="neutral" variant="outline" />
          </UDropdownMenu>
          <USlideover
            v-model:open="visibleMobileNav"
            side="top"
            :ui="{ header: 'p-1 min-h-10', close: 'absolute top-1 end-2' }"
          >
            <template #body>
              <div
                v-for="item in navItems"
                :key="item.path"
                class="relative text-gray-800 text-base mr-12"
              >
                <NuxtLink
                  :to="localePath(item.path)"
                  :class="[
                    'block py-1.5 px-0.5 relative after:absolute after:content-\'\' after:h-0.5 after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:rounded after:bg-current after:bg-gradient-to-t after:from-current after:via-current after:to-transparent after:bg-[length:100%_80%] after:transition-all after:duration-600 after:w-0 hover:after:w-full',
                    isNavItemActive(item.path) ? 'text-blue-600' : '',
                  ]"
                >
                  {{ $t(item.label) }}
                </NuxtLink>
              </div>
            </template>
          </USlideover>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useI18n } from 'vue-i18n';

  const { locales, setLocale, locale, getLocaleCookie, getBrowserLocale } = useI18n();
  const localePath = useLocalePath();
  const route = useRoute();

  const visibleMobileNav = ref(false);

  onMounted(() => {
    console.log('getRouteBasePath-->', getRouteBasePath(route));
    console.log('itemPath getLocaleCookie-->', getLocaleCookie());
    console.log('itemPath getBrowserLocale-->', getBrowserLocale());
    const prefixArr = locales.value.map((item) => item.code);
    console.log('itemPath prefixArr-->', prefixArr);
  });

  /**
   * 导航菜单数据
   */
  const navItems = ref([
    { path: '/', label: 'menu.home' },
    { path: '/product', label: 'menu.product' },
    { path: '/news', label: 'menu.news' },
    { path: '/joinUs', label: 'menu.joinUs' },
  ]);

  /**
   * 检查导航项是否激活
   * @param {string} itemPath - 导航项路径
   * @returns {boolean} - 是否激活
   */
  function isNavItemActive(itemPath) {
    return itemPath === getRouteBasePath(route);
  }

  /**
   * 获取路由的基础名称（移除语言前缀）
   * @param {object} route - 路由对象
   * @returns {string} - 路由基础路径
   */
  function getRouteBasePath(route) {
    const path = route.path;
    const prefixArr = locales.value.map((item) => item.code);
    const langPrefixRegex = new RegExp(`^/(${prefixArr.join('|')})/`);
    return path.replace(langPrefixRegex, '/');
  }

  /**
   * 切换语言处理函数
   * @param {string} code - 语言代码
   */
  async function handleChangeLang(code) {
    console.log('handleChangeLang-->', code);
    await setLocale(code);
  }
</script>
