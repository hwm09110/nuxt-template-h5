<template>
  <div class="wrap">产品中心</div>
</template>
<script lang="ts" setup>
  const { t } = useI18n();
  useSeoMeta({
    title: t('productPage.title'),
  });
  definePageMeta({
    layout: 'pc',
  });
</script>
<style lang="scss" scoped></style>
