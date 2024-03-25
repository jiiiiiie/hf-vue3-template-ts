<template>
  <div class="h-full flex flex-col justify-evenly">
    <div class="flex justify-evenly">
      <div
        class="rectangle bg-[url('@/assets/imgs/analysisImg/icon_a.png')] bg-no-repeat flex items-center justify-around"
      >
        <div class="h-full flex items-center justify-center">
          <img src="@/assets/imgs/analysisImg/icon_a_a.png" class="img_right" />
        </div>
        <div class="text-[#ABDFF1] h-full flex flex-col justify-evenly items-center">
          <div class="text_top">本月至今营业收入</div>
          <div class="text_bottom">
            <div class="flex justify-evenly">
              <CountTo
                :start-val="0"
                :decimals="0"
                :end-val="monthToDateRevenue"
                :duration="2600"
              />
              <div>万元</div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="rectangle bg-[url('@/assets/imgs/analysisImg/icon_b.png')] bg-no-repeat flex items-center justify-around"
      >
        <div>
          <img src="@/assets/imgs/analysisImg/icon_b_b.png" class="img_right" />
        </div>
        <div class="text-[#81DFA1] h-full flex flex-col justify-evenly items-center">
          <div class="text_top">累计年营业收入</div>
          <div class="text_bottom">
            <div class="flex">
              <CountTo :start-val="0" :decimals="0" :end-val="totalRevenues" :duration="2600" />
              <div>万元</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-evenly">
      <div
        class="rectangle bg-[url('@/assets/imgs/analysisImg/icon_c.png')] bg-no-repeat flex items-center justify-around"
      >
        <div>
          <img src="@/assets/imgs/analysisImg/icon_c_c.png" class="img_right" />
        </div>
        <div class="text-[#E7D1A9] h-full flex flex-col justify-evenly items-center">
          <div class="text_top">本月至今营业集中公寓收入</div>
          <div class="text_bottom">
            <div class="flex">
              <CountTo
                :start-val="0"
                :decimals="0"
                :end-val="monthConcentrateIncome"
                :duration="2600"
              />
              <div>万元</div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="rectangle bg-[url('@/assets/imgs/analysisImg/icon_d.png')] bg-no-repeat flex items-center justify-around"
      >
        <div>
          <img src="@/assets/imgs/analysisImg/icon_d_d.png" class="img_right" />
        </div>
        <div class="text-[#CFA9F7] h-full flex flex-col justify-evenly items-center">
          <div class="text_top">本月至今营业散房收入总额</div>
          <div class="text_bottom">
            <div class="flex">
              <CountTo
                :start-val="0"
                :decimals="0"
                :end-val="monthDisperseIncome"
                :duration="2600"
              />
              <div>万元</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { revenueByTypeAndTime } from "@/api/DataAnalysis";
import dayjs from "dayjs";

const monthToDateRevenue = ref(0); //本月至今营业收入
const totalRevenues = ref(0); //累计年营业收入
const monthConcentrateIncome = ref(0); //本月至今营业集中公寓收入
const monthDisperseIncome = ref(0); //本月至今营业分散公寓收入
const getData = () => {
  const startOfMonth = dayjs().startOf("month").format("YYYY-MM-DD");
  const currentYear = dayjs().format("YYYY");

  const promises = [
    revenueByTypeAndTime({ time: startOfMonth }),
    revenueByTypeAndTime({ time: currentYear }),
    revenueByTypeAndTime({ time: startOfMonth, concentrated: 1 }),
    revenueByTypeAndTime({ time: startOfMonth, concentrated: 0 })
  ];

  Promise.all(promises)
    .then(([dataA, dataB, dataC, dataD]) => {
      // console.log(dataA, dataB, dataC, dataD);
      monthToDateRevenue.value = dataA;
      totalRevenues.value = dataB;
      monthConcentrateIncome.value = dataC;
      monthDisperseIncome.value = dataD;
    })
    .catch((error) => {
      console.error(error);
    });
};
onMounted(getData);
</script>

<style scoped lang="scss">
.rectangle {
  width: vw(340.78);
  height: vh(192.5);
  padding: 0 vw(10);
}

.img_right {
  width: vw(56);
  height: vh(53);
}

.text_top {
  padding-top: vh(18);
  font-size: vw(22);
}

.text_bottom {
  font-size: vw(36);
}
</style>
