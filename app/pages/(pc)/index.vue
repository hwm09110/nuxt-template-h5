<template>
  <Home />
</template>
<script setup lang="ts">
  import Home from './home/index.vue';
  const { t } = useI18n();

  definePageMeta({
    // layout: false,
    // layout: 'pc',
  });
  useSeoMeta({
    title: t('homePage.title'),
  });
</script>
