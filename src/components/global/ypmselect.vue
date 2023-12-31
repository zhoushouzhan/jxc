<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-09-01 08:58:51
 * @LastEditTime: 2022-09-01 14:54:01
 * @FilePath: \ypcmsvue3\src\components\global\ypmselect.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <ypselect :options="options" v-model="pid" v-if="isload"></ypselect>
</template>
<script setup name="NYpmselect">
import { ref, onMounted, reactive, getCurrentInstance, watch } from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
  modelValue: {
    defalut: ''
  },
  col: {
    type: Object
  }
})
const isload = ref(false)
const options = reactive([])
const pid = ref(props.modelValue)
const emits = defineEmits(['update:modelValue'])
watch(pid, (newVal, oldVal) => {
  emits('update:modelValue', newVal)
})
const resetcategory = (obj, deep) => {
  obj.forEach((item) => {
    let pre = ''
    for (let i = 0; i < deep; i++) {
      pre += '--'
    }
    item.title = pre + item.title
    let disabled = false
    if (item.islast == 1) {
      disabled = true
    }

    options.push({ name: item.title, value: item.id, disabled: disabled })
    if (item.children) {
      resetcategory(item.children, deep + 1)
    }
  })
}
onMounted(async () => {
  if (props.col.formvalue) {
    let remote = JSON.parse(props.col.formvalue)
    await proxy.$http.get(remote.url, { pid: remote.pid }).then((res) => {
      if (
        res.code == 1 &&
        res.data.list &&
        res.data.mod &&
        res.data.mod == 'category'
      ) {
        resetcategory(res.data.list, 0)
      }
    })
  }
  isload.value = true
})
</script>
