<template>
  <div>
    <p>404错误页面</p>
    <p>{{ error.statusCode }}</p>
  </div>
</template>
<script setup lang="ts">
  import type { NuxtError } from '#app';
  defineProps<{ error: NuxtError }>();
</script>
<style scoped lang="scss"></style>
