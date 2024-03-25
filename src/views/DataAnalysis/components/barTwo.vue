<template>
  <div class="relative">
    <div ref="qwe" class="lineOne" />
    <div
      class="right_box bg-[url('@/assets/imgs/analysisImg/right_box.png')] bg-no-repeat flex w-full flex-col justify-evenly"
    >
      <div class="flex items-center justify-evenly">
        <div class="flex justify-evenly items-center">
          <div class="rectangle bg-[#27CD85] mr-3"></div>
          <div>收入</div>
        </div>
        <div>{{ totalAmount }}万</div>
      </div>
      <div class="flex items-center justify-evenly">
        <div class="flex justify-evenly items-center">
          <div class="rectangle bg-[#2399E3] mr-3"></div>
          <div>租金</div>
        </div>
        <div>{{ rentAmount }}万</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";
import { useEcharts } from "@/hooks/web/useEcharts";
import { getApartmentRevenue } from "@/api/DataAnalysis";
const { setOptions } = useEcharts();
const totalAmount = ref();
const rentAmount = ref();
const qwe = ref();
const getData = async () => {
  const data = await getApartmentRevenue({
    concentrated: 0
  });
  totalAmount.value = data.totalAmount;
  rentAmount.value = data.rentAmount;
  // 门店
  let xData = data.apartmentRevenueVOList.map((item) => item.apartmentName);
  // 门店营收
  let yData = data.apartmentRevenueVOList.map((item) => item.totalAmount);
  // 租金
  let yDatas = data.apartmentRevenueVOList.map((item) => item.rentAmount);
  setRender(xData, yData, yDatas);
};
const setRender = (xData, yData, yDatas) => {
  nextTick(() => {
    setOptions(qwe.value, {
      title: {
        text: "分散门店   单位: 万元",
        padding: [38, 0, 0, 48],
        textStyle: {
          color: "#C3EBFF"
        }
      },
      legend: {
        data: ["总收入", "租金"],
        padding: [38, 0, 0, 48],
        itemHeight: 17, //修改icon图形大小
        itemWidth: 23, //修改icon图形大小
        textStyle: {
          color: "#E9F3F9",
          fontSize: 18
        }
      },
      grid: {
        top: "30%",
        bottom: "20%"
      },
      xAxis: [
        {
          type: "category",
          data: xData,
          axisLabel: {
            color: "#E9F3F9", //Y轴内容文字颜色
            //  让x轴文字方向为竖向
            interval: 0,
            formatter: function (value) {
              return value.split("").join("\n");
            }
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            //y轴文字的配置
            textStyle: {
              color: "#59B9F1" //Y轴内容文字颜色
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#65C5E7",
              opacity: 0.2
            }
          }
        }
      ],
      itemStyle: { normal: { color: "#4ad2ff" } },
      series: [
        {
          name: "总收入",
          type: "bar",
          data: yData,
          itemStyle: {
            //双Y轴A柱的柱体颜色
            normal: {
              color: "#27CD85"
            }
          }
        },
        {
          name: "租金",
          type: "bar",
          data: yDatas,
          itemStyle: {
            //双Y轴B柱的柱体颜色
            normal: {
              color: "#2399E3"
            }
          }
        }
      ]
    });
  });
};
onMounted(getData);
</script>
<style scoped lang="scss">
.lineOne {
  width: vw(1039);
  height: vh(448);
  border: 1px solid #0065fd;
  box-shadow: inset 0 0 5px #0065fd;
}

.right_box {
  position: absolute;
  top: vh(17);
  right: vw(90);
  width: vw(219);
  height: vh(90);
  font-size: vw(18);
  color: #e9f3f9;
}

.rectangle {
  width: vw(23.13);
  height: vh(17.56);
  border-radius: 15%;
}
</style>
