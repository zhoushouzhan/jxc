<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-09-25 09:48:13
 * @LastEditTime: 2022-09-27 08:26:19
 * @FilePath: \ypcmsvue3\src\pages\permissions\roles\index.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <yplayout>
    <template #header="props">
      <div class="flex items-center">
        <i class="ri-2x text-gray-500 ml-2" :class="props.meta.icon||'ri-information-line'"></i>
        <div class="text-xl px-2" v-html="props.meta.title"></div>
        <div class="text-gray-400"></div>
      </div>
      <div class="flex-1"></div>
      <button class="yp-button yp-button-orange rounded" type="button" @click="add">
        <i class="ri-add-line ri-lg pr-1"></i>
        增加
      </button>
    </template>
    <template #list>
      <table class="yp-table-datalist">
        <thead>
          <tr>
            <th class="w-10">ID</th>
            <th class="w-40">角色名称</th>
            <th class="w-40 text-center">成员</th>
            <th>描述</th>
            <th class="w-40 text-center">操作</th>
          </tr>
        </thead>
        <tbody v-if="dataList.length">
          <tr v-for="(item,index) in dataList" :key="index">
            <td>{{item.id}}</td>
            <td>{{item.title}}</td>
            <td class="text-center">{{item.admin.length}}</td>
            <td>{{item.intro}}</td>
            <td class="space-x-2">
              <button class="yp-button yp-button-sm yp-button-orange rounded" @click="auth(item.id)">授权</button>
              <button class="yp-button yp-button-sm rounded" @click="edit(item.id)">编辑</button>
              <button class="yp-button yp-button-sm yp-button-red rounded" @click="destory(item.id)">删除</button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="4">
              <div class="p-5 text-center text-gray-400">
                暂无数据
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </yplayout>
  <ypdialog :width="diagWidth" :title="dialogTitle" :mask="1" v-if="VisibleDialog" @close="VisibleDialog=false">
    <component :is='componentId' :rolesId="rolesId" @update="getDataList" @close="VisibleDialog=false"></component>
  </ypdialog>

</template>
<script setup>
import { onMounted, ref, shallowRef } from 'vue'
import { getData,postData,alter,confirms } from '@/api/data'
import Form from './form.vue'
import Auth from './auth.vue'
//变量
const componentId = shallowRef(Form)
const VisibleDialog = ref(false)
const dataList = ref('')
const dialogTitle = ref('')
const rolesId = ref(0)
const diagWidth = ref(0)
//方法
const add = () => {
  dialogTitle.value = '增加角色'
  componentId.value = Form
  VisibleDialog.value = true
  rolesId.value = 0
  diagWidth.value = 700
}
const edit = (id) => {
  dialogTitle.value = '编辑角色'
  componentId.value = Form
  VisibleDialog.value = true
  rolesId.value = id
  diagWidth.value = 700
}
const auth = (id) => {
  dialogTitle.value = '角色授权'
  VisibleDialog.value = true
  componentId.value = Auth
  rolesId.value = id
  diagWidth.value = 1000
}
const destory = (id) => {
  confirms({ text: '确认删除吗？' })
    .then(async () => {
      const resp = await postData('/roles/delete',{ id: id })
      if (resp.code == 1) {
        alter({ type: 'alter-success', text: resp.msg })
        getDataList()
      }
    })
    .catch((e) => {})
}
const getDataList = async () => {
  const res = await getData('/roles/index')
  dataList.value = res.data
}
onMounted(() => {
  getDataList()
})
</script>
