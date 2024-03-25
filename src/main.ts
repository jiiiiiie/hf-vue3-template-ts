import { createApp } from "vue";
import store from "./stores";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
// 引入 element-plus
import { setupElementPlus } from "@/plugins/elementPlus";
// 全局组件
import { setupGlobCom } from "@/components";
import "animate.css";
import "element-plus/dist/index.css";
import "./styles/index.scss";
const app = createApp(App);
setupElementPlus(app);
setupGlobCom(app);
app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
