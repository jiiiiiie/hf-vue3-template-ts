import { bignumber, chain } from "mathjs";
export const toThousand = (value: string, decimalPlaces = 2) => {
  return parseFloat(value + "")
    .toFixed(decimalPlaces)
    .replace(/\B(?=(\d{3})+\b)/g, ",");
};

// 加减乘除计算封装,参数数字只能number和null类型
/* eslint-disable */
export const calculate = {
  comp: function (_func, args) {
    let t = chain(bignumber(args[0]));
    for (let i = 1; i < args.length; i++) {
      if (typeof args[i] === "number" || args[i] === null) {
        t = t[_func](bignumber(args[i]));
      }
    }
    // 防止超过6位使用科学计数法
    return parseFloat(t.done());
  },
  //加
  add: function () {
    return this.comp("add", arguments);
  },
  //减
  subtract: function () {
    return this.comp("subtract", arguments);
  },
  //乘
  multiply: function () {
    return this.comp("multiply", arguments);
  },
  //除
  divide: function () {
    return this.comp("divide", arguments);
  }
};
