<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-09-13 21:23:37
 * @LastEditTime: 2022-09-20 12:12:00
 * @FilePath: \ypcmsvue3\src\components\global\ypmenu\menuItem.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <template v-if="list.children && list.children.length > 0">
    <div>
      <div class="pre-item flex items-center" :style="'padding-left:'+leave+'em'" @click.stop="menuSwitch.selected(list)" :class="menuSwitch.chitem.value.id==list.id?' text-red-500':''">
        <i class="ri-subtract-line px-1" v-if="menuSwitch.opens.indexOf(list.id)>=0" @click.stop="menuSwitch.toggle(list.id)"></i>
        <i class="ri-add-line px-1" v-else @click.stop="menuSwitch.toggle(list.id)"></i>
        {{list.title}}
      </div>
      <div class="duration-300" :class="menuSwitch.opens.indexOf(list.id)>=0?'max-h-auto':'max-h-0 overflow-hidden'">
        <menu-item :list="item" :key="index" v-for="(item,index) in list.children" :leave="leave+1"></menu-item>
      </div>
    </div>
  </template>
  <div class="end-item" v-else :class="menuSwitch.chitem.value.id==list.id?'text-red-500':''">
    <div :style="'padding-left:'+leave+'em'" class="flex items-center" style="white-space:nowrap" @click.stop="menuSwitch.selected(list)" v-if="!list.islast">
      <i class="ri-arrow-drop-right-fill px-1"></i>{{list.title}}
    </div>
    <div :style="'padding-left:'+leave+'em'" class="flex items-center" style="white-space:nowrap" @click.stop="menuSwitch.noselect('终极栏目不可选')" v-else>
      <i class="ri-arrow-drop-right-fill px-1"></i>{{list.title}}
    </div>
  </div>
</template>
<script setup>
import { inject } from 'vue'
const props = defineProps({ list: { default: [] }, leave: { default: 0 } })
const menuSwitch = inject('menu-switch')
</script>