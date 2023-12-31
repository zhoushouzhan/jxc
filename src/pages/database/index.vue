<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-08-06 08:31:02
 * @LastEditTime: 2022-08-11 14:25:20
 * @FilePath: \vite-project\src\pages\database\index.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <component :is='componentId' @jumpCom="jumpCom"></component>
</template>
<script setup>
import { reactive, provide } from 'vue'
import List from './list.vue'
import { shallowRef } from 'vue'
const componentId = shallowRef(List)
const item = reactive({ data: {} })
const jumpCom = (obj) => {
  item.data = obj.item ? obj.item : {}
  componentId.value = obj.to
}
provide('getTb', {
  item: item
})
</script>