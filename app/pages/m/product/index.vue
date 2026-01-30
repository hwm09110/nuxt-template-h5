<template>
  <div class="product">产品中心</div>
</template>
<script lang="ts" setup>
  const { t } = useI18n();
  useSeoMeta({
    title: t('productPage.title'),
  });
  definePageMeta({
    layout: 'm',
  });
</script>
<style lang="scss" scoped></style>
