<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-01 08:36:59
 * @LastEditTime: 2022-09-17 16:38:30
 * @FilePath: \ypcmsvue3\src\pages\icon\index.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <component :is="componentId" @jumpCom="jumpCom"></component>
</template>
<script setup>
import { shallowRef, provide, reactive, ref } from 'vue'
import List from './list'
const componentId = shallowRef(List)
const item = reactive({ data: {} })
const jumpCom = (obj) => {
  item.data = obj.item ? obj.item : {}
  componentId.value = obj.to
}
provide('getItem', {
  item: item
})
</script>
