<template>
  <div>
    <TopHeader title="合房长租公寓经营指标分析" />
    <div class="flex top">
      <div class="animate__animated animate__bounceInLeft">
        <bar-one style="margin-bottom: 8px" />
        <bar-two />
      </div>
      <div class="flex-1 animate__animated animate__bounceInRight">
        <rectangle />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BarOne from "@/views/DataAnalysis/components/barOne.vue";
import BarTwo from "@/views/DataAnalysis/components/barTwo.vue";
import Rectangle from "@/views/DataAnalysis/components/rectangle.vue";
</script>
<style scoped lang="scss">
.top {
  padding-top: vh(121);
  padding-left: vw(20);
}
</style>
