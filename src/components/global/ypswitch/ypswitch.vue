<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-08 09:31:49
 * @LastEditTime: 2022-09-25 21:14:11
 * @FilePath: \ypcmsvue3\src\components\global\ypswitch\ypswitch.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>

  <div class="relative h-[22px] w-[50px] rounded-full overflow-hidden duration-300 text-sm cursor-pointer" :class="{'bg-blue-600 text-white':modelValue,'bg-gray-400':!modelValue}" @click="toogle"
    v-if="isload">
    <div class="w-[20px] h-[20px] rounded-full bg-white absolute left-[1px] top-[1px] duration-300" :class="{'translate-x-7':modelValue}"></div>
  </div>

</template>
<script setup>
import { onMounted, ref } from 'vue'
const props = defineProps({
  modelValue: {
    default: 0
  }
})

const emit = defineEmits(['update:modelValue'])
const toogle = () => {
  emit('update:modelValue', props.modelValue==1?0:1)
}
const isload = ref(0)
onMounted(() => {
  isload.value = 1
})
</script>
