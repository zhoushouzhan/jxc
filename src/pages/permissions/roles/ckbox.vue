<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-10-03 10:31:01
 * @LastEditTime: 2022-10-04 10:34:29
 * @FilePath: \ypcmsvue3\src\pages\permissions\roles\ckbox.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div class="flex items-center">
    <i class="ri-checkbox-fill ri-xl text-blue-500" v-if="modelValue.indexOf(value)>=0"></i>
    <i class="ri-checkbox-blank-line ri-xl text-gray-500" v-else></i>
    <div class="px-2" v-if="title">{{title}}</div>
  </div>
</template>
<script setup name="NrolesCheckBox">
const props = defineProps({
  value: '',
  title: '',
  modelValue: {
    type: Array
  }
})
</script>
