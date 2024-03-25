import request from "@/config/axios";

// 分散式/集中式 本月营收/年营收总额
export const getApartmentRevenue = (params: any) => {
  return request.get({ url: "report/indicatorAnalysis/apartmentRevenueByType", params });
};
// 分散式/集中式 本月营收/年营收总额
export const revenueByTypeAndTime = (params: any) => {
  return request.get({ url: "report/indicatorAnalysis/revenueByTypeAndTime", params });
};
