<template>
  <div class="w-full h-full relative">
    <!--		<h1 class="title-info mt-9">这是首页1</h1>-->
    <!--		<div ref="echart1" class="w-[400px] h-[400px]"></div>-->
    <!--		<CountTo-->
    <!--			class="text-[40px] text-[cyan]"-->
    <!--			:start-val="0"-->
    <!--			:decimals="2"-->
    <!--			:end-val="1000"-->
    <!--			:duration="2600"-->
    <!--		/>-->
    <div id="map" class="w-full top-0 left-0 h-full absolute"></div>
    <TopHeader />
    <!-- map 地图	-->
    <div class="absolute w-full h-full bg-[#014064] top-0 left-0 z-0"></div>
  </div>
</template>
<script setup lang="ts">
import { useEcharts } from "@/hooks/web/useEcharts";
import { ref, nextTick, onMounted } from "vue";
import hefeiJson from "../hefei.json";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
const echart1 = ref();
const map = ref<any>(null);
const { setOptions } = useEcharts();
nextTick(() => {
  setOptions(echart1.value, {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)"
        }
      }
    ]
  });
});
onMounted(() => {
  map.value = L.map("map", {
    minZoom: 9,
    maxZoom: 16,
    center: [31.82, 117.23],
    zoom: 9,
    zoomControl: false,
    attributionControl: false
  });
  L.tileLayer(
    // 'http://wprd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7',
    // {
    // 	subdomains: '1234'
    // }
    // ArcGIS
    "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"
    // 百度也深色
    // ' http://api0.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&udt=20191205&scale=1&ak=5ieMMexWmzB9jivTq6oCRX9j&customid=dark'
  ).addTo(map?.value);
  L.geoJson(hefeiJson as any, {
    style: () => {
      return {
        weight: 2.5,
        color: "#014064",
        fillOpacity: 0.5,
        fillColor: "#014064"
      };
    }
  }).addTo(map.value);
});
</script>
<style lang="scss" scoped>
.title-info {
  background-image: linear-gradient(to left bottom, blue, #a0ffff, green);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.test__font {
  font-size: 30px;
  color: green;
}
</style>
