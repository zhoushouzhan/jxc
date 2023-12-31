<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-09-25 09:48:13
 * @LastEditTime: 2022-09-26 22:00:41
 * @FilePath: \ypcmsvue3\src\pages\permissions\admin\index.vue
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
            <th>ID</th>
            <th>账号</th>
            <th>姓名</th>
            <th>角色</th>
            <th>手机号</th>
            <th>状态</th>
            <th>创建时间</th>
            <th>上次登录时间</th>
            <th>上次登录IP</th>
            <th class="w-40 text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in dataList" :key="index">
            <td>{{item.id}}</td>
            <td>{{item.username}}</td>
            <td>{{item.truename}}</td>
            <td class="space-x-2">
              <span class="bg-green-500 text-white px-2 py-1 rounded" v-for="(item,index) in item.roles">{{ item.title }}</span>
            </td>
            <td>{{item.mobile}}</td>
            <td>{{item.status}}</td>
            <td>{{item.create_time}}</td>
            <td>{{item.update_time}}</td>
            <td>{{item.last_ip}}</td>
            <td class="space-x-2 flex justify-center">
              <button class="yp-button yp-button-sm yp-button-gray rounded" @click="view(item.id)">查看</button>
              <button class="yp-button yp-button-sm rounded" @click="edit(item.id)">编辑</button>
              <button class="yp-button yp-button-sm yp-button-red rounded" @click="destory(item.id)" v-if="store.state.Sys.sysinfo.admin.maxroles==1">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </yplayout>
  <ypdialog width="800" :title="dialogTitle" :mask="1" v-if="VisibleDialog" @close="VisibleDialog=false">
    <component :is='componentId' :adminId="adminId" @update="getDataList"></component>
  </ypdialog>

</template>
<script setup>
import store from '@/store'
import { onMounted, ref, shallowRef } from 'vue'
import { getData,postData,alter,confirms } from '@/api/data'
import Form from './form.vue'
import View from './view.vue'
//变量
const componentId = shallowRef(Form)
const VisibleDialog = ref(false)
const dataList = ref('')
const dialogTitle = ref('')
const adminId = ref(0)
//方法
const view = (id) => {
  componentId.value = View
  dialogTitle.value = '查看管理员'
  adminId.value = id
  VisibleDialog.value = true
}
const add = () => {
  componentId.value = Form
  dialogTitle.value = '增加管理员'
  VisibleDialog.value = true
}
const edit = (id) => {
  componentId.value = Form
  dialogTitle.value = '编辑管理员'
  adminId.value = id
  VisibleDialog.value = true
}
const destory = async (id) => {
  confirms({ text: '确认删除吗？' })
    .then(async () => {
      const resp = await postData('/admin/delete',{ id: id })
      if (resp.code == 1) {
        alter({ type: 'alter-success', text: resp.msg })
        getDataList()
      }
    })
    .catch((e) => {})
}
const getDataList = async () => {
  const res = await getData('/admin/index')
  dataList.value = res.data
}
onMounted(() => {
  getDataList()
})
</script>
