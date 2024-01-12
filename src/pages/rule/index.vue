<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-10 10:36:02
 * @LastEditTime: 2022-09-26 08:50:51
 * @FilePath: \ypcmsvue3\src\pages\rule\index.vue
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
      <button class="btn btn-lan" type="button" @click="add">
        增加菜单
      </button>
    </template>
    <template #list>
      <div>
        <div class="flex border-b bg-gray-100 leading-8 font-bold">
          <div class="text-center md:w-20 border-r w-8">ID</div>
          <div class="md:w-48 pl-2 flex-1 md:flex-initial">菜单名称</div>
          <div class="md:w-32 pl-2 hidden md:block">类型</div>
          <div class="md:w-32 pl-2 hidden md:block text-center">图标</div>
          <div class="md:w-32 pl-2 hidden md:block text-center">排序</div>
          <div class="md:w-32 pl-2 hidden md:block text-center">状态</div>
          <div class="w-40 text-center px-1">操作</div>
        </div>
        <template v-for="(item,index) in dataList">
          <ruleChild v-if="item.children&&item.children.length>0" :item="item" :key="index" :basePath="item.id" :leave="0" />
          <ruleItem v-else :item="item" :key="index+1" :leave="0" />
        </template>
      </div>
    </template>
  </yplayout>
  <ypdialog width="800" :title="ypdialogTitle" :mask="1" v-if="VisibleDialog" @close="VisibleDialog=false">
    <Form :id="ruleId"></Form>
  </ypdialog>

</template>

<script setup>
import store from '@/store'
import { getData,postData,alter,confirms } from '@/api/data'
import { onMounted, ref, reactive, provide } from 'vue'
import Form from './form.vue'
import ruleChild from './ruleChild'
import ruleItem from './ruleItem'
const dataList = ref('')
const ypdialogTitle = ref('增加菜单')
const VisibleDialog = ref(false)
const ruleId = ref(0)
const openedRules = reactive({ path: [] })
const add = async () => {
  ruleId.value = 0
  VisibleDialog.value = true
}
const edit = (id) => {
  ruleId.value = id
  ypdialogTitle.value = '编辑菜单'
  VisibleDialog.value = true
}
const getList = async () => {
  const resp = await getData('rule/index')
  dataList.value = resp.data
}
provide('setcom', {
  item: {},
  openedRules: openedRules,
  edit: (id) => {
    edit(id)
  },
  destory: (id) => {
    confirms({ text: '确认删除吗？' })
      .then(async () => {
        const resp= await postData('rule/delete',{id:id})
        if (resp.code == 1) {
          alter({ type: 'alter-success', text: resp.msg })
          getList()
          store.commit('User/SET_ROUTE', dataList.value)
        }
      })
      .catch((e) => {})
  },
  update: async () => {
    await getList()
    store.commit('User/SET_ROUTE', dataList.value)
  },
  clickSubMenu: (basePath) => {
    if (openedRules.path.includes(basePath)) {
      openedRules.path.splice(openedRules.path.indexOf(basePath), 1)
      openedRules.path = openedRules.path.filter(
        (item) => item.indexOf(basePath + '/') !== 0
      )
    } else {
      openedRules.path.push(basePath)
    }
    sessionStorage.setItem('openRules', JSON.stringify(openedRules.path))
  }
})

onMounted(async () => {
  if (sessionStorage.getItem('openRules')) {
    openedRules.path = JSON.parse(sessionStorage.getItem('openRules'))
  }
  getList()
})
</script>

