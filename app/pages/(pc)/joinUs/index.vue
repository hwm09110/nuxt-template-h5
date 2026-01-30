<template>
  <div class="news">加入我们</div>
</template>
<script lang="ts" setup>
  const { t } = useI18n();
  useSeoMeta({
    title: t('joinUsPage.title'),
  });
  definePageMeta({
    layout: 'pc',
  });
</script>
<style lang="scss" scoped></style>
