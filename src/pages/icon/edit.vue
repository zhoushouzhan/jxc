<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-01 08:36:59
 * @LastEditTime: 2022-09-17 16:47:07
 * @FilePath: \ypcmsvue3\src\pages\icon\edit.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <yplayout>
    <template #header="props">
      <div class="flex items-center">
        <i class="ri-2x text-gray-500 ml-2" :class="props.meta.icon||'ri-information-line'"></i>
        <div class="text-xl px-2">增加图标</div>
      </div>
      <div class="flex-1"></div>
      <button class="yp-button yp-button-gray rounded" type="button" @click="emit('jumpCom',{to:List})">
        <i class="ri-arrow-go-back-line ri-lg pr-1"></i>
        返回
      </button>
    </template>
    <template #list>
      <div class="overflow-auto bg-white select-none p-2">
        <div class="flex">
          <div class="w-24 text-right pr-5 pt-2">名称</div>
          <div class="flex-1" id="alias">
            <input type="text" class="yp-input" v-model="formData.title">
          </div>
        </div>
        <div class="flex py-2">
          <div class="w-24 text-right pr-5 pt-2">字符</div>
          <div class="flex-1" id="name">
            <input type="text" class="yp-input" v-model="formData.name">
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
    </template>
  </yplayout>
</template>
  <script setup>
import {getData,postData,alter} from "@/api/data"
import { ref, reactive, onMounted, inject } from 'vue'
import List from './list'
const emit = defineEmits(['jumpCom'])
const formData = reactive({
  id: 0,
  title: '',
  name: ''
})
const getItem = inject('getItem')
const isreset = ref(0)
const save = async () => {
  const res= await postData('/icon/edit', formData)
  if (res.code) {
    alter({ type: 'alter-success', text: res.msg })
    setTimeout(() => {
      reset()
    }, 2000)
  }
}
const reset = () => {
  isreset.value = 1
  for (let key in formData) {
    formData[key] = ''
  }
}
onMounted(() => {
  for (let key in formData) {
    formData[key] = getItem.item.data[key]
  }
})
</script>