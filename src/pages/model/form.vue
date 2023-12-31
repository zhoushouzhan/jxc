<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-08-03 08:12:36
 * @LastEditTime: 2022-10-06 10:55:30
 * @FilePath: \ypcmsvue3\src\pages\model\form.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <yplayout>
    <template #header>
      <div class="flex items-center">
        <i class="ri-2x text-gray-500 ml-2" :class="store.state.Model.modInfo.icon"></i>
        <div class="text-xl px-2" v-html="store.state.Model.modInfo.alias"></div>
        <div class="text-gray-400"></div>
      </div>
    </template>
    <template #list>
      <div class="bg-white">
        <ypform :formData="formData" :group="mod.colgroup" :mod="mod" @save="save" v-if="isload"></ypform>
      </div>
    </template>
  </yplayout>

</template>
<script setup>
import store from '@/store'
import {postData,alter} from '@/api/data'
import { ref, reactive, onMounted, provide } from 'vue'
const prop = defineProps({
  mod: {
    type: Object
  }
})
const isload = ref(0)
const formData = reactive({})

//表单事件
provide('formEvent', {
  saveEvent: () => {}
})


const save=async (postParams)=>{
  const res = await postData('/Sitepro/save',postParams)
  if(res.code == 1) {
    alter({ type: 'alter-success', text: res.msg })
  }
}


onMounted(() => {
  const res = store.state.Model.modDataList
  if (res) {
    formData['id'] = res.id
  }
  prop.mod.modcolumn.forEach((v) => {
    if (v.formitem != 'none') {
      formData[v.name] = res[v.name] || ''
    }
  })
  isload.value = 1
})
</script>
