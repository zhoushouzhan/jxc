<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-08-09 13:21:22
 * @LastEditTime: 2022-09-02 17:07:46
 * @FilePath: \ypcmsvue3\src\pages\database\baklist.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div class="bg-white m-2">
    <div class="flex space-x-2 border-b items-center text-sm">
      <div class="p-2 cursor-pointer border-b-2 border-white hover:border-gray-400 duration-300" @click="dbtbs">数据表</div>
      <div class="border-b-2 border-gray-800 p-2 duration-300">备份列表</div>
      <div class="p-2 cursor-pointer border-b-2 border-white hover:border-gray-400 duration-300" @click="dosql">执行SQL</div>
    </div>
    <div class="m-3 border-b">
      <div class="flex p-2 font-bold mt-3 bg-gray-200">
        <div class="w-52 px-2">备份文件</div>
        <div class="w-44 px-2">文件数</div>
        <div class="w-44 px-2">压缩格式</div>
        <div class="w-44 px-2">数据大小</div>
        <div class="w-44 px-2 flex-1">创建时间</div>
        <div class="w-36 px-2 text-center">操作</div>
      </div>

      <div class="flex space-x-3 p-2 border-t text-sm hover:bg-green-50" v-for="(item,index) in dataList" :key="index" :class="rowclassname(index)">
        <div class="w-52 px-2 flex items-center border-r cursor-pointer" @click="download(item.name)" v-tooltip.bottom="'下载备份文件'">
          {{item.filename}}
        </div>
        <div class="w-44 px-2 flex items-center border-r">{{item.part}}</div>
        <div class="w-44 px-2 flex items-center">{{item.compress}}</div>
        <div class="w-44 px-2 flex items-center">{{formatFileSize(item.size)}}</div>
        <div class="w-44 px-2 flex-1 flex items-center">{{item.nameDate}}</div>
        <div class="w-36 px-2 flex items-center justify-center">
          <button class="yp-button yp-button-blue yp-button-sm rounded-sm mr-2" @click="restory(item.name)">还原</button>
          <button class="yp-button yp-button-red  yp-button-sm rounded-sm" @click="destory(item.name)">删除</button>
        </div>
      </div>
    </div>

    <div class="p-3 text-center">
      <button class="yp-button yp-button-red rounded-sm" @click="goback">返回</button>
    </div>
  </div>
</template>
<script setup>
import {getData,postData,alter,Download} from '@/api/data'
import { inject, onMounted, reactive } from 'vue'
import List from './list.vue'
import Dosql from './dosql.vue'
const dataList = reactive([])
const tb = inject('getTb')
const emit = defineEmits(['jumpCom'])
const goback = () => {
  emit('jumpCom', { to: List, item: [] })
}
const dbtbs = () => {
  emit('jumpCom', { to: List, item: [] })
}
const dosql = () => {
  emit('jumpCom', { to: Dosql })
}
const rowclassname = (num) => {
  if (num % 2) {
    return 'bg-gray-100'
  } else {
    return ''
  }
}
const formatFileSize = (bytes, decimalPoint = 2) => {
  if (bytes == 0) return '0 Bytes'
  let k = 1000,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k))
  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(decimalPoint)) + ' ' + sizes[i]
  )
}
const destory = async (name) => {

  const resp= await getData('/database/delete',{name:name})
  if (resp.code == 1) {
    alter({ type: 'alter-success', text: resp.msg })
    getBakList()
  } else {
    alter({ type: 'alter-error', text: resp.msg })
  }

}

const restory = async (name) => {
  const resp= await getData('/database/import',{name:name})
  if (resp.code == 1) {
      alter({ type: 'alter-success', text: resp.msg })
    } else {
      alter({ type: 'alter-error', text: resp.msg })
    }
}

//下载
const download = async (name) => {
  Download('/database/download', { name: name }).then((res) => {
    let blob = new Blob([res.data])
    let contentDisposition = res.headers['content-disposition']
    let patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
    let result = patt.exec(contentDisposition)
    let thename = decodeURI(result[1]) //使用decodeURI对名字进行解码
    let downloadElement = document.createElement('a')
    let href = window.URL.createObjectURL(blob) //创建下载的链接
    downloadElement.style.display = 'none'
    downloadElement.href = href
    downloadElement.download = thename //下载后文件名
    document.body.appendChild(downloadElement)
    downloadElement.click() //点击下载
    document.body.removeChild(downloadElement) //下载完成移除元素
    window.URL.revokeObjectURL(href) //释放掉blob对象
  })
}
const getBakList = async () => {
  dataList.length = 0
  getData('/database/importList').then((res) => {
    res.data.map((item) => {
      dataList.push(item)
    })
  })
}
onMounted(() => {
  getBakList()
})
</script>
