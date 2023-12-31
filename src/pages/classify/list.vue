<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-01 08:36:59
 * @LastEditTime: 2022-09-17 12:44:56
 * @FilePath: \ypcmsvue3\src\pages\classify\list.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <yplayout>
    <template #header="props">
      <div class="flex items-center">
        <i class="ri-2x text-gray-500 ml-2" :class="props.meta.icon||'ri-information-line'"></i>
        <div class="text-xl px-2" v-html="props.meta.title||'无限分类'"></div>
        <div class="text-gray-400">主要用于一些选项、菜单、联动数据</div>
      </div>
      <div class="flex-1"></div>
      <button class="yp-button rounded py-2" type="button" @click="add" v-if="pid==0">
        <i class="ri-add-line ri-lg pr-1"></i>
        增加分类
      </button>
      <button class="yp-button yp-button-gray rounded py-2" type="button" @click="goback" v-else>
        返回
        <i class="ri-reply-line pl-1"></i>
      </button>
    </template>
    <template #list>
      <div class="flex border-b bg-gray-100 leading-8 font-bold">
        <div class="text-center md:w-20 border-r w-8">Id</div>
        <div class="md:w-38 pl-2 flex-1 md:flex-initial">名称</div>
        <div class="flex-1 hidden md:block"></div>
        <div class="w-14 text-center px-2">操作</div>
      </div>
      <div class="flex hover:bg-gray-200 leading-10" v-for="(item,index) in dataList" :key="index" :class="{'bg-gray-100':index%2}">
        <div class="text-center md:w-20 border-r w-8">{{item.id}}</div>
        <div class="md:w-38 pl-2 flex-1 flex md:flex-initial justify-between items-center" :class="{'cursor-pointer':item.havesid}" @click="openClass(item)">
          <i class="ri-add-line pr-1" v-if="item.havesid"></i>{{item.title}}
        </div>
        <div class="flex-1 hidden md:block"></div>
        <div class="text-center space-x-2 px-2">
          <button class="yp-button yp-button-sm rounded" @click="edit(item)"><i class="ri-edit-box-line"></i></button>
          <button class="yp-button yp-button-sm yp-button-orange rounded" @click="add(item)"><i class="ri-add-line"></i></button>
          <button class="yp-button yp-button-sm yp-button-red rounded" @click="destory(item.id)"><i class="ri-delete-bin-4-line"></i></button>
        </div>
      </div>
    </template>
  </yplayout>
</template>
<script setup name="classifyList">
import { ref, reactive, watch, getCurrentInstance } from 'vue'
import Add from './add'
import Edit from './edit'
const { proxy } = getCurrentInstance()
const dataList = reactive([])
const pid = ref(0)
const path = ref('')
const emit = defineEmits(['jumpCom'])
const add = (item) => {
  emit('jumpCom', { to: Add, item: item })
}
const edit = (item) => {
  emit('jumpCom', { to: Edit, item: item })
}
const destory = (id) => {
  proxy
    .$Confirms({ text: '确认删除吗？' })
    .then(() => {
      proxy.$http.post('/classify/delete', { ids: id }).then((res) => {
        if (res.code) {
          proxy.$Alter({ type: 'alter-success', text: res.msg })
          getDataList()
        } else {
          proxy.$Alter({ type: 'alter-error', text: res.msg })
        }
      })
    })
    .catch((e) => {})
}

watch(pid, (newVal) => {
  if (newVal) {
    getDataList()
  }
})
//展开子目录
const openClass = (item) => {
  if (item.havesid) {
    pid.value = item.id
    path.value = item.path
  }
}
//返回
const goback = () => {
  let arr = path.value.split(',')
  arr = arr.filter((s) => {
    return s && s.trim()
  })
  pid.value = arr[arr.length - 1]
  arr.pop()
  path.value = arr.toString()
}
const getDataList = async () => {
  const resp = await proxy.$http.get('/classify', {
    pid: pid.value
  })
  if (resp.code) {
    dataList.length = 0
    resp.data.forEach((item) => {
      dataList.push(item)
    })
  }
}
getDataList()
</script>
