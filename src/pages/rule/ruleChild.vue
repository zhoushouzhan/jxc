<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-10 17:23:23
 * @LastEditTime: 2022-09-26 09:24:57
 * @FilePath: \ypcmsvue3\src\pages\rule\ruleChild.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div :class="itemStyle.outClassname">
    <div class="flex hover:bg-gray-500 hover:text-white leading-10 border-b">
      <div class="text-center md:w-20 border-r w-8">{{item.id}}</div>
      <div class="md:w-48 pl-2 flex justify-between flex-1 md:flex-initial" @click="handleClick">
        <div>
          {{indent(leave)}}{{item.meta.title}}
        </div>
        <div class="flex items-center">
          <i class="ri-arrow-right-s-line duration-200 text-xl mr-2 inline-block" :class="itemStyle.iconClassname"></i>
        </div>
      </div>
      <div class="md:w-32 pl-2 hidden md:block"> {{typeName[item.type]}}</div>
      <div class="md:w-32 pl-2 hidden md:block text-center"> <i :class="item.icon" class="ri-lg"></i></div>
      <div class="md:w-32 pl-2 hidden md:block text-center"> {{item.sort}}</div>
      <div class="md:w-32 pl-2 hidden md:block text-center"> {{item.status?'开启':'关闭'}}</div>
      <div class="text-center space-x-2 px-1 w-40 leading-none flex items-center" v-if="item.mod!='category'">
        <button type="button" class="btn btn-lan" @click="setcom.edit(item.id)">编辑</button>
        <button type="button" class="btn btn-hong" @click="setcom.destory(item.id)">删除</button>
      </div>
    </div>
    <div class="duration-200" :class="itemStyle.childClassname">
      <template v-for="(itemX,index) in item.children">
        <ruleChild v-if="itemX.children&&itemX.children.length>0" :item="itemX" :leave="leave+1" :key="index" :basePath="resolvePath(itemX.path)" />
        <ruleItem v-else :item="itemX" :leave="leave+1" :key="index+1" />
      </template>
    </div>
  </div>
</template>
<script setup>
import { inject, computed } from 'vue'
import ruleItem from './ruleItem.vue'

const emit = defineEmits(['jumpCom'])
const typeName = { 1: '目录', 2: '页面' }
const setcom = inject('setcom')
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  basePath: {
    default: ''
  },
  leave: {
    type: Number,
    required: true
  }
})
const indent = (n) => {
  let preline = ''
  for (let i = 0; i < n; i++) {
    preline += '----'
  }
  return preline
}

const handleClick = () => {
  setcom.clickSubMenu(props.basePath)
}
//响应式展开子菜单
const itemStyle = computed(() => {
  if (setcom.openedRules.path.includes(props.basePath)) {
    return {
      outClassname: 'bg-gray-400 bg-opacity-30',
      iconClassname: 'rotate-90',
      childClassname: 'max-h-[3000px]'
    }
  } else {
    return {
      outClassname: '',
      iconClassname: '',
      childClassname: 'max-h-0 overflow-hidden'
    }
  }
})
const resolvePath = (routePath) => {
  return props.basePath + routePath
}
</script>