<template>
  <div class="m-layout">
    <slot name="header">
      <Header />
    </slot>
    <div class="m-main-content">
      <slot />
    </div>
    <slot name="footer">
      <Footer />
    </slot>
  </div>
</template>

<script setup>
  import Header from './_components/header/Index.vue';
  import Footer from './_components/footer/Index.vue';
</script>

<style lang="scss" scoped>
  .m-layout {
    height: 100vh;
    .m-main-content {
      min-height: calc(100vh - $m-footer-height - $m-header-height);
    }
  }
</style>
