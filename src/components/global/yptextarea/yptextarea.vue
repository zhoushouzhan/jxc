<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-08 14:26:03
 * @LastEditTime: 2022-10-06 15:18:59
 * @FilePath: \ypcmsvue3\src\components\global\yptextarea\yptextarea.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div class="flex-1">
    <textarea :value="modelValue" :placeholder="placeholder" class="yp-textarea" @input="autoHeight()" ref="yptextarea"></textarea>
  </div>
</template>
<script setup name="ypinput">
import { inject, nextTick, onMounted, ref, watch } from 'vue'
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String
  }
})
watch(
  () => props.modelValue,
  (val) => {
    autoHeight()
  }
)
const emit = defineEmits(['update:modelValue'])
const yptextarea = ref(null)
const autoHeight = (e) => {
  nextTick(() => {
    yptextarea.value.style.height = 'auto'
    const height = yptextarea.value.scrollHeight
    if (height && height > 54) {
      yptextarea.value.style.height = height + 'px'
    }
    const targetVal = yptextarea.value.value
    emit('update:modelValue', targetVal)
  })
}
onMounted(() => {
  autoHeight()
})
</script>
