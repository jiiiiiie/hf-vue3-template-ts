<template>
  <div class="w-full top-header absolute top-0 z-[10000] animate__animated animate__fadeIn">
    <p class="w-full text-center top-header__title pt-0.5">{{ props.title }}</p>
    <div class="absolute top-header__navbar w-full left-0 flex justify-between">
      <div class="top-header__left h-full flex">
        <p
          v-for="(item, index) in navList"
          :key="item"
          @click="jumpPage(index)"
          :class="[selectIndex === index && `active-${index}`]"
        >
          {{ item }}
        </p>
      </div>
      <div class="top-header__right h-full flex">
        <p @click="jumpPage(3)" :class="[selectIndex === 3 && 'active-3']">指标分析</p>
        <p class="pl-6 !cursor-default">
          {{
            new Date().toLocaleString("zh-CN", { year: "numeric", month: "long", day: "numeric" })
          }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { watch, ref } from "vue";
export interface Props {
  title: string;
}
const selectIndex = ref(0);
const props = withDefaults(defineProps<Props>(), {
  title: "合房长租公寓整体运营概况"
});
const navList = ["运营概况", "租赁数据", "交易数据"];
const pathList = ref(["/home", "/leaseOverview", "/transactionData", "/dataAnalysis"]);
const router = useRouter();
watch(
  () => router.currentRoute.value,
  (newValue: any) => {
    console.log(newValue.fullPath);
    const index = pathList.value.indexOf(newValue.fullPath);
    selectIndex.value = index;
  },
  { immediate: true }
);
const jumpPage = (pathNum: number) => {
  router.push(pathList.value[pathNum]);
};
</script>

<style scoped lang="scss">
.top-header {
  height: vh(80);
  background: url("@/assets/imgs/top_head_bg.png") no-repeat;
  background-size: 100% 100%;

  .top-header__title {
    font-size: vw(40);
    color: #fff;
  }

  .top-header__navbar {
    top: vh(9);
    height: vh(46);
    padding: 0 vw(20);
  }

  .top-header__left,
  .top-header__right {
    & > p {
      width: vw(226);
      font-size: vw(16);
      color: #a2c9de;
      background: url("@/assets/imgs/top_nav_a.png") no-repeat;
      background-size: 100% 100%;

      @apply flex justify-center items-center cursor-pointer;
    }

    .active-0 {
      background-image: url("@/assets/imgs/top_nav_a_active.png") !important;
    }

    .active-1,
    .active-2 {
      background-image: url("@/assets/imgs/top_nav_b_active.png") !important;
    }

    .active-3 {
      background-image: url("@/assets/imgs/top_nav_c_active.png") !important;
    }
  }

  .top-header__left {
    & > p:nth-child(2),
    & > p:nth-child(3) {
      margin-left: vw(-33);
      background-image: url("@/assets/imgs/top_nav_b.png");
    }
  }

  .top-header__right {
    & > p:nth-child(1) {
      margin-right: vw(-33);
      background-image: url("@/assets/imgs/top_nav_c.png");
    }

    & > p:last-child {
      background-image: url("@/assets/imgs/top_date_bg.png");
    }
  }
}
</style>
