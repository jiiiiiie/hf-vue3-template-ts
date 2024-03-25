import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { getAccessToken } from "@/utils/auth";
import { useNProgress } from "@/hooks/web/useNProgress";
import { useDictStoreWithOut } from "@/stores/modules/dict";
import { useUserStoreWithOut } from "@/stores/modules/user";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
// 路由不重定向白名单
const whiteList = ["/login"];
const { start, done } = useNProgress();
// 路由加载前

/* eslint-disable */
router.beforeEach(async (to, from, next) => {
  start();
  if (getAccessToken()) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      // 获取所有字典
      const dictStore = useDictStoreWithOut();
      const userStore = useUserStoreWithOut();
      if (!dictStore.getIsSetDict) {
        await dictStore.setDictMap();
      }
      if (!userStore.getIsSetUser) {
        await userStore.setUserInfoAction();
      }
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.fullPath}`); // 否则全部重定向到登录页
    }
  }
});
/* eslint-disable */

router.afterEach((to) => {
  done(); // 结束Progress
});
export default router;
