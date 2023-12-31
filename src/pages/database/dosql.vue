<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-08-09 13:21:17
 * @LastEditTime: 2022-08-11 14:52:48
 * @FilePath: \vite-project\src\pages\database\Dosql.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div class="bg-white m-2">
    <div class="flex space-x-2 border-b items-center text-sm">
      <div class="p-2 cursor-pointer border-b-2 border-white hover:border-gray-400 duration-300" @click="goback">数据表</div>
      <div class="p-2 cursor-pointer border-b-2 border-white hover:border-gray-400 duration-300" @click="dbimport">备份列表</div>
      <div class="border-b-2 border-gray-800 p-2 duration-300" @click="dosql">执行SQL</div>
    </div>
    <div class="p-3">
      <textarea v-model="inputValue" class="yp-textarea" @input="autoHeight($event)" ref="yptextarea" placeholder="请输入SQL语句，关系重大，请谨慎操作。"></textarea>
    </div>
    <div class="p-3">
      <button class="yp-button yp-button-red rounded-sm" @click="readygo">运行</button>
    </div>
    <div class="p-3 text-sm divide-y text-gray-500">
      <div class="py-1">1、数据表前缀可用：&quot; [!pre!] &quot;表示</div>
      <div class="py-1">2、执行SQL语句关系重大，请做好备份。</div>
    </div>
  </div>
</template>
<script setup>
import {postData,alter} from '@/api/data'
import { ref } from 'vue'
import List from './list.vue'
import Baklist from './baklist.vue'
const emit = defineEmits(['jumpCom'])
const goback = () => {
  emit('jumpCom', { to: List, item: [] })
}
const dbimport = () => {
  emit('jumpCom', { to: Baklist })
}
const inputValue = ref('')
const yptextarea = ref(null)
const autoHeight = (e) => {
  yptextarea.value.style.height = 'auto'
  const height = yptextarea.value.scrollHeight
  if (height && height > 54) {
    yptextarea.value.style.height = height + 'px'
  }
}
const readygo = () => {
  postData('/database/dosql', { query: inputValue.value })
    .then((res) => {
      if (res.code == 1) {
        alter({ type: 'alter-success', text: res.msg })
      } else {
        alter({ type: 'alter-error', text: res.msg })
      }
    })
}
</script>
