<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-09-13 21:23:37
 * @LastEditTime: 2022-10-08 11:12:11
 * @FilePath: \vue3\src\pages\permissions\roles\ruleItem.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <template v-if="list.children && list.children.length > 0">
    <div>
      <div class="pre-item flex items-center" :style="'padding-left:'+leave+'em'">
        <i class="ri-subtract-line px-1 ri-lg" v-if="menuSwitch.opens.indexOf(list.id)>=0" @click.stop="menuSwitch.toggle(list.id)"></i>
        <i class="ri-add-line px-1 ri-lg" v-else @click.stop="menuSwitch.toggle(list.id)"></i>
        <ckbox :value="list.id" :title="list.title" v-model="menuSwitch.chitem" @click.stop="menuSwitch.checked(list.id)" />
        <div class="flex-1"></div>

      </div>
      <div class="duration-300" :class="menuSwitch.opens.indexOf(list.id)>=0?'max-h-auto':'max-h-0 overflow-hidden'">
        <rule-item :list="item" :key="index" v-for="(item,index) in list.children" :leave="leave+1">
        </rule-item>
      </div>
    </div>
  </template>
  <div class="end-item" v-else>
    <div :style="'padding-left:'+leave+'em'" class="flex items-center">
      <i class="ri-arrow-drop-right-fill px-1 ri-lg"></i>
      <ckbox :value="list.id" :title="list.title" v-model="menuSwitch.chitem" @click.stop="menuSwitch.checked(list.id)" />
    </div>
  </div>
</template>
  <script setup>
import ckbox from './ckbox.vue'
import { inject } from 'vue'
const props = defineProps({ list: { default: [] }, leave: { default: 0 } })
const menuSwitch = inject('menu-switch')
</script>