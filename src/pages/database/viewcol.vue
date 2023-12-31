<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-08-09 17:27:44
 * @LastEditTime: 2022-09-02 17:05:35
 * @FilePath: \ypcmsvue3\src\pages\database\viewcol.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div class="bg-white m-2 p-2">
    <div class="p-3 text-lg uppercase">{{tb.item.data.name}}</div>
    <div class="flex p-2 font-bold border-t text-sm">
      <div class="w-44 px-2">字段名</div>
      <div class="w-44 px-2">类型</div>
      <div class="w-44 px-2">注释</div>
    </div>
    <div class="flex p-2 border-t text-sm hover:bg-blue-50" v-for="(item,index) in dataList" :key="index" :class="{'bg-gray-100':index%2}">
      <div class="w-44 px-2">{{item.column_name}}</div>
      <div class="w-44 px-2">{{item.column_type}}</div>
      <div class="w-44 px-2 text-lime-700">{{item.column_comment}}</div>
    </div>
    <div class="p-3 text-center border-t">
      <button class="yp-button yp-button-red rounded-sm" @click="goback">返回</button>
    </div>
  </div>
</template>
<script setup>
import {getData} from "@/api/data"
import { inject, onMounted, reactive } from 'vue'
import List from './list.vue'
const dataList = reactive([])
const tb = inject('getTb')
const emit = defineEmits(['jumpCom'])
const goback = () => {
  emit('jumpCom', { to: List, item: [] })
}
onMounted(() => {
  getData('/database/column', { tables: tb.item.data.name })
    .then((res) => {
      res.data.map((item) => {
        dataList.push(item)
      })
    })
})
</script>
