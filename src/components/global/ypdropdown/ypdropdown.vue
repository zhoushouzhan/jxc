<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-06-24 08:28:32
 * @LastEditTime: 2022-06-24 09:31:38
 * @FilePath: \ypcms2.0\vite-project\src\components\DropDown.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
    <div class="relative w-20 text-center" @mouseenter="open=1" @mouseleave="open=0">
      <div ref="titleBox">
        <slot></slot>
      </div>
      <transition v-bind="hanimation">
        <div class="absolute text-left z-50" :class="pos" v-show="open">
          <div class="w-full overflow-hidden duration-300 flex flex-col text-gray-800 rounded-sm bg-white shadow border">
          <template v-for="(item,index) in dataList" :key="index">
            <div class="hover:bg-gray-200 py-2 px-2 text-sm flex items-center" @click="emit('dropevent',item.type)">
              <div v-if="item.icon" class="px-1">
                <i :class="item.icon"></i>
              </div>
              <div>{{item.title}}</div>
            </div>
          </template>
        </div>
        </div>
      </transition>
    </div>
  </template>
  <script setup>
  import { ref } from "vue"
  const props=defineProps({
    dataList:{
      type:Object,
      default:[]
    },
    pos:{
      type:String,
      default:'left-0'
    }
  })
  const emit=defineEmits(['dropevent'])
  const open=ref(0)
  const titleBox=ref(null)
  const hanimation={
          onEnter(el){
              el.style.height='auto'
              const endH=window.getComputedStyle(el).height
              el.style.height='0px'
              el.offsetHeight
              el.style.height=endH
              el.style['padding-top']=(titleBox.value.clientHeight+5)+'px'
          },
          onAfterEnter(el){
              el.style.height = null
          },
          onLeave(el){
              el.style.height = window.getComputedStyle(el).height
              el.offsetHeight
              el.style.height = '0px'
          },
          onAfterLeave(el){
              el.style.height = null
          }
      }

  </script>
