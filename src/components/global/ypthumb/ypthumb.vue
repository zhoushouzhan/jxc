<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-08 14:26:03
 * @LastEditTime: 2022-10-26 20:18:03
 * @FilePath: \vue3\src\components\global\ypthumb\ypthumb.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div>
    <div class="w-24 min-h-[90px] bg-gray-300 relative">
      <img :src="objfile.src" v-if="objfile.src">
      <div class="text-xs text-center absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 py-1 text-white cursor-pointer" @click="isUpload=1">{{ myname }}</div>
    </div>
    <div class="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50" v-if="isUpload">
      <component :is="files" selnum="1" isopen="1" @useFiles="useFiles"></component>
      <div class="flex justify-center">
        <div class="w-9 h-9 bg-red-500 rounded-full flex justify-center items-center" @click="isUpload=0"><i class="ri-close-line ri-2x text-white"></i></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getData } from '@/api/data'
import { reactive, onMounted, ref } from 'vue'
import files from '@/pages/files/index'
const props = defineProps({
  modelValue: {
    default: ''
  }
})
const myname=ref('上传图片')
const isUpload = ref(0)
const objfile = reactive({ id: 0, src: '' })
const emit = defineEmits(['update:modelValue'])
const useFiles = (obj) => {
  objfile.src = obj[0].filepath
  objfile.id = obj[0].id
  isUpload.value = 0
  emit('update:modelValue', objfile.id)
}
onMounted(async () => {
  if (props.modelValue) {
    const res = await getData('/files/details', { id: props.modelValue })
    if (res.code) {
      objfile.src = res.data.filepath
      myname.value='更换图片'
    }
  }
})
</script>
