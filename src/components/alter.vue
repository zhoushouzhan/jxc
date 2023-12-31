<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-06-22 17:28:55
 * @LastEditTime: 2022-06-26 18:34:47
 * @FilePath: \ypcms2.0\vite-project\src\components\alter.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <transition enter-active-class="animate__animated animate__fadeInDown" leave-active-class="animate__animated animate__fadeOutUp">
    <div :class="type" v-if="show">
      {{text}}
    </div>
  </transition>
</template>
<script setup>
import { ref, render } from 'vue'
const show = ref(false)
const wait = ref(false)
const props = defineProps({
  text: {
    type: String,
    default: '什么消息也没有'
  },
  type: {
    type: String,
    default: 'default'
  }
})
const div = document.querySelector('.mc')

let timer = null
let timer2 = null

clearTimeout(timer)
clearTimeout(timer2)

setTimeout(() => {
  show.value = true
}, 10)
const close = () => {
  timer2 = setTimeout(() => {
    show.value = false
  }, 1900)
  timer = setTimeout(() => {
    render(null, div)
  }, 3000)
}
close()
div.onmouseenter = () => {
  clearTimeout(timer)
  clearTimeout(timer2)
}
div.onmouseleave = () => {
  close()
}
</script>
