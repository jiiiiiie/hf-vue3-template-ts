import type { RouteRecordRaw } from "vue-router";
import { defineAsyncComponent } from "vue";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    redirect: "home"
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录"
    },
    component: defineAsyncComponent(() => import("@/views/Login/Login.vue"))
  },
  {
    path: "/home",
    name: "home",
    meta: {
      title: "首页"
    },
    component: defineAsyncComponent(() => import("@/views/Home/index.vue"))
  },
  {
    path: "/dataAnalysis",
    name: "dataAnalysis",
    meta: {
      title: "数据分析"
    },
    component: defineAsyncComponent(() => import("@/views/DataAnalysis/index.vue"))
  },
  {
    path: "/leaseOverview",
    name: "leaseOverview",
    meta: {
      title: "租赁数据概览"
    },
    component: defineAsyncComponent(() => import("@/views/LeaseOverview/index.vue"))
  },
  {
    path: "/transactionData",
    name: "transactionData",
    meta: {
      title: "交易数据概览"
    },
    component: defineAsyncComponent(() => import("@/views/TransactionData/index.vue"))
  },

  // https://router.vuejs.org/zh/guide/migration/index.html#%E5%88%A0%E9%99%A4%E4%BA%86-%EF%BC%88%E6%98%9F%E6%A0%87%E6%88%96%E9%80%9A%E9%85%8D%E7%AC%A6%EF%BC%89%E8%B7%AF%E7%94%B1
  // pathMatch 是参数的名称，例如，跳转到 /not/found 会得到
  // { params: { pathMatch: ['not', 'found'] } }
  // 这要归功于最后一个 *，意思是重复的参数，如果你
  // 打算直接使用未匹配的路径名称导航到该路径，这是必要的
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../components/GlobalErrorPage/GlobalErrorPage.vue")
  }
];
