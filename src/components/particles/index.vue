<template>
  <div class="particles-js-box">
    <div id="particles-js"></div>
  </div>
</template>

<script setup lang="ts" name="Particles">
import particlesJs from "./particles.js";
import particlesConfig from "./particles.json";
import { onMounted } from "vue";
onMounted(() => {
  particlesJs("particles-js", particlesConfig);
  document.body.style.overflow = "hidden";
});
</script>

<style scoped>
.particles-js-box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}

#particles-js {
  width: 100%;
  height: 100%;
  background-color: #f7f9fa;
}
</style>
