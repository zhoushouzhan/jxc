<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-08 14:26:03
 * @LastEditTime: 2022-09-01 13:29:23
 * @FilePath: \ypcmsvue3\src\components\global\yphasone.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <ypselect :options="options" v-model="inputValue" v-if="isload"></ypselect>
</template>
<script setup name="NYphasone">
import {
  inject,
  onMounted,
  ref,
  watch,
  reactive,
  getCurrentInstance
} from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
  modelValue: {
    default: ''
  },
  col: {
    type: Object
  }
})

const inputValue = ref(props.modelValue)
const options = reactive([])
const isload = ref(false)

const emits = defineEmits(['update:modelValue'])
watch(inputValue, (newVal, oldVal) => {
  emits('update:modelValue', newVal)
})

onMounted(async () => {
  let formvalue = JSON.parse(props.col.formvalue)
  await proxy.$http
    .get(formvalue.tbname, { query: formvalue.query })
    .then((res) => {
      if (res.code) {
        res.data.forEach((vo) => {
          options.push({ name: vo.alias, value: vo.id })
        })
      }
    })
  isload.value = true
})
</script>