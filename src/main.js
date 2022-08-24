/*
 * @Author: your name
 * @Date: 2020-07-23 09:48:43
 * @LastEditTime: 2022-08-24 09:49:17
 * @LastEditors: 易木
 * @Description: In User Settings Edit
 * @FilePath: \lightning-proofreading\src\main.js
 */

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import ViewUI from 'view-design';
import "view-design/dist/styles/iview.css";
import config from "@/config";
// Vue.use(ViewUI);
Vue.config.productionTip = false;
Vue.prototype.$config = config;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
