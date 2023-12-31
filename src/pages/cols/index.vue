<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-01 08:36:59
 * @LastEditTime: 2022-10-25 12:12:08
 * @FilePath: \vue3\src\pages\cols\index.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <yplayout>
    <template #header="head">
      <i class="ri-2x text-gray-500 ml-2" :class="head.meta.icon||'ri-information-line'"></i>
      <div class="text-xl px-3" v-html="head.meta.title"></div>
      <div class="text-gray-400">建立模型前先录入字段</div>
      <div class="flex-1"></div>
      <div class="hidden md:block min-w-[500px]">
        <div class="flex space-x-1">
          <ypselect :itemList="formItem" v-model="searchParams.formItem"></ypselect>
          <ypinput v-model="searchParams.keyword" placeholder="关键词+回车" @keyup.enter="getList" class=" min-w-[200px]"></ypinput>
          <button class="yp-button yp-button-darkgreen rounded whitespace-nowrap" type="button" @click="add">
            <i class="ri-add-line ri-lg pr-1"></i>
            增加
          </button>
        </div>
      </div>
    </template>
    <template #list>
      <div>
        <div class="flex border-b bg-gray-100 leading-8 font-bold">
          <div class="text-center md:w-20 border-r w-8">Id</div>
          <div class="md:w-32 pl-2 flex-1 md:flex-initial">注释</div>
          <div class="md:w-32 pl-2 hidden md:block">字段</div>
          <div class="md:w-32 pl-2 hidden md:block">类型</div>
          <div class="md:w-32 pl-2 hidden md:block">表单元素</div>
          <div class="flex-1 pl-2 hidden md:block">扩展参数</div>
          <div class="w-14 text-center">操作</div>
        </div>
        <div class="flex hover:bg-slate-500 hover:text-white duration-300 leading-10" v-for="(item,index) in dataList" :key="index" :class="index%2?'bg-gray-100':''" @dblclick="edit(item.id)">
          <div class="text-center md:w-20 border-r w-8">{{item.id}}</div>
          <div class="md:w-32 pl-2 flex-1 md:flex-initial">{{item.alias}}</div>
          <div class="md:w-32 pl-2 hidden md:block">{{item.name}}</div>
          <div class="md:w-32 pl-2 hidden md:block">{{item.type}}</div>
          <div class="md:w-32 pl-2 hidden md:block">{{item.formitem}}</div>
          <div class="flex-1 pl-2 hidden md:block">{{item.extends}}</div>
          <div class="text-center space-x-2">
            <button class="yp-button yp-button-sm rounded" @click="edit(item.id)">编辑</button>
            <button class="yp-button yp-button-sm yp-button-red rounded" @click="destory(item.id)">删除</button>
          </div>
        </div>
        <yppage @topage="topage" :pageData="pageData" v-if="pageData.pageCount>1" class="mt-5" />
      </div>
    </template>
  </yplayout>
  <ypdialog width="1000" :title="dialogTitle" :mask="1" v-if="VisibleDialog" @close="VisibleDialog=false">
    <component :is='componentId' :id="colId" @close="VisibleDialog=false" @getList="getList"></component>
  </ypdialog>
</template>
<script setup>
import store from '@/store'
import { getData, postData, alter, confirms } from '@/api/data'
import { ref, reactive, watch, onMounted, shallowRef } from 'vue'
import Form from './form.vue'
const formItem = reactive([{id:'',title:'全部'}])
store.getters.formItem.forEach((item) => {
  formItem.push({ id: item.value, title: item.name })
})


const componentId = shallowRef('')
const dialogTitle = ref('')
const colId = ref(0)
const dataList = reactive([])

//分页
const  pageData=reactive({
  totalRecords:0,//总记录数
  pageCount:0,//总页数
  currentPage:1//当前页
 });
 const topage = (page) => {
  pageData.currentPage=page
  searchParams.page=page
  getList()
}

const searchParams = reactive({
  keyword:'',
  formItem:'',
  page:pageData.currentPage
})
const VisibleDialog = ref(false)

const add = () => {
  dialogTitle.value = '增加字段'
  colId.value = 0
  VisibleDialog.value = true
  componentId.value = Form
}
const edit = (id) => {
  dialogTitle.value = '编辑字段'
  colId.value = id
  VisibleDialog.value = true
  componentId.value = Form
}
const destory = (id) => {
  confirms({ text: '确认删除吗？' })
    .then(async () => {
      const res = await postData('/cols/delete', { id: id })
      if (res.code) {
        alter({ type: 'alter-success', text: res.msg })
        getList()
      } else {
        alter({ type: 'alter-error', text: res.msg })
      }
    })
    .catch((e) => {})
}
const getList = async () => {
  const resp = await getData('/cols',searchParams)
  if (resp.code == 1) {
    pageData.totalRecords=resp.data.total
    pageData.pageCount=resp.data.last_page
    dataList.length = 0
    resp.data.data.forEach((item) => {
      dataList.push(item)
    })
  }
}
onMounted(async () => {
  getList()
})
</script>
