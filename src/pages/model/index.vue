<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-08-01 07:42:07
 * @LastEditTime: 2022-10-13 17:14:46
 * @FilePath: \vue3\src\pages\model\index.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>

  <component :is="componentId" :mod="model" @jumpCom="jumpCom" :item='item'></component>

</template>
<script setup>
import store from '@/store'
import { shallowRef, reactive } from 'vue'
import Form from './form.vue'

const componentId = shallowRef(null)
const item = reactive({ data: {} })
const jumpCom = (obj) => {
  item.data = obj.item ? obj.item : {}
  componentId.value = obj.to
}
const model = store.state.Model.modInfo
if (store.state.Model.modInfo.type == 'form') {
  componentId.value = Form
}
</script>