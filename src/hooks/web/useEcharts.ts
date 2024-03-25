import { ref } from "vue";
import * as echarts from "echarts";

export const useEcharts = () => {
  const echartInstance = ref();
  const setOptions = (el: HTMLElement, options: echarts.EChartsOption) => {
    echartInstance.value = echarts.init(el);
    echartInstance.value.setOption(options);
  };
  const updateSize = () => {
    echartInstance.value.resize();
  };

  window.addEventListener("resize", () => {
    echartInstance.value.resize();
  });

  return {
    echartInstance,
    setOptions,
    updateSize
  };
};
