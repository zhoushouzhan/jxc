<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-08-09 13:21:13
 * @LastEditTime: 2022-09-02 17:08:52
 * @FilePath: \ypcmsvue3\src\pages\database\list.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>

  <div class="bg-white m-2">
    <div class="flex space-x-2 border-b items-center text-sm">
      <div class="border-b-2 border-gray-800 p-2 duration-300">数据表</div>
      <div class="p-2 cursor-pointer border-b-2 border-white hover:border-gray-400 duration-300" @click="dbimport">备份列表</div>
      <div class="p-2 cursor-pointer border-b-2 border-white hover:border-gray-400 duration-300" @click="dosql">执行SQL</div>
    </div>
    <div class="mt-2 p-2 text-sm">
      <div class="flex border-b bg-gray-100 leading-8">
        <div class="flex items-center px-2 border-r font-normal">
          <ypcheckbox value="all" v-model="checkedAll"></ypcheckbox>
        </div>
        <div class="w-32  border-r px-2">表名</div>
        <div class="w-32 border-r px-2">行数</div>
        <div class="w-40 border-r px-2">大小</div>
        <div class="w-32 border-r px-2">冗余</div>
        <div class="flex-1 text-left px-2 border-r">备注</div>
        <div class="w-28 text-center">操作</div>
      </div>
      <div class="flex hover:bg-blue-50 leading-10" v-for="(item,index) in dataList" :key="index" :class="{'bg-gray-100':index%2}">
        <div class="flex items-center px-2 border-r py-4">
          <ypcheckbox :value="item.name" v-model="selectIds"></ypcheckbox>
        </div>
        <div class="w-32 border-r px-2 text-gray-500  flex items-center">{{item.name}}</div>
        <div class="w-32 border-r px-2 text-gray-500 flex items-center">{{item.rows}}</div>
        <div class="w-40 border-r px-2 text-gray-500 flex items-center text-sm">{{formatFileSize(item.data_length)}}</div>
        <div class="w-32 border-r px-2 text-gray-500 flex items-center">{{item.data_free}}</div>
        <div class="flex-1 text-gray-500 flex items-center px-2 border-r text-sm">{{item.comment}}</div>
        <div class="w-28 text-center space-x-2 px-2 flex items-center justify-center">
          <div>
            <button class="yp-button yp-button-sm yp-button-gray rounded-sm" @click="viewcol(item)">查看字段</button>
          </div>
        </div>
      </div>
      <div class="mt-3 p-2 border-t">
        <button class="yp-button yp-button-orange rounded-sm" @click="dbexport">备份</button>
        <button class="yp-button yp-button-green rounded-sm mx-3" @click="dbrepair">修复</button>
        <button class="yp-button yp-button-pink rounded-sm" @click="dboptimize">优化</button>
      </div>
    </div>

  </div>

</template>
<script setup>
import {getData,postData,alter} from '@/api/data'
import Viewcol from './viewcol'
import Baklist from './baklist.vue'
import Dosql from './dosql'
import { watch, reactive, onMounted } from 'vue'
const emit = defineEmits(['jumpCom'])
const dataList = reactive([])
const viewcol = (item) => {
  emit('jumpCom', { to: Viewcol, item: item })
}
const dbimport = () => {
  emit('jumpCom', { to: Baklist })
}
const dosql = () => {
  emit('jumpCom', { to: Dosql })
}

const checkedAll = reactive([])
watch(checkedAll, (newVal, oldVal) => {
  if (newVal.length > 0) {
    selectIds.length = 0
    dataList.forEach((v) => {
      selectIds.push(v.name)
    })
  } else {
    selectIds.length = 0
  }
})
const selectIds = reactive([])
const formatFileSize = (bytes, decimalPoint = 2) => {
  if (bytes == 0) return '0 Bytes'
  let k = 1000,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k))
  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(decimalPoint)) + ' ' + sizes[i]
  )
}
const dbexport = async() => {

  const resp=await postData('/database/export',{tables:selectIds})
  if(resp.code==1){
    alter({ type: 'alter-success', text: resp.msg })
  }else{
    alter({ type: 'alter-error', text: resp.msg })
  }


}
const dboptimize = async() => {

  const resp=await postData('/database/optimize',{tables:selectIds})
  if(resp.code==1){
    alter({ type: 'alter-success', text: resp.msg })
  }else{
    alter({ type: 'alter-error', text: resp.msg })
  }

}
const dbrepair = async () => {

  const resp=await postData('/database/repair',{tables:selectIds})
  if(resp.code==1){
    alter({ type: 'alter-success', text: resp.msg })
  }else{
    alter({ type: 'alter-error', text: resp.msg })
  }

}
onMounted(async () => {
  const resp=await getData('/database')
  if (resp.code == 1) {
    dataList.length=0
    resp.data.map((item, index) => {
      dataList.push(item)
    })
  }
})
</script>
