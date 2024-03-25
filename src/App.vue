<template>
  <div class="w-full h-full app">
    <RouterView class="w-full h-full" />
  </div>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
<style lang="scss">
.app {
  background: url("@/assets/imgs/body_bg_img.png") no-repeat;
  background-size: 100% 100%;
}
</style>
