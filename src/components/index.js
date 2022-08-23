/*
 * @Author: 易木
 * @Date: 2022-08-23 16:29:11
 * @LastEditors: 易木
 * @LastEditTime: 2022-08-23 16:49:57
 * @FilePath: \copy1111\src\components\index.js
 * @Description:
 *
 * Copyright (c) 2022 by 信通, All Rights Reserved.
 */
import lightningProofreading from "./proofreading-dom.vue";
lightningProofreading.install = function(Vue) {
  Vue.component(lightningProofreading.name, lightningProofreading);
};
export default lightningProofreading;
