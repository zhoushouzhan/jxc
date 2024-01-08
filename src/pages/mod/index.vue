<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-06 15:26:42
 * @LastEditTime: 2022-10-24 09:37:50
 * @FilePath: \vue3\src\pages\mod\index.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <yplayout>
    <template #header="head">
      <div class="flex items-center">
        <i class="ri-2x text-gray-500 ml-2" :class="head.meta.icon||'ri-information-line'"></i>
        <div class="text-xl px-3" v-html="head.meta.title"></div>
        <div class="text-gray-400">模型用于存放数据</div>
      </div>
      <div class="flex-1"></div>
      <button class="yp-button yp-button-blue rounded  h-[33px]" type="button" @click="add">
        <i class="ri-add-line ri-lg pr-1"></i>
        增加
      </button>
    </template>
    <template #list>

      <table class="yp-table-datalist text-hui-300">
        <thead>
          <tr>
            <th>序号</th>
            <th>别名</th>
            <th>表名</th>
            <th>类型</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in dataList" :key="index">
            <td>{{index+1}}</td>
            <td>{{item.alias}}</td>
            <td class="text-lan-300 font-bold">{{item.name}}</td>
            <td>{{item.type}}</td>
            <td>
              <div class="space-x-1">
                <button class="btn" @click="view(item.id)">查看</button>
                <button class="btn btn-lan" @click="edit(item.name)">编辑</button>
                <button class="btn btn-zi" @click="editCol(item.name)">字段</button>
                <button class="btn btn-hong" @click="destory(item.id)">删除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </yplayout>
  <ypdialog width="1200" :title="dialogTitle" :mask="1" v-if="VisibleDialog" @close="VisibleDialog=false">
    <component :is='componentId' :modName="modName" @close="VisibleDialog=false" @getDataList="getDataList"></component>
  </ypdialog>
</template>
<script setup>
  import Form from './form.vue'
  import View from './View.vue'
  import Modcols from './modcols.vue'
  import { getData,postData, alter, confirms } from '@/api/data'
  import { ref, onMounted, shallowRef } from 'vue'
  const componentId = shallowRef('')
  const VisibleDialog = ref(false)
  const modName = ref('')
  //列表数据
  const dataList = ref('')
  const dialogTitle = ref('')
  //请求模型数据函数
  const getDataList = async () => {
    const resp = await getData('/mod/index')
    dataList.value = resp.data
  }
  const add = () => {
    dialogTitle.value = '增加模型'
    modName.value = ''
    VisibleDialog.value = true
    componentId.value = Form
  }
  const edit = (name) => {
    dialogTitle.value = '编辑模型'
    componentId.value = Form
    modName.value = name
    VisibleDialog.value = true
  }
  const view = (name) => {
    dialogTitle.value = '查看模型'
    modName.value = name
    VisibleDialog.value = true
    componentId.value = View
  }
  const editCol = (name) => {
    dialogTitle.value = '编辑字段'
    modName.value = name
    VisibleDialog.value = true
    componentId.value = Modcols
  }
  const destory = (id) => {
    confirms({ text: '确定删除吗？' })
      .then(async () => {
        const resp = await postData('/mod/delete',{ id: id })
        if (resp.code) {
          alter({ type: 'alter-success', text: resp.msg })
          getDataList()
        }
      })
      .catch((e) => {})
  }
  onMounted(() => {
    getDataList()
  })
</script>