/*
 * @Author: 一品网络技术有限公司
 * @Date: 2022-06-22 17:40:07
 * @LastEditTime: 2022-07-01 12:32:18
 * @FilePath: \ypcms2.0\vite-project\src\components\alter.js
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
 */
import { createVNode, render } from 'vue'
import Alter from './alter.vue'
const div = document.createElement('div')
div.setAttribute('class', 'mc')
document.body.appendChild(div)

export default ({ type, text }) => {
    const vnode = createVNode(Alter, { type, text })
    render(vnode, div)

}
