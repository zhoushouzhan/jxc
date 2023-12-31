/*
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-01 09:11:03
 * @LastEditTime: 2022-10-26 20:43:12
 * @FilePath: \vue3\src\components\Confirm.js
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
 */

import { createVNode, render } from "vue";
import Confirm from "./Confirm.vue";

const div = document.createElement("div");
div.setAttribute(
  "class",
  "w-full flex justify-center absolute z-50 top-1/4 text-sm"
);
document.body.appendChild(div);
export default ({ title, text }) => {
  return new Promise((reslove, reject) => {
    const submitCallback = () => {
      render(null, div);
      reslove();
    };
    const cancelCallback = () => {
      render(null, div);
      reject();
    };
    const VNode = createVNode(Confirm, {
      title,
      text,
      submitCallback,
      cancelCallback,
    });
    render(VNode, div);
  });
};
