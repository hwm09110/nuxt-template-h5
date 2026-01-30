<template>
  <div class="test-mobile">
    <div class="swiper">
      <swiper v-bind="swiperOptions" @swiper="onSwiper" @slide-change="onSlideChange">
        <swiper-slide v-for="(item, index) in banners" :key="index">
          <div class="slide-content">
            <img :src="item" alt="banner" />
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="page-title">
      {{ t('menu.home') }}
    </div>
    <MTest />
    <component :is="MTest" />
  </div>
</template>
<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';
  import { Swiper, SwiperSlide, modules } from '@/lib/vue-swiper';
  import type { Swiper as SwiperClass, SwiperOptions } from 'swiper/types';
  import banner1 from '@/assets/images/banner/1.jpg';
  import banner2 from '@/assets/images/banner/2.png';
  import banner3 from '@/assets/images/banner/3.jpg';
  import MTest from '@/components/m/Test.vue';
  // const MTest = resolveComponent('MTest');

  const { t } = useI18n();
  const { isMobile } = useDevice();
  console.log('🚀 ~ isMobile:', isMobile);

  const banners = [banner1, banner2, banner3];

  const swiperOptions: SwiperOptions = {
    modules: modules,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
    },
    loop: true,
  };

  const onSwiper = (swiper: SwiperClass) => {
    console.log(swiper);
  };
  const onSlideChange = () => {
    console.log('slide change');
  };

  useHead({
    title: t('menu.home'),
  });
  definePageMeta({
    layout: 'm',
    // layout: 'default',
  });
</script>
<style lang="scss" scoped>
  .test-mobile {
    .page-title {
      font-size: 24px;
      color: $primary-color;
    }
    .swiper {
      width: 100%;
      height: 300px;
      --swiper-pagination-color: #0ec75b; /* 活动圆点颜色 */
      --swiper-pagination-bullet-inactive-color: #999999; /* 未激活圆点颜色 */
      --swiper-pagination-bullet-inactive-opacity: 0.5; /* 未激活透明度 */
      --swiper-pagination-bullet-size: 12px; /* 圆点大小 */
      --swiper-pagination-bullet-horizontal-gap: 6px; /* 圆点间距 */
      .slide-content {
        width: 100%;
        height: 300px;
        background-color: #f5f5f5;
        box-sizing: border-box;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
</style>
