/*
 * @Descripttion:
 * @Author: zhuaoqi
 * @Date: 2022-09-10 18:33:52
 * @LastEditors: zhuaoqi
 * @LastEditTime: 2022-09-11 02:08:27
 */
/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "nodemailer";
interface Window {
  /** 关闭预加载动画 */
  ClosePreloadLoading: () => void;
  /** 运行时环境 */
  APP_ENV: "development" | "production";
}
