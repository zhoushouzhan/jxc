<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-08-02 08:05:43
 * @LastEditTime: 2022-08-31 10:31:42
 * @FilePath: \ypcmsvue3\src\pages\model\edit.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div>
    <div class="flex my-2 items-center">
      <div class="flex items-center">
        <i class="ri-information-line ri-2x text-gray-500"></i>
        <div class="text-xl px-2">编辑{{mod.alias}}</div>
      </div>
      <div class="flex-1"></div>
      <button class="yp-button yp-button-gray rounded" type="button" @click="emits('jumpCom',{to:List})">
        <i class="ri-arrow-go-back-line ri-lg pr-1"></i>
        返回
      </button>
    </div>
    <div class="w-5/6">
      <ypform :formData="formData" :group="mod.colgroup" :mod="mod" v-if="isload==1"></ypform>
    </div>

  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import List from './list.vue'
const prop = defineProps({
  mod: {
    type: Object
  },
  item: {
    type: Object
  }
})
const emits = defineEmits(['jumpCom'])
const formData = reactive({})
const isload = ref(0)
onMounted(async () => {
  //编辑赋值
  formData['id'] = prop.item.data['id']
  prop.mod.modcolumn.forEach((v) => {
    if (v.formitem != 'none') {
      formData[v.name] = prop.item.data[v.name]
    }
  })
  isload.value = 1
})
</script>
