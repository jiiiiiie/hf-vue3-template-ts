<template>
  <div class="p404 text-center">
    <img class="info-img" src="./404.png" alt="抱歉! 您访问的页面失联啦..." />
    <h3 class="info-text">抱歉,您访问的页面失联啦...</h3>
    <el-button @click="backAppIndex">返回首页</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const backAppIndex = () => {
  router.push("/");
};
</script>

<style lang="scss" scoped>
.p404 {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: white;

  .info-text {
    margin-bottom: 20px;
    font-size: 40px;
  }

  .info-img {
    width: 150px;
    margin: 0 0 20px;
  }

  .border1 {
    margin: 10px 0;
    border: 0;
    border-top: 1px solid #eee;
  }

  .links {
    font-size: 24px;
  }

  a {
    margin-right: 20px;
  }

  &:last-child {
    margin-right: 0;
  }
}
</style>
