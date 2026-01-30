<template>
  <div class="test-page">
    <h2 class="text-red-400">测试页面</h2>
    <div>sotre: {{ testStore.count }} <a-button @click="hanAddCount">add</a-button></div>
    <div>
      <HomeOutlined />
      <SettingFilled />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';
  import { HomeOutlined, SettingFilled } from '@ant-design/icons-vue';

  const { t } = useI18n();
  const testStore = useTestStore();

  function hanAddCount() {
    testStore.addCount();
  }

  definePageMeta({
    layout: 'test',
  });

  useHead({
    title: t('menu.home'),
  });
</script>
<style lang="scss" scoped>
  .test-page {
    padding: 10px;
    .row {
      margin-top: 20px;
    }
  }
  .bg-color {
    background-color: var(--color-blue-500);
  }
</style>
