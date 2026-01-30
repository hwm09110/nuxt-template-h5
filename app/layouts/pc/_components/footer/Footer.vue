<template>
  <div class="footer-wrap flex justify-center items-center">
    <div class="content">
      <ul class="external-link">
        <li>
          <a href="https://www.gzhtedu.cn/index/about" target="_blank">关于宏途</a>
        </li>
        <li>
          <a href="https://www.gzhtedu.cn/index/product" target="_blank">产品中心</a>
        </li>
        <li>
          <a href="https://www.gzhtedu.cn/index/join" target="_blank">加入宏途</a>
        </li>
        <li>
          <a href="https://www.gzhtedu.cn/index/contact" target="_blank">联系我们</a>
        </li>
      </ul>
      <p class="intr">
        Copyright©2015 - {{ nowYear }} 广州宏途数字科技有限公司 All Rights Reserved
        <a href="http://beian.miit.gov.cn" style="color: #fff" target="_blank">粤ICP备15058200号</a>
      </p>
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  import dayjs from 'dayjs';
  const nowYear = ref(dayjs().year());
</script>
<style lang="scss" scoped>
  .footer-wrap {
    height: $footer-height;
    background-color: $primary-color;
    .content {
      color: #fff;
      font-size: 12px;
      line-height: 2;
      .external-link {
        display: flex;
        align-items: center;
        justify-content: center;
        > li {
          margin-left: 20px;
        }
      }
    }
  }
</style>
