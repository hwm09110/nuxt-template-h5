<template>
  <NuxtLayout name="pc">
    <template #header>
      <Header :class="`active-${activePageIndex}`" />
    </template>
    <div>
      <a-button type="primary" class="mr-2" @click="handleFetchData">获取数据</a-button>
      <a-button type="primary" class="mr-2" @click="handlePostData">提交数据</a-button>
      <a-button type="primary" class="mr-2" @click="handleRumTimeConfigData"
        >rumTimeConfig数据</a-button
      >
      <a-button type="primary" class="mr-2" @click="handleAppConfigData">appConfig数据</a-button>
      <PcTest />
    </div>
    <template #footer>
      <Footer />
    </template>
  </NuxtLayout>
</template>
<script lang="ts" setup>
  import Header from '@/layouts/pc/_components/header/Header.vue';
  import Footer from '@/layouts/pc/_components/footer/Footer.vue';

  const activePageIndex = ref(0);
  const HomeApi = useHomeApi();
  const { data: resData } = await HomeApi.getMsgListSSR();
  console.log('getMsgList ->res', resData);

  function handleFetchData() {
    HomeApi.getMsgList({ page: 1 }).then((res) => {
      console.log('getMsgList ->res', res);
    });
  }

  function handlePostData() {
    HomeApi.postMsg({
      a: 1,
      b: 2,
    });
  }

  function handleRumTimeConfigData() {
    console.log(useRuntimeConfig().public);
  }

  function handleAppConfigData() {
    console.log(useAppConfig());
  }
</script>
<style lang="scss" scoped></style>
