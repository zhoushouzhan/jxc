<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-08-27 19:55:50
 * @LastEditTime: 2022-10-25 08:35:58
 * @FilePath: \vue3\src\components\global\ypinput\ypinput.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div class="flex-1">
    <input :type="type" class="yp-input" :value="modelValue" @input="updateVal" :placeholder="placeholder">
  </div>
</template>
<script setup name="NYpinput">
const props = defineProps({
  modelValue: {
    default: ''
  },
  placeholder: {
    type: String
  },
  type: {
    type: String,
    default: 'text'
  }
})
const emit = defineEmits(['update:modelValue'])
const updateVal = (e) => {
  const targetVal = e.target.value
  emit('update:modelValue', targetVal)
}
</script>
