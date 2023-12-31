<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-08 14:26:03
 * @LastEditTime: 2022-09-13 19:46:47
 * @FilePath: \ypcmsvue3\src\components\global\ypradio\ypradio.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div class="flex items-center text-sm" @click.stop="selected(value)">
    <i class="ri-checkbox-circle-fill ri-xl text-blue-500" v-if="modelValue==value"></i>
    <i class="ri-checkbox-blank-circle-line ri-xl text-gray-500" v-else></i>
    <div class="px-2">{{title}}</div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    default: ''
  },
  modelValue:{},
  value: {
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])
const selected = (value) => {
  emit('update:modelValue', value)
}


</script>
