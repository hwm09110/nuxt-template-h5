<template>
  <a-extract-style>
    <UApp :locale="getCurrentLocale">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </a-extract-style>
</template>

<script lang="ts" setup>
  import * as locales from '@nuxt/ui/locale';
  const { t, locale } = useI18n();
  // 获取 i18n 生成的 SEO 头信息
  const i18nHead = useLocaleHead({
    dir: true, // 自动添加 dir 属性 (如：ltr/rtl)
    seo: true, // 自动生成 hreflang 和 og:locale
    key: 'id', // 可选，默认为 'hid'
  });
  // console.log('i18nHead-->', i18nHead);

  const getCurrentLocale = computed(() => {
    let localeName = String.prototype.toLowerCase.apply(locale.value).replace('-', '_');
    if (localeName === 'zh_hk') {
      localeName = 'zh_tw';
    }
    return locales[localeName as keyof typeof locales];
  });

  const otherMeta = [
    {
      name: 'description',
      content: () => t('app.description'),
    },
    {
      name: 'keywords',
      content: () => t('app.keywords'),
    },
  ];
  useHead({
    htmlAttrs: {
      lang: () => i18nHead.value.htmlAttrs?.lang,
    },
    link: () => [...(i18nHead.value.link || [])],
    meta: () => [...(i18nHead.value.meta || []), ...otherMeta],
    title: '宏途数科',
  });
</script>
<style lang="scss"></style>
