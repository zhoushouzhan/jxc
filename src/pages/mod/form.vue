<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-06 15:26:37
 * @LastEditTime: 2022-09-27 20:29:57
 * @FilePath: \ypcmsvue3\src\pages\mod\form.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div class=" bg-white select-none p-2 space-y-3 text-sm" v-if="isload">
    <div class="flex items-center">
      <div class="w-24 text-right pr-5">名称</div>
      <div class="flex-1">
        <ypinput v-model="formData.alias" placeholder="如:用户"></ypinput>
      </div>
    </div>
    <div class="flex items-center">
      <div class="w-24 text-right pr-5">表名</div>
      <div class="flex-1 flex items-center">
        <div>
          <ypinput v-model="formData.name" placeholder="如:user"></ypinput>
        </div>
      </div>
    </div>
    <div class="flex items-center" v-if="modTypeList.length">
      <div class="w-24 text-right pr-5">类型</div>
      <div class="flex-1">
        <ypselect :itemList="modTypeList" v-model="formData.type"></ypselect>
      </div>
    </div>
    <div class="flex items-center">
      <div class="w-24 text-right pr-5">排序</div>
      <div class="flex-1">
        <ypinput v-model="formData.sort" placeholder="如:系统管理"></ypinput>
      </div>
    </div>
    <div class="flex items-center">
      <div class="w-24 text-right pr-5">分栏</div>
      <div class="flex-1">
        <yptextarea placeholder="一行一个" v-model="formData.colgroup"></yptextarea>
      </div>
    </div>
    <div class="flex items-center" v-if="actions.length">
      <div class="w-24 text-right pr-5">功能</div>
      <div class="flex-1 flex items-center flex-wrap space-x-4">
        <div class="grid grid-cols-8 gap-3">
          <div v-for="(item,index) in actions" :key="index">
            <ypcheckbox :value="item.name" :title="item.title" v-model="formData.actions"></ypcheckbox>
          </div>
        </div>
        
      </div>
    </div>
    <div class="flex justify-center py-3 space-x-2">
      <button class="yp-button yp-button-orange rounded" type="button" @click="save">
        <i class="ri-save-line ri-lg pr-1"></i>
        提交
      </button>
      <button class="yp-button yp-button-gray rounded" type="button" @click="reset">
        <i class="ri-format-clear ri-lg pr-1"></i>
        重置
      </button>
    </div>
  </div>
  
</template>
<script setup>
import {getData,postData,alter } from '@/api/data'
import store from '@/store'
import {  ref,reactive, onMounted, watch } from 'vue'
const isload=ref(false)
const props = defineProps({ modName: null })
const emits = defineEmits(['getDataList','close'])
//变量
const formData = reactive({
  alias: '',
  name: '',
  icon: '',
  type: 0,
  rule_id: '0',
  sort: '0',
  colgroup: '',
  actions: []
})
const actions = reactive([])
const modTypeList = reactive([{ value: 0, title: '请选择' }])
//方法
const save = async () => {
  const res = await postData('/mod/save',formData)
  if (res.code) {
    alter({ type: 'alter-success', text: res.msg })
    emits('getDataList')
    setTimeout(() => {
      reset()
    }, 1000)
  }
}
const reset = () => {
  for (let key in formData) {
    formData[key] = ''
  }
}
//监听
watch(
  () => formData.type,
  (newVal) => {
    actions.length = 0
    if (newVal) {
      Object.keys(store.getters.modType).map((key) => {
        if (key == newVal) {
          let names = store.getters.modType[key].actions
          let sysActions = store.getters.actions
          if (names.length) {
            names.forEach((vo) => {
              actions.push(sysActions[vo])
            })
          }
        }
      })
    }
  }
)
onMounted(async () => {
  let modType = store.getters.modType
  Object.keys(modType).map((key) => {
    modTypeList.push({ value: key, title: modType[key].name })
  })
  if (props.modName) {
    const modData = await getData('/mod/getmod',{ name: props.modName })
    formData['id'] = modData.data.id
    Object.keys(formData).map((key) => {
      if (key == 'colgroup') {
        formData[key] = modData.data[key].join('\n')
      } else {
        formData[key] = modData.data[key]
      }
    })
  }
  isload.value=true
})
</script>
