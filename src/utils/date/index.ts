import dayjs from "dayjs";
import moment from "moment";
/**
 * 获取时间间隔
 * @param period
 */
export const getDatePeriod = (
  period: "1" | "3" | "6" | "12" | "24",
  startDate?: Date
): (Date | dayjs.Dayjs)[] => {
  const now = startDate ? new Date(startDate) : new Date();

  if (period === "1") {
    return [dayjs(now), dayjs(now).add(1, "month").subtract(1, "day")];
  }
  if (period === "3") {
    return [dayjs(now), dayjs(now).add(3, "month").subtract(1, "day")];
  }
  if (period === "6") {
    return [dayjs(now), dayjs(now).add(6, "month").subtract(1, "day")];
  }
  if (period === "12") {
    return [dayjs(now), dayjs(now).add(12, "month").subtract(1, "day")];
  }

  return [dayjs(now), dayjs(now).add(24, "month").subtract(1, "day")];
};

/**
 * 通过时间间隔获取月份和天数
 * @param start
 * @param end
 */
export const getDateMonthAndDays = (start: Date, end: Date) => {
  let getDateByAddMonth = (start, months) => {
    return dayjs(start).add(months, "months").subtract(1, "days");
  };

  // 计算两个日期间隔天数
  let calculateDays = (start, end, isInCludeStartDate) => {
    let intervalSeconds = dayjs(end).unix() - dayjs(start).unix();
    let days = parseInt(String(intervalSeconds / (60 * 60 * 24)));

    return isInCludeStartDate ? days + 1 : days;
  };

  if (!start || !end) return;

  // 若结束日期小于开始日期，则将两者互换一下
  if (dayjs(end).isBefore(start)) {
    [start, end] = [end, start];
  }

  let mStart = dayjs(start);
  let mEnd = dayjs(end);

  let intervalMonth = 0;
  let checkIsMonthly = () => {
    let m = 1;
    let comparedEnd = mStart;
    while (comparedEnd.isBefore(mEnd)) {
      comparedEnd = dayjs(getDateByAddMonth(start, m));

      if (comparedEnd.isSame(mEnd)) {
        intervalMonth = m;
        return true;
      }

      if (comparedEnd.isBefore(mEnd)) {
        intervalMonth = m;
      }

      m++;
    }

    return false;
  };

  if (checkIsMonthly()) {
    return {
      label: `${intervalMonth}个月`
    };
  } else {
    if (intervalMonth === 0) {
      let days = calculateDays(start, end, true);

      return {
        label: `${days}天`
      };
    } else {
      let latestEnd = getDateByAddMonth(start, intervalMonth);
      let days = calculateDays(latestEnd, end, false);
      return {
        label: `${intervalMonth}个月${days}天`
      };
    }
  }
};

// 格式化时间戳
export const transformToYMD = (val: moment.MomentInput = new Date()) => {
  return val ? moment(val).format("YYYY-MM-DD") : "-";
};

export const transformToYMDHM = (val: moment.MomentInput = new Date()) => {
  return val ? moment(val).format("YYYY-MM-DD HH:mm:ss") : "-";
};

export const transformToYMDHMS = (val: moment.MomentInput = new Date()) => {
  return val ? moment(val).format("YYYY-MM-DD HH:mm:ss") : "-";
};
export const transToTimestamp = (val = new Date()) => {
  return val ? dayjs(val).valueOf() : "";
};
export const transformToYMDs = (val: moment.MomentInput = new Date()) => {
  return val ? moment(val).format("YYYY-MM-DD") : "";
};
