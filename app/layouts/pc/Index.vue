<template>
  <div class="layout">
    <slot name="header">
      <Header />
    </slot>
    <div class="main-content">
      <slot />
    </div>
    <slot name="footer">
      <Footer />
    </slot>
  </div>
</template>

<script setup>
  import Header from './_components/header/Header.vue';
  import Footer from './_components/footer/Footer.vue';

  // const { finalizePendingLocaleChange } = useI18n();
  // const isReady = ref(false);
  // onBeforeMount(async () => {
  //   // 等待 i18n 加載完成
  //   await finalizePendingLocaleChange();
  //   isReady.value = true;
  // });
</script>

<style lang="scss" scoped>
  .layout {
    height: 100vh;
    .main-content {
      min-height: calc(100vh - $footer-height - $header-height);
    }
  }
</style>
