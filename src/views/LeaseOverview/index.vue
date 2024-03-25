<template>
  <div class="z-[1]">
    <!--顶部-->
    <TopHeader title="租赁数据概览" />
    <div class="datamain flex flex-nowrap">
      <div class="dataleft">
        <el-select v-model="value" class="blueBack">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-icon class="icon">
          <Rank />
        </el-icon>
        <span class="arrow-down"></span>
        <div class="leftmain"></div>
      </div>
      <div class="datamid">
        <div class="midtit">
          <span class="top-title">各类目智能房源占比</span>
        </div>
        <div class="midmain grid grid-cols-2 gap-4">
          <div class="ectc">
            <div ref="ect1" class="mensuo"></div>
          </div>
          <div class="ectc">
            <div ref="ect2" class="mensuo"></div>
          </div>
          <div class="ectc">
            <div ref="ect3" class="mensuo"></div>
          </div>
          <div class="ectc">
            <div ref="ect4" class="mensuo"></div>
          </div>
        </div>
      </div>
      <div class="dataright">
        <div class="righttit">
          <span class="top-title">租客年龄分布图</span>
        </div>
        <div class="echart1"></div>
        <div class="righttit2">
          <span class="top-title">付款流出占比</span>
        </div>
        <div class="echart2"></div>
      </div>
    </div>
    <!--图形部分-->
  </div>
</template>

<script lang="ts" setup>
import { useEcharts } from "@/hooks/web/useEcharts";
import { ref, nextTick } from "vue";

const value = ref("Option1");

const options = [
  {
    value: "Option1",
    label: "全部"
  },
  {
    value: "Option2",
    label: "Option2"
  },
  {
    value: "Option3",
    label: "Option3"
  },
  {
    value: "Option4",
    label: "Option4"
  },
  {
    value: "Option5",
    label: "Option5"
  }
];
const ect1 = ref();
const ect2 = ref();
const ect3 = ref();
const ect4 = ref();
const { setOptions } = useEcharts();
nextTick(() => {
  let value = 20.6666;
  let title = "%";
  let int = value.toFixed(2).split(".")[0];
  let float = value.toFixed(2).split(".")[1];
  setOptions(ect1.value, {
    // backgroundColor: '#02112a',
    title: [
      {
        text: "智能门锁",
        x: "center",
        y: "35%",
        textStyle: {
          color: "rgba(198, 221, 255, 1)",
          fontSize: 16,
          fontWeight: "900"
        }
      },
      {
        text: "{a|" + int + "}{b|." + float + "}{c|" + title + "}",
        x: "center",
        y: "50%",
        textStyle: {
          rich: {
            a: {
              fontSize: 30,
              color: "rgba(198, 221, 255, 1)"
            },
            b: {
              fontSize: 30,
              color: "rgba(198, 221, 255, 1)"
              // padding: [0,0,14,0]
            },
            c: {
              fontSize: 30,
              color: "rgba(198, 221, 255, 1)",
              padding: [5, 0, 0, 0]
            }
          }
        }
      }
    ],
    series: [
      {
        type: "gauge",
        radius: "100%",
        clockwise: true,
        startAngle: "90",
        endAngle: "-270",
        splitNumber: 10,
        detail: {
          offsetCenter: [0, -20],
          formatter: " "
        },
        pointer: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: [
              [value / 100, "#4BF3F9"],
              [1, "#00217D"]
            ],
            width: 5,
            shadowColor: "#0065fd",
            shadowBlur: 3
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
          length: 32,
          lineStyle: {
            color: "white",
            width: 6
          }
        },
        axisLabel: {
          show: false
        }
      },
      {
        type: "pie",
        name: "内层细圆环",
        radius: ["80%", "81%"],
        hoverAnimation: true,
        clockWise: false,
        itemStyle: {
          normal: {
            color: "#84c1e0"
          }
        },
        label: {
          show: false
        },
        data: [100]
      }
    ]
  });
  setOptions(ect2.value, {
    // backgroundColor: '#02112a',
    title: [
      {
        text: "智能冷水表",
        x: "center",
        y: "35%",
        textStyle: {
          color: "rgba(198, 221, 255, 1)",
          fontSize: 16,
          fontWeight: "900"
        }
      },
      {
        text: "{a|" + int + "}{b|." + float + "}{c|" + title + "}",
        x: "center",
        y: "50%",
        textStyle: {
          rich: {
            a: {
              fontSize: 30,
              color: "rgba(198, 221, 255, 1)"
            },
            b: {
              fontSize: 30,
              color: "rgba(198, 221, 255, 1)"
              // padding: [0,0,14,0]
            },
            c: {
              fontSize: 30,
              color: "rgba(198, 221, 255, 1)",
              padding: [5, 0, 0, 0]
            }
          }
        }
      }
    ],
    series: [
      {
        type: "gauge",
        radius: "100%",
        clockwise: true,
        startAngle: "90",
        endAngle: "-270",
        splitNumber: 10,
        detail: {
          offsetCenter: [0, -20],
          formatter: " "
        },
        pointer: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: [
              [value / 100, "#4BF3F9"],
              [1, "#00217D"]
            ],
            width: 5,
            shadowColor: "#0065fd",
            shadowBlur: 3
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
          length: 32,
          lineStyle: {
            color: "white",
            width: 6
          }
        },
        axisLabel: {
          show: false
        }
      },
      {
        type: "pie",
        name: "内层细圆环",
        radius: ["80%", "81%"],
        hoverAnimation: true,
        clockWise: false,
        itemStyle: {
          normal: {
            color: "#84c1e0"
          }
        },
        label: {
          show: false
        },
        data: [100]
      }
    ]
  });
  setOptions(ect3.value, {
    // backgroundColor: '#02112a',
    title: [
      {
        text: "智能热水表",
        x: "center",
        y: "35%",
        textStyle: {
          color: "rgba(198, 221, 255, 1)",
          fontSize: 16,
          fontWeight: "900"
        }
      },
      {
        text: "{a|" + int + "}{b|." + float + "}{c|" + title + "}",
        x: "center",
        y: "50%",
        textStyle: {
          rich: {
            a: {
              fontSize: 30,
              color: "rgba(198, 221, 255, 1)"
            },
            b: {
              fontSize: 30,
              color: "rgba(198, 221, 255, 1)"
              // padding: [0,0,14,0]
            },
            c: {
              fontSize: 30,
              color: "rgba(198, 221, 255, 1)",
              padding: [5, 0, 0, 0]
            }
          }
        }
      }
    ],
    series: [
      {
        type: "gauge",
        radius: "100%",
        clockwise: true,
        startAngle: "90",
        endAngle: "-270",
        splitNumber: 10,
        detail: {
          offsetCenter: [0, -20],
          formatter: " "
        },
        pointer: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: [
              [value / 100, "#4BF3F9"],
              [1, "#00217D"]
            ],
            width: 5,
            shadowColor: "#0065fd",
            shadowBlur: 3
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
          length: 32,
          lineStyle: {
            color: "white",
            width: 6
          }
        },
        axisLabel: {
          show: false
        }
      },
      {
        type: "pie",
        name: "内层细圆环",
        radius: ["80%", "81%"],
        hoverAnimation: true,
        clockWise: false,
        itemStyle: {
          normal: {
            color: "#84c1e0"
          }
        },
        label: {
          show: false
        },
        data: [100]
      }
    ]
  });
  setOptions(ect4.value, {
    // backgroundColor: '#02112a',
    title: [
      {
        text: "智能电表",
        x: "center",
        y: "35%",
        textStyle: {
          color: "rgba(198, 221, 255, 1)",
          fontSize: 16,
          fontWeight: "900"
        }
      },
      {
        text: "{a|" + int + "}{b|." + float + "}{c|" + title + "}",
        x: "center",
        y: "50%",
        textStyle: {
          rich: {
            a: {
              fontSize: 30,
              color: "rgba(198, 221, 255, 1)"
            },
            b: {
              fontSize: 30,
              color: "rgba(198, 221, 255, 1)"
              // padding: [0,0,14,0]
            },
            c: {
              fontSize: 30,
              color: "rgba(198, 221, 255, 1)",
              padding: [5, 0, 0, 0]
            }
          }
        }
      }
    ],
    series: [
      {
        type: "gauge",
        radius: "100%",
        clockwise: true,
        startAngle: "90",
        endAngle: "-270",
        splitNumber: 10,
        detail: {
          offsetCenter: [0, -20],
          formatter: " "
        },
        pointer: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: [
              [value / 100, "#4bf3f9"],
              [1, "#00217D"]
            ],
            width: 5,
            shadowColor: "#0065fd",
            shadowBlur: 18
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
          length: 32,
          lineStyle: {
            color: "white",
            width: 6
          }
        },
        axisLabel: {
          show: false
        }
      },
      {
        type: "pie",
        name: "内层细圆环",
        radius: ["80%", "81%"],
        hoverAnimation: true,
        clockWise: false,
        itemStyle: {
          normal: {
            color: "#84c1e0"
          }
        },
        label: {
          show: false
        },
        data: [100]
      }
    ]
  });
});
</script>

<style lang="scss" scoped>
.datamain {
  width: 100vw;
  height: vh(929);
  padding-top: vh(121);

  .ectc {
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mensuo {
    width: vw(220);
    height: vh(220);
    padding: 0;
  }

  .top-title {
    @include gradient-text(24);

    font-family: "AlibabaPuHuiTi_3_65_Medium", serif;
    font-weight: 700;
  }
}

.dataleft {
  width: vw(560);
  height: 100%;
  margin-right: vw(12);
  margin-left: vw(30);

  .blueBack {
    width: vw(210);
    height: vh(46) !important;
    font-family: "AlibabaPuHuiTi_3_85_Bold", serif;
    font-size: 24px;
    line-height: vh(46);
    color: #a7efff;
    appearance: none;
    background-color: #114395;
    background-image: url("@/assets/imgs/analysisImg/select.png");
    background-repeat: no-repeat;
    background-position: right center;
    border: 1px solid #00f1ff;
    border-radius: 6px;
    outline: none;
    opacity: 1;
  }

  :deep(.el-input) {
    width: vw(210);
    height: vh(46) !important;
    font-family: "AlibabaPuHuiTi_3_85_Bold", serif;
    font-size: 24px !important;
    line-height: vh(46) !important;
    appearance: none;
    background-color: #114395 !important;
    background-image: url("@/assets/imgs/analysisImg/select.png");
    background-repeat: no-repeat;
    background-position: right center;
    border: 1px solid #00f1ff;
    border-radius: 6px;
    outline: none;
    box-shadow: 0 0 0 0 !important;
    opacity: 1;

    --el-input-focus-border: #114395;
    --el-input-transparent-border: 0 0 0 0px;
    --el-input-border-color: #114395;
    --el-input-hover-border: 0px !important;
    --el-input-hover-border-color: #114395;
    --el-input-focus-border-color: #114395;
    --el-input-clear-hover-color: #114395;
    --el-input-border: 0px;
  }

  :deep(.el-input__wrapper) {
    background-color: #114395 !important;
  }

  :deep(.el-input__inner) {
    font-size: 24px !important;
    line-height: vh(46) !important;
    color: #a7efff !important;
  }

  // :deep(.el-select .el-input__wrapper.is-focus) {
  // 	box-shadow: 0 0 0 0px !important;
  // }
  // :deep(.el-select .el-input.is-focus .el-input__wrapper) {
  // 	box-shadow: 0 0 0 0px !important;
  // }
  // :deep(.el-select) {
  // 	--el-select-border-color-hover: #114395;
  // }
}

.leftmain {
  width: vw(560);
  height: vh(785);
  margin-top: vh(19);
  background: #0135b1;
  border: 1px solid #91a9ff;
  box-shadow: 0 0 10px 5px #052eff;
  opacity: 0.6;
}

.datamid {
  z-index: 10;
  width: vw(744);
  height: 100%;
  margin-right: vw(12);
  margin-left: vw(12);
}

.midtit {
  width: vw(524);
  height: vh(42);
  margin-top: vh(81);
  margin-left: vw(110);
  font-size: 24px;
  line-height: vh(42);
  text-align: center;
  background: url("@/assets/imgs/title_bg.png") no-repeat;
}

.midmain {
  z-index: 100;
  width: vw(744);
  height: vh(682);
  margin-top: vh(45);
  background: #0135b1;
  border: 1px solid #91a9ff;
  box-shadow: 0 0 10px 5px #052eff;
  opacity: 0.6;
}

.dataright {
  width: vw(524);
  height: 100%;
  margin-top: vh(13);
  margin-left: vw(12);
}

.righttit {
  width: vw(524);
  height: vh(42);
  font-size: 24px;

  // margin-left:vw(32);
  line-height: vh(42);
  text-align: center;
  background: url("@/assets/imgs/title_bg.png") no-repeat;
}

.righttit2 {
  width: vw(524);
  height: vh(42);
  margin-top: vh(80);
  font-size: 24px;
  line-height: vh(42);
  text-align: center;
  background: url("@/assets/imgs/title_bg.png") no-repeat;
}

.echart1 {
  width: vw(500);
  height: vh(277);
  margin-top: vh(58);
  background: #0236b1;
  border: 1px solid #91a9ff;
  box-shadow: 0 0 10px 5px #052eff;
  opacity: 0.6;
}

.echart2 {
  width: vw(500);
  height: vh(277);
  margin-top: vh(61);
  background: #0236b1;
  border: 1px solid #91a9ff;
  box-shadow: 0 0 10px 5px #052eff;
  opacity: 0.6;
}
</style>
