/*
 * @Descripttion:
 * @Author: zhuaoqi
 * @Date: 2022-09-10 18:33:52
 * @LastEditors: zhuaoqi
 * @LastEditTime: 2022-09-11 02:08:35
 */
import { createApp } from "vue";
import App from "./App.vue";
// 引入element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App)
  .use(ElementPlus, { zIndex: 3000, size: "large" })
  .mount("#app")
  .$nextTick(window.ClosePreloadLoading);
