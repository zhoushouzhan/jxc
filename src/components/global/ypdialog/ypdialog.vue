<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-09-23 15:18:56
 * @LastEditTime: 2022-09-27 07:16:26
 * @FilePath: \ypcmsvue3\src\components\global\ypdialog\ypdialog.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div class="absolute w-full h-full bg-black top-0 left-0 bg-opacity-40 z-40" v-show="mask"></div>
  <div class="dialog z-50" ref="dialog" id="dialogBox" v-drag:drag="fullscreen" v-show="isLoad">
    <div class="flex">
      <div class="font-bold">{{title}}</div>
      <div class="flex-1 drag cursor-move"></div>
      <div class="flex items-center space-x-2">
        <i class=" hover:text-red-700" :class="{'ri-fullscreen-exit-line':fullscreen,'ri-fullscreen-line':!fullscreen}" @click.stop="fullscreen=!fullscreen,resetW()"></i>
        <i class="ri-close-line hover:text-red-700" @click="$emit('close')"></i>
      </div>
    </div>
    <div class="py-3 overflow-auto min-h-[300px]">
      <slot>默认内容</slot>
    </div>

  </div>
</template>
<script setup>
import { onMounted, ref, reactive, watch, nextTick } from 'vue'
const props = defineProps({
  width: null,
  mask: Number,
  title: { type: String, default: '标题内容' }
})
const emits = defineEmits(['close'])
const fullscreen = ref(false)
const dialog = ref(null)
const isLoad=ref(false)



const resetW=()=>{
  const dialogBox=document.querySelector("#dialogBox")
  if(fullscreen.value){
    dialogBox.style.width = '100%'
    dialogBox.style.height = '100%'
    dialogBox.style.left='0'
    dialogBox.style.top='0'
    dialogBox.style.transform='translateX(0)'
    console.log('放大')
  }else{
    setTimeout(()=>{
      dialogBox.style.width = props.width + 'px'
      dialogBox.style.height = 'auto'
      dialogBox.style.left='50%'
      dialogBox.style.top='22%'
      dialogBox.style.transform='translateX(-50%)'
    },10)
  }
}
onMounted(() => {
  isLoad.value = true
  resetW()
})
</script>
