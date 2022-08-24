/*
 * @Author: your name
 * @Date: 2020-05-11 10:44:46
 * @LastEditTime: 2022-08-23 17:44:43
 * @LastEditors: 易木
 * @Description: In User Settings Edit
 * @FilePath: \lightning-proofreading\src\api\data.js
 */
import axios from "@/libs/api.request";

///文字审校
export const proofreadingText = (brand_type, article, async, video) => {
  return axios.request({
    url: "/text-revise/check-article",
    method: "post",
    data: { article, brand_type, async, video },
    params: { brand_type },
  });
};

//根据id异步获取文字校验结果
export const asyncProofreadingRes = (brand_type, pid) => {
  return axios.request({
    url: "/text-revise/get-async-result",
    method: "post",
    data: { pid },
    params: { brand_type },
  });
};
