<template>
  <div class="news">新闻中心</div>
</template>
<script lang="ts" setup>
  const { t } = useI18n();
  useSeoMeta({
    title: t('newsPage.title'),
  });
  definePageMeta({
    layout: 'm',
  });
</script>
<style lang="scss" scoped></style>
