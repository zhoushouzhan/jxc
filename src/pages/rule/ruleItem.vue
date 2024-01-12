<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-10 17:23:23
 * @LastEditTime: 2022-09-26 09:25:20
 * @FilePath: \ypcmsvue3\src\pages\rule\ruleItem.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div class="flex hover:bg-gray-500 hover:text-white leading-10 border-b">
    <div class="text-center md:w-20 border-r w-8">{{item.id}}</div>
    <div class="pl-2 flex-1 md:flex-initial md:w-48">{{indent(leave)}}{{item.meta.title}}</div>
    <div class="md:w-32 pl-2 hidden md:block">{{typeName[item.type]}}</div>
    <div class="md:w-32 pl-2 hidden md:block text-center"> <i :class="item.icon" class="ri-lg"></i></div>
    <div class="md:w-32 pl-2 hidden md:block text-center"> {{item.sort}}</div>
    <div class="md:w-32 pl-2 hidden md:block text-center">{{item.status?'开启':'关闭'}}</div>
    <div class="text-center space-x-2 px-1 w-40 leading-none flex items-center" v-if="item.mod!='category'">
      <button type="button" class="btn btn-lan" @click="setcom.edit(item.id)">编辑</button>
      <button type="button" class="btn btn-hong" @click="setcom.destory(item.id)">删除</button>
    </div>
  </div>
</template>
<script setup>
import { inject } from 'vue'
const setcom = inject('setcom')
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  leave: {
    type: Number,
    required: true
  }
})
const typeName = { 1: '目录', 2: '页面' }
const indent = (n) => {
  let preline = ''
  for (let i = 0; i < n; i++) {
    preline += '----'
  }
  return preline
}
</script>