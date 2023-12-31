/*
 * @Author: 一品网络技术有限公司
 * @Date: 2022-08-18 10:06:45
 * @LastEditTime: 2022-09-13 19:43:20
 * @FilePath: \ypcmsvue3\src\components\autoload.js
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
 */
import { defineAsyncComponent } from "vue";
const components = import.meta.glob("./global/*/*.vue");
export default function install(app) {
  for (const [key, value] of Object.entries(components)) {
    const name = key.slice(key.lastIndexOf("/") + 1, key.lastIndexOf("."));
    app.component(name, defineAsyncComponent(value));
  }
}
