/*
 * @Author: your name
 * @Date: 2020-05-11 10:45:42
 * @LastEditTime: 2022-08-23 16:58:02
 * @LastEditors: 易木
 * @Description: In User Settings Edit
 * @FilePath: \copy1111\src\libs\api.request.js
 */
import HttpRequest from "@/libs/axios";
import config from "@/config";
const baseUrl = "https://shandianyun-article.iqilu.com";

const axios = new HttpRequest(baseUrl);
export default axios;
