<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-08-27 19:55:50
 * @LastEditTime: 2022-09-25 21:18:05
 * @FilePath: \ypcmsvue3\src\components\global\ypicon\ypicon.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div>
    <button class="yp-button yp-button-sm yp-button-gray rounded h-7 w-7 p-0 flex items-center justify-center" @click="isUpload=true"><i :class="modelValue||'ri-question-fill'"
        class="ri-lg"></i></button>
    <div class="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50" v-if="isUpload">
      <component :is="Icon" mod="1" @choice="choice"></component>
      <div class="flex justify-center">
        <div class="w-9 h-9 bg-red-500 rounded-full flex justify-center items-center" @click="isUpload=0"><i class="ri-close-line ri-2x text-white"></i></div>
      </div>
    </div>
  </div>
</template>
<script setup name="NYpicon">
import { ref } from 'vue'
import Icon from '@/pages/icon/index'
const props = defineProps({
  modelValue: {
    default: 'ri-question-fill'
  },
  placeholder: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])

const choice = (str) => {
  emit('update:modelValue', str)
  isUpload.value = false
}
const isUpload = ref(false)
</script>
